
/* IMPORT */

import useRoot from '../hooks/use_root'
import type { Child } from '../types'
import { isFunction } from '../utils/lang'
import { setChild } from '../utils/setters.via'


/* MAIN */

const render = (child: Child, parent?: HTMLElement | null)/* : Disposer */ => {

    if (!parent || !(parent[Symbol.for("__isProxy")])) throw new Error('Invalid parent node')

    parent.textContent = ''

    return useRoot(dispose => {
        setChild(parent, child)

        return (): void => {
            if (isFunction(dispose))
                dispose()

            parent.textContent = ''
        }
    })
}
/* EXPORT */

export default render
