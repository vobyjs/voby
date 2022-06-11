
/* IMPORT */

import {SYMBOL_ELEMENT, SYMBOL_OBSERVABLE_FROZEN} from '~/constants';
import useReaction from '~/hooks/use_reaction';
import isObservable from '~/methods/is_observable';
import {isArray, isFunction} from '~/utils/lang';
import type {FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    if ( SYMBOL_ELEMENT in value || SYMBOL_OBSERVABLE_FROZEN in value ) {

      resolveChild ( value (), setter );

    } else {

      useReaction ( () => {

        resolveChild ( value (), setter );

      });

    }

  } else if ( isArray ( value ) && value.some ( isObservable ) ) {

    useReaction ( () => {

      setter ( resolveResolved ( value ) );

    });

  } else {

    setter ( value );

  }

};

const resolveFunction = <T> ( value: FunctionMaybe<T> ): T => {

  return isFunction ( value ) ? value () : value;

};

const resolveObservable = <T> ( value: ObservableMaybe<T> ): T => {

  return isObservable ( value ) ? value () : value;

};

const resolveResolved = <T> ( value: T ): any => {

  while ( isObservable<T> ( value ) ) {

    value = value ();

  }

  if ( isArray ( value ) ) {

    const resolved = new Array ( value.length );

    for ( let i = 0, l = resolved.length; i < l; i++ ) {

      resolved[i] = resolveResolved ( value[i] );

    }

    return resolved;

  } else {

    return value;

  }

};

/* EXPORT */

export {resolveChild, resolveFunction, resolveObservable, resolveResolved};
