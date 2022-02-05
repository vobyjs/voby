
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import render from '~/render';
import {ViewElement} from '~/types';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Node, children: ViewElement }): null => {

  const anchor = mount || document.body;
  const container = document.createElement ( 'div' );

  anchor.insertBefore ( container, null );

  render ( children[0], container );

  useCleanup ( () => {

    anchor.removeChild ( container );

  });

  return null;

};

/* EXPORT */

export default Portal;
