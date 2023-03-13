
/* IMPORT */

import { SYMBOL_OBSERVABLE, SYMBOL_OBSERVABLE_FROZEN } from '../constants'
import useCleanup from '../hooks/use_cleanup'
import untrack from '../methods/untrack'
import { on, off } from 'oby'
import { setAttributeStatic, setChildStatic, setClassStatic, setClassBooleanStatic, setClassesStatic, setEventStatic, setPropertyStatic, setStyleStatic, setStylesStatic } from '../utils/setters.via'
import type { Child, EventListener, Fragment, FunctionMaybe, ObservableReadonly } from '../types'

/* HELPERS */

const target = <T>(observable: ObservableReadonly<T>): ObservableReadonly<T> => (SYMBOL_OBSERVABLE_FROZEN in observable) ? observable : (observable as any)(SYMBOL_OBSERVABLE) //TSC

/* MAIN */

// These classes exist mainly as a memory-usage optimization, as they sometimes avoid keeping some functions in memory

abstract class Callable<T> {

    /* VARIABLES */

    protected observable: ObservableReadonly<T>

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<T>) {

        this.observable = target(observable)

    }

    /* API */

    init(observable: ObservableReadonly<T>): void {

        on(this.observable, this)

        this.call(observable, untrack(observable))

        useCleanup(this)

    }

    call(...args: any[]): void {

        if (args.length === 1) {

            this.cleanup()

        } else {

            this.update(args[1], args[2])

        }

    }

    cleanup(): void {

        off(this.observable, this)

    }

    abstract update(value: T, valuePrev?: T): void

}

const debugHTML = (p: HTMLElement, name: string) => {
    if (p)
        (async () => {
            const nn = await get(p.nodeName)
            const nt = await get(p.nodeType)
            const html = await get(p.parentElement.outerHTML)
            console.log(name, p, nn, nt, html)
        })()
}

class CallableAttributeStatic extends Callable<null | undefined | boolean | number | string> {

    /* VARIABLES */

    private element: HTMLElement
    private key: string

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | boolean | number | string>, element: HTMLElement, key: string) {

        super(observable)

        this.element = element
        this.key = key

        this.init(observable)
    }

    /* API */

    update(value: null | undefined | boolean | number | string): void {
        setAttributeStatic(this.element, this.key, value)
    }
}

class CallableChildStatic extends Callable<Child> {

    /* VARIABLES */


    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<Child>, private parent: HTMLElement/* , fragment: Fragment */) {

        super(observable)

        this.init(observable)

    }

    /* API */

    update(value: Child): void {
        setChildStatic(this.parent, value, true)
    }

}

class CallableClassStatic extends Callable<null | undefined | boolean> {

    /* VARIABLES */

    private element: HTMLElement
    private key: string

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | boolean>, element: HTMLElement, key: string) {

        super(observable)

        this.element = element
        this.key = key

        this.init(observable)

    }

    /* API */

    update(value: null | undefined | boolean): void {

        setClassStatic(this.element, this.key, value)

    }

}

class CallableClassBooleanStatic extends Callable<null | undefined | boolean | string> {

    /* VARIABLES */

    private element: HTMLElement
    private value: boolean

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | boolean | string>, element: HTMLElement, value: boolean) {

        super(observable)

        this.element = element
        this.value = value

        this.init(observable)

    }

    /* API */

    update(key: null | undefined | boolean | string, keyPrev?: null | undefined | boolean | string): void {

        setClassBooleanStatic(this.element, this.value, key, keyPrev)

    }

}

class CallableClassesStatic extends Callable<null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>> {

    /* VARIABLES */

    private element: HTMLElement

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>>, element: HTMLElement) {

        super(observable)

        this.element = element

        this.init(observable)

    }

    /* API */

    update(object: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>, objectPrev?: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>): void {

        setClassesStatic(this.element, object, objectPrev)

    }

}

class CallableEventStatic extends Callable<null | undefined | EventListener> {

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | EventListener>, private element: HTMLElement, private event: string) {

        super(observable)

        this.init(observable)

    }

    /* API */

    update(value: null | undefined | EventListener): void {
        const { element, event } = this
        setEventStatic(element, event, value)
    }

}

class CallablePropertyStatic extends Callable<null | undefined | boolean | number | string> {

    /* VARIABLES */

    private element: HTMLElement
    private key: string

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | boolean | number | string>, element: HTMLElement, key: string) {

        super(observable)

        this.element = element
        this.key = key

        this.init(observable)

    }

    /* API */

    update(value: null | undefined | boolean | number | string): void {

        setPropertyStatic(this.element, this.key, value)

    }

}

class CallableStyleStatic extends Callable<null | undefined | number | string> {

    /* VARIABLES */

    private element: HTMLElement
    private key: string

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | number | string>, element: HTMLElement, key: string) {

        super(observable)

        this.element = element
        this.key = key

        this.init(observable)

    }

    /* API */

    update(value: null | undefined | number | string): void {

        setStyleStatic(this.element, this.key, value)

    }

}

class CallableStylesStatic extends Callable<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>> {

    /* VARIABLES */

    private element: HTMLElement

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>>, element: HTMLElement) {

        super(observable)

        this.element = element

        this.init(observable)

    }

    /* API */

    update(object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>): void {

        setStylesStatic(this.element, object, objectPrev)

    }

}

/* EXPORT */

export { Callable, CallableAttributeStatic, CallableChildStatic, CallableClassStatic, CallableClassBooleanStatic, CallableClassesStatic, CallableEventStatic, CallablePropertyStatic, CallableStyleStatic, CallableStylesStatic }
