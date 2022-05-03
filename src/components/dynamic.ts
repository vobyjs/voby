
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import createElement from '~/methods/create_element';
import $$ from '~/methods/SS';
import type {Child, Component, ObservableMaybe, Props} from '~/types';

/* MAIN */

const Dynamic = ({ component, props, children }: { component: Component, props?: ObservableMaybe<Props | null>, children: Child }): Child => {

  return useComputed ( () => {

    return createElement ( $$(component), $$(props ?? null), children );

  });

};

/* EXPORT */

export default Dynamic;
