
/* IMPORT */

import './types';
import Fragment from '~/components/fragment';
import createElement from '~/methods/create_element';
import type {Component, Element} from '~/types';

/* MAIN */

const jsx = <P = {}> ( component: Component<P>, props?: P | null, key?: unknown ): Element => {

  if ( key !== undefined ) throw new Error ( 'Using a prop named "key" is forbidden' );

  return createElement<P> ( component, props );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
