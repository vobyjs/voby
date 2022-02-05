
/* IMPORT */

import Component from '~/components/component';
import {$} from '~/observable';
import {Constructor, Observable} from '~/types';

/* MAIN */

const castArray = <T> ( x: T | T[] ): T[] => {

  return isArray ( x ) ? x : [x];

};

const castError = ( exception: unknown ): Error => {

  if ( isError ( exception ) ) return exception;

  if ( isString ( exception ) ) return new Error ( exception );

  return new Error ( 'Unknown error' );

};

const identity = <T> ( x: T ): T => {

  return x;

};

const indexOf = <T> ( arr: T[], value: T ): number => {

  return Array.prototype.indexOf.call ( arr, value );

};

const isAlphanumeric = ( x: string ): boolean => {

  return /^[a-z0-9]+$/i.test ( x );

};

const isArray = ( x: unknown ): x is unknown[] => {

  return Array.isArray ( x );

};

const isBoolean = ( x: unknown ): x is boolean => {

  return typeof x === 'boolean';

};

const isComment = ( x: unknown ): x is Text => {

  return x !== null && typeof x === 'object' && x['nodeType'] === 8;

};

const isComponent = ( x: unknown ): x is Constructor<Component> => {

  return isFunction ( x ) && Component.isPrototypeOf ( x );

};

const isElement = ( x: unknown ): x is HTMLElement => {

  return x instanceof HTMLElement;

};

const isError = ( x: unknown ): x is Error => {

  return x instanceof Error;

};

const isFunction = ( x: unknown ): x is (( ...args: unknown[] ) => unknown) => {

  return typeof x === 'function';

};

const isNil = ( x: unknown ): x is null | undefined => {

  return x === null || x === undefined;

};

const isNode = ( x: unknown ): x is Node => {

  return x !== null && typeof x === 'object' && isNumber ( x['nodeType'] );

};

const isNumber = ( x: unknown ): x is number => {

  return typeof x === 'number';

};

const isObservable = <T> ( x: T | Observable<T> ): x is Observable<T> => {

  return $.is ( x );

};

const isPropertyNonDimensional = (() => {

  const nonDimensionalRe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

  return ( property: string ): boolean => {

    return nonDimensionalRe.test ( property );

  };

})();

const isString = ( x: unknown ): x is string => {

  return typeof x === 'string';

};

const isText = ( x: unknown ): x is Text => {

  return x !== null && typeof x === 'object' && x['nodeType'] === 3;

};

/* EXPORT */

export {castArray, castError, identity, indexOf, isAlphanumeric, isArray, isBoolean, isComment, isComponent, isElement, isError, isFunction, isNil, isNode, isNumber, isObservable, isPropertyNonDimensional, isString, isText};
