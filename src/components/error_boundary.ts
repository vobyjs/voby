
/* IMPORT */

import type {Child, Disposer} from '../types';
import createElement from '../create_element';
import useComputed from '../hooks/use_computed';
import useError from '../hooks/use_error';
import {$} from '../observable';
import {resolveChild} from '../setters';
import {castError} from '../utils';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: (( props: { error: Error, reset: Disposer } ) => Child), children: Child }): Child => {

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

      return resolveChild ( children );

    }

  });

};

/* EXPORT */

export default ErrorBoundary;
