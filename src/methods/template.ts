
/* IMPORT */

import {SYMBOL_TEMPLATE_ACCESSOR} from '~/constants';
import wrapElement from '~/methods/wrap_element';
import {assign, indexOf, isFunction, isString} from '~/utils/lang';
import {setAttribute, setChildReplacement, setClasses, setEvent, setHTML, setProperty, setRef, setStyles} from '~/utils/setters';
import type {Child, TemplateActionPath, TemplateActionWithNodes, TemplateActionWithPaths, TemplateVariableProperties, TemplateVariableData, TemplateVariablesMap} from '~/types';

/* MAIN */

//TODO: avoid using "Function" and "eval", while still keeping similar performance, if possible
//TODO: support complex children in the template function

const template = <P = {}> ( fn: (( props: P ) => Child) ): (( props: P ) => () => Child) => {

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

        const metadata = { [SYMBOL_TEMPLATE_ACCESSOR]: true };

        return assign ( accessor, metadata );

      }

    });

  };

  const makeActionsWithNodesAndTemplate = (): { actionsWithNodes: TemplateActionWithNodes[], root: Element } => {

    const actionsWithNodes: TemplateActionWithNodes[] = [];
    const accessor = makeAccessor ( actionsWithNodes );
    const component = fn ( accessor );

    if ( isFunction ( component ) ) {

      const root = component ();

      if ( root instanceof Element ) {

        return { actionsWithNodes, root };

      }

    }

    throw new Error ( 'Invalid template, it must return a function that returns an Element' );

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

  const makeNodePathProperties = ( path: TemplateActionPath ): TemplateVariableProperties => {

    const properties: TemplateVariableProperties = ['root'];

    const parts = path.slice ().reverse ();

    for ( let i = 0, l = parts.length; i < l; i++ ) {

      const part = parts[i];

      if ( Object.is ( 0, part ) ) {

        properties.push ( 'firstChild' );

      } else if ( Object.is ( -0, part ) ) {

        properties.push ( 'lastChild' );

      } else {

        properties.push ( 'firstChild' );

        for ( let nsi = 0; nsi < part; nsi++ ) {

          properties.push ( 'nextSibling' );

        }

      }

    }

    return properties;

  };

  const makeReviverPaths = ( actionsWithPaths: TemplateActionWithPaths[] ): TemplateActionPath[] => {

    const paths: TemplateActionPath[] = [];

    for ( let i = 0, l = actionsWithPaths.length; i < l; i++ ) {

      const action = actionsWithPaths[i];
      const nodePath = action[0];
      const targetNodePath = action[4];

      paths.push ( nodePath );

      if ( targetNodePath ) {

        paths.push ( targetNodePath );

      }

    }

    return paths;

  };

  const makeReviverVariablesData = ( paths: TemplateActionPath[], properties: TemplateVariableProperties[] ): TemplateVariableData[] => {

    const data: TemplateVariableData[] = new Array ( paths.length );

    for ( let i = 0, l = paths.length; i < l; i++ ) {

      data[i] = {
        path: paths[i],
        properties: properties[i]
      };

    }

    return data;

  };

  const makeReviverVariables = ( actionsWithPaths: TemplateActionWithPaths[] ): { assignments: string[], map: Map<TemplateActionPath, string> } => { //TODO: Optimize this further, there's some duplication and unnecessary work being done

    const paths = makeReviverPaths ( actionsWithPaths );
    const properties = paths.map ( makeNodePathProperties );
    const data = makeReviverVariablesData ( paths, properties );
    const assignments: string[] = [];
    const map: TemplateVariablesMap = new Map ();

    let variableId = 0;

    while ( true ) {

      const datum = data.find ( datum => datum.properties.length > 1 );

      if ( !datum ) break;

      const [current, next] = datum.properties;
      const variable = `$${variableId++}`;
      const assignment = `const ${variable} = ${current}.${next};`;

      assignments.push ( assignment );

      for ( let i = 0, l = data.length; i < l; i++ ) {

        const datum = data[i];
        const [otherCurrent, otherNext] = datum.properties;

        if ( otherCurrent !== current || otherNext !== next ) continue;

        datum.properties[0] = variable;
        datum.properties.splice ( 1, 1 );

      }

    }

    for ( let i = 0, l = data.length; i < l; i++ ) {

      const datum = data[i];

      map.set ( datum.path, datum.properties[0] );

    }

    return {assignments, map};

  };

  const makeReviverActions = ( actionsWithPaths: TemplateActionWithPaths[], variables: Map<TemplateActionPath, string> ): string[] => {

    const actions: string[] = [];

    for ( let i = 0, l = actionsWithPaths.length; i < l; i++ ) { //TODO: Write this more cleanly, with a single case

      const [nodePath, method, prop, key, targetNodePath] = actionsWithPaths[i];

      if ( targetNodePath ) {

        actions.push ( `this.${method} ( props["${prop}"], ${variables.get ( targetNodePath )} );` );

      } else if ( key ) {

        actions.push ( `this.${method} ( ${variables.get ( nodePath )}, "${key}", props["${prop}"] );` );

      } else {

        actions.push ( `this.${method} ( ${variables.get ( nodePath )}, props["${prop}"] );` );

      }

    }

    return actions;

  };

  const makeReviver = ( actionsWithPaths: TemplateActionWithPaths[] ): (( root: Element, props: P ) => Element) => {

    const {assignments, map} = makeReviverVariables ( actionsWithPaths );
    const actions = makeReviverActions ( actionsWithPaths, map );
    const fn = new Function ( 'root', 'props', `${assignments.join ( '' )}${actions.join ( '' )}return root;` );
    const apis = {setAttribute, setChildReplacement, setClasses, setEvent, setHTML, setProperty, setRef, setStyles};
    const reviver = fn.bind ( apis );

    return reviver;

  };

  const makeComponent = (): (( props: P ) => () => Child) => {

    const {actionsWithNodes, root} = makeActionsWithNodesAndTemplate ();
    const actionsWithPaths = makeActionsWithPaths ( actionsWithNodes );
    const reviver = makeReviver ( actionsWithPaths );

    return ( props: P ): (() => Child) => {

      const clone = root.cloneNode ( true );

      return wrapElement ( reviver.bind ( undefined, clone, props ) );

    };

  };

  return makeComponent ();

};

/* EXPORT */

export default template;
