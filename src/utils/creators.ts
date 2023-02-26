/* IMPORT */

import type { ComponentIntrinsicElement, FN } from '../types'

/* MAIN */
const document = (typeof via !== 'undefined') ? via.document : self.document

const createComment = document.createComment.bind(document, '') as FN<[], Comment>
const createHTMLNode = document.createElement.bind(document) as FN<[ComponentIntrinsicElement], HTMLElement>
const createSVGNode = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg') as FN<[ComponentIntrinsicElement], Element>
const createText = document.createTextNode.bind(document) as FN<[any], Text>

export { createComment, createHTMLNode, createSVGNode, createText, }

/* EXPORT */

