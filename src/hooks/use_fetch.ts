
/* IMPORT */

import type {Observable, ObservableMaybe, Resource} from '../types';
import useAbortSignal from './use_abort_signal';
import useResolved from './use_resolved';
import useResource from './use_resource';

/* MAIN */

const useFetch = ( request: ObservableMaybe<RequestInfo>, init?: ObservableMaybe<RequestInit> ): Observable<Resource<Response>> => {

  return useResource ( () => {

    return useResolved ( [request, init], ( request, init = {} ) => {

      const signal = useAbortSignal ( init.signal || [] );

      init.signal = signal;

      return fetch ( request, init );

    });

  });

};

/* EXPORT */

export default useFetch;
