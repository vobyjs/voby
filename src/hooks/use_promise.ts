
/* IMPORT */

import useDisposed from '~/hooks/use_disposed';
import useEffect from '~/hooks/use_effect';
import {$, $$} from '~/observable';
import {castError} from '~/utils';
import {Observable, ObservableMaybe, ViewPromiseState} from '~/types';

/* MAIN */

const usePromise = <T> ( promise: ObservableMaybe<Promise<T>> ): Observable<ViewPromiseState<T>> => {

  const state: Observable<ViewPromiseState<T>> = $({ loading: true });

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
