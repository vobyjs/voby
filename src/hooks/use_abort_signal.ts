
/* IMPORT */

import type {ArrayMaybe} from '../types';
import useAbortController from './use_abort_controller';

/* MAIN */

const useAbortSignal = ( signals: ArrayMaybe<AbortSignal> = [] ): AbortSignal => {

  return useAbortController ( signals ).signal;

};

/* EXPORT */

export default useAbortSignal;
