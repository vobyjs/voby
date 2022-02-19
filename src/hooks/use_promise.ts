
/* IMPORT */

import useDisposed from '~/hooks/use_disposed';
import useEffect from '~/hooks/use_effect';
import {$, $$} from '~/observable';
import {castError} from '~/utils';
import {Observable, PromiseState} from '~/types';

/* MAIN */

const usePromise = <T> ( promise: Observable<Promise<T>> ): Observable<PromiseState<T>> => {

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
