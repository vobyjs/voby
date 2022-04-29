
/* IMPORT */

import createElement from '~/methods/create_element';
import type {Child, Component} from '~/types';

/* MAIN */

const Dynamic = <P = {}> ({ component, props, children }: { component: Component<P>, props?: P, children: Child }): Child => {

  return createElement ( component, props ?? null, children );

};

/* EXPORT */

export default Dynamic;
