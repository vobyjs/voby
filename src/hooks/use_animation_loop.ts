
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import useScheduler from './use_scheduler';

/* MAIN */

const useAnimationLoop = ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer => {

  return useScheduler ({
    callback,
    loop: true,
    cancel: cancelAnimationFrame,
    schedule: requestAnimationFrame
  });

};

/* EXPORT */

export default useAnimationLoop;
