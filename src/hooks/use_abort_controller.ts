
/* IMPORT */

import useCleanup from './use_cleanup';

/* MAIN */

const useAbortController = (): AbortController => {

  const aborter = new AbortController ();

  useCleanup ( () => {

    aborter.abort ();

  });

  return aborter;

};

/* EXPORT */

export default useAbortController;
