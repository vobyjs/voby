
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {$$} from '~/observable';
import type {Observable, ObservableReadonlyWithoutInitial, Child} from '~/types';

/* MAIN */

//TODO: Write this better, and more generally

const For = <T extends object> ({ values, children }: { values: Observable<Observable<T>[]>, children: (( value: Observable<T> ) => Child) }): ObservableReadonlyWithoutInitial<ObservableReadonlyWithoutInitial<Child>[]> => {

  const cache = new WeakMap<T, Child> ();

  return useComputed ( () => {

    return $$(values).map ( value => {

      return useComputed ( () => {

        const key = $$(value);
        const cached = cache.get ( key );

        if ( cached ) return cached;

        const result = children[0]( value ); //FIXME: `children[0]` shouldn't be needed

        cache.set ( key, result );

        return result;

      });

    });

  });

};

/* EXPORT */

export default For;
