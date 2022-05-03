
/* IMPORT */

import useRoot from '~/hooks/use_root';
import {setChild} from '~/utils/setters';
import type {Child, Disposer} from '~/types';

/* MAIN */

const render = ( child: Child, parent?: HTMLElement | null ): Disposer => {

  if ( !parent ) throw new Error ( 'Invalid parent node' );

  parent.textContent = '';

  return useRoot ( dispose => {

    setChild ( parent, child );

    return (): void => {

      dispose ();

      parent.textContent = '';

    };

  });

};

/* EXPORT */

export default render;
