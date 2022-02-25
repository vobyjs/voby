
/* IMPORT */

import type {Callback, Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useScheduler from './use_scheduler';

/* MAIN */

const useInterval = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  return useScheduler ({
    cancel: clearInterval,
    schedule: () => setInterval ( $$(callback), $$(ms) )
  });

};

/* EXPORT */

export default useInterval;
