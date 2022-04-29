
/* IMPORT */

import useScheduler from '~/hooks/use_scheduler';
import $$ from '~/methods/SS';
import type {Disposer, ObservableMaybe} from '~/types';

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
