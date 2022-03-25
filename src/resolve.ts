
/* IMPORT */

import type {Child, ChildResolved} from './types';
import {isFunction} from './utils/lang';

/* MAIN */

const resolve = ( child: Child ): ChildResolved => {

  while ( isFunction ( child ) ) {

    child = child ();

  }

  if ( Array.isArray ( child ) ) {

    const childResolved: ChildResolved[] = new Array ( child.length );

    for ( let i = 0, l = child.length; i < l; i++ ) {

      childResolved[i] = resolve ( child[i] );

    }

    return childResolved;

  }

  return child;

};

/* EXPORT */

export default resolve;
