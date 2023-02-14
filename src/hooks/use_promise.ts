
/* IMPORT */

import useResource from '../hooks/use_resource'
import $$ from '../methods/SS'
import type { FunctionMaybe, Resource } from '../types'

/* MAIN */

const usePromise = <T>(promise: FunctionMaybe<Promise<T>>): Resource<T> => {

    return useResource(() => $$(promise))

}

/* EXPORT */

export default usePromise
