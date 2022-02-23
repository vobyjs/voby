
/* IMPORT */

import useCleanup from './use_cleanup';

/* MAIN */

const useAbortController = (): AbortController => {

  const controller = new AbortController ();

  useCleanup ( () => {

    controller.abort ();

  });

  return controller;

};

/* EXPORT */

export default useAbortController;
