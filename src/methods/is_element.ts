
/* IMPORT */

import {SYMBOL_ELEMENT} from '~/constants';
import {isFunction} from '~/utils/lang';
import type {Element} from '~/types';

/* MAIN */

const isElement = ( value: unknown ): value is Element => {

  return isFunction ( value ) && ( SYMBOL_ELEMENT in value );

};

/* EXPORT */

export default isElement;
