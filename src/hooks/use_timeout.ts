
/* IMPORT */

import useScheduler from '~/hooks/use_scheduler';
import $$ from '~/methods/SS';
import type {Callback, Disposer, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const useTimeout = ( callback: ObservableMaybe<Callback>, ms?: FunctionMaybe<number> ): Disposer => {

  return useScheduler ({
    callback,
    once: true,
    cancel: clearTimeout,
    schedule: callback => setTimeout ( callback, $$(ms) )
  });

};

/* EXPORT */

export default useTimeout;
