
/* IMPORT */

import type {FN, FunctionRecursed as FF, ObservableRecursed as OO} from '../types';
import isObservable from '../is_observable';
import {isArray, isFunction} from '../utils/lang';

/* MAIN */

function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, T9> ( value: [T1, T2, T3, T4, T5, T6, T7, T8, T9], resolveFunctions?: false ): [OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>, OO<T7>, OO<T8>, OO<T9>];
function useResolved<T1, T2, T3, T4, T5, T6, T7, T8> ( value: [T1, T2, T3, T4, T5, T6, T7, T8], resolveFunctions?: false ): [OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>, OO<T7>, OO<T8>];
function useResolved<T1, T2, T3, T4, T5, T6, T7> ( value: [T1, T2, T3, T4, T5, T6, T7], resolveFunctions?: false ): [OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>, OO<T7>];
function useResolved<T1, T2, T3, T4, T5, T6> ( value: [T1, T2, T3, T4, T5, T6], resolveFunctions?: false ): [OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>];
function useResolved<T1, T2, T3, T4, T5> ( value: [T1, T2, T3, T4, T5], resolveFunctions?: false ): [OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>];
function useResolved<T1, T2, T3, T4> ( value: [T1, T2, T3, T4], resolveFunctions?: false ): [OO<T1>, OO<T2>, OO<T3>, OO<T4>];
function useResolved<T1, T2, T3> ( value: [T1, T2, T3], resolveFunctions?: false ): [OO<T1>, OO<T2>, OO<T3>];
function useResolved<T1, T2> ( value: [T1, T2], resolveFunctions?: false ): [OO<T1>, OO<T2>];
function useResolved<T1> ( value: [T1], resolveFunctions?: false ): [OO<T1>];
function useResolved ( value: [], resolveFunctions?: false ): [];

function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, T9> ( value: [T1, T2, T3, T4, T5, T6, T7, T8, T9], resolveFunctions: true ): [FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>, FF<T7>, FF<T8>, FF<T9>];
function useResolved<T1, T2, T3, T4, T5, T6, T7, T8> ( value: [T1, T2, T3, T4, T5, T6, T7, T8], resolveFunctions: true ): [FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>, FF<T7>, FF<T8>];
function useResolved<T1, T2, T3, T4, T5, T6, T7> ( value: [T1, T2, T3, T4, T5, T6, T7], resolveFunctions: true ): [FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>, FF<T7>];
function useResolved<T1, T2, T3, T4, T5, T6> ( value: [T1, T2, T3, T4, T5, T6], resolveFunctions: true ): [FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>];
function useResolved<T1, T2, T3, T4, T5> ( value: [T1, T2, T3, T4, T5], resolveFunctions: true ): [FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>];
function useResolved<T1, T2, T3, T4> ( value: [T1, T2, T3, T4], resolveFunctions: true ): [FF<T1>, FF<T2>, FF<T3>, FF<T4>];
function useResolved<T1, T2, T3> ( value: [T1, T2, T3], resolveFunctions: true ): [FF<T1>, FF<T2>, FF<T3>];
function useResolved<T1, T2> ( value: [T1, T2], resolveFunctions: true ): [FF<T1>, FF<T2>];
function useResolved<T1> ( value: [T1], resolveFunctions: true ): [FF<T1>];
function useResolved ( value: [], resolveFunctions: true ): [];

