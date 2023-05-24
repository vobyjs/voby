
/* IMPORT */

import useMemo from '~/hooks/use_memo';
import $ from '~/methods/S';
import resolve from '~/methods/resolve';
import untrack from '~/methods/untrack';
import {isFunction} from '~/utils/lang';
import type {Observable, ObservableReadonly} from '~/types';

/* HELPERS */

const SYMBOL_COLD_COMPONENT = Symbol ( 'HMR.Cold' );
const SYMBOL_HOT_COMPONENT = Symbol ( 'HMR.Hot' );
const SYMBOL_HOT_ID = Symbol ( 'HMR.ID' );
const SOURCES = new WeakMap<{}, Observable<any>>();

/* MAIN */

//TODO: This seems excessively complicated, maybe it can be simplified somewhat?
//TODO: Make this work better when a nested component is added/removed too

const hmr = <T extends Function> ( accept: Function | undefined, component: T ): T => {

  if ( accept ) { // Making the component hot

    /* CHECK */

    const cached = component[SYMBOL_HOT_COMPONENT];

    if ( cached ) return cached; // Already hot

    const isProvider = !isFunction ( component ) && ( 'Provider' in component );

    if ( isProvider ) return component; // Context/Directive providers are not hot-reloadable

    /* HELPERS */

    const createHotComponent = ( path: string[] ): any => {

      return <A extends unknown[], R> ( ...args: A ): ObservableReadonly<R> => {

        return useMemo ( () => {

          const component = path.reduce ( ( component, key ) => component[key], SOURCES.get ( id () )?.() || source () );
          const result = resolve ( untrack ( () => component ( ...args ) ) );

          return result;

        });

      };

    };

    const createHotComponentDeep = <T extends Function> ( component: T, path: string[] ): T => {

      const cached = component[SYMBOL_HOT_COMPONENT];

      if ( cached ) return cached;

      const hot = component[SYMBOL_HOT_COMPONENT] = createHotComponent ( path );

      for ( const key in component ) {

        const value = component[key];

        if ( isFunction ( value ) && ( key.length > 1 ? key !== key.toUpperCase () : key === key.toUpperCase () ) ) { // A component

          hot[key] = createHotComponentDeep ( value, [...path, key] );

        } else { // Something else

          hot[key] = value;

        }

      }

      return hot;

    };

    const onAccept = ( module: { default: T } ): void => {

      const hot = module.default;
      const cold = hot[SYMBOL_COLD_COMPONENT] || hot;

      hot[SYMBOL_HOT_ID]?.( id () );
      SOURCES.get ( id () )?.( () => cold );

    };

    /* MAIN */

    const id = $({});
    const source = $(component);

    SOURCES.set ( id (), source );

    const cold = component[SYMBOL_COLD_COMPONENT] || component;
    const hot = createHotComponentDeep ( component, [] );

    cold[SYMBOL_HOT_COMPONENT] = hot;
    hot[SYMBOL_COLD_COMPONENT] = cold;
    hot[SYMBOL_HOT_COMPONENT] = hot;
    hot[SYMBOL_HOT_ID] = id;

    accept ( onAccept );

    /* RETURN */

    return hot;

  } else { // Returning the component as is

    return component;

  }

};

/* EXPORT */

export default hmr;
