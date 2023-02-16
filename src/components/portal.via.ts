
/* IMPORT */

import useEffect from '../hooks/use_effect'
import render from '../methods/render.via'
import $$ from '../methods/SS'
import { boolean } from 'oby'
import { createHTMLNode } from '../utils/creators.via'
import { assign } from '../utils/lang'
import type { Child, ChildWithMetadata, FunctionMaybe } from '../types'

/* MAIN */

const Portal = ({ when = true, mount, wrapper, children }: { mount?: Child, when?: FunctionMaybe<boolean>, wrapper?: Child, children?: Child }): ChildWithMetadata<{ portal: HTMLElement }> => {

  const portal = $$(wrapper) || createHTMLNode('div')

  if (!(portal instanceof HTMLElement)) throw new Error('Invalid wrapper node')

  const condition = boolean(when)

  useEffect(() => {

    if (!$$(condition)) return

    const parent = $$(mount) || document.body

    if (!(parent instanceof Element)) throw new Error('Invalid mount node')

    parent.insertBefore(portal, null)

    return () => {

      parent.removeChild(portal)

    }

  })

  useEffect(() => {

    if (!$$(condition)) return

    return render(children, portal)

  })

  return assign(() => $$(condition) || children, { metadata: { portal } })

}

/* EXPORT */

export default Portal
