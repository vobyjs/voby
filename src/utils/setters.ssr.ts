
/* IMPORT */

import useMicrotask from '../hooks/use_microtask'
import useReaction from '../hooks/use_reaction'
import isObservable from '../methods/is_observable'
import isStore from '../methods/is_store'
import $$ from '../methods/SS'
import store from '../methods/store'
import untrack from '../methods/untrack'
import { context, with as _with } from 'oby'
import { SYMBOL_STORE_OBSERVABLE } from 'oby'
import { /* CallableAttributeStatic, */ CallableClassStatic, CallableClassBooleanStatic, CallablePropertyStatic, CallableStyleStatic, CallableStylesStatic } from '../utils/callables.ssr'
import { classesToggle } from '../utils/classlist.ssr'
import { createText } from '../utils/creators.ssr'
import { castArray, flatten, isArray, isBoolean, isFunction, isNil, isString, isSVG, isTemplateAccessor } from '../utils/lang'
import { resolveChild, resolveClass } from '../utils/resolvers.ssr'
import type { Child, Classes, DirectiveData, EventListener, Fragment, FunctionMaybe, ObservableMaybe, Ref, TemplateActionProxy } from '../types'

/* MAIN */

// const setAttributeStatic = (() => {

//     const attributesBoolean = new Set(['allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'controls', 'default', 'disabled', 'formnovalidate', 'hidden', 'indeterminate', 'ismap', 'loop', 'multiple', 'muted', 'nomodule', 'novalidate', 'open', 'playsinline', 'readonly', 'required', 'reversed', 'seamless', 'selected'])
//     const attributeCamelCasedRe = /e(r[HRWrv]|[Vawy])|Con|l(e[Tcs]|c)|s(eP|y)|a(t[rt]|u|v)|Of|Ex|f[XYa]|gt|hR|d[Pg]|t[TXYd]|[UZq]/ //URL: https://regex101.com/r/I8Wm4S/1
//     const attributesCache: Record<string, string> = {}
//     const uppercaseRe = /[A-Z]/g

//     const normalizeKeySvg = (key: string): string => {
//         return attributesCache[key] || (attributesCache[key] = attributeCamelCasedRe.test(key) ? key : key.replace(uppercaseRe, char => `-${char.toLowerCase()}`))
//     }

//     return <T, V>(props: T, key: string, value: V): void => {
//         if (isNil(value) || (value === false && attributesBoolean.has(key as any))) {
//             delete props[key]
//         } else {
//             value = ((value === true) ? '' : String(value)) as any
//             props[key] = value
//         }
//     }
// })()

// const setAttribute = <T, V>(props: T, key: string, value: FunctionMaybe<V>): void => {

//     if (isFunction(value)) {

//         if (isObservable(value)) {

//             new CallableAttributeStatic(value, props, key)

//         } else
//             useReaction(() => setAttributeStatic(props, key, value()))
//     } else
//         setAttributeStatic(props, key, value)
// }


const setChildStatic = (props: { children: any }, child: Child, dynamic?: boolean) => {
    if (!dynamic && child === undefined) return // Ignoring static undefined children, avoiding inserting some useless placeholder nodes

    if (Array.isArray(child)) {
        const children = (Array.isArray(child) ? child : [child]) as Node[] //TSC

        const cs = children.map(c => resolveChild(c)).flat(Infinity)

        props.children = cs
    }
    else { //if (isProxy(child)) { //TSC
        const c = resolveChild(child)
        try {
            //@ts-ignore
            props.children = [c].flat(Infinity) as any
        }
        catch (error) {
            debugger
        }
    }
}

const setChild = (props: { children: any }, child: Child) => {
    setChildStatic(props, child)
}

const setClassStatic = classesToggle

const setClass = (props: any, key: string, value: FunctionMaybe<null | undefined | boolean>): void => {

    if (isFunction(value)) {

        if (isObservable(value))
            new CallableClassStatic(value, props, key)
        else
            useReaction(() => setClassStatic(props, key, value()))
    } else
        setClassStatic(props, key, value)
}

const setClassBooleanStatic = <T>(props: T & { className: string, classList: any, }, value: boolean, key: null | undefined | boolean | string, keyPrev?: null | undefined | boolean | string): void => {
    if (keyPrev && keyPrev !== true)
        setClassStatic(props, keyPrev, false)
    if (key && key !== true)
        setClassStatic(props, key, value)
}

const setClassBoolean = (props: any, value: boolean, key: FunctionMaybe<null | undefined | boolean | string>): void => {
    if (isFunction(key)) {

        if (isObservable(key))
            new CallableClassBooleanStatic(key, props, value)
        else {
            let keyPrev: null | undefined | boolean | string

            useReaction(() => {
                const keyNext = key()
                setClassBooleanStatic(props, value, keyNext, keyPrev)
                keyPrev = keyNext
            })
        }
    } else
        setClassBooleanStatic(props, value, key)
}

