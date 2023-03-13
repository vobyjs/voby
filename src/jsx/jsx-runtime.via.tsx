/* IMPORT */

import '../types'
import Fragment from '../components/fragment'
import createElement from '../methods/create_element.via'
import type { Component, Element } from '../types'

/* MAIN */

const debugHTML = (p: HTMLElement, name: string) => {
    if (p)
        (async () => {
            const nn = await get(p.nodeName)
            const nt = await get(p.nodeType)
            console.log(name + "; ")
            // const html = await get(p.outerHTML)
            console.log(name, p, nn, nt/* , html */)
        })()
}


const jsx = <P extends { children: any | any[] }>(component: Component<P>, props?: P | null): Element => {
    return createElement<P>(component, props)


    // if (isFunction<Element>(component)) {
    //     const F = $.memo(() => $.root(dispose => {
    //         const getComp = component(props) //return memo
    //         const ele = $<HTMLElement>()
    //         // debugHTML(getComp as any, "getComp")

    //         ele(getComp as any)

    //         return getComp
    //     }, { tag: 'f root' }))

    //     // $.effect(() => {
    //     //     console.log('jsx f changed:', F())
    //     // })

    //     const r = F()
    //     r[SYMBOL_$] = F
    //     return r
    // }
    // else {
    //     const r = createElement<P>(component, props as any) as any as HTMLElement

    //     // if (props) {
    //     //     const { children } = props
    //     //     if (children)
    //     //         if (children instanceof Box)
    //     //             $.effect(() => {
    //     //                 const o = children[SYMBOL_$] as Observable

    //     //                 //debugs
    //     //                 // console.log("Box changed: " + o())
    //     //                 // debugHTML(r, "single boxed child")

    //     //                 r.replaceChildren(o().toString())
    //     //             })
    //     //         else if (Array.isArray(children)) {
    //     //             children.forEach((v, i, a) => {
    //     //                 if (v instanceof Box) {
    //     //                     const o = v[SYMBOL_$] as Observable
    //     //                     let e = (createElement('span', { children: o() }) as any as HTMLElement)
    //     //                     $.effect(() => {
    //     //                         //debugs
    //     //                         // console.log("Box item changed: ", i, o())
    //     //                         // debugHTML(e, "wrap observable into span")

    //     //                         e.replaceChildren(o().valueOf() as any)
    //     //                     })

    //     //                     children[i] = e
    //     //                 }
    //     //             })
    //     //             r.replaceChildren(...children)
    //     //         }
    //     // }
    //     return r as any
    // }

    // // return (isFunction<Element>(component)) ? component() as any : createElement<P>(component, props as any)
}

// const jsxs = <P extends { children: any | any[] }>(component: Component<P>, props?: P | null): Element => {
//     // return $.memo(() => {
//     // if ((props as any).children) {
//     //     // some debugs
//     //     // (async () => {
//     //     //     const c = (props as any).children.map(async (c: HTMLElement) => await get(c.outerHTML))
//     //     //     console.log('jsxs', c)
//     //     // })()
//     // }
//     return jsx(component, props)
//     // })
// }
/* EXPORT */

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment, }
