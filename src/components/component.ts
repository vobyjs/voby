
/* IMPORT */

import type {Child} from '../types';

/* MAIN */

abstract class Component<P = {}, S = {}> {

  /* VARIABLES */

  state: S;

  /* API */

  abstract render ( props: P ): Child;

}

/* EXPORT */

export default Component;
