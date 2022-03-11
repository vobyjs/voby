
/* IMPORT */

import type {Child, Component} from '../types';
import createElement from '../create_element';

/* MAIN */

const Dynamic = <P = {}> ({ component, props, children }: { component: Component<P>, props?: P, children: Child }): Child => {

  return createElement ( component, props ?? null, children );

};

/* EXPORT */

export default Dynamic;
