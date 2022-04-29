
/* IMPORT */

import useDisposed from '~/hooks/use_disposed';
import useEffect from '~/hooks/use_effect';
import $ from '~/methods/S';
import $$ from '~/methods/SS';
import {castError, isPromise} from '~/utils/lang';
import type {Observable, ObservableMaybe, PromiseMaybe, Resource} from '~/types';

/* MAIN */

const useResource = <T> ( fetcher: (() => ObservableMaybe<PromiseMaybe<T>>) ): Observable<Resource<T>> => {

  const resource = $<Resource<T>>({ loading: true });

  useEffect ( () => {

    const disposed = useDisposed ();

    resource ({ loading: true });

    const onResolve = ( value: T ): void => {

      if ( disposed () ) return;

      resource ({ loading: false, value });

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      const error = castError ( exception );

      resource ({ loading: false, error });

    };

    const fetch = (): void => {

      try {

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

  return resource;

};

/* EXPORT */

export default useResource;
