
/* IMPORT */

import {ViewElement} from '~/types';

/* MAIN */

abstract class Component<P = {}> {

  /* API */

  abstract render ( props: P ): ViewElement;

}

/* EXPORT */

export default Component;
