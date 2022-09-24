
/* IMPORT */

import BaseComponent from '~/components/component';
import wrapElement from '~/methods/wrap_element';
import {createHTMLNode, createSVGNode} from '~/utils/creators';
import {isFunction, isNil, isNode, isString, isSVGElement, isVoidChild} from '~/utils/lang';
import {setProps, setRef} from '~/utils/setters';
import type {Child, Component, Element, Props} from '~/types';

/* MAIN */

//TODO: Resolve ahead of time If's and other components that have static conditions

// It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some cases

const createElement = <P = {}> ( component: Component<P>, props?: P | null, ..._children: Child[] ): Element => {

  const { children: __children, key, ref, class: cls, ...rest } = ( props || {} ) as Props; //TSC
  const children = ( _children.length === 1 ) ? _children[0] : ( _children.length === 0 ) ? __children : _children;

  if ( !isNil ( cls ) ) {

    rest.class = cls; // Ensuring "class" is always set after "className"

  }

  if ( !isNil ( rest.className ) && isString ( rest.class ) ) {

    throw new Error ( 'Invalid class prop, it can only be null, undefined, an array or an object when className is provided too' );

  }

  if ( isFunction ( component ) ) {

    if ( BaseComponent.isPrototypeOf ( component ) ) { //TODO: Maybe replace this with a Symbol check, which allows for Component to be tree-shaken off

      const props = rest;

      if ( !isNil ( children ) ) props.children = children;

      return wrapElement ( (): Child => {

        const instance = new component ( props );
        const child = instance.render ( instance.props, instance.state );

        if ( !isNil ( ref ) ) setRef ( instance, ref );

        return child;

      });

    } else {

      const props = rest;

      if ( !isNil ( children ) ) props.children = children;
      if ( !isNil ( ref ) ) props.ref = ref;

      return wrapElement ( component.bind ( undefined, props as P ) ); //TSC

    }

  } else if ( isString ( component ) ) {

    const props = rest;
    const isSVG = isSVGElement ( component );
    const createNode = isSVG ? createSVGNode : createHTMLNode;

    if ( !isVoidChild ( children ) ) props.children = children;
    if ( !isNil ( ref ) ) props.ref = ref;

    return wrapElement ( (): Child => {

      const child = createNode ( component ) as HTMLElement; //TSC

      if ( isSVG ) child['isSVG'] = true;

      setProps ( child, props );

      return child;

    });

  } else if ( isNode ( component ) ) {

    return wrapElement ( component );

  } else {

    throw new Error ( 'Invalid component' );

  }

};

/* EXPORT */

export default createElement;
