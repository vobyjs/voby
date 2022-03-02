
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import $$ from '../$$';
import useScheduler from './use_scheduler';

/* MAIN */

const useIdleCallback = ( callback: ObservableMaybe<IdleRequestCallback>, options?: ObservableMaybe<IdleRequestOptions> ): Disposer => {

  return useScheduler ({
    callback,
    cancel: cancelIdleCallback,
    schedule: callback => requestIdleCallback ( callback, $$(options) )
  });

};

/* EXPORT */

export default useIdleCallback;
