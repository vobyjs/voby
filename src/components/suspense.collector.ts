
/* IMPORT */

import {SYMBOL_SUSPENSE_COLLECTOR} from '~/constants';
import useMemo from '~/hooks/use_memo';
import $ from '~/methods/S';
import {context, resolve} from '~/oby';
import type {SuspenseCollectorData, SuspenseData} from '~/types';

/* MAIN */

// Keeping track of all Suspense instances below it, needed in some cases

const SuspenseCollector = {

  create: (): SuspenseCollectorData => { //TODO: Optimize this, some parts are unnecessarily slow, we just need a counter of active suspenses here really

    const parent = SuspenseCollector.get ();
    const suspenses = $<SuspenseData[]>( [] );
    const active = useMemo ( () => suspenses ().some ( suspense => suspense.active () ) );
    const register = ( suspense: SuspenseData ) => { parent?.register ( suspense ); suspenses ( prev => [...prev, suspense] ); };
    const unregister = ( suspense: SuspenseData ) => { parent?.unregister ( suspense ); suspenses ( prev => prev.filter ( other => other !== suspense ) ); };
    const data = { suspenses, active, register, unregister };

    return data;

  },

  get: (): SuspenseCollectorData | undefined => {

    return context<SuspenseCollectorData> ( SYMBOL_SUSPENSE_COLLECTOR );

  },

  wrap: <T> ( fn: ( data: SuspenseCollectorData ) => T ) => {

    const data = SuspenseCollector.create ();

    return context ( { [SYMBOL_SUSPENSE_COLLECTOR]: data }, () => {

      return resolve ( () => fn ( data ) );

    });

  }

};

/* EXPORT */

export default SuspenseCollector;
