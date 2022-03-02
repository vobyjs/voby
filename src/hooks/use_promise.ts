
/* IMPORT */

import type {Observable, ObservableMaybe, Resource} from '../types';
import useResource from './use_resource';

/* MAIN */

const usePromise = <T> ( promise: ObservableMaybe<Promise<T>> ): Observable<Resource<T>> => {

  return useResource ( () => promise );

};

/* EXPORT */

export default usePromise;
