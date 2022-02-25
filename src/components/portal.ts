
/* IMPORT */

import type {Child, ChildWithMetadata} from '../types';
import useCleanup from '../hooks/use_cleanup';
import render from '../render';
import {assign} from '../utils/lang';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Node | null, children: Child }): ChildWithMetadata<{ portal: HTMLDivElement }> => {

  const parent = mount || document.body;
  const portal = document.createElement ( 'div' );

  parent.insertBefore ( portal, null );

  const dispose = render ( children, portal );

  useCleanup ( () => {

    parent.removeChild ( portal );

    dispose ();

  });

  return assign ( () => null, { metadata: { portal } } );

};

/* EXPORT */

export default Portal;
