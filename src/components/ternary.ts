
/* IMPORT */

import oby from '~/oby';
import useSampleElement from '~/hooks/use_sample_element';
import type {Child, ChildResolved, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const Ternary = ({ when, children }: { when: FunctionMaybe<unknown>, children: [Child, Child] }): ObservableReadonly<ChildResolved> => {

  return oby.ternary ( when, () => useSampleElement ( children[0] ), () => useSampleElement ( children[1] ) );

};

/* EXPORT */

export default Ternary;
