
/* IMPORT */

import type {Child} from '~/types';

/* MAIN */

class Component<P = {}> {

  /* VARIABLES */

  props: P;
  state: {};

  /* CONSTRUCTOR */

  constructor ( props: P ) {

    this.props = props;
    this.state = {};

  }

  /* API */

  render ( props: this['props'], state: this['state'] ): Child {

    throw new Error ( 'Missing render function' );

  }

}

/* EXPORT */

export default Component;
