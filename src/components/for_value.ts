
/* IMPORT */

import {forValue} from '~/oby';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* HELPERS */

type Valued<T = unknown> = T extends ObservableReadonly<infer U> ? ObservableReadonly<U> : ObservableReadonly<T>;

/* MAIN */

const ForValue = <T> ({ values, fallback, children }: { values: FunctionMaybe<readonly T[]>, fallback?: Child, children: (( value: Valued<T>, index: ObservableReadonly<number> ) => Child) }): ObservableReadonly<Child> => {

  return forValue ( values, children, fallback );

};

/* EXPORT */

export default ForValue;
