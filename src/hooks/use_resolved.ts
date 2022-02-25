
/* IMPORT */

import type {FunctionResolver} from '../types';
import {isFunction} from '../utils/lang';
import useEffect from './use_effect';

/* MAIN */

function useResolved <T> ( value: FunctionResolver<T> ): T;
function useResolved <T, R> ( value: FunctionResolver<T>, callback: (( value: T, valuePrev?: T ) => R) ): R;
function useResolved <T, R> ( value: FunctionResolver<T>, callback?: (( value: T, valuePrev?: T ) => R) ): T | R {

  if ( callback ) {

    if ( isFunction ( value ) ) {

      let valueFn = value;
      let valuePrev: T | undefined;
      let result: R;

      useEffect ( () => {

        const valueNext = valueFn ();

        if ( isFunction ( valueNext ) ) {

          result = useResolved ( valueNext, callback );

        } else {

          result = callback ( valueNext, valuePrev );

          valuePrev = valueNext;

        }

      });

      return result!;

    } else {

      return callback ( value );

    }

  } else {

    while ( isFunction ( value ) ) {

      value = value ();

    }

    return value;

  }

};

/* EXPORT */

export default useResolved;
