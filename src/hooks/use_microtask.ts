
/* IMPORT */

import {with as _with} from '~/oby';
import type {Callback} from '~/types';

/* MAIN */

const useMicrotask = ( fn: Callback ): void => {

  const runWithOwner = _with ();

  queueMicrotask ( () => {

    runWithOwner ( fn );

  });

};

/* EXPORT */

export default useMicrotask;
