
/* IMPORT */

import { DIRECTIVE_OUTSIDE_SUPER_ROOT, HMR, SYMBOLS_DIRECTIVES, SYMBOL_UNCACHED } from '../constants'
import useMicrotask from '../hooks/use_microtask'
import useReaction from '../hooks/use_reaction'
import isObservable from '../methods/is_observable'
import isStore from '../methods/is_store'
import $$ from '../methods/SS'
import store from '../methods/store'
import untrack from '../methods/untrack'
import { context, with as _with } from 'oby'
import { SYMBOL_STORE_OBSERVABLE } from 'oby'
import { CallableAttributeStatic, CallableClassStatic, CallableClassBooleanStatic, CallableEventStatic, CallablePropertyStatic, CallableStyleStatic, CallableStylesStatic } from '../utils/callables.via'
import { classesToggle } from '../utils/classlist'
import { createText } from '../utils/creators'
import { castArray, flatten, isArray, isBoolean, isFunction, isNil, isProxy, isString, isSVG, isTemplateAccessor } from '../utils/lang'
import { resolveChild, resolveClass } from '../utils/resolvers.via'
import type { Child, Classes, DirectiveData, EventListener, Fragment, FunctionMaybe, ObservableMaybe, Ref, TemplateActionProxy } from '../types'
import { __ArgsSymbol } from 'via'
import { IsSvgSymbol } from '../methods/create_element.via'


// import createElement from '../methods/create_element.via'

/* MAIN */


const debugHTML = (p: HTMLElement, name: string) => {
    if (p)
        (async () => {
            const nn = await get(p.nodeName)
            const nt = await get(p.nodeType)
            const html = await get(p.outerHTML)
            console.log(name, p, nn, nt, html)
        })()
}

