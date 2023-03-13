/* IMPORT */

import type { ComponentIntrinsicElement, FN } from '../types'

/* MAIN */

const { createComment, createHTMLNode, createSVGNode, createText, createDocumentFragment, } = (() => {
    if (typeof via !== 'undefined') {
        const document = via.document

        const createComment = document.createComment as any as FN<[any], Comment>
        const createHTMLNode = document.createElement as any as FN<[ComponentIntrinsicElement], HTMLElement>
        const createSVGNode = (name: string) => document.createElementNS('http://www.w3.org/2000/svg', name) as any as FN<[ComponentIntrinsicElement], SVGElement>
        const createText = document.createTextNode as any as FN<[any], Text>
        const createDocumentFragment = document.createDocumentFragment as any as FN<[], DocumentFragment>
        return { createComment, createHTMLNode, createSVGNode, createText, createDocumentFragment, }
    }
    else {
        const createComment = document.createComment.bind(document, '') as FN<[any], Comment>
        const createHTMLNode = document.createElement.bind(document) as FN<[ComponentIntrinsicElement], HTMLElement>
        const createSVGNode = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg') as FN<[ComponentIntrinsicElement], Element>
        const createText = document.createTextNode.bind(document) as FN<[any], Text>
        const createDocumentFragment = document.createDocumentFragment.bind(document) as FN<[], DocumentFragment>
        return { createComment, createHTMLNode, createSVGNode, createText, createDocumentFragment }
    }
})()

export { createComment, createHTMLNode, createSVGNode, createText, createDocumentFragment }

/* EXPORT */

