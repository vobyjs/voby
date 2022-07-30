
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import $$ from '~/methods/SS';
import untrack from '~/methods/untrack';
import type {Disposer, FN, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const useScheduler = <T, U> ({ loop, callback, cancel, schedule }: { loop?: FunctionMaybe<boolean>, callback: ObservableMaybe<FN<[U]>>, cancel: FN<[T]>, schedule: (( callback: FN<[U]> ) => T) }) : Disposer => {

  let tickId: T;

  const work = ( value: U ): void => {

    if ( $$(loop) ) tick ();

    $$(callback, false)( value );

  };

  const tick = (): void => {

    tickId = untrack ( () => schedule ( work ) );

  };

  const dispose = (): void => {

    untrack ( () => cancel ( tickId ) );

  };

  tick ();

  useCleanup ( dispose );

  return dispose;

};

/* EXPORT */

export default useScheduler;
