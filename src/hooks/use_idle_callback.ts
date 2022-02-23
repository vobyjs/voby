
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useEffect from './use_effect';

/* MAIN */

const useIdleCallback = ( callback: ObservableMaybe<IdleRequestCallback>, options?: ObservableMaybe<IdleRequestOptions> ): Disposer => {

  let idleId: number;

  const dispose = (): void => {

    cancelIdleCallback ( idleId );

  };

  useEffect ( () => {

    idleId = requestIdleCallback ( $$(callback), $$(options) );

    return dispose;

  });

  return dispose;

};

/* EXPORT */

export default useIdleCallback;
