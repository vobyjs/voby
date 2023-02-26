/// <reference path="../../../via/dist/controller/index.d.ts" />

/* IMPORT */

import type { ComponentIntrinsicElement, FN } from '../types'
import 'via'

/* MAIN */
if (typeof via !== 'undefined')
    var document = via.document

const createComment = document.createComment/* .bind(document, '') */ as any as FN<[], Comment>
const createHTMLNode = document.createElement/* .bind(document) */ as any as FN<[ComponentIntrinsicElement], HTMLElement>
const createSVGNode = document.createElementNS/* .bind(document, 'http://www.w3.org/2000/svg') */ as any as FN<[ComponentIntrinsicElement], Element>
const createText = document.createTextNode/* .bind(document) */ as any as FN<[any], Text>

export { createComment, createHTMLNode, createSVGNode, createText, }

/* EXPORT */

