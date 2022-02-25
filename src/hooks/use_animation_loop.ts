
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useSchedulerLoop from './use_scheduler_loop';

/* MAIN */

const useAnimationLoop = ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer => {

  return useSchedulerLoop ({
    cancel: cancelAnimationFrame,
    schedule: loop => {
      const cb = $$(callback);
      return requestAnimationFrame ( time => {
        loop ();
        cb ( time );
      });
    }
  });

};

/* EXPORT */

export default useAnimationLoop;
