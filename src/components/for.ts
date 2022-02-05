
/* IMPORT */

import {$, $$} from '~/observable';
import {Observable, ViewComponent} from '~/types';

/* MAIN */

const For = <T> ({ values, children }: { values: Observable<Observable<T>[]>, children: (( value: T ) => ViewComponent) }): Observable<Observable<ViewComponent>[]> => {

  const cache = new WeakMap<T, ViewComponent> ();

  return $.computed ( () => {

    return $$(values).map ( value => {

      return $.computed ( () => {

        const key = $$(value);
        const cached = cache.get ( key );

        if ( cached ) return cached;

        const result = children[0]( value )();

        cache.set ( key, result );

        return result;

      });

    });

  });

};

/* EXPORT */

export default For;
