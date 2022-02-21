
/* IMPORT */

import type {Child, ObservableReadonlyWithoutInitial, ObservableResolver} from '../types';
import useComputed from '../hooks/use_computed';
import {$$} from '../observable';

/* MAIN */

//TODO: Write this better, with much much better performance and generality

const For = <T, V extends ObservableResolver<T>, VV extends ObservableResolver<V[]>> ({ values, children }: { values: VV, children: (( value: T, index: number, values: V[] ) => Child) }): ObservableReadonlyWithoutInitial<ObservableReadonlyWithoutInitial<Child>[]> => {

  return useComputed ( () => {

    return ( $$(values) as any ).map ( ( value: V, index: number, values: V[] ) => {

      return useComputed ( () => {

        return children ( $$(value) as any, index, values );

      });

    });

  });

};

/* EXPORT */

export default For;
