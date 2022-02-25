
/* IMPORT */

import type {Disposer} from '../types';
import {$} from '../observable';
import useCleanup from './use_cleanup';

/* MAIN */

const useScheduler = <T> ({ cancel, schedule }: { cancel: (( id: T ) => void), schedule: (() => T) }) : Disposer => {

  const id = $.sample ( schedule );

  const dispose = () => $.sample ( () => cancel ( id ) );

  useCleanup ( dispose );

  return dispose;

};

/* EXPORT */

export default useScheduler;
