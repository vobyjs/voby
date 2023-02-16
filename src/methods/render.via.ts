
/* IMPORT */

import useRoot from '../hooks/use_root'
import { setChild } from '../utils/setters.via'
import type { Child, Disposer } from '../types'
import { isFunction } from '../utils/lang'


/* MAIN */

const render = (child: Child, parent?: Element | null)/* : Disposer */ => {

    if (!parent || !(parent[Symbol.for("__isProxy")])) throw new Error('Invalid parent node')

    parent.textContent = ''
    // setChild(parent as any, child)
    parent.appendChild(child as any)

    // return ((dispose) => {
    //     setChild(parent as any, child)

    //     return (): void => {

    //         if (isFunction(dispose))
    //             dispose()

    //         parent.textContent = ''

    //     }
    // }) as any
}

/* EXPORT */

export default render
