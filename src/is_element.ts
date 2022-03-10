
/* IMPORT */

import type {Child} from './types';
import {SYMBOL_ELEMENT} from './constants';
import {isFunction} from './utils/lang';

/* MAIN */

const isElement = ( value: unknown ): value is (() => Child) => {

  return isFunction ( value ) && !!value[SYMBOL_ELEMENT];

};

/* EXPORT */

export default isElement;
