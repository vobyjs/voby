
/* IMPORT */

import useMemo from '~/hooks/use_memo';
import $ from '~/methods/S';
import resolve from '~/methods/resolve';
import {isFunction} from '~/utils/lang';
import type {ObservableReadonly} from '~/types';

/* MAIN */

const hmr = <T> ( accept: Function | undefined, component: T ): T => {

  if ( accept ) {

    /* VARIABLES */

    const target = $(component);

    /* HELPERS */

    const createHotComponent = ( key?: string ): any => {

      return <A extends unknown[], R> ( ...args: A ): ObservableReadonly<R> => {

        return useMemo ( () => {

          const component = key ? target ()[key] : target ();
          const result = resolve ( component ( ...args ) );

          return result;

        });

      };

    };

    const onAccept = ( module: { default: T } ): void => {

      target ( () => module.default );

    };

    /* MAIN */

    accept ( onAccept );

    const proxy = createHotComponent ();

    for ( const key in component ) {

      const utility = component[key];

      if ( isFunction ( utility ) && /^[A-Z]([a-z0-9_]|$)/.test ( key ) ) { // A component

        proxy[key] = createHotComponent ( key );

      } else { // Something else

        proxy[key] = component[key];

      }

    }

    /* RETURN */

    return proxy;

  } else {

    return component;

  }

};

/* EXPORT */

export default hmr;
