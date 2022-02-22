
/* IMPORT */

import type {Child, Disposer} from './types';
import useRoot from './hooks/use_root';
import {setChild} from './setters';

/* MAIN */

const render = ( child: Child, parent?: HTMLElement | null ): Disposer => {

  if ( !parent ) throw new Error ( 'Invalid parent node' );

  let disposeRoot: Disposer;

  parent.textContent = '';

  useRoot ( dispose => {

    disposeRoot = dispose;

    setChild ( parent, child );

  });

  return (): void => {

    disposeRoot ();

    parent.textContent = '';

  };

};

/* EXPORT */

export default render;
