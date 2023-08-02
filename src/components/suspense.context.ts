
/* IMPORT */

import {SYMBOL_SUSPENSE, SYMBOL_SUSPENSE_COLLECTOR} from '~/constants';
import useCleanup from '~/hooks/use_cleanup';
import useMemo from '~/hooks/use_memo';
import $ from '~/methods/S';
import {context, resolve} from '~/oby';
import type {SuspenseCollectorData, SuspenseData} from '~/types';

/* MAIN */

const SuspenseContext = {

  create: (): SuspenseData => {

    const count = $(0);
    const active = useMemo ( () => !!count () );
    const increment = ( nr: number = 1 ) => count ( prev => prev + nr );
    const decrement = ( nr: number = -1 ) => queueMicrotask ( () => count ( prev => prev + nr ) );
    const data = { active, increment, decrement };

    const collector = context<SuspenseCollectorData> ( SYMBOL_SUSPENSE_COLLECTOR );

    if ( collector ) {

      collector?.register ( data );

      useCleanup ( () => collector.unregister ( data ) );

    }

    return data;

  },

  get: (): SuspenseData | undefined => {

    return context<SuspenseData> ( SYMBOL_SUSPENSE );

  },

  wrap: <T> ( fn: ( data: SuspenseData ) => T ) => {

    const data = SuspenseContext.create ();

    return context ( { [SYMBOL_SUSPENSE]: data }, () => {

      return resolve ( () => fn ( data ) );

    });

  }

};

/* EXPORT */

export default SuspenseContext;
