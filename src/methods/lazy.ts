
/* IMPORT */

import useMemo from '../hooks/use_memo'
import useResolved from '../hooks/use_resolved'
import useResource from '../hooks/use_resource'
import creatElement from '../methods/create_element'
import resolve from '../methods/resolve'
import { once } from '../utils/lang'
import type { Child, LazyFetcher, LazyResult, ObservableReadonly } from '../types'

/* MAIN */

const lazy = <P = {}>(fetcher: LazyFetcher<P>): LazyResult<P> => {

    const fetcherOnce = once(fetcher)

    const component = (props: P): ObservableReadonly<Child> => {

        const resource = useResource(fetcherOnce)

        return useMemo(() => {

            return useResolved(resource, ({ pending, error, value }) => {

                if (pending) return

                if (error) throw error

                const component = ('default' in value) ? value.default : value

                return resolve(creatElement<P>(component, props))

            })

        })

    }

    component.preload = (): Promise<void> => {

        return new Promise<void>((resolve, reject) => {

            const resource = useResource(fetcherOnce)

            useResolved(resource, ({ pending, error }) => {

                if (pending) return

                if (error) return reject(error)

                return resolve()

            })

        })

    }

    return component

}

/* EXPORT */

export default lazy
