
/* IMPORT */

import { SYMBOL_UNTRACKED_UNWRAPPED } from '../constants'

/* MAIN */

const wrapElement = <T extends Function>(element: T): T => {

    element[SYMBOL_UNTRACKED_UNWRAPPED] = true

    return element

}

/* EXPORT */

export default wrapElement
