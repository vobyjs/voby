
/* IMPORT */

import useResource from '~/hooks/use_resource';
import type {ObservableReadonly, ObservableMaybe, Resource} from '~/types';

/* MAIN */

const usePromise = <T> ( promise: ObservableMaybe<Promise<T>> ): ObservableReadonly<Resource<T>> => {

  return useResource ( () => promise );

};

/* EXPORT */

export default usePromise;
