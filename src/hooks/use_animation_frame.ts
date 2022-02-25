
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useScheduler from './use_scheduler';

/* MAIN */

const useAnimationFrame = ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer => {

  return useScheduler ({
    cancel: cancelAnimationFrame,
    schedule: () => requestAnimationFrame ( $$(callback) )
  });

};

/* EXPORT */

export default useAnimationFrame;