const setClassesStatic = <T extends { children: any }, V>(props: T, key: string, object: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>, objectPrev?: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>): void => {
    if (isString(object))
        props[key] = object as any
    else {

        if (objectPrev) {

            if (isString(objectPrev)) {
                if (objectPrev)
                    props[key] = '' as any
            } else if (isArray(objectPrev)) {
                objectPrev = store(objectPrev, { unwrap: true })

                for (let i = 0, l = objectPrev.length; i < l; i++) {
                    if (!objectPrev[i]) continue
                    setClassBoolean(props, false, objectPrev[i])
                }
            } else {

                objectPrev = store(objectPrev, { unwrap: true })

                for (const key in objectPrev as any) {

                    if (object && key in (object as any)) continue

                    setClass(props, key, false)

                }

            }

        }

        if (isArray(object)) {

            if (isStore(object)) {

                for (let i = 0, l = object.length; i < l; i++) {

                    const fn = untrack(() => isFunction(object[i]) ? object[i] : object[SYMBOL_STORE_OBSERVABLE](String(i))) as (() => string | boolean | null | undefined) //TSC

                    setClassBoolean(props, true, fn)

                }

            } else {

                for (let i = 0, l = object.length; i < l; i++) {

                    if (!object[i]) continue

                    setClassBoolean(props, true, object[i])

                }

            }

        } else {

            if (isStore(object)) {

                for (const key in object as any) {

                    const fn = untrack(() => isFunction(object[key]) ? object[key] : (object as any)[SYMBOL_STORE_OBSERVABLE](key)) as (() => boolean | null | undefined) //TSC

                    setClass(props, key, fn)

                }

            } else {

                for (const key in object as any) {

                    setClass(props, key, object[key])

                }

            }

        }

    }

}

const setClasses = <T extends { children: any }, V>(props: T, key: string, object: Classes): void => {

    /* RECURSIVE IMPLEMENTATION */

    if (isFunction(object) || isArray(object)) {

        let objectPrev: Record<string, boolean> | undefined

        useReaction(() => {

            const objectNext = resolveClass(object)

            setClassesStatic(props, key, objectNext, objectPrev)

            objectPrev = objectNext

        })

    } else {

        setClassesStatic(props, key, object)

    }

    /* REGULAR IMPLEMENTATION */

    // if ( isFunction ( object ) ) {

    //   if ( isObservable ( object ) ) {

    //     new CallableClassesStatic ( object, element );

    //   } else {

    //     let objectPrev: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>;

    //     useReaction ( () => {

    //       const objectNext = object ();

    //       setClassesStatic ( element, objectNext, objectPrev );

    //       objectPrev = objectNext;

    //     });

    //   }

    // } else {

    //   setClassesStatic ( element, object );

    // }

}

// const setDirective = (() => {

//     const runWithSuperRoot = _with()

//     return <T extends unknown[]>(props: any, directive: string, args: T): void => {

//         const symbol = SYMBOLS_DIRECTIVES[directive] || Symbol()
//         const data = DIRECTIVE_OUTSIDE_SUPER_ROOT.current ? context<DirectiveData<T>>(symbol) : runWithSuperRoot(() => context<DirectiveData<T>>(symbol))

//         if (!data) throw new Error(`Directive "${directive}" not found`)

//         //@ts-ignore
//         const call = () => data.fn(props, ...castArray(args) as any) //TSC

//         //@ts-ignore
//         if (data.immediate) {

//             call()

//         } else {

//             useMicrotask(call)

//         }
//     }

// })()

// const setEventStatic = (() => {

//     //TODO: Maybe delegate more events: [onmousemove, onmouseout, onmouseover, onpointerdown, onpointermove, onpointerout, onpointerover, onpointerup, ontouchend, ontouchmove, ontouchstart]

//     const delegatedEvents = <const>{
//         onauxclick: ['_onauxclick', false],
//         onbeforeinput: ['_onbeforeinput', false],
//         onclick: ['_onclick', false],
//         ondblclick: ['_ondblclick', false],
//         onfocusin: ['_onfocusin', false],
//         onfocusout: ['_onfocusout', false],
//         oninput: ['_oninput', false],
//         onkeydown: ['_onkeydown', false],
//         onkeyup: ['_onkeyup', false],
//         onmousedown: ['_onmousedown', false],
//         onmouseup: ['_onmouseup', false]
//     }

//     const delegate = (event: string): void => {

//         const key = `_${event}`

//         via.document.addEventListener(event.slice(2), async event => {

