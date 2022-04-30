
/* IMPORT */

import createElement from '~/methods/create_element';
import type {Child, ChildResolved, ComponentIntrinsicElement, ComponentNode, Component, Props} from '~/types';

/* MAIN */

function h <T extends ComponentIntrinsicElement> ( component: T, props: Props | null, children: ChildResolved | (() => Child) ): (() => JSX.IntrinsicElementsMap[T]);
function h <T extends ComponentNode> ( component: T | (() => T), props: Props | null, children: ChildResolved | (() => Child) ): (() => T);
function h ( component: Component, props: Props | null, children: ChildResolved | (() => Child) ): (() => Child);
function h ( component: Component, props: Props | null, children: ChildResolved | (() => Child) ): (() => Child) {

  return createElement ( component, props, children );

}

/* EXPORT */

export default h;
