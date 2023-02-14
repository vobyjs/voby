
/* IMPORT */

import { ternary } from '../oby'
import type { Child, FunctionMaybe, ObservableReadonly } from '../types'

/* MAIN */

//TODO: Support function-form children

const Ternary = ({ when, children }: { when: FunctionMaybe<unknown>, children?: [Child, Child] }): ObservableReadonly<Child> => {

  return ternary(when, children[0], children[1])

}

/* EXPORT */

export default Ternary
