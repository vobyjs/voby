
/* IMPORT */

import type {Observable} from '../types';
import {$} from '../observable';
import useCleanup from './use_cleanup';

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
