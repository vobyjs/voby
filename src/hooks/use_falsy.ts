
/* IMPORT */

import useGuarded from '~/hooks/use_guarded';
import {isFalsy} from '~/utils/lang';
import type {FunctionMaybe, Falsy} from '~/types';

/* MAIN */

//TODO: Maybe port this to oby

const useFalsy = <T> ( value: FunctionMaybe<T> ): (() => Falsy<T>) => {

  return useGuarded ( value, isFalsy );

};

/* EXPORT */

export default useFalsy;
