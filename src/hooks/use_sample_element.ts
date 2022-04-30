
/* IMPORT */

import isElement from '~/methods/is_element';
import useSample from '~/hooks/use_sample';
import type {Child} from '~/types';

/* MAIN */

const useSampleElement = <T> ( value: T ): Child | T => {

  if ( !isElement ( value ) ) return value;

  return useSample ( value );

};

/* EXPORT */

export default useSampleElement;
