
/* IMPORT */

import useResource from '~/hooks/use_resource';
import type {Observable, ObservableMaybe, Resource} from '~/types';

/* MAIN */

const usePromise = <T> ( promise: ObservableMaybe<Promise<T>> ): Observable<Resource<T>> => {

  return useResource ( () => promise );

};

/* EXPORT */

export default usePromise;
