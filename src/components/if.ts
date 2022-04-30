
/* IMPORT */

import Ternary from '~/components/ternary';
import type {Child, ChildResolved, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const If = ({ when, fallback, children }: { when: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<ChildResolved> => {

  return Ternary ({ when, children: [children, fallback] });

};

/* EXPORT */

export default If;
