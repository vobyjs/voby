
/* IMPORT */

import {$} from '~/observable';
import {setChild} from '~/setters';
import {Child, Disposer} from '~/types';

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
