
/* IMPORT */

import {SYMBOL_ELEMENT} from '~/constants';
import useSample from '~/hooks/use_sample';
import type {Child, FunctionMaybe} from '~/types';

/* HELPERS */

const {prototype} = Function;
const {setPrototypeOf} = Object;

/* MAIN */

function wrapElement ( this: FunctionMaybe<Child> ): Child {

  return useSample ( this );

}

setPrototypeOf ( wrapElement, setPrototypeOf ( { [SYMBOL_ELEMENT]: true }, prototype ) );

/* EXPORT */

export default wrapElement;
