
/* IMPORT */

import { SYMBOL_TEMPLATE_ACCESSOR } from '../constants'
import type { Falsy, TemplateActionProxy, Truthy } from '../types'

/* MAIN */

const { assign } = Object

const castArray = <T>(value: T[] | T): T[] => {

    return isArray(value) ? value : [value]

}

const castError = (exception: unknown): Error => {

    if (isError(exception)) return exception

    if (isString(exception)) return new Error(exception)

    return new Error('Unknown error')

}

const flatten = <T>(arr: T[]) => {

    for (let i = 0, l = arr.length; i < l; i++) {

        if (!isArray(arr[i])) continue

        return arr.flat(Infinity)

    }

    return arr

}

const indexOf = (() => {

    const _indexOf = Array.prototype.indexOf

    return <T>(arr: ArrayLike<unknown>, value: T): number => {

        return _indexOf.call(arr, value)

    }

})()

const { isArray } = Array

const isBoolean = (value: unknown): value is boolean => {

    return typeof value === 'boolean'

}

const isError = (value: unknown): value is Error => {

    return value instanceof Error

}

const isFalsy = <T>(value: T): value is Falsy<T> => {

    return !value

}

const isFunction = <R,>(value: unknown): value is ((...args: any[]) => R) => {

    return typeof value === 'function'

}

const isNil = (value: unknown): value is null | undefined => {

    return value === null || value === undefined

}

const isNode = (value: unknown): value is Node => {

    return value instanceof Node

}

const isPromise = (value: unknown): value is Promise<unknown> => {

    return value instanceof Promise

}

const isProxy = (proxy): proxy is typeof Proxy => {
    return proxy == null ? false : !!proxy[Symbol.for("__isProxy")]
}

const isString = (value: unknown): value is string => {

    return typeof value === 'string'

}

const isSVG = (value: Element): value is SVGElement => {

    return !!value['isSVG']

}

const isSVGElement = (() => {

    const svgRe = /^(t(ext$|s)|s[vwy]|g)|^set|tad|ker|p(at|s)|s(to|c$|ca|k)|r(ec|cl)|ew|us|f($|e|s)|cu|n[ei]|l[ty]|[GOP]/ //URL: https://regex101.com/r/Ck4kFp/1
    const svgCache = {}

    return (element: string): boolean => {

        const cached = svgCache[element]

        return (cached !== undefined) ? cached : (svgCache[element] = !element.includes('-') && svgRe.test(element))

    }

})()

const isTemplateAccessor = (value: unknown): value is TemplateActionProxy => {

    return isFunction(value) && (SYMBOL_TEMPLATE_ACCESSOR in value)

}

const isTruthy = <T>(value: T): value is Truthy<T> => {

    return !!value

}

const isVoidChild = (value: unknown): value is null | undefined | symbol | boolean => {

    return value === null || value === undefined || typeof value === 'boolean' || typeof value === 'symbol'

}

const noop = (): void => { }

const once = <T>(fn: () => T): (() => T) => {

    let called = false
    let result: T

    return (): T => {

        if (!called) {

            called = true
            result = fn()

        }

        return result

    }

}

/* EXPORT */

export { assign, castArray, castError, flatten, indexOf, isArray, isBoolean, isError, isFalsy, isFunction, isNil, isNode, isPromise, isProxy, isString, isSVG, isSVGElement, isTemplateAccessor, isTruthy, isVoidChild, noop, once }
