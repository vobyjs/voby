
/* IMPORT */

import oby from '~/oby';
import type {Child, ChildResolved, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const If = ({ when, fallback, children }: { when: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<ChildResolved> => {

  return oby.if ( when, children, fallback );

};

/* EXPORT */

export default If;
