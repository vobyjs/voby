
/* IMPORT */

import oby from '~/oby';
import type {Child, ChildResolved, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const For = <T> ({ values, fallback, children }: { values: FunctionMaybe<T[]>, fallback?: Child, children: (( value: T ) => Child) }): ObservableReadonly<ChildResolved[] | ChildResolved> => {

  return oby.for ( values, children, fallback );

};

/* EXPORT */

export default For;