//             const targets = event.composedPath()
//             const target = targets[0] || document

//             Object.defineProperty(event, 'currentTarget', {
//                 configurable: true,
//                 get() {
//                     return target
//                 }
//             })

//             for (let i = 0, l = targets.length; i < l; i++) {

//                 const handler = targets[i][key]

//                 if (!handler) continue

//                 handler(event)

//                 if (event.cancelBubble) break

//             }

//         })

//     }

//     return (props: any, event: string, value: null | undefined | EventListener): void => {

//         const delegated = delegatedEvents[event]

//         if (delegated) {

//             if (!delegated[1]) { // Not actually delegating yet

//                 delegated[1] = true

//                 delegate(event)

//             }

//             props[delegated[0]] = value

//         } else if (event.endsWith('passive')) {

//             const isCapture = event.endsWith('capturepassive')
//             const type = event.slice(2, -7 - (isCapture ? 7 : 0))
//             const key = `_${event}`

//             const valuePrev = props[key]

//             if (valuePrev) props.removeEventListener(type, valuePrev, { capture: isCapture })

//             if (value) props.addEventListener(type, value, { passive: true, capture: isCapture })

//             props[key] = value

//         } else if (event.endsWith('capture')) {

//             const type = event.slice(2, -7)
//             const key = `_${event}`

//             const valuePrev = props[key]

//             if (valuePrev) props.removeEventListener(type, valuePrev, { capture: true })

//             if (value) props.addEventListener(type, value, { capture: true })

//             props[key] = value

//         } else {

//             props[event] = value

//         }

//     }

// })()

// const setEvent = (props: any, event: string, value: ObservableMaybe<null | undefined | EventListener>): void => {

//     if (isObservable(value))
//         new CallableEventStatic(value, props, event)
//     else
//         setEventStatic(props, event, value)
// }

const setHTMLStatic = (props: any, value: null | undefined | number | string): void => {
    props.children = String(isNil(value) ? '' : value)
}

const setHTML = (props: any, value: FunctionMaybe<{ __html: FunctionMaybe<null | undefined | number | string> }>): void => {
    useReaction(() => setHTMLStatic(props, $$($$(value).__html)))
}

/**
 *
 * @param props
 * @param key
 * @param value
 */
const setPropertyStatic = <T, V>(props: T, key: string, value: V): void => {

    if (key === 'tabIndex' && isBoolean(value))
        value = (value ? 0 : undefined) as any

    props[key] = value

    // if (isNil(value))
    //     setAttributeStatic(props, key, null)
}

const setProperty = <T, V>(props: T, key: string, value: FunctionMaybe<null | undefined | boolean | number | string>): void => {
    if (isFunction(value))
        if (isObservable(value))
            new CallablePropertyStatic(value as any, props, key)
        else
            useReaction(() => setPropertyStatic(props, key, value() as any))
    else
        setPropertyStatic(props, key, value)
}

const setRef = <T>(element: T, value: null | undefined | Ref<T> | (null | undefined | Ref<T>)[]): void => { // Scheduling a microtask to dramatically increase the probability that the element will get connected to the DOM in the meantime, which would be more convenient

    if (isNil(value)) return

    const values = flatten(castArray(value))

    useMicrotask(() => values.forEach(value => value?.(element)))

}

const setStyleStatic = (() => {
    // From Preact: https://github.com/preactjs/preact/blob/e703a62b77c9de45e886d8a7f59bd0db658318f9/src/constants.js#L3
    // const propertyNonDimensionalRe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    // From this Preact issue: https://github.com/preactjs/preact/issues/2607
    const propertyNonDimensionalRe = /^(-|f[lo].*[^se]$|g.{5,}[^ps]$|z|o[pr]|(W.{5})?[lL]i.*(t|mp)$|an|(bo|s).{4}Im|sca|m.{6}[ds]|ta|c.*[st]$|wido|ini)/i
    const propertyNonDimensionalCache: Partial<Record<string, boolean>> = {}

    return <S, T extends { style: S }, V>(props: T, key: string, value: V): void => {
        if (!props.style) props.style = {} as S

        if ((key as string).charCodeAt(0) === 45) { // /^-/
            if (isNil(value))
                delete props.style[key]
            else
                props.style[key] = String(value) as any
        } else if (isNil(value))
            props.style[key] = null
        else
            props.style[key] = ((isString(value) || (propertyNonDimensionalCache[key as any] ||= propertyNonDimensionalRe.test(key as any)) ? value : `${value}px`)) as any
    }
})()

