
/* IMPORT */

import type {Child, Resolvable} from '../types';
import useComputed from '../hooks/use_computed';
import useResolved from '../hooks/use_resolved';
import {isFunction} from '../utils/lang';

/* MAIN */

const If = ({ when, children }: { when: Resolvable<boolean>, children: Child }): Child => {

  if ( isFunction ( when ) ) {

    return useComputed ( () => {

      if ( useResolved ( when, true ) ) return children;

    });

  } else {

    if ( when ) return children;

  }

};

/* EXPORT */

export default If;
