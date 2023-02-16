
/* IMPORT */

import useMemo from '../hooks/use_memo'
import createElement from '../methods/create_element.via'
import resolve from '../methods/resolve'
import $$ from '../methods/SS'
import type { Child, Component, FunctionMaybe } from '../types'

/* MAIN */

const Dynamic = <P = {}>({ component, props, children }: { component: Component<P>, props?: FunctionMaybe<P | null>, children?: Child }): Child => {

    return useMemo(() => {

        return resolve(createElement<P>($$(component, false), $$(props as any), children))

    })

}

/* EXPORT */

export default Dynamic
