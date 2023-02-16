
/* IMPORT */

import useDisposed from '../hooks/use_disposed'
import { with as _with } from 'oby'
import type { Callback } from '../types'

/* MAIN */

const useMicrotask = (fn: Callback): void => {

    const disposed = useDisposed()
    const runWithOwner = _with()

    queueMicrotask(() => {

        if (disposed()) return

        runWithOwner(fn)

    })

}

/* EXPORT */

export default useMicrotask
