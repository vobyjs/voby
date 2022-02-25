
/* IMPORT */

import type {Child, ObservableReadonlyWithoutInitial, Resolvable} from '../types';
import useComputed from '../hooks/use_computed';
import useResolved from '../hooks/use_resolved';
import {$} from '../observable';
import {resolveChild} from '../utils/resolvers';

/* MAIN */

//TODO: Write and test this much much better

const For = <T> ({ values, children }: { values: Resolvable<T[]>, children: (( value: T ) => Child) }): ObservableReadonlyWithoutInitial<Child[]> => {

  let prev = new Map<T, Child> ();

  return useComputed ( () => {

    const next = new Map<T, Child> ();

    const resolved = useResolved ( values );

    return $.sample ( () => {

      const results = resolved.map ( ( value: T ): Child => {

        const result = prev.has ( value ) ? prev.get ( value ) : resolveChild ( children ( value ) );

        next.set ( value, result );

        return result;

      });

      prev = next;

      return results;

    });

  });

};

/* EXPORT */

export default For;
