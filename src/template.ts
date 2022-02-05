
/* IMPORT */

import {replaceChild, setProp} from '~/setters';
import {indexOf, isAlphanumeric, isFunction, isString} from '~/utils';
import {ViewTemplateActionWithElements, ViewTemplateActionWithPaths, ViewTemplateActionPath} from '~/types';

/* HELPERS */

const SYMBOL_PROPERTY_ACCESSOR = Symbol ();

/* MAIN */

//TODO: Implement predictive pre-rendering

const template = <P = {}> ( fn: (( props: P ) => HTMLElement) ): (( props: P ) => HTMLElement) => {

  const checkValidProperty = ( property: unknown ): property is string => {

    if ( isString ( property ) && isAlphanumeric ( property ) ) return true;

    throw new Error ( `Only alphanumeric properties can be used when using templates, received: "${property}"` );

  };

  const makeAccessor = ( actionsWithElements: ViewTemplateActionWithElements[] ): any => {

    return new Proxy ( {}, {

      get ( target: unknown, key: string ) {

        checkValidProperty ( key );

        const accessor = ( element: HTMLElement, prop: string, targetElement?: HTMLElement ): void => {

          checkValidProperty ( prop );

          actionsWithElements.push ([ element, prop, key, targetElement ]);

        };

        accessor[SYMBOL_PROPERTY_ACCESSOR] = true;

        return accessor;

      }

    });

  };

  const makeActionsWithElementsAndTemplate = (): { actionsWithElements: ViewTemplateActionWithElements[], template: HTMLElement } => {

    const actionsWithElements: ViewTemplateActionWithElements[] = [];
    const accessor = makeAccessor ( actionsWithElements );
    const template = fn ( accessor )();

    return { actionsWithElements, template };

  };

  const makeActionsWithPaths = ( actionsWithElements: ViewTemplateActionWithElements[] ): ViewTemplateActionWithPaths[] => {

    const actionsWithPaths: ViewTemplateActionWithPaths[] = [];

    for ( let i = 0, l = actionsWithElements.length; i < l; i++ ) {

      const [element, prop, key, targetElement] = actionsWithElements[i];

      const elementPath = makeElementPath ( element );
      const targetElementPath = targetElement ? makeElementPath ( targetElement ) : undefined;

      actionsWithPaths.push ([ elementPath, prop, key, targetElementPath ]);

    }

    return actionsWithPaths;

  };

  const makeElementPath = (() => {

    let prevElement: HTMLElement | null = null;
    let prevPath: ViewTemplateActionPath;

    return ( element: HTMLElement ): ViewTemplateActionPath => {

      if ( element === prevElement ) return prevPath; // Cache hit

      const path: ViewTemplateActionPath = [];

      let child = element;
      let parent = child.parentElement;

      while ( parent ) {

        const index = indexOf ( parent.childNodes, child );

        path.push ( index );

        child = parent;
        parent = parent.parentElement;

      }

      prevElement = element;
      prevPath = path;

      return path;

    };

  })();

  const makeReviverActions = ( actionsWithPaths: ViewTemplateActionWithPaths[] ): string[] => {

    const actions: string[] = [];

    for ( let i = 0, l = actionsWithPaths.length; i < l; i++ ) {

      const [elementPath, prop, key, targetElementPath] = actionsWithPaths[i];

      if ( targetElementPath ) {

        if ( targetElementPath.length ) {

          actions.push ( `this.replaceChild ( props["${key}"], root.${targetElementPath.map ( index => ( index === 0 ) ? 'firstChild' : `childNodes[${index}]` ).reverse ().join ( '.' )} );` );

        } else {

          actions.push ( `this.replaceChild ( props["${key}"], root );` );

        }

      } else {

        if ( elementPath.length ) {

          actions.push ( `this.setProp ( root.${elementPath.map ( index => ( index === 0 ) ? 'firstChild' : `childNodes[${index}]` ).reverse ().join ( '.' )}, "${prop}", props["${key}"] );` );

        } else {

          actions.push ( `this.setProp ( root, "${prop}", props["${key}"] );` );

        }

      }

    }

    return actions;

  };

  const makeReviver = ( actionsWithPaths: ViewTemplateActionWithPaths[] ): (( root: HTMLElement, props: P ) => HTMLElement) => {

    const actions = makeReviverActions ( actionsWithPaths );
    const fn = new Function ( 'root', 'props', `${actions.join ( '' )}return root;` );
    const apis = { replaceChild, setProp };

    return fn.bind ( apis );

  };

  // const makeClone = (() => {
  //   const stash: HTMLElement[] = [];
  //   return (template) => {
  //     if ( !stash.length ) {
  //       for ( let i = 0, l = 100000; i < l; i++ ) {
  //         stash.push ( template.cloneNode ( true ) );
  //       }
  //     }
  //     return stash.pop ();
  //   }
  // })();

  const makeComponent = (): (( props: P ) => HTMLElement) => {

    const {actionsWithElements, template} = makeActionsWithElementsAndTemplate ();
    const actionsWithPaths = makeActionsWithPaths ( actionsWithElements );
    const reviver = makeReviver ( actionsWithPaths );

    return ( props: P ): HTMLElement => {

      return () => {

        // const root = makeClone ( template );
        const root = template.cloneNode ( true ) as HTMLElement; //TSC

        return reviver ( root, props );

      };

    };

  };

  return makeComponent ();

};

/* UTILITIES */

template.isProxy = ( x: unknown ) => isFunction ( x ) && x.hasOwnProperty ( SYMBOL_PROPERTY_ACCESSOR );

/* EXPORT */

export default template;
