
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {NOOP} from '../constants';
import {$$} from '../observable';
import useAnimationFrame from './use_animation_frame';
import useEffect from './use_effect';

/* MAIN */

const useAnimationLoop = ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer => {

  let dispose: Disposer = NOOP;

  useEffect ( () => {

    callback = $$(callback);

    const schedule = (): void => {

      dispose = useAnimationFrame ( ( time: DOMHighResTimeStamp ) => {

        callback ( time );

        schedule ();

      });

    };

    schedule ();

  });

  return dispose;

};

/* EXPORT */

export default useAnimationLoop;
