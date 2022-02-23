
/* IMPORT */

import type {Callback, Disposer, ObservableMaybe} from '../types';
import {$$} from '../observable';
import useEffect from './use_effect';

/* MAIN */

const useTimeout = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  let timeoutId: ReturnType<typeof setTimeout>;

  const dispose = (): void => {

    clearTimeout ( timeoutId );

  };

  useEffect ( () => {

    timeoutId = setTimeout ( $$(callback), $$(ms) );

    return dispose;

  });

  return dispose;

};

/* EXPORT */

export default useTimeout;
