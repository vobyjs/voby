
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
    const increment = () => { parent?.increment (); count ( prev => prev + 1 ); };
    const decrement = () => queueMicrotask ( () => { parent?.decrement (); count ( prev => prev - 1 ); } );
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
