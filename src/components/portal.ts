
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import render from '~/render';
import {extend} from '~/utils';
import type {Child, ChildWithMetadata} from '~/types';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Node, children: Child }): ChildWithMetadata<{ portal: HTMLDivElement }> => {

  const parent = mount || document.body;
  const portal = document.createElement ( 'div' );

  parent.insertBefore ( portal, null );

  const dispose = render ( children, portal );

  useCleanup ( () => {

    parent.removeChild ( portal );

    dispose ();

  });

  return extend ( () => null, { metadata: { portal } } );

};

/* EXPORT */

export default Portal;
