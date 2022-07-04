
/* IMPORT */

import useScheduler from '~/hooks/use_scheduler';
import $$ from '~/methods/SS';
import type {Disposer, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const useIdleCallback = ( callback: ObservableMaybe<IdleRequestCallback>, options?: FunctionMaybe<IdleRequestOptions> ): Disposer => {

  return useScheduler ({
    callback,
    cancel: cancelIdleCallback,
    schedule: callback => requestIdleCallback ( callback, $$(options) )
  });

};

/* EXPORT */

export default useIdleCallback;
