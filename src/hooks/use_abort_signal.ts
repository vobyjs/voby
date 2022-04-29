
/* IMPORT */

import useAbortController from '~/hooks/use_abort_controller';
import type {ArrayMaybe} from '~/types';

/* MAIN */

const useAbortSignal = ( signals: ArrayMaybe<AbortSignal> = [] ): AbortSignal => {

  return useAbortController ( signals ).signal;

};

/* EXPORT */

export default useAbortSignal;
