
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useDisposed from '~/hooks/use_disposed';
import useReaction from '~/hooks/use_reaction';
import useReadonly from '~/hooks/use_readonly';
import $ from '~/methods/S';
import $$ from '~/methods/SS';
import {assign, castError, isPromise, noop, once} from '~/utils/lang';
import type {ObservableMaybe, PromiseMaybe, ResourceStatic, Resource} from '~/types';

/* MAIN */

//TODO: Option for returning the resource as a store, where also the returned value gets wrapped in a store

const useResource = <T> ( fetcher: (() => ObservableMaybe<PromiseMaybe<T>>) ): Resource<T> => {

  const resource = $<ResourceStatic<T>>({ pending: true });

  useReaction ( () => {

    const disposed = useDisposed ();

    const suspense = SuspenseContext.get ();
    const suspenseDecrement = once ( suspense?.decrement || noop );
    const suspenseIncrement = once ( suspense?.increment || noop );

    resource ({ pending: true });

    const onResolve = ( value: T ): void => {

      if ( disposed () ) return;

      suspenseDecrement ();

      resource ({ pending: false, value });

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      suspenseDecrement ();

      const error = castError ( exception );

      resource ({ pending: false, error });

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

  return assign ( useReadonly ( resource ), {
    pending: () => resource ().pending,
    error: () => resource ().error,
    value: () => resource ().value
  });

};

/* EXPORT */

export default useResource;
