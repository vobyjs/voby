
/* IMPORT */

import {$} from '~/observable';
import {normalizeChildren, setChildren} from '~/setters';
import {castArray} from '~/utils';
import {Disposer, ViewElement} from '~/types';

/* MAIN */

const render = ( element: (() => ViewElement), parent: HTMLElement ): Disposer => {

  let dispose: Disposer;

  $.root ( disposeRoot => {

    dispose = disposeRoot;

    const children = normalizeChildren ( castArray ( element () ) );

    setChildren ( parent, children );

  });

  return (): void => {

    dispose ();

    parent.textContent = ''; //TODO: Preserve pre-existing nodes instead

  };

};

/* EXPORT */

export default render;
