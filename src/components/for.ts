
/* IMPORT */

import oby from '~/oby';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const For = <T> ({ values, fallback, children }: { values: FunctionMaybe<T[]>, fallback?: Child, children: (( value: T ) => Child) }): ObservableReadonly<Child> => {

  return oby.for ( values, children, fallback );

};

/* EXPORT */

export default For;
