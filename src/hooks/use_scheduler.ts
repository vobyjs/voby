
/* IMPORT */

import useEffect from '~/hooks/use_effect';
import useSuspended from '~/hooks/use_suspended';
import $$ from '~/methods/SS';
import untrack from '~/methods/untrack';
import type {Disposer, FN, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const useScheduler = <T, U> ({ loop, once, callback, cancel, schedule }: { loop?: FunctionMaybe<boolean>, once?: boolean, callback: ObservableMaybe<FN<[U]>>, cancel: FN<[T]>, schedule: (( callback: FN<[U]> ) => T) }) : Disposer => {

  let executed = false;
  let suspended = useSuspended ();
  let tickId: T;

  const work = ( value: U ): void => {

    executed = true;

    if ( $$(loop) ) tick ();

    $$(callback, false)( value );

  };

  const tick = (): void => {

    tickId = untrack ( () => schedule ( work ) );

  };

  const dispose = (): void => {

    untrack ( () => cancel ( tickId ) );

  };

  useEffect ( () => {

    if ( once && executed ) return;

    if ( suspended () ) return;

    tick ();

    return dispose;

  }, { suspense: false } );

  return dispose;

};

/* EXPORT */

export default useScheduler;
