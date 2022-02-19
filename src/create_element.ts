
/* IMPORT */

import {setProps, setRef} from '~/setters';
import {isComponentClass, isFunction, isNode, isString} from '~/utils';
import type {Child, Component, Props} from '~/types';

/* MAIN */

const createElement = ( component: Component, props: Props | null, ...children: Child[] ): (() => Child) => {

  return (): Child => { // It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some cases

    const { children: _, key, ref, ...rest } = props || {};

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
