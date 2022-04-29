
/* IMPORT */

import './types';
import Fragment from '~/components/fragment';
import createElement from '~/methods/create_element';
import type {Child, Component, Props} from '~/types';

/* MAIN */

const jsx = ( component: Component, props: Props ): (() => Child) => {

  return createElement ( component, props );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
