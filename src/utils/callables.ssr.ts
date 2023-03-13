
/* IMPORT */

import { SYMBOL_OBSERVABLE, SYMBOL_OBSERVABLE_FROZEN } from '../constants'
import useCleanup from '../hooks/use_cleanup'
import untrack from '../methods/untrack'
import { on, off } from 'oby'
import { /* setAttributeStatic, */ setChildStatic, setClassStatic, setClassBooleanStatic, setClassesStatic, /* setEventStatic,  */setPropertyStatic, setStyleStatic, setStylesStatic } from '../utils/setters.ssr'
import type { /* Child, EventListener, Fragment, */ FunctionMaybe, ObservableReadonly } from '../types'

/* HELPERS */

const target = <T>(observable: ObservableReadonly<T>): ObservableReadonly<T> => (SYMBOL_OBSERVABLE_FROZEN in observable) ? observable : (observable as any)(SYMBOL_OBSERVABLE) //TSC

/* MAIN */

// These classes exist mainly as a memory-usage optimization, as they sometimes avoid keeping some functions in memory

export abstract class Callable<T, V> {

    /* VARIABLES */

    protected observable: ObservableReadonly<V>

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<V>) {
        this.observable = target(observable)
    }

    /* API */

    init(observable: ObservableReadonly<V>): void {

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

    abstract update(value: V, valuePrev?: V): void

}

// export class CallableAttributeStatic<T, V> extends Callable<T, V> {

//     /* CONSTRUCTOR */

//     constructor(observable: ObservableReadonly<V>, private props: T, private key: string) {
//         super(observable)

//         this.init(observable)
//     }

//     /* API */

//     update(value: V): void {
//         setAttributeStatic(this.props, this.key, value)
//     }
// }

// class CallableChildStatic extends Callable<Child, any, any> {

//     /* VARIABLES */

//     private parent: HTMLElement
//     private fragment: Fragment

//     /* CONSTRUCTOR */

//     constructor(observable: ObservableReadonly<Child>, parent: HTMLElement, fragment: Fragment) {

//         super(observable)

//         this.parent = parent
//         this.fragment = fragment

//         this.init(observable)

//     }

//     /* API */

//     update(value: Child): void {

//         setChildStatic(this.parent, this.fragment, value, true)

//     }

// }

export class CallableClassStatic extends Callable<Record<string, boolean>, boolean> {
    /* CONSTRUCTOR */
    constructor(observable: ObservableReadonly<boolean>, private props: Record<string, boolean>, private key: string) {
        super(observable)

        this.init(observable)
    }

    /* API */

    update(value: boolean): void {
        setClassStatic(this.props as any, this.key, value)
    }

}

export class CallableClassBooleanStatic<T> extends Callable<T, null | undefined | boolean | string> {

    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | boolean | string>, private props: T, private value: boolean) {
        super(observable)

        this.init(observable)
    }

    /* API */

    update(key: null | undefined | boolean | string, keyPrev?: null | undefined | boolean | string): void {
        setClassBooleanStatic(this.props as any, this.value, key, keyPrev)
    }
}

export class CallableClassesStatic<T> extends Callable<T, null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>> {
    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>>, private props: T) {
        super(observable)

        this.init(observable)
    }

    /* API */

    update(object: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>, objectPrev?: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>): void {
        setClassesStatic(this.props as any, object as any, objectPrev)
    }
}

// export class CallableEventStatic extends Callable<T, null | undefined | EventListener> {
//     /* CONSTRUCTOR */

//     constructor(observable: ObservableReadonly<null | undefined | EventListener>, private props: HTMLElement, private event: string) {

//         super(observable)

//         this.init(observable)
//     }

//     /* API */

//     update(value: null | undefined | EventListener): void {
//         setEventStatic(this.props, this.event, value)
//     }
// }

export class CallablePropertyStatic<T, V> extends Callable<T, V> {
    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<V>, private props: T, private key: string) {
        super(observable)

        this.init(observable)
    }

    /* API */

    update(value: V): void {
        setPropertyStatic(this.props, this.key, value)
    }

}

export class CallableStyleStatic<T> extends Callable<T, null | undefined | number | string> {
    /* CONSTRUCTOR */

    constructor(observable: ObservableReadonly<null | undefined | number | string>, private props: T, private key: string) {
        super(observable)

        this.init(observable)
    }

    /* API */

    update(value: null | undefined | number | string): void {
        setStyleStatic(this.props as any, this.key, value)
    }
}

export class CallableStylesStatic<T> extends Callable<T, null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>> {
    /* CONSTRUCTOR */
    constructor(observable: ObservableReadonly<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>>, private props: HTMLElement) {
        super(observable)

        this.init(observable)
    }

    /* API */

    update(object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>): void {

        setStylesStatic(this.props, object, objectPrev)

    }

}

/* EXPORT */
