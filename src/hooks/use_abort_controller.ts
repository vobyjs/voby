
/* IMPORT */

import type {ArrayMaybe} from '../types';
import {castArray} from '../utils/lang';
import useCleanup from './use_cleanup';
import useEventListener from './use_event_listener';

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
