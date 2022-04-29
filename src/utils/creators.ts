
/* IMPORT */

import type {ComponentIntrinsicElement, FN} from '~/types';

/* MAIN */

const createAttribute: FN<[string], Attr> = document.createAttribute.bind ( document );

const createComment: FN<[], Comment> = document.createComment.bind ( document, '' );

const createHTMLNode: FN<[ComponentIntrinsicElement], HTMLElement> = document.createElement.bind ( document );

const createSVGNode: FN<[any], SVGElement> = document.createElementNS.bind ( document, 'http://www.w3.org/2000/svg' );

const createText: FN<[any], Text> = document.createTextNode.bind ( document );

/* EXPORT */

export {createAttribute, createComment, createHTMLNode, createSVGNode, createText};
