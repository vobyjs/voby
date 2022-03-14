
/* IMPORT */

import type {Child, ChildResolved, FunctionMaybe, ObservableMaybe} from '../types';
import {SYMBOL_ELEMENT} from '../constants';
import useEffect from '../hooks/use_effect';
import isObservable from '../is_observable';
import sample from '../sample';
import {isFunction, isPrimitive} from './lang';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T ) => void) ): void => {

  if ( isFunction ( value ) ) {

    if ( !!value[SYMBOL_ELEMENT] ) {

      resolveChild ( sample ( value ), setter );

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

export {resolveChild, resolveChildDeep, resolveFunction, resolveObservable};
