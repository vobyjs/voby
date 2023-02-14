
/* IMPORT */

import useMemo from '../hooks/use_memo'
import $ from '../methods/S'

/* MAIN */

//TODO: Maybe port something like this to oby

const useLazyMemo = <T>(fn: () => T): (() => T) => {

    const sleeping = $(true)

    const memo = useMemo(() => {

        if (sleeping()) return

        return fn()

    })

    return (): T => {

        sleeping(false)

        return memo()!

    }

}

/* EXPORT */

export default useLazyMemo
