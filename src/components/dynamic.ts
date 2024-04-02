
/* IMPORT */

import useMemo from '~/hooks/use_memo';
import createElement from '~/methods/create_element';
import resolve from '~/methods/resolve';
import $$ from '~/methods/SS';
import {isFunction} from '~/utils/lang';
import type {Child, Component, FunctionMaybe} from '~/types';

/* MAIN */

const Dynamic = <P = {}> ({ component, props, children }: { component: Component<P>, props?: FunctionMaybe<P | null>, children?: Child }): Child => {

  if ( isFunction ( component ) || isFunction ( props ) ) {

    return useMemo ( () => {

      return resolve ( createElement<P> ( $$(component, false), $$(props), children ) );

    });

  } else {

    return createElement<P> ( component, props, children );

  }

};

/* EXPORT */

export default Dynamic;