function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, T9> ( value: [T1, T2, T3, T4, T5, T6, T7, T8, T9], resolveFunctions?: boolean ): [T1, T2, T3, T4, T5, T6, T7, T8, T9];
function useResolved<T1, T2, T3, T4, T5, T6, T7, T8> ( value: [T1, T2, T3, T4, T5, T6, T7, T8], resolveFunctions?: boolean ): [T1, T2, T3, T4, T5, T6, T7, T8];
function useResolved<T1, T2, T3, T4, T5, T6, T7> ( value: [T1, T2, T3, T4, T5, T6, T7], resolveFunctions?: boolean ): [T1, T2, T3, T4, T5, T6, T7];
function useResolved<T1, T2, T3, T4, T5, T6> ( value: [T1, T2, T3, T4, T5, T6], resolveFunctions?: boolean ): [T1, T2, T3, T4, T5, T6];
function useResolved<T1, T2, T3, T4, T5> ( value: [T1, T2, T3, T4, T5], resolveFunctions?: boolean ): [T1, T2, T3, T4, T5];
function useResolved<T1, T2, T3, T4> ( value: [T1, T2, T3, T4], resolveFunctions?: boolean ): [T1, T2, T3, T4];
function useResolved<T1, T2, T3> ( value: [T1, T2, T3], resolveFunctions?: boolean ): [T1, T2, T3];
function useResolved<T1, T2> ( value: [T1, T2], resolveFunctions?: boolean ): [T1, T2];
function useResolved<T1> ( value: [T1], resolveFunctions?: boolean ): [T1];
function useResolved ( value: [], resolveFunctions?: boolean ): [];

function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> ( value: [T1, T2, T3, T4, T5, T6, T7, T8, T9], callback: FN<[OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>, OO<T7>, OO<T8>, OO<T9>], R>, resolveFunctions?: false ): R;
function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, R> ( value: [T1, T2, T3, T4, T5, T6, T7, T8], callback: FN<[OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>, OO<T7>, OO<T8>], R>, resolveFunctions?: false ): R;
function useResolved<T1, T2, T3, T4, T5, T6, T7, R> ( value: [T1, T2, T3, T4, T5, T6, T7], callback: FN<[OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>, OO<T7>], R>, resolveFunctions?: false ): R;
function useResolved<T1, T2, T3, T4, T5, T6, R> ( value: [T1, T2, T3, T4, T5, T6], callback: FN<[OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>, OO<T6>], R>, resolveFunctions?: false ): R;
function useResolved<T1, T2, T3, T4, T5, R> ( value: [T1, T2, T3, T4, T5], callback: FN<[OO<T1>, OO<T2>, OO<T3>, OO<T4>, OO<T5>], R>, resolveFunctions?: false ): R;
function useResolved<T1, T2, T3, T4, R> ( value: [T1, T2, T3, T4], callback: FN<[OO<T1>, OO<T2>, OO<T3>, OO<T4>], R>, resolveFunctions?: false ): R;
function useResolved<T1, T2, T3, R> ( value: [T1, T2, T3], callback: FN<[OO<T1>, OO<T2>, OO<T3>], R>, resolveFunctions?: false ): R;
function useResolved<T1, T2, R> ( value: [T1, T2], callback: FN<[OO<T1>, OO<T2>], R>, resolveFunctions?: false ): R;
function useResolved<T1, R> ( value: [T1], callback: FN<[OO<T1>], R>, resolveFunctions?: false ): R;
function useResolved<R> ( value: [], callback: FN<[], R>, resolveFunctions?: false ): R;

