
/* MAIN */

const {assign} = Object;

const castError = ( exception: unknown ): Error => {

  if ( isError ( exception ) ) return exception;

  if ( isString ( exception ) ) return new Error ( exception );

  return new Error ( 'Unknown error' );

};

const flatten = (() => {

  const {isArray} = Array;

  return <T> ( arr: T[] ) => {

    for ( let i = 0, l = arr.length; i < l; i++ ) {

      if ( !isArray ( arr[i] ) ) continue;

      return arr.flat ( Infinity );

    }

    return arr;

  };

})();

const indexOf = (() => {

  const _indexOf = Array.prototype.indexOf;

  return <T> ( arr: ArrayLike<unknown>, value: T ): number => {

    return _indexOf.call ( arr, value );

  };

})();

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

const isObject = ( value: unknown ): value is unknown => {

  if ( value === null ) return false;

  const type = typeof value;

  return type === 'object' || type === 'function';

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

/* EXPORT */

export {assign, castError, flatten, indexOf, isError, isFunction, isNil, isNode, isObject, isString};
