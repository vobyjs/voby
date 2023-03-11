
/* IMPORT */

import {SYMBOL_SUSPENSE} from '~/constants';
import useMemo from '~/hooks/use_memo';
import $ from '~/methods/S';
import {context} from '~/oby';
import type {SuspenseData} from '~/types';

/* MAIN */

const SuspenseContext = {

  new: (): SuspenseData => {

    const data = SuspenseContext.create ();

    SuspenseContext.set ( data );

    return data;

  },

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

  set: ( data: SuspenseData ): void => {

    return context<SuspenseData> ( SYMBOL_SUSPENSE, data );

  }

};

/* EXPORT */

export default SuspenseContext;
