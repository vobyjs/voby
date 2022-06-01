
/* IMPORT */

import {SYMBOL_ELEMENT, SYMBOL_RESOLVE_UNWRAPPED, SYMBOL_SAMPLED} from '~/constants';
import useSample from '~/hooks/use_sample';
import type {Child, FunctionMaybe} from '~/types';

/* HELPERS */

const {prototype} = Function;
const {setPrototypeOf} = Object;

/* MAIN */

function wrapElement ( this: FunctionMaybe<Child> ): Child {

  return useSample ( this );

}

setPrototypeOf ( wrapElement, setPrototypeOf ( { [SYMBOL_ELEMENT]: true, [SYMBOL_RESOLVE_UNWRAPPED]: true, [SYMBOL_SAMPLED]: true }, prototype ) );

/* EXPORT */

export default wrapElement;
