
/* IMPORT */

import {SYMBOL_HOT_COMPONENT} from '~/constants';
import useMemo from '~/hooks/use_memo';
import $ from '~/methods/S';
import resolve from '~/methods/resolve';
import {isFunction} from '~/utils/lang';
import type {ObservableReadonly} from '~/types';

/* MAIN */

const hmr = <T extends Function> ( accept: Function | undefined, component: T ): T => {

  if ( accept ) { // Making the component hot

    /* VARIABLES */

    const source = $(component);

    /* HELPERS */

    const createHotComponent = ( path: string[] ): any => {

      return <A extends unknown[], R> ( ...args: A ): ObservableReadonly<R> => {

        return useMemo ( () => {

          const component = path.reduce ( ( component, key ) => component[key], source () );
          const result = resolve ( component ( ...args ) );

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

        if ( isFunction ( value ) && /^[A-Z]([a-z0-9_]|$)/.test ( key ) ) { // A component

          hot[key] = createHotComponentDeep ( value, [...path, key] );

        } else { // Something else

          hot[key] = value;

        }

      }

      return hot;

    };

    const onAccept = ( module: { default: T } ): void => {

      source ( () => module.default );

    };

    /* MAIN */

    accept ( onAccept );

    const hot = createHotComponentDeep ( component, [] );

    /* RETURN */

    return hot;

  } else { // Returning the component as is

    return component;

  }

};

/* EXPORT */

export default hmr;
