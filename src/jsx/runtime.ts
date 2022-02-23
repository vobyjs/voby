
/* IMPORT */

import './types';
import type {Child, Component, Props, Key} from '../types';
import Fragment from '../components/fragment';
import createElement from '../create_element';

/* MAIN */

const jsx = ( component: Component, props: Props, key?: Key ): (() => Child) => {

  if ( key ) { // It's probably better/faster not to change the shape of "props" if not necessary

    props.key = key;

  }

  return createElement ( component, props );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
