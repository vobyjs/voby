
/* IMPORT */

import type {ObservableAny, ObservableAccessor, TemplateActionProxy} from './types';
import {SYMBOL_TEMPLATE_PROPERTY_ACCESSOR} from './constants';
import {$} from './observable';

/* MAIN */

const {assign} = Object;

const castArray = <T> ( value: T | T[] ): T[] => {

  return isArray ( value ) ? value : [value];

};

const castError = ( exception: unknown ): Error => {

  if ( isError ( exception ) ) return exception;

  if ( isString ( exception ) ) return new Error ( exception );

  return new Error ( 'Unknown error' );

};

const indexOf = (() => {

  const _indexOf = Array.prototype.indexOf;

  return <T> ( arr: ArrayLike<unknown>, value: T ): number => {

    return _indexOf.call ( arr, value );

  };

})();

const {isArray} = Array;

const isBoolean = ( value: unknown ): value is boolean => {

  return typeof value === 'boolean';

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

const isObservable = <T> ( value: T | ObservableAny<T> | ObservableAccessor<T> ): value is ObservableAny<T> | ObservableAccessor<T> => {

  return $.is ( value );

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const isTemplateActionProxy = ( value: unknown ): value is TemplateActionProxy => {

  return isFunction ( value ) && value.hasOwnProperty ( SYMBOL_TEMPLATE_PROPERTY_ACCESSOR );

};

const isText = ( value: unknown ): value is Text => {

  return value instanceof Text;

};

const keys = (() => {

  const _keys = Object.keys;

  return <T extends Record<number | string | symbol, unknown>> ( object: T ): (keyof T)[] => {

    return _keys ( object );

  };

})();

/* EXPORT */

export {assign, castArray, castError, indexOf, isArray, isBoolean, isError, isFunction, isNil, isNode, isObservable, isString, isTemplateActionProxy, isText, keys};
