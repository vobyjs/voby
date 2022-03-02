
/* IMPORT */

import type {Callback, Disposer, ObservableMaybe} from '../types';
import $$ from '../$$';
import useScheduler from './use_scheduler';

/* MAIN */

const useInterval = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  return useScheduler ({
    callback,
    cancel: clearInterval,
    schedule: callback => setInterval ( callback, $$(ms) )
  });

};

/* EXPORT */

export default useInterval;