const setStyle = <T extends { style: any }, K extends keyof T, V extends T[K]>(props: T, key: string, value: FunctionMaybe<V>): void => {
    if (isFunction(value))
        if (isObservable(value))
            new CallableStyleStatic(value as any, props, key)
        else
            useReaction(() => {
                const v = value()
                setStyleStatic(props, key, value())
            })
    else
        setStyleStatic(props, key, value)
}

const setStylesStatic = <S extends { cssText: string }, T extends { style: S | string }, K extends keyof T, V extends T[K]>(props: T, object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>): void => {

    if (isString(object))
        props.style = object
    else {
        if (objectPrev) {
            if (isString(objectPrev)) {
                if (objectPrev)
                    (props.style as S).cssText = ''
            } else {
                objectPrev = store(objectPrev, { unwrap: true })

                for (const key in objectPrev as Record<string, FunctionMaybe<null | undefined | number | string>>) {

                    if (object && key in (object as Record<string, FunctionMaybe<null | undefined | number | string>>)) continue

                    setStyleStatic(props, key as any, null)

                }
            }
        }

        if (isStore(object))
            for (const key in object) {
                const fn = untrack(() => isFunction(object[key]) ? object[key] : (object as any)[SYMBOL_STORE_OBSERVABLE](key)) as (() => number | string | null | undefined) //TSC

                setStyle(props, key as any, fn as any)
            }
        else
            for (const key in object)
                setStyle(props, key as any, object[key] as any)
    }

}

const setStyles = <T, V>(props: T, object: FunctionMaybe<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>>): void => {
    if (isFunction(object)) {

        if (isObservable(object))
            new CallableStylesStatic(object, props as any)
        else {
            let objectPrev: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>

            useReaction(() => {

                const objectNext = object()

                setStylesStatic(props as any, objectNext, objectPrev)

                objectPrev = objectNext

            })

        }

    } else
        setStylesStatic(props as any, object)
}

// const setTemplateAccessor = <T, K extends keyof T, V extends T[K]> (props: T, key: K, value: TemplateActionProxy): void => {

//     if (key === 'children') {

//         const placeholder = createText('') // Using a Text node rather than a Comment as the former may be what we actually want ultimately

//         props.insertBefore(placeholder, null)

//         value(props, 'setChildReplacement', undefined, placeholder)

//     } else if (key === 'ref') {

//         value(props, 'setRef')

//     } else if (key === 'style') {

//         value(props, 'setStyles')

//     } else if (key === 'class') {

//         if (!isSVG(props)) {

//             props.className = '' // Ensuring the attribute is present

//         }

//         value(props, 'setClasses')

//     } else if (key === 'dangerouslySetInnerHTML') {

//         value(props, 'setHTML')

//     } else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110) { // /^on/

//         value(props, 'setEvent', key.toLowerCase())

//     } else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58) { // /^u..:/

//         value(props, 'setDirective', key.slice(4))

//     } else if (key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' || key === 'className') {

//         // Forbidden props

//     } else if (key in props && !isSVG(props)) {

//         value(props, 'setProperty', key)

//     } else {
//         props.setAttribute(key, '') // Ensuring the attribute is present
//         value(props, 'setAttribute', key)
//     }
// }

const setProp = <T extends { children: any }, V>(props: T, key: string, value: V): void => {
    // if (isTemplateAccessor(value))
    //     setTemplateAccessor(props, key, value)
    //else
    if (key === 'children')
        setChild(props, value as any)
    else if (key === 'ref')
        setRef(props, value as any)
    else if (key === 'style')
        setStyles(props, value as any)
    else if (key === 'class' || key === 'className')
        setClasses(props, key, value as any)
    else if (key === 'dangerouslySetInnerHTML')
        setHTML(props, value as any)
    else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110)  // /^on/
    {
        //strip event

        // setEvent(props, key.toLowerCase(), value)
        // $.root(() => props.addEventListener(key.substring(2).toLowerCase(), value as any))
    }
    else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58)  // /^u..:/
    {
        // setDirective(props, key.slice(4), value as any)
    }
    else if (key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' || key === 'className') {
        // Forbidden props
    } else //if (key in props)
        setProperty(props, key, value as any)
    // else
    //     setAttribute(props, key, value as any)
}

const setProps = (props: any, object: Record<string, unknown>): void => {
    for (const key in object)
        setProp(props, key, object[key])
}

/* EXPORT */

export { /* setAttributeStatic, setAttribute, setChildReplacementFunction, */ /* setChildReplacementText, setChildReplacement, */ setChildStatic, setChild, setClassStatic, setClass, setClassBooleanStatic, setClassesStatic, setClasses, /* setEventStatic, setEvent,  */setHTMLStatic, setHTML, setPropertyStatic, setProperty, setRef, setStyleStatic, setStyle, setStylesStatic, setStyles, /* setTemplateAccessor, */ setProp, setProps }
