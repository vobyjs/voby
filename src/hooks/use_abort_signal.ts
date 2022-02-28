
/* IMPORT */

import useAbortController from './use_abort_controller';

/* MAIN */

const useAbortSignal = ( signals?: AbortSignal[] ): AbortSignal => {

  return useAbortController ( signals ).signal;

};

/* EXPORT */

export default useAbortSignal;
