
/* IMPORT */

import type {Child, FunctionMaybe} from '../types';
import useComputed from '../hooks/use_computed';
import {isFunction} from '../utils/lang';

/* MAIN */

const Ternary = ({ when, children }: { when: FunctionMaybe<boolean>, children: [Child, Child] }): Child => {

  if ( isFunction ( when ) ) {

    return useComputed ( () => {

      if ( when () ) return children[0];

      return children[1];

    });

  } else {

    if ( when ) return children[0];

    return children[1];

  }

};

/* EXPORT */

export default Ternary;
