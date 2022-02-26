
/* IMPORT */

import type {Child, ObservableReadonlyWithoutInitial, Resolvable} from '../types';
import useComputed from '../hooks/use_computed';
import useResolved from '../hooks/use_resolved';
import sample from '../sample';
import {isObject} from '../utils/lang';
import {resolveChildDeep} from '../utils/resolvers';

/* MAIN */

//TODO: Write and test this much much better

const For = <T> ({ values, children }: { values: Resolvable<T[]>, children: (( value: T ) => Child) }): ObservableReadonlyWithoutInitial<Child[]> => {

  let cachePersistent = new WeakMap<any, Child> (); //TSC
  let cachePrevious = new Map<T, Child> ();

  return useComputed ( () => {

    const cacheNext = new Map<T, Child> ();

    const resolved = useResolved ( values );

    return sample ( () => { //FIXME: We want to sample here, but we want to be able to dispose of inner computations too

      const results = resolved.map ( ( value: T ): Child => {

        const isPersistent = isObject ( value );
        const cacheRead = isPersistent ? cachePersistent : cachePrevious;
        const cacheWrite = isPersistent ? cachePersistent : cacheNext;
        const result = cacheRead.has ( value ) ? cacheRead.get ( value ) : resolveChildDeep ( children ( value ) );

        cacheWrite.set ( value, result );

        return result;

      });

      cachePrevious = cacheNext;

      return results;

    });

  });

};

/* EXPORT */

export default For;
