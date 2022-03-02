
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import useScheduler from './use_scheduler';

/* MAIN */

const useAnimationFrame = ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer => {

  return useScheduler ({
    callback,
    cancel: cancelAnimationFrame,
    schedule: requestAnimationFrame
  });

};

/* EXPORT */

export default useAnimationFrame;
