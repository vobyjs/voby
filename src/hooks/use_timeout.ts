
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import useEffect from '~/hooks/use_effect';
import {$$} from '~/observable';
import type {Callback, Disposer, ObservableMaybe} from '~/types';

/* MAIN */

const useTimeout = ( callback: ObservableMaybe<Callback>, ms?: ObservableMaybe<number> ): Disposer => {

  let timeoutId: ReturnType<typeof setInterval>;

  const dispose = (): void => {

    clearTimeout ( timeoutId );

  };

  useEffect ( () => {

    timeoutId = setTimeout ( $$(callback), $$(ms) );

    useCleanup ( dispose );

  });

  return dispose;

};

/* EXPORT */

export default useTimeout;
