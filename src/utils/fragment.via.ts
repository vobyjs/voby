
/* IMPORT */

import type { FragmentNode, FragmentFragment, Fragment } from '../types'

/* HELPERS */

const NOOP_CHILDREN: Node[] = []

/* MAIN */

if (typeof via !== 'undefined')
    var Node = class { }

const FragmentUtils = {

    make: (): Fragment => {

        return {
            values: undefined,
            length: 0
        }

    },

    makeWithNode: (node: Node): FragmentNode => {

        return {
            values: node,
            length: 1
        }

    },

    makeWithFragment: (fragment: Fragment): FragmentFragment => {

        return {
            values: fragment,
            fragmented: true,
            length: 1
        }

    },

    getChildrenFragmented: (thiz: Fragment, children: Node[] = []): Node[] => {
        const { values, length } = thiz

        if (!length) return children

        if (values instanceof Array) {

            for (let i = 0, l = values.length; i < l; i++) {

                const value = values[i]

                if (value && (value as any).values) {

                    children.push((value as any))

                } else {

                    FragmentUtils.getChildrenFragmented(value as any, children)

                }

            }

        } else {
            if (values instanceof Node) {

                children.push(values as any)

            } else {

                FragmentUtils.getChildrenFragmented(values as any, children)

            }

        }

        return children

    },

    getChildren: (thiz: Fragment): Node | Node[] => {

        if (!thiz.length) return NOOP_CHILDREN

        if (!thiz.fragmented) return thiz.values as any

        if (thiz.length === 1) return FragmentUtils.getChildren(thiz.values)

        return FragmentUtils.getChildrenFragmented(thiz)

    },

    pushFragment: (thiz: Fragment, fragment: Fragment): void => {

        FragmentUtils.pushValue(thiz, fragment)

        thiz.fragmented = true

    },

    pushNode: (thiz: Fragment, node: Node): void => {

        FragmentUtils.pushValue(thiz, node)

    },

    pushValue: (thiz: Fragment, value: Node | Fragment): void => {

        const { values, length } = thiz as any //TSC

        if (length === 0) {

            thiz.values = value

        } else if (length === 1) {

            thiz.values = [values, value]

        } else {

            values.push(value)

        }

        thiz.length += 1

    },

    replaceWithNode: (thiz: Fragment, node: Node): void => {

        thiz.values = node
        delete thiz.fragmented
        thiz.length = 1

    },

    replaceWithFragment: (thiz: Fragment, fragment: Fragment): void => {

        thiz.values = fragment.values
        thiz.fragmented = fragment.fragmented
        thiz.length = fragment.length

    }

}

/* EXPORT */

export default FragmentUtils
