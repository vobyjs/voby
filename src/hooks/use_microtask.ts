
/* IMPORT */

import useEffect from '~/hooks/use_effect';
import $ from '~/methods/S';
import type {Callback} from '~/types';

/* MAIN */

const useMicrotask = ( fn: Callback ): void => {

  const active = $(false);

  useEffect ( () => {

    if ( !active () ) return;

    fn ();

  });

  queueMicrotask ( () => {

    active ( true );

  });

};

/* EXPORT */

export default useMicrotask;
