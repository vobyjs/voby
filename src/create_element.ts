
/* IMPORT */

import type {Child, ComponentIntrinsicElement, ComponentNode, Component, Props} from './types';
import {setProps, setRef} from './setters';
import {isComponentClass, isFunction, isNode, isString} from './utils';

/* MAIN */

//TODO: Optimize this, pushing as much code as possible out of the wrapper function

function createElement <T extends ComponentIntrinsicElement> ( component: T, props: Props | null, ..._children: Child[] ): (() => JSX.IntrinsicElementsMap[T]);
function createElement <T extends ComponentNode> ( component: T | (() => T), props: Props | null, ..._children: Child[] ): (() => T);
function createElement ( component: Component, props: Props | null, ..._children: Child[] ): (() => Child);
function createElement ( component: Component, props: Props | null, ..._children: Child[] ): (() => Child) {

  return (): Child => { // It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some case

    const { children: _, key, ref, ...rest } = props || {};

    const children = ( _children.length === 1 ) ? _children[0] : _children;

    if ( isFunction ( component ) ) {

      if ( isComponentClass ( component ) ) {

        const props = { ...rest, children };
        const instance = new component ( props );
        const child = instance.render ();

        setRef ( instance, ref );

        return child;

      } else {

        const props = { ...rest, children, ref };
        const child = component ( props );

        return child;

      }

    } else if ( isString ( component ) ) {

      const props = { ...rest, children, ref };
      const child = document.createElement ( component );

      setProps ( child, props );

      return child;

    } else if ( isNode ( component ) ) {

      return component;

    } else {

      throw new Error ( 'Invalid component' );

    }

  };

};

/* EXPORT */

export default createElement;
