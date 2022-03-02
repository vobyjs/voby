
/* IMPORT */

import type {Child, Disposer, FN} from '../types';
import $ from '../$';
import createElement from '../create_element';
import useComputed from '../hooks/use_computed';
import useError from '../hooks/use_error';
import {castError} from '../utils/lang';
import {resolveChildDeep} from '../utils/resolvers';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: FN<[{ error: Error, reset: Disposer }], Child>, children: Child }): Child => {

  const error = $<Error | null>( null );

  return useComputed ( () => {

    if ( error () ) {

      const reset = () => error ( null );
      const props = { error: error (), reset };

      return createElement ( fallback, props );

    } else {

      useError ( err => {

        error ( castError ( err ) );

      });

      return resolveChildDeep ( children );

    }

  });

};

/* EXPORT */

export default ErrorBoundary;
