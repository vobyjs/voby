
/* IMPORT */

import htm from 'htm'
import createElement from '../methods/create_element.via'
import { assign } from '../utils/lang'
import type { Child, ComponentsMap, Element, Props } from '../types'

/* HELPERS */

const registry: ComponentsMap = {}
const h = async (type: string, props?: Props | null, ...children: Child[]): Promise<Element> => await createElement(registry[type] || type, props as any, ...children)
const register = (components: ComponentsMap): void => void assign(registry, components)

/* MAIN */

const html = assign(htm.bind(h), { register })

/* EXPORT */

export default html
