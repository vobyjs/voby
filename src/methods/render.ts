
/* IMPORT */

import useRoot from '~/hooks/use_root';
import useUntracked from '~/hooks/use_untracked';
import {setChild} from '~/utils/setters';
import type {Child, Disposer} from '~/types';

/* MAIN */

const render = ( child: Child, parent?: Element | null ): Disposer => {

  if ( !parent || !( parent instanceof HTMLElement ) ) throw new Error ( 'Invalid parent node' );

  parent.textContent = '';

  return useRoot ( dispose => {

    setChild ( parent, useUntracked ( child ) );

    return (): void => {

      dispose ();

      parent.textContent = '';

    };

  });

};

/* EXPORT */

export default render;
