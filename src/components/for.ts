
/* IMPORT */

import type {Child, ObservableMaybe, ObservableReadonlyWithoutInitial} from '../types';
import useComputed from '../hooks/use_computed';
import {$$} from '../observable';
import {isObservable} from '../utils';

/* MAIN */

//TODO: Write this with much much better performance

const For = <T> ({ values, children }: { values: ObservableMaybe<ObservableMaybe<T>[]>, children: (( value: T, index: number ) => Child) }): ObservableReadonlyWithoutInitial<Child[]> => {

  return useComputed ( () => {

    return $$(values).map ( ( value: ObservableMaybe<T>, index: number ) => {

      if ( isObservable ( value ) ) {

        return useComputed ( () => {

          return children ( value (), index );

        });

      } else {

        return children ( value, index );

      }

    });

  });

};

/* EXPORT */

export default For;
