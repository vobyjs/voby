
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useDisposed from '~/hooks/use_disposed';
import useEffect from '~/hooks/use_effect';
import useReadonly from '~/hooks/use_readonly';
import $ from '~/methods/S';
import $$ from '~/methods/SS';
import {castError, isPromise} from '~/utils/lang';
import type {ObservableReadonly, ObservableMaybe, PromiseMaybe, Resource} from '~/types';

/* MAIN */

const useResource = <T> ( fetcher: (() => ObservableMaybe<PromiseMaybe<T>>) ): ObservableReadonly<Resource<T>> => {

  const resource = $<Resource<T>>({ loading: true });

  useEffect ( () => {

    const disposed = useDisposed ();
    const suspense = SuspenseContext.get ();

    resource ({ loading: true });

    const onResolve = ( value: T ): void => {

      suspense?.decrement ();

      if ( disposed () ) return;

      resource ({ loading: false, value });

    };

    const onReject = ( exception: unknown ): void => {

      suspense?.decrement ();

      if ( disposed () ) return;

      const error = castError ( exception );

      resource ({ loading: false, error });

    };

    const fetch = (): void => {

      try {

        suspense?.increment ();

        const value = $$(fetcher ());

        if ( isPromise ( value ) ) {

          value.then ( onResolve, onReject );

        } else {

          onResolve ( value as T ); //TSC

        }

      } catch ( error: unknown ) {

        onReject ( error );

      }

    };

    fetch ();

  });

  return useReadonly ( resource );

};

/* EXPORT */

export default useResource;
