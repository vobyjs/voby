
/* IMPORT */

import type {Child, ObservableMaybe, ObservableReadonlyWithoutInitial} from '../types';
import useComputed from '../hooks/use_computed';
import {$, $$} from '../observable';
import {resolveChild} from '../setters';
import {isObject} from '../utils';

/* MAIN */

//TODO: Write this with much better performance

const For = <T> ({ values, children }: { values: ObservableMaybe<T[]>, children: (( value: T, index: number ) => Child) }): ObservableReadonlyWithoutInitial<Child[]> => {

  const cache = new WeakMap<object, Child> ();

  return useComputed ( () => {

    return $$(values).map ( ( value: T, index: number ) => {

      return $.sample ( () => {

        const key = isObject ( value ) ? value : undefined;

        if ( key && cache.has ( key ) ) return cache.get ( key );

        const child = resolveChild ( children ( value, index ) );

        if ( key ) cache.set ( key, child );

        return child;

      });

    });

  });

};

/* EXPORT */

export default For;
