
/* IMPORT */

import type {Child, TemplateActionPath, TemplateActionWithNodes, TemplateActionWithPaths} from './types';
import {SYMBOL_TEMPLATE_PROPERTY_ACCESSOR} from './constants';
import {setChildReplacement, setProp} from './setters';
import {indexOf, isAlphanumeric, isFunction, isString} from './utils';

/* MAIN */

//TODO: Implement predictive pre-rendering, where a bunch of clones are made during idle times before they are needed depending on how many clones are estimated to be needed in the future

const template = <P = {}> ( fn: (( props: P ) => Child) ): (( props: P ) => () => HTMLElement) => {

  const checkValidProperty = ( property: unknown ): property is string => {

    if ( isString ( property ) && isAlphanumeric ( property ) ) return true;

    throw new Error ( `Invalid property, only alphanumeric properties are allowed inside templates, received: "${property}"` );

  };

  const makeAccessor = ( actionsWithNodes: TemplateActionWithNodes[] ): any => {

    return new Proxy ( {}, {

      get ( target: unknown, key: string ) {

        checkValidProperty ( key );

        const accessor = ( node: Node, prop: string, targetNode?: Node ): void => {

          checkValidProperty ( prop );

          actionsWithNodes.push ([ node, prop, key, targetNode ]);

        };

        accessor[SYMBOL_TEMPLATE_PROPERTY_ACCESSOR] = true;

        return accessor;

      }

    });

  };

  const makeActionsWithNodesAndTemplate = (): { actionsWithNodes: TemplateActionWithNodes[], template: HTMLElement } => {

    const actionsWithNodes: TemplateActionWithNodes[] = [];
    const accessor = makeAccessor ( actionsWithNodes );
    const component = fn ( accessor );

    if ( isFunction ( component ) ) {

      const template = component ();

      if ( template instanceof HTMLElement ) {

        return { actionsWithNodes, template };

      }

    }

    throw new Error ( 'Invalid template, it must return a function that returns an HTMLElement' );

  };

  const makeActionsWithPaths = ( actionsWithNodes: TemplateActionWithNodes[] ): TemplateActionWithPaths[] => {

    const actionsWithPaths: TemplateActionWithPaths[] = [];

    for ( let i = 0, l = actionsWithNodes.length; i < l; i++ ) {

      const [node, prop, key, targetNode] = actionsWithNodes[i];

      const nodePath = makeNodePath ( node );
      const targetNodePath = targetNode ? makeNodePath ( targetNode ) : undefined;

      actionsWithPaths.push ([ nodePath, prop, key, targetNodePath ]);

    }

    return actionsWithPaths;

  };

  const makeNodePath = (() => {

    let prevNode: Node | null = null;
    let prevPath: TemplateActionPath;

    return ( node: Node ): TemplateActionPath => {

      if ( node === prevNode ) return prevPath; // Cache hit

      const path: TemplateActionPath = [];

      let child = node;
      let parent = child.parentNode;

      while ( parent ) {

        const index = indexOf ( parent.childNodes, child );

        path.push ( index );

        child = parent;
        parent = parent.parentNode;

      }

      prevNode = node;
      prevPath = path;

      return path;

    };

  })();

  const makeReviverActions = ( actionsWithPaths: TemplateActionWithPaths[] ): string[] => {

    const actions: string[] = [];

    for ( let i = 0, l = actionsWithPaths.length; i < l; i++ ) {

      const [nodePath, prop, key, targetNodePath] = actionsWithPaths[i];

      if ( targetNodePath ) {

        if ( targetNodePath.length ) {

          actions.push ( `this.setChildReplacement ( props["${key}"], root.${targetNodePath.map ( index => ( index === 0 ) ? 'firstChild' : `childNodes[${index}]` ).reverse ().join ( '.' )} );` );

        } else {

          actions.push ( `this.setChildReplacement ( props["${key}"], root );` );

        }

      } else {

        if ( nodePath.length ) {

          actions.push ( `this.setProp ( root.${nodePath.map ( index => ( index === 0 ) ? 'firstChild' : `childNodes[${index}]` ).reverse ().join ( '.' )}, "${prop}", props["${key}"] );` );

        } else {

          actions.push ( `this.setProp ( root, "${prop}", props["${key}"] );` );

        }

      }

    }

    return actions;

  };

  const makeReviver = ( actionsWithPaths: TemplateActionWithPaths[] ): (( root: HTMLElement, props: P ) => HTMLElement) => {

    const actions = makeReviverActions ( actionsWithPaths );
    const fn = new Function ( 'root', 'props', `${actions.join ( '' )}return root;` );
    const apis = { setChildReplacement, setProp };

    return fn.bind ( apis );

  };

  const makeComponent = (): (( props: P ) => () => HTMLElement) => {

    const {actionsWithNodes, template} = makeActionsWithNodesAndTemplate ();
    const actionsWithPaths = makeActionsWithPaths ( actionsWithNodes );
    const reviver = makeReviver ( actionsWithPaths );

    return ( props: P ): () => HTMLElement => {

      return (): HTMLElement => {

        const root = template.cloneNode ( true );

        return reviver ( root, props );

      };

    };

  };

  return makeComponent ();

};

/* EXPORT */

export default template;
