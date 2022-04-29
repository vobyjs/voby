
/* IMPORT */

import {SYMBOL_SUSPENSE} from '~/constants';
import useComputed from '~/hooks/use_computed';
import $ from '~/methods/S';
import oby from '~/oby';
import type {SuspenseData} from '~/types';

/* MAIN */

const SuspenseContext = {

  make: (): SuspenseData => {

    const parent = SuspenseContext.get ();
    const count = $(0);
    const active = useComputed ( () => !!count () );
    const increment = () => { parent?.increment (); count ( prev => prev + 1 ); };
    const decrement = () => { parent?.decrement (); count ( prev => prev - 1 ); };
    const data = { active, increment, decrement };

    return data;

  },

  get: (): SuspenseData | undefined => {

    return oby.context<SuspenseData> ( SYMBOL_SUSPENSE );

  },

  set: ( data: SuspenseData ): void => {

    return oby.context<SuspenseData> ( SYMBOL_SUSPENSE, data );

  }

};

/* EXPORT */

export default SuspenseContext;
