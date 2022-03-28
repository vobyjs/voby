
/* IMPORT */

import type {Child, ChildWithMetadata} from '../types';
import useCleanup from '../hooks/use_cleanup';
import render from '../render';
import {createNode} from '../utils/creators';
import {assign} from '../utils/lang';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Node | null, children: Child }): ChildWithMetadata<{ portal: HTMLElement }> => {

  const parent = mount || document.body;
  const portal = createNode ( 'div' );

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
