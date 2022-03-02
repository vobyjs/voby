
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import $$ from '../$$';
import useScheduler from './use_scheduler';

/* MAIN */

const useIdleLoop = ( callback: ObservableMaybe<IdleRequestCallback>, options?: ObservableMaybe<IdleRequestOptions> ): Disposer => {

  return useScheduler ({
    callback,
    loop: true,
    cancel: cancelIdleCallback,
    schedule: callback => requestIdleCallback ( callback, $$(options) )
  });

};

/* EXPORT */

export default useIdleLoop;
