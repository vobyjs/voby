
/* IMPORT */

import useGuarded from '~/hooks/use_guarded';
import {isTruthy} from '~/utils/lang';
import type {FunctionMaybe, Truthy} from '~/types';

/* MAIN */

//TODO: Maybe port this to oby

const useTruthy = <T> ( value: FunctionMaybe<T> ): (() => Truthy<T>) => {

  return useGuarded ( value, isTruthy );

};

/* EXPORT */

export default useTruthy;
