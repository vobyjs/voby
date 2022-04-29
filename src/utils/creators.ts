
/* IMPORT */

import type {ComponentIntrinsicElement, FN} from '~/types';

/* MAIN */

const createAttribute: FN<[string], Attr> = document.createAttribute.bind ( document );

const createComment: FN<[], Comment> = document.createComment.bind ( document, '' );

const createNode: FN<[ComponentIntrinsicElement], HTMLElement> = document.createElement.bind ( document );

const createText: FN<[any], Text> = document.createTextNode.bind ( document );

/* EXPORT */

export {createAttribute, createComment, createNode, createText};
