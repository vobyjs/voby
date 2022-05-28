
/* IMPORT */

import useReaction from '~/hooks/use_reaction';
import $ from '~/methods/S';
import type {Callback} from '~/types';

/* MAIN */

const useMicrotask = ( fn: Callback ): void => {

  const active = $(false);

  useReaction ( () => {

    if ( !active () ) return;

    fn ();

  });

  queueMicrotask ( () => {

    active ( true );

  });

};

/* EXPORT */

export default useMicrotask;
