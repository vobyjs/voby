
/* IMPORT */

import oby from '~/oby';
import type {Child, ChildResolved, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const Ternary = ({ when, children }: { when: FunctionMaybe<unknown>, children: [Child, Child] }): ObservableReadonly<ChildResolved> => {

  return oby.ternary ( when, children[0], children[1] );

};

/* EXPORT */

export default Ternary;
