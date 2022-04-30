
/* IMPORT */

import oby from '~/oby';
import useSample from '~/hooks/use_sample';
import type {Child, ChildResolved, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const For = <T> ({ values, fallback, children }: { values: FunctionMaybe<T[]>, fallback?: Child, children: (( value: T ) => Child) }): ObservableReadonly<ChildResolved[] | ChildResolved> => {

  return oby.for ( values, children, () => useSample ( fallback ) );

};

/* EXPORT */

export default For;
