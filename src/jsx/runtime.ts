
/* IMPORT */

import './types';
import Fragment from '~/components/fragment';
import createElement from '~/methods/create_element';
import type {Component, Element, Props} from '~/types';

/* MAIN */

const jsx = ( component: Component, props: Props ): Element => {

  return createElement ( component, props );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
