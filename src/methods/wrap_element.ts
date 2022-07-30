
/* IMPORT */

import {SYMBOL_ELEMENT, SYMBOL_RESOLVE_UNWRAPPED, SYMBOL_UNTRACKED} from '~/constants';
import untrack from '~/methods/untrack';
import type {Child, FunctionMaybe} from '~/types';

/* HELPERS */

const {prototype} = Function;
const {setPrototypeOf} = Object;

/* MAIN */

function wrapElement ( this: FunctionMaybe<Child> ): Child {

  return untrack ( this );

}

setPrototypeOf ( wrapElement, setPrototypeOf ( { [SYMBOL_ELEMENT]: true, [SYMBOL_RESOLVE_UNWRAPPED]: true, [SYMBOL_UNTRACKED]: true }, prototype ) );

/* EXPORT */

export default wrapElement;
