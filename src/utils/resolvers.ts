
/* IMPORT */

import {SYMBOL_ELEMENT} from '~/constants';
import useEffect from '~/hooks/use_effect';
import useSample from '~/hooks/use_sample';
import isObservable from '~//methods/is_observable';
import {isFunction, isPrimitive} from '~/utils/lang';
import type {FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    if ( SYMBOL_ELEMENT in value ) {

      resolveChild ( useSample ( value ), setter );

    } else {

      let valuePrev: T | undefined;
      let valuePrimitive = false;

      useEffect ( () => {

        const valueNext = value ();

        if ( valuePrimitive && valuePrev === valueNext ) return; // Nothing actually changed, skipping

        resolveChild ( valueNext, setter );

        valuePrev = valueNext;
        valuePrimitive = isPrimitive ( valueNext );

      });

    }

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

/* EXPORT */

export {resolveChild, resolveFunction, resolveObservable};
