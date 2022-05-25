
/* IMPORT */

import {ternary} from '~/oby';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const If = ({ when, fallback, children }: { when: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  return ternary ( when, children, fallback );

};

/* EXPORT */

export default If;
