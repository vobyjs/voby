
/* IMPORT */

import type {Child, ChildResolved, FunctionResolver, ObservableResolver} from '../types';
import useEffect from '../hooks/use_effect';
import isObservable from '../is_observable';
import {isFunction} from './lang';

/* MAIN */

const resolveAbstract = <T> ( value: FunctionResolver<T>, setter: (( value: T, valuePrev?: T ) => void), isResolvable: (( value: FunctionResolver<T> ) => value is (() => FunctionResolver<T>)) ): void => {

  if ( isResolvable ( value ) ) {

    let valuePrev: T | undefined;

    useEffect ( () => {

      const valueNext = value ();

      if ( isResolvable ( valueNext ) ) {

        resolveAbstract ( valueNext, setter, isResolvable );

      } else {

        setter ( valueNext, valuePrev );

        valuePrev = valueNext;

      }

    });

  } else {

    setter ( value );

  }

};

const resolveChild = <T> ( value: ObservableResolver<T>, setter: (( value: T ) => void) ): void => {

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

    resolveChild ( value (), setter ); //FIXME: "value" should be sampled here, or it may be accidentally wrapped in a paret effect, the problem is we want to know about inner computations so that we can disposed of them, we just want them to not be reactive, we can't do that currently

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

const resolveFunction = <T> ( value: FunctionResolver<T>, setter: (( value: T, valuePrev?: T ) => void) ): void => {

  return resolveAbstract ( value, setter, isFunction );

};

const resolveObservable = <T> ( value: ObservableResolver<T>, setter: (( value?: T, valuePrev?: T ) => void) ): void => {

  return resolveAbstract ( value, setter, isObservable );

};

/* EXPORT */

export {resolveChildDeep, resolveAbstract, resolveChild, resolveFunction, resolveObservable};
