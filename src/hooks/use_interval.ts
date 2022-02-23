
/* IMPORT */

import type {Callback, Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useEffect from './use_effect';

/* MAIN */

const useInterval = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  let intervalId: ReturnType<typeof setInterval>;

  const dispose = (): void => {

    clearInterval ( intervalId );

  };

  useEffect ( () => {

    intervalId = setInterval ( $$(callback), $$(ms) );

    return dispose;

  });

  return dispose;

};

/* EXPORT */

export default useInterval;