function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> ( value: [T1, T2, T3, T4, T5, T6, T7, T8, T9], callback: FN<[FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>, FF<T7>, FF<T8>, FF<T9>], R>, resolveFunctions: true ): R;
function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, R> ( value: [T1, T2, T3, T4, T5, T6, T7, T8], callback: FN<[FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>, FF<T7>, FF<T8>], R>, resolveFunctions: true ): R;
function useResolved<T1, T2, T3, T4, T5, T6, T7, R> ( value: [T1, T2, T3, T4, T5, T6, T7], callback: FN<[FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>, FF<T7>], R>, resolveFunctions: true ): R;
function useResolved<T1, T2, T3, T4, T5, T6, R> ( value: [T1, T2, T3, T4, T5, T6], callback: FN<[FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>, FF<T6>], R>, resolveFunctions: true ): R;
function useResolved<T1, T2, T3, T4, T5, R> ( value: [T1, T2, T3, T4, T5], callback: FN<[FF<T1>, FF<T2>, FF<T3>, FF<T4>, FF<T5>], R>, resolveFunctions: true ): R;
function useResolved<T1, T2, T3, T4, R> ( value: [T1, T2, T3, T4], callback: FN<[FF<T1>, FF<T2>, FF<T3>, FF<T4>], R>, resolveFunctions: true ): R;
function useResolved<T1, T2, T3, R> ( value: [T1, T2, T3], callback: FN<[FF<T1>, FF<T2>, FF<T3>], R>, resolveFunctions: true ): R;
function useResolved<T1, T2, R> ( value: [T1, T2], callback: FN<[FF<T1>, FF<T2>], R>, resolveFunctions: true ): R;
function useResolved<T1, R> ( value: [T1], callback: FN<[FF<T1>], R>, resolveFunctions: true ): R;
function useResolved<R> ( value: [], callback: FN<[], R>, resolveFunctions: true ): R;

function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, T9, R> ( value: [T1, T2, T3, T4, T5, T6, T7, T8, T9], callback: FN<[T1, T2, T3, T4, T5, T6, T7, T8, T9], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, T2, T3, T4, T5, T6, T7, T8, R> ( value: [T1, T2, T3, T4, T5, T6, T7, T8], callback: FN<[T1, T2, T3, T4, T5, T6, T7, T8], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, T2, T3, T4, T5, T6, T7, R> ( value: [T1, T2, T3, T4, T5, T6, T7], callback: FN<[T1, T2, T3, T4, T5, T6, T7], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, T2, T3, T4, T5, T6, R> ( value: [T1, T2, T3, T4, T5, T6], callback: FN<[T1, T2, T3, T4, T5, T6], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, T2, T3, T4, T5, R> ( value: [T1, T2, T3, T4, T5], callback: FN<[T1, T2, T3, T4, T5], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, T2, T3, T4, R> ( value: [T1, T2, T3, T4], callback: FN<[T1, T2, T3, T4], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, T2, T3, R> ( value: [T1, T2, T3], callback: FN<[T1, T2, T3], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, T2, R> ( value: [T1, T2], callback: FN<[T1, T2], R>, resolveFunctions?: boolean ): R;
function useResolved<T1, R> ( value: [T1], callback: FN<[T1], R>, resolveFunctions?: boolean ): R;
function useResolved<R> ( value: [], callback: FN<[], R>, resolveFunctions?: boolean ): R;

function useResolved<T> ( value: T, resolveFunctions?: false ): OO<T>;
function useResolved<T> ( value: T, resolveFunctions: true ): FF<T>;
function useResolved<T> ( value: T, resolveFunctions?: boolean ): T;

function useResolved<T, R> ( value: T, callback: FN<[OO<T>], R>, resolveFunctions?: false ): R;
function useResolved<T, R> ( value: T, callback: FN<[FF<T>], R>, resolveFunctions: true ): R;
function useResolved<T, R> ( value: T, callback: FN<[T], R>, resolveFunctions?: boolean ): R;

function useResolved ( values, callback, resolveFunctions?: boolean ) {

  const isResolvable = ( resolveFunctions === true || callback === true ) ? isFunction : isObservable;

  if ( isArray ( values ) ) {

    const valuesResolved = new Array ( values.length );

    for ( let i = 0, l = values.length; i < l; i++ ) {

      let value = values[i];

      while ( isResolvable ( value ) ) {

        value = value ();

      }

      valuesResolved[i] = value;

    }

    if ( isFunction ( callback ) ) {

      return callback.apply ( undefined, valuesResolved );

    } else {

      return valuesResolved;

    }

  } else {

    while ( isResolvable ( values ) ) {

      values = values ();

    }

    if ( isFunction ( callback ) ) {

      return callback ( values );

    } else {

      return values;

    }

  }

}

/* EXPORT */

export default useResolved;
