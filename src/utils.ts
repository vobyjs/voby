
/* IMPORT */

import Component from '~/components/component';
import {$} from '~/observable';
import type {ComponentClass, Observable, ObservableAccessor} from '~/types';

/* MAIN */

const castArray = <T> ( value: T | T[] ): T[] => {

  return isArray ( value ) ? value : [value];

};

const castError = ( exception: unknown ): Error => {

  if ( isError ( exception ) ) return exception;

  if ( isString ( exception ) ) return new Error ( exception );

  return new Error ( 'Unknown error' );

};

const delay = ( ms: number ): Promise<void> => {

  return new Promise ( resolve => setTimeout ( resolve, ms ) );

};

const extend = Object.assign;

const identity = <T> ( value: T ): T => {

  return value;

};

const indexOf = (() => {

  const _indexOf = Array.prototype.indexOf;

  return <T> ( arr: ArrayLike<unknown>, value: T ): number => {

    return _indexOf.call ( arr, value );

  };

})();

const isAlphanumeric = (() => {

  const alphanumericRe = /^[a-z0-9]+$/i;

  return ( value: string ): boolean => {

    return alphanumericRe.test ( value );

  };

})();

const isArray = (() => {

  const _isArray = Array.isArray;

  return ( value: unknown ): value is unknown[] => {

    return _isArray ( value );

  };

})();

const isBoolean = ( value: unknown ): value is boolean => {

  return typeof value === 'boolean';

};

const isComment = ( value: unknown ): value is Comment => {

  return value instanceof Comment;

};

const isComponentClass = ( value: Function ): value is ComponentClass => {

  return Component.isPrototypeOf ( value );

};

const isElement = ( value: unknown ): value is Element => {

  return value instanceof Element;

};

const isError = ( value: unknown ): value is Error => {

  return value instanceof Error;

};

const isFunction = ( value: unknown ): value is (( ...args: unknown[] ) => unknown) => {

  return typeof value === 'function';

};

const isNil = ( value: unknown ): value is null | undefined => {

  return value === null || value === undefined;

};

const isNode = ( value: unknown ): value is Node => {

  return value instanceof Node;

};

const isNumber = ( value: unknown ): value is number => {

  return typeof value === 'number';

};

const isObservable = <T> ( value: T | Observable<T> | ObservableAccessor<T> ): value is Observable<T> | ObservableAccessor<T> => {

  return $.is ( value );

};

const isPlainObject = (() => {

  const {getPrototypeOf, prototype} = Object;

  return ( value: unknown ): value is Record<string, unknown> => {

    if ( typeof value !== 'object' || value === null ) return false;

    const proto = getPrototypeOf ( value );

    return proto === null || proto === prototype;

  };

})();

const isPropertyNonDimensional = (() => {

  const nonDimensionalRe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

  return ( property: string ): boolean => {

    return nonDimensionalRe.test ( property );

  };

})();

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const isText = ( value: unknown ): value is Text => {

  return value instanceof Text;

};

const isUndefined = ( value: unknown ): value is undefined => {

  return value === undefined;

};

const keys = (() => {

  const _keys = Object.keys;

  /* MAIN */

  return <T extends Record<number | string | symbol, unknown>> ( object: T ): (keyof T)[] => {

    return _keys ( object );

  };

})();

/* EXPORT */

export {castArray, castError, delay, extend, identity, indexOf, isAlphanumeric, isArray, isBoolean, isComment, isComponentClass, isElement, isError, isFunction, isNil, isNode, isNumber, isObservable, isPlainObject, isPropertyNonDimensional, isString, isText, isUndefined, keys};
