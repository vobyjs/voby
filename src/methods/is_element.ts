
/* IMPORT */

import {SYMBOL_ELEMENT} from '~/constants';
import {isFunction} from '~/utils/lang';
import type {Child} from '~/types';

/* MAIN */

const isElement = ( value: unknown ): value is (() => Child) => {

  return isFunction ( value ) && ( SYMBOL_ELEMENT in value );

};

/* EXPORT */

export default isElement;
