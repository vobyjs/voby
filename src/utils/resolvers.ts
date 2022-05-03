
/* IMPORT */

import useEffect from '~/hooks/use_effect';
import isObservable from '~/methods/is_observable';
import {isArray, isFunction, isPrimitive} from '~/utils/lang';
import type {FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    let valuePrev: T | undefined;
    let valuePrimitive = false;

    useEffect ( () => {

      const valueNext = value ();

      if ( valuePrimitive && valuePrev === valueNext ) return; // Nothing actually changed, skipping

      resolveChild ( valueNext, setter );

      valuePrev = valueNext;
      valuePrimitive = isPrimitive ( valueNext );

    });

  } else if ( isArray ( value ) ) {

    useEffect ( () => {

      setter ( resolveResolved ( value ) );

    });

  } else {

    setter ( value );

  }

};

const resolveFunction = <T> ( value: FunctionMaybe<T>, setter: (( value: T, valuePrev?: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    let valuePrev: T | undefined;
    let valuePrimitive = false;

    useEffect ( () => {

      const valueNext = value ();

      if ( valuePrimitive && valuePrev === valueNext ) return; // Nothing actually changed, skipping

      setter ( valueNext, valuePrev );

      valuePrev = valueNext;
      valuePrimitive = isPrimitive ( valueNext );

    });

  } else {

    setter ( value );

  }

};

const resolveObservable = <T> ( value: ObservableMaybe<T>, setter: (( value?: T, valuePrev?: T ) => void) ): void => {

  if ( isObservable ( value ) ) {

    let valuePrev: T | undefined;
    let valuePrimitive = false;

    useEffect ( () => {

      const valueNext = value ();

      if ( valuePrimitive && valuePrev === valueNext ) return; // Nothing actually changed, skipping

      setter ( valueNext, valuePrev );

      valuePrev = valueNext;
      valuePrimitive = isPrimitive ( valueNext );

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

    return value.map ( resolveResolved );

  } else {

    return value;

  }

}

/* EXPORT */

export {resolveChild, resolveFunction, resolveObservable, resolveResolved};
