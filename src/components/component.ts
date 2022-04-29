
/* IMPORT */

import type {Child} from '~/types';

/* MAIN */

class Component<P = {}> {

  /* VARIABLES */

  props: P;

  /* CONSTRUCTOR */

  constructor ( props: P ) {

    this.props = props;

  }

  /* API */

  render (): Child {

    throw new Error ( 'Missing render function' );

  }

}

/* EXPORT */

export default Component;
