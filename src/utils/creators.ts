
/* IMPORT */

import type { ComponentIntrinsicElement, FN } from '../types'

/* MAIN */

const createComment: FN<[], Comment> = document.createComment.bind(document, '')

const createHTMLNode: FN<[ComponentIntrinsicElement], HTMLElement> = document.createElement.bind(document)

const createSVGNode: FN<[ComponentIntrinsicElement], Element> = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg')

const createText: FN<[any], Text> = document.createTextNode.bind(document)

/* EXPORT */

export { createComment, createHTMLNode, createSVGNode, createText }
