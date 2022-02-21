
/* IMPORT */

import './types';
import createElement from '../create_element';
import Fragment from '../components/fragment';

/* MAIN */

const jsx = ( type, props, key ) => {

  props ||= {};

  props.key = key;

  const children = props.children || [];

  return createElement ( type, props, ...children );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
