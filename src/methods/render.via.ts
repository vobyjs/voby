
/* IMPORT */

import useRoot from '../hooks/use_root'
import type { Child } from '../types'
import { isFunction } from '../utils/lang'
import effect from '../hooks/use_effect'


/* MAIN */

const render = (child: Child, parent?: Element | null)/* : Disposer */ => {

    if (!parent || !(parent[Symbol.for("__isProxy")])) throw new Error('Invalid parent node')

    parent.textContent = ''

    return useRoot(dispose => {
        effect(() => {
            parent.replaceChildren(child as any)
        })

        return (): void => {
            if (isFunction(dispose))
                dispose()

            parent.textContent = ''
        }
    })
}
/* EXPORT */

export default render
