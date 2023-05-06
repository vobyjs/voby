
/* IMPORT */

import {SYMBOL_SUSPENSE} from '~/constants';
import useMemo from '~/hooks/use_memo';
import $ from '~/methods/S';
import {context, resolve} from '~/oby';
import type {SuspenseData} from '~/types';

/* MAIN */

const SuspenseContext = {

  create: (): SuspenseData => {

    const parent = SuspenseContext.get ();
    const count = $(0);
    const active = useMemo ( () => !!count () );
    const increment = ( nr: number = 1 ) => { parent?.increment ( nr ); count ( prev => prev + nr ); };
    const decrement = ( nr: number = -1 ) => queueMicrotask ( () => { parent?.decrement ( nr ); count ( prev => prev + nr ); } );
    const data = { active, increment, decrement };

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
