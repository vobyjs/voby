
/* IMPORT */

import useMemo from '~/hooks/use_memo';
import {isFunction} from '~/utils/lang';
import type {FunctionMaybe} from '~/types';

/* MAIN */

const useBoolean = ( value: FunctionMaybe<unknown> ): FunctionMaybe<boolean> => {

  if ( !isFunction ( value ) ) return !!value;

  return useMemo ( () => !!value () );

};

/* EXPORT */

export default useBoolean;
