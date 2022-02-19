
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import render from '~/render';
import {Child} from '~/types';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Node, children: Child[] }): void => {

  const parent = mount || document.body;
  const wrapper = document.createElement ( 'div' );

  parent.insertBefore ( wrapper, null );

  render ( children, wrapper );

  useCleanup ( () => {

    parent.removeChild ( wrapper );

  });

};

/* EXPORT */

export default Portal;
