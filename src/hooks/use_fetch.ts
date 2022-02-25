
/* IMPORT */

import type {FetchState, Observable, ObservableMaybe} from '../types';
import {$, $$} from '../observable';
import {castError} from '../utils/lang';
import useAbortController from './use_abort_controller';
import useDisposed from './use_disposed';
import useEffect from './use_effect';

/* MAIN */

const useFetch = ( input: ObservableMaybe<RequestInfo>, init?: ObservableMaybe<RequestInit> ): Observable<FetchState> => {

  const state = $<FetchState>({ loading: true });

  useEffect ( () => {

    const disposed = useDisposed ();

    state ({ loading: true });

    const onResolve = ( response: Response ): void => {

      if ( disposed () ) return;

      state ({ loading: false, response });

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      const error = castError ( exception );

      state ({ loading: false, error });

    };

    const request = $$(input);
    const options = $$(init) || {};
    const signal = options.signal || useAbortController ().signal;

    options.signal = signal;

    fetch ( request, options ).then ( onResolve, onReject );

  });

  return state;

};

/* EXPORT */

export default useFetch;
