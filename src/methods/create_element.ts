
/* IMPORT */

import untrack from '~/methods/untrack';
import wrapElement from '~/methods/wrap_element';
import {createHTMLNode, createSVGNode} from '~/utils/creators';
import {isFunction, isNil, isNode, isString, isSVGElement, isVoidChild} from '~/utils/lang';
import {setProps} from '~/utils/setters';
import type {Child, Component, Element, Props} from '~/types';

/* MAIN */

// It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some cases

const createElement = <P = {}> ( component: Component<P>, props?: P | null, ..._children: Child[] ): Element => {

  const { children: __children, key, ref, ...rest } = ( props || {} ) as Props; //TSC
  const children = ( _children.length === 1 ) ? _children[0] : ( _children.length === 0 ) ? __children : _children;

  if ( isFunction ( component ) ) {

    const props = rest;

    if ( !isNil ( children ) ) props.children = children;
    if ( !isNil ( ref ) ) props.ref = ref;

    return wrapElement ( () => {

      return untrack ( () => component.call ( component, props as P ) ); //TSC

    });

  } else if ( isString ( component ) ) {

    const props = rest;
    const isSVG = isSVGElement ( component );
    const createNode = isSVG ? createSVGNode : createHTMLNode;

    if ( !isVoidChild ( children ) ) props.children = children;
    if ( !isNil ( ref ) ) props.ref = ref;

    return wrapElement ( (): Child => {

      const child = createNode ( component ) as HTMLElement; //TSC

      if ( isSVG ) child['isSVG'] = true;

      untrack ( () => setProps ( child, props ) );

      return child;

    });

  } else if ( isNode ( component ) ) {

    return wrapElement ( () => component );

  } else {

    throw new Error ( 'Invalid component' );

  }

};

/* EXPORT */

export default createElement;
