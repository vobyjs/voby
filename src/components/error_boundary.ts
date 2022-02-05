
/* IMPORT */

import createElement from '~/create_element';
import {$} from '~/observable';
import useComputed from '~/hooks/use_computed';
import useError from '~/hooks/use_error';
import {castError} from '~/utils';
import {ViewElement} from '~/types';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: ViewElement | HTMLElement, children: ViewElement }): ViewElement => {

  const exception = $();
  const hasException = $(false);

  return useComputed ( () => {

    if ( hasException () ) {

      const error = castError ( exception.sample () );
      const reset = () => hasException ( false );

      return createElement ( fallback, { error, reset } );

    } else {

      useError ( err => {

        exception ( err );
        hasException ( true );

      });

      return children[0]()();

    }

  });

};

/* EXPORT */

export default ErrorBoundary;
