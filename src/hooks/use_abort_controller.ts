
/* IMPORT */

import useCleanup from './use_cleanup';

/* MAIN */

//TODO: Support parent signals, and use it in useFetch

const useAbortController = (): AbortController => {

  const aborter = new AbortController ();
  const abort = aborter.abort.bind ( aborter );

  useCleanup ( abort );

  return aborter;

};

/* EXPORT */

export default useAbortController;
