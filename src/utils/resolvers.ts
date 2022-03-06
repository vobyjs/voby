
/* IMPORT */

import type {Child, ChildResolved, FunctionMaybe, ObservableMaybe} from '../types';
import useEffect from '../hooks/use_effect';
import isObservable from '../is_observable';
import sample from '../sample';
import {isFunction} from './lang';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T ) => void) ): void => {

  if ( isObservable ( value ) ) {

    useEffect ( () => {

      const valueNext = value ();

      if ( isFunction ( valueNext ) ) {

        resolveChild ( valueNext, setter );

      } else {

        setter ( valueNext );

      }

    });

  } else if ( isFunction ( value ) ) {

    resolveChild ( sample ( value ), setter );

  } else {

    setter ( value );

  }

};

const resolveChildDeep = ( child: Child ): ChildResolved => { //TODO: This function should probably be removed, it's used to make ErrorBoundary work and to cache For items

  while ( isFunction ( child ) ) {

    child = child ();

  }

  if ( Array.isArray ( child ) ) {

    const childResolved: ChildResolved[] = new Array ( child.length );

    for ( let i = 0, l = child.length; i < l; i++ ) {

      childResolved[i] = resolveChildDeep ( child[i] );

    }

    return childResolved;

  }

  return child;

};

const resolveFunction = <T> ( value: FunctionMaybe<T>, setter: (( value: T, valuePrev?: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    let valuePrev: T | undefined;

    useEffect ( () => {

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

    useEffect ( () => {

      const valueNext = value ();

      setter ( valueNext, valuePrev );

      valuePrev = valueNext;

    });

  } else {

    setter ( value );

  }

};

/* EXPORT */

export {resolveChild, resolveChildDeep, resolveFunction, resolveObservable};
