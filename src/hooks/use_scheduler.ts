
/* IMPORT */

import type {Disposer, FN, ObservableMaybe} from '../types';
import $$ from '../$$';
import sample from '../sample';
import useCleanup from './use_cleanup';

/* MAIN */

const useScheduler = <T, U> ({ loop, callback, cancel, schedule }: { loop?: ObservableMaybe<boolean>, callback: ObservableMaybe<FN<[U]>>, cancel: FN<[T]>, schedule: (( callback: FN<[U]> ) => T) }) : Disposer => {

  let tickId: T;

  const work = ( value: U ): void => {

    if ( $$(loop) ) tick ();

    $$(callback)( value );

  };

  const tick = (): void => {

    tickId = sample ( () => schedule ( work ) );

  };

  const dispose = (): void => {

    sample ( () => cancel ( tickId ) );

  };

  tick ();

  useCleanup ( dispose );

  return dispose;

};

/* EXPORT */

export default useScheduler;
