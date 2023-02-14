
/* IMPORT */

import { forIndex } from '../oby'
import type { Child, FunctionMaybe, ObservableReadonly } from '../types'

/* HELPERS */

type Indexed<T = unknown> = T extends ObservableReadonly<infer U> ? ObservableReadonly<U> : ObservableReadonly<T>

/* MAIN */

const ForIndex = <T>({ values, fallback, children }: { values: FunctionMaybe<readonly T[]>, fallback?: Child, children?: ((value: Indexed<T>, index: number) => Child) }): ObservableReadonly<Child> => {

  return forIndex(values, children, fallback)

}

/* EXPORT */

export default ForIndex
