
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {isFunction} from '~/utils/lang';
import type {FunctionMaybe} from '~/types';

/* MAIN */

//TODO: Maybe port this to oby

const useGuarded = <T, U extends T> ( value: FunctionMaybe<T>, guard: (( value: T ) => value is U) ): (() => U) => {

  const guarded = useComputed<U | undefined> ( () => {

    const current = isFunction ( value ) ? value () : value;

    return guard ( current ) ? current : undefined;

  });

  return (): U => {

    const current = guarded ();

    if ( !current ) throw new Error ( 'The value never passed the type guard' );

    return current;

  };

};

/* EXPORT */

export default useGuarded;