const setAttributeStatic = (() => {

    const attributesBoolean = new Set(['allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'controls', 'default', 'disabled', 'formnovalidate', 'hidden', 'indeterminate', 'ismap', 'loop', 'multiple', 'muted', 'nomodule', 'novalidate', 'open', 'playsinline', 'readonly', 'required', 'reversed', 'seamless', 'selected'])
    // const attributeCamelCasedRe = /e(r[HRWrv]|[Vawy])|Con|l(e[Tcs]|c)|s(eP|y)|a(t[rt]|u|v)|Of|Ex|f[XYa]|gt|hR|d[Pg]|t[TXYd]|[UZq]/ //URL: https://regex101.com/r/I8Wm4S/1
    // const attributesCache: Record<string, string> = {}
    // const uppercaseRe = /[A-Z]/g

    // const normalizeKeySvg = (key: string): string => {

    //     return attributesCache[key] || (attributesCache[key] = attributeCamelCasedRe.test(key) ? key : key.replace(uppercaseRe, char => `-${char.toLowerCase()}`))

    // }

    return (element: HTMLElement, key: string, value: null | undefined | boolean | number | string): void => {

        // put in via
        // if (isSVG(element) && !isProxy(element)) {

        //     key = (key === 'xlinkHref' || key === 'xlink:href') ? 'href' : normalizeKeySvg(key)

        //     if (isNil(value) || ((value === false) && attributesBoolean.has(key))) {

        //         element.removeAttribute(key)

        //     } else {
        //         element.setAttribute(key, String(value))
        //     }

        // } else {

        if (isNil(value) || (value === false && attributesBoolean.has(key))) {

            element.removeAttribute(key)

        } else {
            value = (value === true) ? '' : String(value)
            element.setAttribute(key, value)
        }
        // }
    }

})()

const setAttribute = (element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | boolean | number | string>): void => {

    if (isFunction(value)) {

        if (isObservable(value)) {

            new CallableAttributeStatic(value, element, key)

        } else {

            useReaction(() => {

                setAttributeStatic(element, key, value())

            })

        }

    } else {

        setAttributeStatic(element, key, value)

    }

}

const setChildStatic = (parent: HTMLElement, child: Child, dynamic?: boolean) => {

    if (!dynamic && child === undefined) return // Ignoring static undefined children, avoiding inserting some useless placeholder nodes

    if (Array.isArray(child)) {
        const children = (Array.isArray(child) ? child : [child]) as Node[] //TSC

        const cs: any[] = children.map(c => resolveChild(c)).flat(Infinity)
        parent.replaceChildren(...cs)
    }
    else {
        const c = resolveChild(child)
        // debugHTML(parent, "setChildStatic")
        //@ts-ignore
        parent.replaceChildren(...[c].flat(Infinity) as any)
    }
}

const setChild = (parent: HTMLElement, child: Child) => {
    setChildStatic(parent, child)
}

const setClassStatic = classesToggle

const setClass = (element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | boolean>): void => {

    if (isFunction(value)) {

        if (isObservable(value)) {

            new CallableClassStatic(value, element, key)

        } else {

            useReaction(() => {

                setClassStatic(element, key, value())

            })

        }

    } else {

        setClassStatic(element, key, value)

    }

}

const setClassBooleanStatic = (element: HTMLElement, value: boolean, key: null | undefined | boolean | string, keyPrev?: null | undefined | boolean | string): void => {

    if (keyPrev && keyPrev !== true) {

        setClassStatic(element, keyPrev, false)

    }

    if (key && key !== true) {

        setClassStatic(element, key, value)

    }

}

const setClassBoolean = (element: HTMLElement, value: boolean, key: FunctionMaybe<null | undefined | boolean | string>): void => {

    if (isFunction(key)) {

        if (isObservable(key)) {

            new CallableClassBooleanStatic(key, element, value)

        } else {

            let keyPrev: null | undefined | boolean | string

            useReaction(() => {

                const keyNext = key()

                setClassBooleanStatic(element, value, keyNext, keyPrev)

                keyPrev = keyNext

            })

        }

    } else {

        setClassBooleanStatic(element, value, key)

    }

}

const setClassesStatic = (element: HTMLElement, object: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>, objectPrev?: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>): void => {

    if (isString(object)) {

        if (isSVG(element)) {

            element.setAttribute('class', object as string)

        } else {

            element.className = object

        }

    } else {

        if (objectPrev) {

            if (isString(objectPrev)) {

                if (objectPrev) {

                    if (isSVG(element)) {

                        element.setAttribute('class', '')

                    } else {

                        element.className = ''

                    }

                }

            } else if (isArray(objectPrev)) {

                objectPrev = store(objectPrev, { unwrap: true })

                for (let i = 0, l = objectPrev.length; i < l; i++) {

                    if (!objectPrev[i]) continue

                    setClassBoolean(element, false, objectPrev[i])

                }

            } else {

                objectPrev = store(objectPrev, { unwrap: true })

                for (const key in objectPrev as any) {

                    if (object && key in (object as any)) continue

                    setClass(element, key, false)

                }

            }

        }

        if (isArray(object)) {

            if (isStore(object)) {

                for (let i = 0, l = object.length; i < l; i++) {

                    const fn = untrack(() => isFunction(object[i]) ? object[i] : (object[SYMBOL_STORE_OBSERVABLE] as Function)(String(i))) as (() => string | boolean | null | undefined) //TSC

                    setClassBoolean(element, true, fn)

                }

            } else {

                for (let i = 0, l = object.length; i < l; i++) {

                    if (!object[i]) continue

                    setClassBoolean(element, true, object[i])

                }

            }

        } else {

            if (isStore(object)) {

                for (const key in object as any) {

                    const fn = untrack(() => isFunction(object[key]) ? object[key] : (object as any)[SYMBOL_STORE_OBSERVABLE](key)) as (() => boolean | null | undefined) //TSC

                    setClass(element, key, fn)

                }

            } else {

                for (const key in object as any) {

                    setClass(element, key, object[key])

                }

            }

        }

    }

}

const setClasses = (element: HTMLElement, object: Classes): void => {

    /* RECURSIVE IMPLEMENTATION */

    if (isFunction(object) || isArray(object)) {

        let objectPrev: Record<string, boolean> | undefined

        useReaction(() => {

            const objectNext = resolveClass(object)

            setClassesStatic(element, objectNext, objectPrev)

            objectPrev = objectNext

        })

    } else {

        setClassesStatic(element, object)

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

const setDirective = (() => {

    const runWithSuperRoot = _with()

    return <T extends unknown[]>(element: HTMLElement, directive: string, args: T): void => {

        const symbol = SYMBOLS_DIRECTIVES[directive] || Symbol()
        const data = DIRECTIVE_OUTSIDE_SUPER_ROOT.current ? context<DirectiveData<T>>(symbol) : runWithSuperRoot(() => context<DirectiveData<T>>(symbol))

        if (!data) throw new Error(`Directive "${directive}" not found`)

        //@ts-ignore
        const call = () => data.fn(element, ...castArray(args) as any) //TSC

        //@ts-ignore
        if (data.immediate) {

            call()

        } else {

            useMicrotask(call)

        }

    }

})()

const setEventStatic = (() => {

    //TODO: Maybe delegate more events: [onmousemove, onmouseout, onmouseover, onpointerdown, onpointermove, onpointerout, onpointerover, onpointerup, ontouchend, ontouchmove, ontouchstart]

    // const delegatedEvents = <const>{
    //     onauxclick: ['_onauxclick', false],
    //     onbeforeinput: ['_onbeforeinput', false],
    //     onclick: ['_onclick', false],
    //     ondblclick: ['_ondblclick', false],
    //     onfocusin: ['_onfocusin', false],
    //     onfocusout: ['_onfocusout', false],
    //     oninput: ['_oninput', false],
    //     onkeydown: ['_onkeydown', false],
    //     onkeyup: ['_onkeyup', false],
    //     onmousedown: ['_onmousedown', false],
    //     onmouseup: ['_onmouseup', false]
    // }

    // const delegate = (event: string): void => {

    //     const key = `_${event}`

    //     via.document.addEventListener(event.slice(2), async event => {

    //         const targets = event.composedPath()
    //         const target = targets[0] || document

    //         Object.defineProperty(event, 'currentTarget', {
    //             configurable: true,
    //             get() {
    //                 return target
    //             }
    //         })

    //         for (let i = 0, l = targets.length; i < l; i++) {

    //             const handler = targets[i][key]

    //             if (!handler) continue

    //             handler(event)

    //             if (event.cancelBubble) break
    //         }
    //     })
    // }

    let preId = 0

    return (element: HTMLElement, event: string, value: null | undefined | EventListener): void => {

        // const delegated = delegatedEvents[event]

        // if (delegated) {

        //     if (!delegated[1]) { // Not actually delegating yet

        //         delegated[1] = true

        //         delegate(event)

        //     }

        //     element[delegated[0]] = value

        // } else
        // if (event.endsWith('passive')) {

        //     const isCapture = event.endsWith('capturepassive')
        //     const type = event.slice(0, -7 - (isCapture ? 7 : 0)) //on already chopped
        //     const key = `_${event}`

        //     if (preId) {
        //         const valuePrev = self.Via.getIdToCallback(preId)
        //         element.removeEventListener(type, valuePrev as any, { capture: isCapture })
        //     }

        //     if (value) {
        //         const f = element.addEventListener
        //         f(type, value, { passive: true, capture: isCapture })
        //         preId = f[__ArgsSymbol][1]
        //     }

        //     element[key] = value

        // } else if (event.endsWith('capture')) {

        //     const type = event.slice(0, -7) //on already chopped
        //     const key = `_${event}`

        //     if (preId) {
        //         console.log('removeEventListener preId ', preId)
        //         const valuePrev = self.Via.getIdToCallback(preId)
        //         element.removeEventListener(type, valuePrev as any, { capture: true })
        //     }

        //     if (value) {
        //         const f = element.addEventListener
        //         f(type, value, { capture: true })
        //         preId = f[__ArgsSymbol][1]
        //     }

        //     element[key] = value

        // } else {
        //     if (preId) {
        //         const valuePrev = self.Via.getIdToCallback(preId)
        //         element.removeEventListener(event, valuePrev as any)
        //     }

        //     if (value) {
        //         const f = element.addEventListener
        //         f(event, value)
        //         preId = f[__ArgsSymbol][1]
        //     }

        //     element[event] = value
        // }

        // const valuePrev = element[event]

        // if (valuePrev) element.removeEventListener(event, valuePrev)

        // if (value) element.addEventListener(event, value)

        element[event] = value
    }

})()

const setEvent = (element: HTMLElement, event: string, value: ObservableMaybe<null | undefined | EventListener>): void => {
    if (isObservable(value)) {

        new CallableEventStatic(value as any, element, event)

    } else {

        setEventStatic(element, event, value)

    }

}

const setHTMLStatic = (element: HTMLElement, value: null | undefined | number | string): void => {

    element.innerHTML = String(isNil(value) ? '' : value)

}

const setHTML = (element: HTMLElement, value: FunctionMaybe<{ __html: FunctionMaybe<null | undefined | number | string> }>): void => {

    useReaction(() => {

        setHTMLStatic(element, $$($$(value).__html))

    })

}

const setPropertyStatic = (element: HTMLElement, key: string, value: null | undefined | boolean | number | string): void => {

    if (key === 'tabIndex' && isBoolean(value)) {

        value = value ? 0 : undefined

    }

    if (key === 'value' && element.tagName === 'SELECT' && !element['_$inited']) {

        element['_$inited'] = true

        queueMicrotask(() => element[key] = value)
    }

    element[key] = value

    // if (isNil(value)) {
    //     setAttributeStatic(element, key, null)
    // }

}

const setProperty = (element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | boolean | number | string>): void => {

    if (isFunction(value)) {

        if (isObservable(value)) {

            new CallablePropertyStatic(value as any, element, key)

        } else {

            useReaction(() => {

                setPropertyStatic(element, key, value() as any)

            })

        }

    } else {

        setPropertyStatic(element, key, value)

    }

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

    return (element: HTMLElement, key: string, value: null | undefined | number | string): void => {
        if (key.charCodeAt(0) === 45) { // /^-/
            if (isNil(value))
                element.style.removeProperty(key)
            else
                element.style.setProperty(key, String(value))

        } else if (isNil(value))
            element.style[key] = null
        else
            element.style[key] = (isString(value) || (propertyNonDimensionalCache[key] ||= propertyNonDimensionalRe.test(key)) ? value : `${value}px`)

    }
})()

const setStyle = (element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | number | string>): void => {

    if (isFunction(value)) {

        if (isObservable(value)) {

            new CallableStyleStatic(value, element, key)

        } else {

            useReaction(() => {
                const v = value()
                setStyleStatic(element, key, value())

            })

        }

    } else {

        setStyleStatic(element, key, value)

    }

}

const setStylesStatic = (element: HTMLElement, object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>): void => {

    if (isString(object)) {
        element.setAttribute('style', object)
    } else {

        if (objectPrev) {

            if (isString(objectPrev)) {

                if (objectPrev) {

                    element.style.cssText = ''

                }

            } else {

                objectPrev = store(objectPrev, { unwrap: true })

                for (const key in objectPrev as Record<string, FunctionMaybe<null | undefined | number | string>>) {

                    if (object && key in (object as Record<string, FunctionMaybe<null | undefined | number | string>>)) continue

                    setStyleStatic(element, key, null)

                }

            }

        }

        if (isStore(object)) {

            for (const key in object) {

                const fn = untrack(() => isFunction(object[key]) ? object[key] : (object as any)[SYMBOL_STORE_OBSERVABLE](key)) as (() => number | string | null | undefined) //TSC

                setStyle(element, key, fn)

            }

        } else {

            for (const key in object) {

                setStyle(element, key, object[key])

            }

        }

    }

}

const setStyles = (element: HTMLElement, object: FunctionMaybe<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>>): void => {

    if (isFunction(object)) {

        if (isObservable(object)) {

            new CallableStylesStatic(object, element)

        } else {

            let objectPrev: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>

            useReaction(() => {

                const objectNext = object()

                setStylesStatic(element, objectNext, objectPrev)

                objectPrev = objectNext

            })

        }

    } else {

        setStylesStatic(element, object)

    }

}

const setTemplateAccessor = async (element: HTMLElement, key: string, value: TemplateActionProxy): Promise<void> => {

    if (key === 'children') {

        const placeholder = createText('') // Using a Text node rather than a Comment as the former may be what we actually want ultimately

        element.insertBefore(placeholder, null)

        value(element, 'setChildReplacement', undefined, placeholder)

    } else if (key === 'ref') {

        value(element, 'setRef')

    } else if (key === 'style') {

        value(element, 'setStyles')

    } else if (key === 'class') {

        if (!isSVG(element)) {

            element.className = '' // Ensuring the attribute is present

        }

        value(element, 'setClasses')

    } else if (key === 'dangerouslySetInnerHTML') {

        value(element, 'setHTML')

    } else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110) { // /^on/

        value(element, 'setEvent', key.toLowerCase())

    } else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58) { // /^u..:/

        value(element, 'setDirective', key.slice(4))

    } else if (key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' || key === 'className') {

        // Forbidden props

    } else if (key in element && !isSVG(element)) {

        value(element, 'setProperty', key)

    } else {
        element.setAttribute(key, '') // Ensuring the attribute is present
        value(element, 'setAttribute', key)
    }
}

const setProp = <T>(element: HTMLElement, key: string, value: T): void => {
    if (isTemplateAccessor(value))
        setTemplateAccessor(element, key, value)

    else if (key === 'children')
        setChild(element, value as any)
    else if (key === 'ref')
        setRef(element, value as any)
    else if (key === 'style')
        setStyles(element, value as any)
    else if (key === 'class')
        setClasses(element, value as any)
    else if (key === 'dangerouslySetInnerHTML')
        setHTML(element, value as any)
    else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110)  // /^on/
        setEvent(element, key.toLowerCase(), value as any)
    // $.root(() => element.addEventListener(key.substring(2).toLowerCase(), value as any))
    else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58)  // /^u..:/
        setDirective(element, key.slice(4), value as any)
    else if (key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' || key === 'className') {
        // Forbidden props
    } else {//if (key in element && !isSVG(element))
        setProperty(element, key, value as any)
        // else
        setAttribute(element, key, value as any)
    }
}

const setProps = (element: HTMLElement, object: Record<string, unknown>): void => {
    const { children, ...pp } = object

    //set children 1st, in case value refer to children
    // if (typeof children !== 'undefined')
    setProp(element, 'children', children)

    for (const key in pp)
        setProp(element, key, object[key])
}

/* EXPORT */

export { setAttributeStatic, setAttribute, /* setChildReplacementFunction, */ /* setChildReplacementText, setChildReplacement, */ setChildStatic, setChild, setClassStatic, setClass, setClassBooleanStatic, setClassesStatic, setClasses, setEventStatic, setEvent, setHTMLStatic, setHTML, setPropertyStatic, setProperty, setRef, setStyleStatic, setStyle, setStylesStatic, setStyles, setTemplateAccessor, setProp, setProps }
