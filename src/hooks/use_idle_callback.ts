
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useScheduler from './use_scheduler';

/* MAIN */

const useIdleCallback = ( callback: ObservableMaybe<IdleRequestCallback>, options?: ObservableMaybe<IdleRequestOptions> ): Disposer => {

  return useScheduler ({
    cancel: cancelIdleCallback,
    schedule: () => requestIdleCallback ( $$(callback), $$(options) )
  });

};

/* EXPORT */

export default useIdleCallback;
