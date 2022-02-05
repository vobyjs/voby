
/* IMPORT */

import {normalizeChildren, setProps} from '~/setters';
import {isComponent, isElement, isFunction, isString} from '~/utils';
import {ViewComponent, ViewElement, ViewChild, ViewProps, ViewType} from '~/types';

/* MAIN */

const createElement = ( type: HTMLElement | ViewComponent | ViewType, props: ViewProps | null, ...children: ViewChild[] ): (() => ViewElement) => {

  return (): ViewElement => { // It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some cases

    const { children: _, key, ref, ...rest } = props || {};

    children = normalizeChildren ( children );
    props = { ...rest, children };

    if ( isElement ( type ) ) {

      return type;

    } else if ( isComponent ( type ) ) {

      const instance = new type ();
      const element = instance.render ( props );

      return element;

    } else if ( isFunction ( type ) ) {

      const element = type ( props );

      return element;

    } else if ( isString ( type ) ) {

      const element = document.createElement ( type );

      setProps ( element, props );

      return element;

    }

  };

};

/* EXPORT */

export default createElement;
