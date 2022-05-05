
/* IMPORT */

import './types';
import Fragment from '~/components/fragment';
import createElement from '~/methods/create_element';
import type {Component, Element, Props} from '~/types';

/* MAIN */

const jsx = <P = {}> ( component: Component<P>, props: Props | null ): Element => {

  return createElement<P> ( component, props );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
