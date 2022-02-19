
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import {$} from '~/observable';
import type {Observable} from '~/types';

/* MAIN */

const useDisposed = (): Observable<boolean> => {

  const disposed = $(false);

  useCleanup ( () => {

    disposed ( true );

  });

  return disposed;

};

/* EXPORT */

export default useDisposed;
