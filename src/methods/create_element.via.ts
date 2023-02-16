
/* IMPORT */

// import untrack from '../methods/untrack'
import wrapElement from '../methods/wrap_element'
// import wrapElementA from '../methods/wrap_element.via'
import { createHTMLNode, createSVGNode } from '../utils/creators.via'
import { isFunction, isNil, isNode, isString, isSVGElement, isVoidChild } from '../utils/lang'
import { setProps } from '../utils/setters.via'
import type { Child, Component, Element, Props } from '../types'

/* MAIN */

// It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some cases

const createElement = <P = {}>(component: Component<P> | keyof JSX.IntrinsicElements | string, props?: P | null, ..._children: Child[]): Element => {
    const { children: __children, key, ref, ...rest } = (props || {}) as Props //TSC
    let children = (_children.length === 1) ? _children[0] : (_children.length === 0) ? __children : _children

    // if (Array.isArray(children) && children.length) {
    //     children = await Promise.all(children)
    //     // children = children.map(async (c) => await c())
    //     // children = await Promise.all(children)
    // }
    if (isFunction(component)) {

        const props = rest

        if (!isNil(children)) props.children = children
        if (!isNil(ref)) props.ref = ref

        // return wrapElement(() => untrack(() => component.call(component, props as P)))
        return wrapElement(() => component.call(component, props as P))

    } else if (isString(component)) {

        const props = rest
        const isSVG = isSVGElement(component)
        const createNode = isSVG ? createSVGNode : createHTMLNode

        if (!isVoidChild(children)) props.children = children
        if (!isNil(ref)) props.ref = ref

        //return wrapElement((): Child => {
        const child = createNode(component as any) //as HTMLElement //TSC

        if (isSVG) child['isSVG'] = true

        // untrack(() => setProps(child, props))
        setProps(child as any, props)

        return child as any

        // })

    } else if (isNode(component)) {

        return wrapElement(() => component)

    } else {

        throw new Error('Invalid component')

    }

}

/* EXPORT */

export default createElement
