
/* IMPORT */

import {SYMBOL_ELEMENT} from '~/constants';
import useReaction from '~/hooks/use_reaction';
import isObservable from '~/methods/is_observable';
import {isArray, isFunction} from '~/utils/lang';
import type {FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    if ( SYMBOL_ELEMENT in value ) {

      resolveChild ( value (), setter );

    } else {

      let valuePrev: T | undefined;

      useReaction ( () => {

        const valueNext = value ();

        resolveChild ( valueNext, setter );

        valuePrev = valueNext;

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

const resolveFunction = <T> ( value: FunctionMaybe<T>, setter: (( value: T, valuePrev?: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    let valuePrev: T | undefined;

    useReaction ( () => {

      const valueNext = value ();

      setter ( valueNext, valuePrev );

      valuePrev = valueNext;

    });

  } else {

    setter ( value );

  }

};

const resolveObservable = <T> ( value: ObservableMaybe<T>, setter: (( value?: T, valuePrev?: T ) => void) ): void => {

  if ( isObservable ( value ) ) {

    let valuePrev: T | undefined;

    useReaction ( () => {

      const valueNext = value ();

      setter ( valueNext, valuePrev );

      valuePrev = valueNext;

    });

  } else {

    setter ( value );

  }

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
