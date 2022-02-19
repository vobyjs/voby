
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import render from '~/render';
import {Child} from '~/types';

/* MAIN */

const Portal = ({ mount, children }: { mount?: Node, children: Child[] }): HTMLDivElement => {

  const parent = mount || document.body;
  const wrapper = document.createElement ( 'div' );

  parent.insertBefore ( wrapper, null );

  render ( children, wrapper );

  useCleanup ( () => {

    parent.removeChild ( wrapper );

  });

  return wrapper;

};

/* EXPORT */

export default Portal;
