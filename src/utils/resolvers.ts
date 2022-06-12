
/* IMPORT */

import {SYMBOL_ELEMENT, SYMBOL_OBSERVABLE_FROZEN} from '~/constants';
import useReaction from '~/hooks/use_reaction';
import isObservable from '~/methods/is_observable';
import {flatten, isArray, isFunction, isVoidChild} from '~/utils/lang';
import type {FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T | T[] ) => void) ): void => {

  if ( isFunction ( value ) ) {

    if ( SYMBOL_ELEMENT in value || SYMBOL_OBSERVABLE_FROZEN in value ) {

      resolveChild ( value (), setter );

    } else {

      useReaction ( () => {

        resolveChild ( value (), setter );

      });

    }

  } else if ( isArray ( value ) ) {

    const values = flatten ( value );

    if ( values.some ( isObservable ) ) {

      useReaction ( () => {

        setter ( resolveResolved ( values, [] ) );

      });

    } else {

      setter ( values );

    }

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

const resolveResolved = <T> ( value: T, values: any[] ): any => {

  while ( isObservable<T> ( value ) ) {

    value = value ();

  }

  if ( isArray ( value ) ) {

    for ( let i = 0, l = value.length; i < l; i++ ) {

      resolveResolved ( value[i], values );

    }

  } else if ( !isVoidChild ( value ) ) { // It's cheaper to discard void children here

    values.push ( value );

  }

  return values;

};

/* EXPORT */

export {resolveChild, resolveFunction, resolveObservable, resolveResolved};
