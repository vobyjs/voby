
/* IMPORT */

import type {Callback, Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useScheduler from './use_scheduler';

/* MAIN */

const useTimeout = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  return useScheduler ({
    cancel: clearTimeout,
    schedule: () => setTimeout ( $$(callback), $$(ms) )
  });

};

/* EXPORT */

export default useTimeout;
