
/* IMPORT */

import useScheduler from '~/hooks/use_scheduler';
import $$ from '~/methods/SS';
import type {Callback, Disposer, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const useInterval = ( callback: ObservableMaybe<Callback>, ms?: FunctionMaybe<number> ): Disposer => {

  return useScheduler ({
    callback,
    cancel: clearInterval,
    schedule: callback => setInterval ( callback, $$(ms) )
  });

};

/* EXPORT */

export default useInterval;
