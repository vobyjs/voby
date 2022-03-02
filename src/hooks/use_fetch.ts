
/* IMPORT */

import type {Observable, ObservableMaybe, Resource} from '../types';
import $$ from '../$$';
import useAbortController from './use_abort_controller';
import useResource from './use_resource';

/* MAIN */

const useFetch = ( info: ObservableMaybe<RequestInfo>, init?: ObservableMaybe<RequestInit> ): Observable<Resource<Response>> => {

  return useResource ( () => {

    const request = $$(info);
    const options = $$(init) || {};
    const signal = useAbortController ( options.signal || [] ).signal;

    options.signal = signal;

    return fetch ( request, options );

  });

};

/* EXPORT */

export default useFetch;
