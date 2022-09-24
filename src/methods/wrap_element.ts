
/* IMPORT */

import {SYMBOL_ELEMENT, SYMBOL_RESOLVE_UNWRAPPED, SYMBOL_UNTRACKED} from '~/constants';
import untrack from '~/methods/untrack';
import type {Child, Element, FunctionMaybe} from '~/types';

/* MAIN */

function untrackThis ( this: FunctionMaybe<Child> ): Child {

  return untrack ( this );

}

function wrapElement ( element: FunctionMaybe<Child> ): Element {

  const wrapped = untrackThis.bind ( element );

  wrapped[SYMBOL_ELEMENT] = true;
  wrapped[SYMBOL_RESOLVE_UNWRAPPED] = true;
  wrapped[SYMBOL_UNTRACKED] = true;

  return wrapped;

}

/* EXPORT */

export default wrapElement;
