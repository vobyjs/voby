
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useEffect from './use_effect';

/* MAIN */

const useAnimationFrame = ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer => {

  let animationId: number;

  const dispose = (): void => {

    cancelAnimationFrame ( animationId );

  };

  useEffect ( () => {

    animationId = requestAnimationFrame ( $$(callback) );

    return dispose;

  });

  return dispose;

};

/* EXPORT */

export default useAnimationFrame;
