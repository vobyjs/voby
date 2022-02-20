
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import useEffect from '~/hooks/use_effect';
import {$$} from '~/observable';
import type {Callback, Disposer, ObservableMaybe} from '~/types';

/* MAIN */

const useInterval = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  let intervalId: ReturnType<typeof setInterval>;

  const dispose = (): void => {

    clearInterval ( intervalId );

  };

  useEffect ( () => {

    intervalId = setInterval ( $$(callback), $$(ms) );

    useCleanup ( dispose );

  });

  return dispose;

};

/* EXPORT */

export default useInterval;
