
/* IMPORT */

import untrack from '~/methods/untrack';
import wrapElement from '~/methods/wrap_element';
import {createHTMLNode, createSVGNode} from '~/utils/creators';
import {isFunction, isNode, isObject, isString, isSVGElement, isVoidChild} from '~/utils/lang';
import {setChild, setProps} from '~/utils/setters';
import type {Child, Component, Element} from '~/types';

/* MAIN */

// It's important to wrap components, so that they can be executed in the right order, from parent to child, rather than from child to parent in some cases

const createElement = <P = {}> ( component: Component<P>, _props?: P | null, ..._children: Child[] ): Element => {

  const children = _children.length > 1 ? _children : ( _children.length > 0 ? _children[0] : undefined );
  const hasChildren = !isVoidChild ( children );

  if ( hasChildren && isObject ( _props ) && 'children' in _props ) {

    throw new Error ( 'Providing "children" both as a prop and as rest arguments is forbidden' );

  }

  if ( isFunction ( component ) ) {

    const props = hasChildren ? { ..._props, children } : _props;

    return wrapElement ( () => {

      return untrack ( () => component.call ( component, props as P ) ); //TSC

    });

  } else if ( isString ( component ) ) {

    const isSVG = isSVGElement ( component );
    const createNode = isSVG ? createSVGNode : createHTMLNode;

    return wrapElement ( (): Child => {

      const child = createNode ( component ) as HTMLElement; //TSC

      if ( isSVG ) child['isSVG'] = true;

      untrack ( () => {

        if ( _props ) {
          setProps ( child, _props );
        }

        if ( hasChildren ) {
          setChild ( child, children );
        }

      });

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
