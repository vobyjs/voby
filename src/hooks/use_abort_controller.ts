
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import useEventListener from '~/hooks/use_event_listener';
import {castArray} from '~/utils/lang';
import type {ArrayMaybe} from '~/types';

/* MAIN */

const useAbortController = ( signals: ArrayMaybe<AbortSignal> = [] ): AbortController => {

  const controller = new AbortController ();
  const abort = controller.abort.bind ( controller );

  for ( const signal of castArray ( signals ) ) { //TODO: This is pretty inefficient if there are any aborted signals

    if ( signal.aborted ) abort ();

    useEventListener ( signal, 'abort', abort );

  }

  useCleanup ( abort );

  return controller;

};

/* EXPORT */

export default useAbortController;
