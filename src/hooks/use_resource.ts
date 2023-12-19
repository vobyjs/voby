
/* IMPORT */

import SuspenseManager from '~/components/suspense.manager';
import useCheapDisposed from '~/hooks/use_cheap_disposed';
import useReadonly from '~/hooks/use_readonly';
import useRenderEffect from '~/hooks/use_render_effect';
import $ from '~/methods/S';
import $$ from '~/methods/SS';
import {assign, castError, isPromise} from '~/utils/lang';
import type {ObservableMaybe, PromiseMaybe, ResourceStaticPending, ResourceStaticRejected, ResourceStaticResolved, ResourceStatic, ResourceFunction, Resource} from '~/types';

/* MAIN */

//TODO: Maybe port this to oby, as "from"
//TODO: Option for returning the resource as a store, where also the returned value gets wrapped in a store
//FIXME: SSR demo: toggling back and forth between /home and /loader is buggy, /loader gets loaded with no data, which is wrong

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

  useRenderEffect ( () => {

    const disposed = useCheapDisposed ();

    const onPending = (): void => {

      pending ( true );
      error ( undefined );
      value ( undefined );
      resource ( resourcePending );

    };

    const onResolve = ( result: T ): void => {

      if ( disposed () ) return;

      pending ( false );
      error ( undefined );
      value ( () => result );
      latest ( () => result );
      resource ( resourceResolved );

    };

    const onReject = ( exception: unknown ): void => {

      if ( disposed () ) return;

      pending ( false );
      error ( castError ( exception ) );
      value ( undefined );
      latest ( undefined );
      resource ( resourceRejected );

    };

    const onFinally = (): void => {

      if ( disposed () ) return;

      unsuspend ();

    };

    const fetch = (): void => {

      try {

        const value = $$(fetcher ());

        if ( isPromise ( value ) ) {

          onPending ();

          value.then ( onResolve, onReject ).finally ( onFinally );

        } else {

          onResolve ( value );
          onFinally ();

        }

      } catch ( error: unknown ) {

        onReject ( error );
        onFinally ();

      }

    };

    fetch ();

  });

  return assign ( useReadonly ( resource ), resourceFunction );

};

/* EXPORT */

export default useResource;
