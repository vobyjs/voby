
/* IMPORT */

import {SYMBOL_TEMPLATE_ACCESSOR} from '~/constants';
import type {TemplateActionProxy} from '~/types';

/* MAIN */

const {assign} = Object;

const castArray = <T> ( value: T[] | T ): T[] => {

  return isArray ( value ) ? value : [value];

};

const castError = ( exception: unknown ): Error => {

  if ( isError ( exception ) ) return exception;

  if ( isString ( exception ) ) return new Error ( exception );

  return new Error ( 'Unknown error' );

};

const flatten = <T> ( arr: T[] ) => {

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( !isArray ( arr[i] ) ) continue;

    return arr.flat ( Infinity );

  }

  return arr;

};

const indexOf = (() => {

  const _indexOf = Array.prototype.indexOf;

  return <T> ( arr: ArrayLike<unknown>, value: T ): number => {

    return _indexOf.call ( arr, value );

  };

})();

const {isArray} = Array;

const isError = ( value: unknown ): value is Error => {

  return value instanceof Error;

};

const isFunction = ( value: unknown ): value is (( ...args: any[] ) => any) => {

  return typeof value === 'function';

};

const isNil = ( value: unknown ): value is null | undefined => {

  return value === null || value === undefined;

};

const isNode = ( value: unknown ): value is Node => {

  return value instanceof Node;

};

const isPrimitive = ( value: unknown ): value is null | undefined | string | number | boolean | symbol | bigint => {

  if ( value === null ) return true;

  const type = typeof value;

  return type !== 'object' && type !== 'function';

};

const isPromise = ( value: unknown ): value is Promise<unknown> => {

  return value instanceof Promise;

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const isSVG = ( value: Element ): value is SVGAElement => {

  return !!value['isSVG'];

};

const isTemplateAccessor = ( value: unknown ): value is TemplateActionProxy => {

  return isFunction ( value ) && ( SYMBOL_TEMPLATE_ACCESSOR in value );

};

const noop = (): void => {};

const once = <T> ( fn: () => T ): (() => T) => {

  let called = false;
  let result: T;

  return (): T => {

    if ( !called ) {

      called = true;
      result = fn ();

    }

    return result;

  };

};

/* EXPORT */

export {assign, castArray, castError, flatten, indexOf, isArray, isError, isFunction, isNil, isNode, isPrimitive, isPromise, isString, isSVG, isTemplateAccessor, noop, once};
