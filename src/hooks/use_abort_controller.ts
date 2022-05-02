
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import useEventListener from '~/hooks/use_event_listener';
import {castArray} from '~/utils/lang';
import type {ArrayMaybe} from '~/types';

/* MAIN */

const useAbortController = ( signals: ArrayMaybe<AbortSignal> = [] ): AbortController => {

  signals = castArray ( signals );

  const controller = new AbortController ();
  const abort = controller.abort.bind ( controller );
  const aborted = signals.some ( signal => signal.aborted );

  if ( aborted ) {

    abort ();

  } else {

    signals.forEach ( signal => useEventListener ( signal, 'abort', abort ) );

    useCleanup ( abort );

  }

  return controller;

};

/* EXPORT */

export default useAbortController;
