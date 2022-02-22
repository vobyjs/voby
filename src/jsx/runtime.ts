
/* IMPORT */

import './types';
import type {Child, Component, Props, Key} from '../types';
import createElement from '../create_element';
import Fragment from '../components/fragment';
import {castArray} from '../utils'

/* MAIN */

const jsx = ( component: Component, props: Props | null, key?: Key ): (() => Child) => {

  props = props || {};

  props.key = key;

  const children = castArray ( props.children || [] );

  return createElement ( component, props, ...children );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
