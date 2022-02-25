
/* IMPORT */

import {$} from '../observable';
import useCleanup from './use_cleanup';
import useEffect from './use_effect';

/* MAIN */

const useAbortController = ( signals?: AbortSignal[] ): AbortController => {

  const aborted = $(false);
  const aborter = new AbortController ();

  const abort = (): void => {

    aborter.abort ();

    aborted ( true );

  };

  if ( signals ) {

    useEffect ( () => {

      if ( aborted () ) return;

      for ( let i = 0, l = signals.length; i < l; i++ ) {

        if ( signals[i].aborted ) return abort ();

      }

      for ( let i = 0, l = signals.length; i < l; i++ ) {

        signals[i].addEventListener ( 'abort', abort );

      }

      return () => {

        for ( let i = 0, l = signals.length; i < l; i++ ) {

          signals[i].removeEventListener ( 'abort', abort );

        }

      };

    });

  }

  useCleanup ( abort );

  return aborter;

};

/* EXPORT */

export default useAbortController;
