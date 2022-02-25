
/* IMPORT */

import type {Child, ChildResolved, FunctionResolver, ObservableResolver} from '../types';
import useEffect from '../hooks/use_effect';
import {$} from '../observable';
import {isFunction} from './lang';

/* MAIN */

//TODO: Rewrite this better

const resolveChild = ( child: Child ): ChildResolved => { //TODO: this function should probably be removed 🤔

  if ( isFunction ( child ) ) return resolveChild ( child () );

  if ( Array.isArray ( child ) ) {

    const childResolved: ChildResolved[] = new Array ( child.length );

    for ( let i = 0, l = child.length; i < l; i++ ) {

      childResolved[i] = resolveChild ( child[i] );

    }

    return childResolved;

  }

  return child;

};

const setResolvedChild = <T> ( value: ObservableResolver<T>, setter: (( value: T ) => void) ): void => { //TODO: remove this function somehow

  if ( $.is ( value ) ) {

    useEffect ( () => {

      const valueNext = value ();

      if ( isFunction ( valueNext ) ) {

        setResolvedChild ( valueNext, setter );

      } else {

        setter ( valueNext );

      }

    });

  } else if ( isFunction ( value ) ) {

    setResolvedChild ( value (), setter ); //TODO: Sampling? Only if first level?

  } else {

    setter ( value );

  }

};


const resolveAbstract = <T> ( value: FunctionResolver<T>, setter: (( value: T, valuePrev?: T ) => void), isResolver: (( value: FunctionResolver<T> ) => value is (() => FunctionResolver<T>)) ): void => {

  if ( isResolver ( value ) ) {

    let valuePrev: T | undefined;

    useEffect ( () => {

      const valueNext = value ();

      if ( isResolver ( valueNext ) ) { //TODO: This check is performed twice, write this better

        resolveAbstract ( valueNext, setter, isResolver );

      } else {

        setter ( valueNext, valuePrev );

        valuePrev = valueNext;

      }

    });

  } else {

    setter ( value );

  }

};

const resolveFunction = <T> ( value: FunctionResolver<T>, setter: (( value: T, valuePrev?: T ) => void) ): void => {

  return resolveAbstract ( value, setter, isFunction );

};

const resolveObservable = <T> ( value: ObservableResolver<T>, setter: (( value?: T, valuePrev?: T ) => void) ): void => {

  return resolveAbstract ( value, setter, $.is );

};

/* EXPORT */

export {resolveChild, resolveAbstract, setResolvedChild, resolveFunction, resolveObservable};

