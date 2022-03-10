
/* IMPORT */

import type {Child, TemplateActionPath, TemplateActionProxy, TemplateActionWithNodes, TemplateActionWithPaths, TemplateOptions} from './types';
import {SYMBOL_TEMPLATE_ACCESSOR} from './constants';
import {indexOf, isFunction, isString} from './utils/lang';
import {setAttribute, setChildReplacement, setClasses, setEvent, setHTML, setProperty, setRef, setStyles} from './utils/setters';

/* MAIN */

const template = <P = {}> ( fn: (( props: P ) => Child), options: TemplateOptions = {} ): (( props: P ) => () => HTMLElement) => {

  const safePropertyRe = /^[a-z0-9-_]+$/i;

  const checkValidProperty = ( property: unknown ): property is string => {

    if ( isString ( property ) && safePropertyRe.test ( property ) ) return true;

    throw new Error ( `Invalid property, only alphanumeric properties are allowed inside templates, received: "${property}"` );

  };

  const makeAccessor = ( actionsWithNodes: TemplateActionWithNodes[] ): any => {

    return new Proxy ( {}, {

      get ( target: unknown, prop: string ) {

        checkValidProperty ( prop );

        const accessor = ( node: Node, method: string, key?: string, targetNode?: Node ): void => {

          if ( key ) checkValidProperty ( key );

          actionsWithNodes.push ([ node, method, prop, key, targetNode ]);

        };

        accessor[SYMBOL_TEMPLATE_ACCESSOR] = true;

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

      const [node, method, prop, key, targetNode] = actionsWithNodes[i];

      const nodePath = makeNodePath ( node );
      const targetNodePath = targetNode ? makeNodePath ( targetNode ) : undefined;

      actionsWithPaths.push ([ nodePath, method, prop, key, targetNodePath ]);

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

        const index = !child.previousSibling ? 0 : !child.nextSibling ? -0 : indexOf ( parent.childNodes, child );

        path.push ( index );

        child = parent;
        parent = parent.parentNode;

      }

      prevNode = node;
      prevPath = path;

      return path;

    };

  })();

  const makeNodePathProperties = ( path: TemplateActionPath ): string => {

    return path.slice ().reverse ().map ( index => ( Object.is ( 0, index ) ) ? '.firstChild' : Object.is ( -0, index ) ? '.lastChild' : `.firstChild${'.nextSibling'.repeat ( index )}` ).join ( '' );

  };

  const makeReviverActions = ( actionsWithPaths: TemplateActionWithPaths[] ): string[] => {

    const actions: string[] = [];

    for ( let i = 0, l = actionsWithPaths.length; i < l; i++ ) { //TODO: Write this more cleanly, with a single case

      const [nodePath, method, prop, key, targetNodePath] = actionsWithPaths[i];

      if ( targetNodePath ) {

        actions.push ( `this.${method} ( props["${prop}"], root${makeNodePathProperties ( targetNodePath )} );` );

      } else if ( key ) {

        actions.push ( `this.${method} ( root${makeNodePathProperties ( nodePath )}, "${key}", props["${prop}"] );` );

      } else {

        actions.push ( `this.${method} ( root${makeNodePathProperties ( nodePath )}, props["${prop}"] );` );

      }

    }

    return actions;

  };

  const makeReviver = ( actionsWithPaths: TemplateActionWithPaths[] ): (( root: HTMLElement, props: P ) => HTMLElement) => {

    const actions = makeReviverActions ( actionsWithPaths );
    const fn = new Function ( 'root', 'props', `${actions.join ( '' )}return root;` );
    const apis = {setAttribute, setChildReplacement, setClasses, setEvent, setHTML, setProperty, setRef, setStyles};

    return fn.bind ( apis );

  };

  const makeComponent = (): (( props: P ) => () => HTMLElement) => {

    const {actionsWithNodes, template} = makeActionsWithNodesAndTemplate ();
    const actionsWithPaths = makeActionsWithPaths ( actionsWithNodes );
    const reviver = makeReviver ( actionsWithPaths );

    if ( options.recycle ) {

      const clones: HTMLElement[] = [];

      const recycle = clones.push.bind ( clones );

      const clone = (): HTMLElement => {

        if ( clones.length ) return clones.pop ()!; //TSC

        const clone = template.cloneNode ( true );

        clone.recycle = recycle;

        return clone;

      };

      return ( props: P ): () => HTMLElement => {

        return reviver.bind ( undefined, clone (), props );

      };

    } else {

      return ( props: P ): () => HTMLElement => {

        const clone = template.cloneNode ( true );

        return reviver.bind ( undefined, clone, props );

      };

    }

  };

  return makeComponent ();

};

/* UTILITIES */

template.isAccessor = ( value: unknown ): value is TemplateActionProxy => {

  return isFunction ( value ) && value.hasOwnProperty ( SYMBOL_TEMPLATE_ACCESSOR );

};

/* EXPORT */

export default template;
