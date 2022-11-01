
/* IMPORT */

import {SYMBOL_UNTRACKED_UNWRAPPED} from '~/constants';
import type {Child, Element} from '~/types';

/* MAIN */

const wrapElement = ( element: () => Child ): Element => {

  element[SYMBOL_UNTRACKED_UNWRAPPED] = true;

  return element;

};

/* EXPORT */

export default wrapElement;
