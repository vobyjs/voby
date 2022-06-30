
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import render from '~/methods/render';
import {createHTMLNode} from '~/utils/creators';
import {assign} from '~/utils/lang';
import type {Child, ChildWithMetadata} from '~/types';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Element | null, children: Child }): ChildWithMetadata<{ portal: HTMLElement }> => {

  const parent = mount || document.body;
  const portal = createHTMLNode ( 'div' );

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
