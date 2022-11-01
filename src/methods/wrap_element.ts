
/* IMPORT */

import {SYMBOL_UNTRACKED_UNWRAPPED} from '~/constants';
import untrack from '~/methods/untrack';
import type {Child, Element, FunctionMaybe} from '~/types';

/* MAIN */

function untrackThis ( this: FunctionMaybe<Child> ): Child {

  return untrack ( this );

}

function wrapElement ( element: FunctionMaybe<Child> ): Element {

  const wrapped = untrackThis.bind ( element );

  wrapped[SYMBOL_UNTRACKED_UNWRAPPED] = true;

  return wrapped;

}

/* EXPORT */

export default wrapElement;
