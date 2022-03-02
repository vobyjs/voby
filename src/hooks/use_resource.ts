
/* IMPORT */

import type {Observable, ObservableMaybe, PromiseMaybe, Resource} from '../types';
import $ from '../$';
import $$ from '../$$';
import {castError, isPromise} from '../utils/lang';
import useDisposed from './use_disposed';
import useEffect from './use_effect';

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

          onResolve ( value );

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
