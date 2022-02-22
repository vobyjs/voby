
/* IMPORT */

import type {Child, ObservableMaybe, ObservableReadonlyWithoutInitial} from '../types';
import useComputed from '../hooks/use_computed';
import {$$} from '../observable';

/* MAIN */

//TODO: Write this better, with much much better performance and generality

const For = <T, V extends ObservableMaybe<T>, VV extends ObservableMaybe<V[]>> ({ values, children }: { values: VV, children: (( value: T, index: number, values: V[] ) => Child) }): ObservableReadonlyWithoutInitial<ObservableReadonlyWithoutInitial<Child>[]> => {

  return useComputed ( () => {

    return ($$(values) as V[] ).map ( ( value: V, index: number, values: V[] ) => { //TSC

      return useComputed ( () => {

        return children ( $$(value) as T, index, values ); //TSC

      });

    });

  });

};

/* EXPORT */

export default For;
