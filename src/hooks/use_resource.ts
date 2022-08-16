
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useDisposed from '~/hooks/use_disposed';
import useLazyMemo from '~/hooks/use_lazy_memo';
import useReaction from '~/hooks/use_reaction';
import useReadonly from '~/hooks/use_readonly';
import $ from '~/methods/S';
import $$ from '~/methods/SS';
import batch from '~/methods/batch';
import untrack from '~/methods/untrack';
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

    const onInit = (): void => {

      const resourcePrev = untrack ( resource );
      const latest = resourcePrev.error ? undefined : resourcePrev.latest;

      resource ({ pending: true, latest });

    };

    const onResolve = ( value: T ): void => {

      if ( disposed () ) return;

      suspenseDecrement ();

      resource ({ pending: false, value, latest: value });

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      suspenseDecrement ();

      const error = castError ( exception );

      resource ({ pending: false, error, get value (): undefined { throw error }, get latest (): undefined { throw error } });

    };

    const fetch = (): void => {

      try {

        onInit ();
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

    batch ( fetch );

    return suspenseDecrement;

  });

  return assign ( useReadonly ( resource ), {
    pending: useLazyMemo ( () => resource ().pending ),
    error: useLazyMemo ( () => resource ().error ),
    value: useLazyMemo ( () => resource ().value ),
    latest: useLazyMemo ( () => resource ().latest )
  });

};

/* EXPORT */

export default useResource;
