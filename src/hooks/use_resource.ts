
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useDisposed from '~/hooks/use_disposed';
import useEffect from '~/hooks/use_effect';
import useReadonly from '~/hooks/use_readonly';
import $ from '~/methods/S';
import $$ from '~/methods/SS';
import {castError, isPromise, noop, once} from '~/utils/lang';
import type {ObservableReadonly, ObservableMaybe, PromiseMaybe, Resource} from '~/types';

/* MAIN */

const useResource = <T> ( fetcher: (() => ObservableMaybe<PromiseMaybe<T>>) ): ObservableReadonly<Resource<T>> => {

  const resource = $<Resource<T>>({ loading: true });

  useEffect ( () => {

    const disposed = useDisposed ();

    const suspense = SuspenseContext.get ();
    const suspenseDecrement = once ( suspense?.decrement || noop );
    const suspenseIncrement = once ( suspense?.increment || noop );

    resource ({ loading: true });

    const onResolve = ( value: T ): void => {

      if ( disposed () ) return;

      suspenseDecrement ();

      resource ({ loading: false, value });

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      suspenseDecrement ();

      const error = castError ( exception );

      resource ({ loading: false, error });

    };

    const fetch = (): void => {

      try {

        suspenseIncrement ();

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

    return suspenseDecrement;

  });

  return useReadonly ( resource );

};

/* EXPORT */

export default useResource;
