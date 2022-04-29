
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import useSample from '~/hooks/use_sample';
import $$ from '~/methods/SS';
import type {Disposer, FN, ObservableMaybe} from '~/types';

/* MAIN */

const useScheduler = <T, U> ({ loop, callback, cancel, schedule }: { loop?: ObservableMaybe<boolean>, callback: ObservableMaybe<FN<[U]>>, cancel: FN<[T]>, schedule: (( callback: FN<[U]> ) => T) }) : Disposer => {

  let tickId: T;

  const work = ( value: U ): void => {

    if ( $$(loop) ) tick ();

    $$(callback)( value );

  };

  const tick = (): void => {

    tickId = useSample ( () => schedule ( work ) );

  };

  const dispose = (): void => {

    useSample ( () => cancel ( tickId ) );

  };

  tick ();

  useCleanup ( dispose );

  return dispose;

};

/* EXPORT */

export default useScheduler;
