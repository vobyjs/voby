
/* IMPORT */

import useMemo from '~/hooks/use_memo';
import $$ from '~/methods/SS';
import {isNil} from '~/utils/lang';
import type {FunctionMaybe} from '~/types';

/* MAIN */

//TODO: Maybe port this to oby, as "when" or "is" or "guarded"

const useGuarded = <T, U extends T> ( value: FunctionMaybe<T>, guard: (( value: T ) => value is U) ): (() => U) => {

  let valueLast: U | undefined;

  const guarded = useMemo ( () => {

    const current = $$(value);

    if ( !guard ( current ) ) return valueLast;

    return valueLast = current;

  });

  return (): U => {

    const current = guarded ();

    if ( isNil ( current ) ) throw new Error ( 'The value never passed the type guard' );

    return current;

  };

};

/* EXPORT */

export default useGuarded;
