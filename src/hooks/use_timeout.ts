
/* IMPORT */

import type {Callback, Disposer, ObservableMaybe} from '../types';
import $$ from '../$$';
import useScheduler from './use_scheduler';

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
