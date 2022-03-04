
/* IMPORT */

import './types';
import type {Child, Component, Props} from '../types';
import Fragment from '../components/fragment';
import createElement from '../create_element';

/* MAIN */

const jsx = ( component: Component, props: Props, key?: unknown ): (() => Child) => {

  return createElement ( component, props );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
