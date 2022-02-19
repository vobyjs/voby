
/* IMPORT */

import createElement from '~/create_element';
import {$} from '~/observable';
import useComputed from '~/hooks/use_computed';
import useError from '~/hooks/use_error';
import {castError} from '~/utils';
import type {Child} from '~/types';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: (( props: { error: Error, reset: () => void } ) => Child), children: Child }): Child => {

  const exception = $();
  const hasException = $(false);

  return useComputed ( () => {

    if ( hasException () ) {

      const error = castError ( exception.sample () );
      const reset = () => hasException ( false );

      return createElement ( fallback, { error, reset } );

    } else {

      useError ( e => {

        exception ( e );
        hasException ( true );

      });

      return children[0](); //FIXME: This looks super buggy, what is there are multiple or no children? Whay if they are not functions? It should probably resolve all children, but returning an array here breaks things, bad sign

    }

  });

};

/* EXPORT */

export default ErrorBoundary;
