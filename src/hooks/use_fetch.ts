
/* IMPORT */

import useAbortSignal from '../hooks/use_abort_signal'
import useResolved from '../hooks/use_resolved'
import useResource from '../hooks/use_resource'
import type { FunctionMaybe, Resource } from '../types'

/* MAIN */

const useFetch = (request: FunctionMaybe<RequestInfo>, init?: FunctionMaybe<RequestInit>): Resource<Response> => {

    return useResource(() => {

        return useResolved([request, init], (request, init = {}) => {

            const signal = useAbortSignal(init.signal || [])

            init.signal = signal

            return fetch(request, init)

        })

    })

}

/* EXPORT */

export default useFetch
