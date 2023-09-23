
/* IMPORT */

import useCheapDisposed from '~/hooks/use_cheap_disposed';
import {with as _with} from '~/oby';
import type {Callback} from '~/types';

/* MAIN */

//TODO: Maybe port this to oby
//TODO: Maybe special-case this to use one shared mirotask per microtask

const useMicrotask = ( fn: Callback ): void => {

  const disposed = useCheapDisposed ();
  const runWithOwner = _with ();

  queueMicrotask ( () => {

    if ( disposed () ) return;

    runWithOwner ( fn );

  });

};

/* EXPORT */

export default useMicrotask;
