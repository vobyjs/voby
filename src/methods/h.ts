
/* IMPORT */

import createElement from '~/methods/create_element';
import type {Child, ChildStatic, ComponentIntrinsicElement, ComponentNode, Component, Element, Props} from '~/types';

/* MAIN */

function h <T extends ComponentIntrinsicElement> ( component: T, props: Props | null, children: ChildStatic | (() => Child) ): Element<JSX.IntrinsicElementsMap[T]>;
function h <T extends ComponentNode> ( component: T | (() => T), props: Props | null, children: ChildStatic | (() => Child) ): Element<T>;
function h ( component: Component, props: Props | null, children: ChildStatic | (() => Child) ): Element;
function h ( component: Component, props: Props | null, children: ChildStatic | (() => Child) ): Element {

  return createElement ( component, props, children );

}

/* EXPORT */

export default h;
