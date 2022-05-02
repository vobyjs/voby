
/* IMPORT */

import oby from '~/oby';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const If = ({ when, fallback, children }: { when: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  return oby.ternary ( when, children, fallback );

};

/* EXPORT */

export default If;
