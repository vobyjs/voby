
/* IMPORT */

import type {Observable, ObservableMaybe, PromiseState} from '../types';
import {$, $$} from '../observable';
import {castError} from '../utils/lang';
import useDisposed from './use_disposed';
import useEffect from './use_effect';

/* MAIN */

const usePromise = <T> ( promise: ObservableMaybe<Promise<T>> ): Observable<PromiseState<T>> => {

  const state = $<PromiseState<T>>({ loading: true });

  useEffect ( () => {

    const disposed = useDisposed ();

    state ({ loading: true });

    const onResolve = ( value: T ): void => {

      if ( disposed () ) return;

      state ({ loading: false, value });

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      const error = castError ( exception );

      state ({ loading: false, error });

    };

    $$(promise).then ( onResolve, onReject );

  });

  return state;

};

/* EXPORT */

export default usePromise;
