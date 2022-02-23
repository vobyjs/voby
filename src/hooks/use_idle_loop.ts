
/* IMPORT */

import type {Disposer, ObservableMaybe} from '../types';
import {NOOP} from '../constants';
import {$$} from '../observable';
import useEffect from './use_effect';
import useIdleCallback from './use_idle_callback';

/* MAIN */

const useIdleLoop = ( callback: ObservableMaybe<IdleRequestCallback>, options?: ObservableMaybe<IdleRequestOptions> ): Disposer => {

  let dispose: Disposer = NOOP;

  useEffect ( () => {

    callback = $$(callback);
    options = $$(options);

    const schedule = (): void => {

      dispose = useIdleCallback ( ( deadline: IdleDeadline ) => {

        callback ( deadline );

        schedule ();

      }, options );

    };

    schedule ();

  });

  return dispose;

};

/* EXPORT */

export default useIdleLoop;
