
/* IMPORT */

import useReaction from '~/hooks/use_reaction';
import $ from '~/methods/S';
import {isFunction} from '~/utils/lang';
import type {FunctionMaybe} from '~/types';

/* MAIN */

//TODO: Maybe port this to oby

const useGuarded = <T, U extends T> ( value: FunctionMaybe<T>, guard: (( value: T ) => value is U) ): (() => U) => {

  const guarded = $<U | undefined> ();

  useReaction ( () => {

    const current = isFunction ( value ) ? value () : value;

    if ( !guard ( current ) ) return;

    guarded ( () => current );

  });

  return (): U => {

    const current = guarded ();

    if ( !current ) throw new Error ( 'The value never passed the type guard' );

    return current;

  };

};

/* EXPORT */

export default useGuarded;
