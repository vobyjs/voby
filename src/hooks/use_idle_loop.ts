
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useSchedulerLoop from './use_scheduler_loop';

/* MAIN */

const useIdleLoop = ( callback: ObservableMaybe<IdleRequestCallback>, options?: ObservableMaybe<IdleRequestOptions> ): Disposer => {

  return useSchedulerLoop ({
    cancel: cancelIdleCallback,
    schedule: loop => {
      const cb = $$(callback);
      const opts = $$(options);
      return requestIdleCallback ( deadline => {
        loop ();
        cb ( deadline );
      }, opts );
    }
  });

};

/* EXPORT */

export default useIdleLoop;
