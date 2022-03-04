
/* IMPORT */

import type {Child, FunctionMaybe} from '../types';
import useComputed from '../hooks/use_computed';
import {isFunction} from '../utils/lang';

/* MAIN */

const If = ({ when, children }: { when: FunctionMaybe<boolean>, children: Child }): Child => {

  if ( isFunction ( when ) ) {

    return useComputed ( () => {

      if ( when () ) return children;

    });

  } else {

    if ( when ) return children;

  }

};

/* EXPORT */

export default If;
