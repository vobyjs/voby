
/* IMPORT */

import {Child} from '~/types';

/* MAIN */

abstract class Component<P = {}, S = {}> {

  /* VARIABLES */

  props: P;
  state: S;

  /* CONSTRUCTOR */

  constructor ( props: P ) {

    this.props = props;

  }

  /* API */

  abstract render (): Child;

}

/* EXPORT */

export default Component;
