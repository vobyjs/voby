
/* IMPORT */

import createElement from '~/methods/create_element';
import type {Child, Component, Props} from '~/types';

/* MAIN */

const Dynamic = ({ component, props, children }: { component: Component, props?: Props | null, children: Child }): (() => Child) => {

  return createElement ( component, props ?? null, children );

};

/* EXPORT */

export default Dynamic;
