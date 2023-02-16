
/* IMPORT */

import useTruthy from '../hooks/use_truthy'
import { ternary, untrack } from 'oby'
import { isFunction } from '../utils/lang'
import type { Child, FunctionMaybe, ObservableReadonly, Truthy } from '../types'

/* MAIN */

const If = <T>({ when, fallback, children }: { when: FunctionMaybe<T>, fallback?: Child, children?: Child | ((value: (() => Truthy<T>)) => Child) }): ObservableReadonly<Child> => {

    if (isFunction(children) && children.length) { // Calling the children function with an (() => Truthy<T>)

        const truthy = useTruthy(when)

        return ternary(when, () => untrack(() => children(truthy)), fallback)

    } else { // Just passing the children along

        return ternary(when, () => untrack(children as Child), fallback) //TSC

    }

}

/* EXPORT */

export default If
