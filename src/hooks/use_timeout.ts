
/* IMPORT */

import useScheduler from '~/hooks/use_scheduler';
import $$ from '~/methods/SS';
import type {Callback, Disposer, ObservableMaybe} from '~/types';

/* MAIN */

const useTimeout = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  return useScheduler ({
    callback,
    cancel: clearTimeout,
    schedule: callback => setTimeout ( callback, $$(ms) )
  });

};

/* EXPORT */

export default useTimeout;
