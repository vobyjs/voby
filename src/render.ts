
/* IMPORT */

import type {Child, Disposer} from './types';
import {$} from './observable';
import {setChild} from './setters';

/* MAIN */

const render = ( child: Child, parent: HTMLElement ): Disposer => {

  let disposeRoot: Disposer;

  parent.textContent = '';

  $.root ( dispose => {

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
