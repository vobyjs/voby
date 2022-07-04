
/* IMPORT */

import useResource from '~/hooks/use_resource';
import $$ from '~/methods/SS';
import type {FunctionMaybe, ObservableReadonly, Resource} from '~/types';

/* MAIN */

const usePromise = <T> ( promise: FunctionMaybe<Promise<T>> ): ObservableReadonly<Resource<T>> => {

  return useResource ( () => $$(promise) );

};

/* EXPORT */

export default usePromise;
