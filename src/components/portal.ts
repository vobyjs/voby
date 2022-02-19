
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import render from '~/render';
import {Child} from '~/types';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Node, children: Child[] }): HTMLDivElement => {

  const parent = mount || document.body;
  const portal = document.createElement ( 'div' );

  parent.insertBefore ( portal, null );

  render ( children, portal );

  useCleanup ( () => {

    parent.removeChild ( portal );

  });

  return portal;

};

/* EXPORT */

export default Portal;
