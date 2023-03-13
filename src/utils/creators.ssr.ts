
/* IMPORT */
import h from 'vhtml'
import type { FN } from '../types'

export const createComment = ((name: string, props?: any, ...args: any[]) => h('!', props, ...args)) as any as FN<[any], Comment>
export const createHTMLNode = h //as any as FN<[ComponentIntrinsicElement], HTMLElement>
export const createSVGNode = h //as any as FN<[ComponentIntrinsicElement], SVGElement>
export const createText = ((text: string) => h('text', null, text)) as any as FN<[any], Text>
// export const createDocumentFragment = document.createDocumentFragment as any as FN<[], DocumentFragment>


