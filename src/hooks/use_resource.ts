
/* IMPORT */

import SuspenseManager from '~/components/suspense.manager';
import useDisposed from '~/hooks/use_disposed';
import useReaction from '~/hooks/use_reaction';
import useReadonly from '~/hooks/use_readonly';
import $ from '~/methods/S';
import $$ from '~/methods/SS';
import batch from '~/methods/batch';
import {assign, castError, isPromise} from '~/utils/lang';
import type {ObservableMaybe, PromiseMaybe, ResourceStaticPending, ResourceStaticRejected, ResourceStaticResolved, ResourceStatic, ResourceFunction, Resource} from '~/types';

/* MAIN */

//TODO: Option for returning the resource as a store, where also the returned value gets wrapped in a store

const useResource = <T> ( fetcher: (() => ObservableMaybe<PromiseMaybe<T>>) ): Resource<T> => {

  const pending = $(true);
  const error = $<Error>();
  const value = $<T>();
  const latest = $<T>();

  const {suspend, unsuspend} = new SuspenseManager ();
  const resourcePending: ResourceStaticPending<T> = { pending: true, get value (): undefined { return void suspend () }, get latest (): T | undefined { return latest () ?? void suspend () } };
  const resourceRejected: ResourceStaticRejected = { pending: false, get error (): Error { return error ()! }, get value (): never { throw error ()! }, get latest (): never { throw error ()! } };
  const resourceResolved: ResourceStaticResolved<T> = { pending: false, get value (): T { return value ()! }, get latest (): T { return value ()! } };
  const resourceFunction: ResourceFunction<T> = { pending: () => pending (), error: () => error (), value: () => resource ().value, latest: () => resource ().latest };
  const resource = $<ResourceStatic<T>>( resourcePending );

  useReaction ( () => {

    const disposed = useDisposed ();

    const onPending = (): void => {

      batch ( () => {

        pending ( true );
        error ( undefined );
        value ( undefined );
        resource ( resourcePending );

      });

    };

    const onResolve = ( result: T ): void => {

      if ( disposed () ) return;

      batch ( () => {

        pending ( false );
        error ( undefined );
        value ( () => result );
        latest ( () => result );
        resource ( resourceResolved );

      });

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      batch ( () => {

        pending ( false );
        error ( castError ( exception ) );
        value ( undefined );
        latest ( undefined );
        resource ( resourceRejected );

      });

    };

    const fetch = (): void => {

      try {

        const value = $$(fetcher ());

        if ( isPromise ( value ) ) {

          onPending ();

          value.then ( onResolve, onReject );
          value.then ( unsuspend, unsuspend );

        } else {

          onResolve ( value );

        }

      } catch ( error: unknown ) {

        onReject ( error );

      }

    };

    fetch ();

  });

  return assign ( useReadonly ( resource ), resourceFunction );

};

/* EXPORT */

export default useResource;
