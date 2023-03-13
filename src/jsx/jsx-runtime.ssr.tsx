/* IMPORT */

import '../types'
import Fragment from '../components/fragment'
import createElement from '../methods/create_element.ssr'
import type { Component, Element } from '../types'
// import $ from 'oby'

/* MAIN */

const jsx = <P extends { children: any | any[] }>(component: Component<P>, props?: P | null): Element => {
    return createElement<P>(component, props)
}

// const jsxs = <P extends { children: any | any[] }>(component: Component<P>, props?: P | null): Element => {
//     return jsx(component, props)
// }
/* EXPORT */

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment, }
