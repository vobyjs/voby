
/* IMPORT */

import type {Disposer} from '../types';
import sample from '../sample';
import useCleanup from './use_cleanup';

/* MAIN */

const useSchedulerLoop = <T> ({ cancel, schedule }: { cancel: (( id: T ) => void), schedule: (( cb: (() => void) ) => T) }) : Disposer => {

  let id: T;

  const loop = () => id = sample ( () => schedule ( loop ) );
  const dispose = () => sample ( () => cancel ( id ) );

  loop ();

  useCleanup ( dispose );

  return dispose;

};

/* EXPORT */

export default useSchedulerLoop;
