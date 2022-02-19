
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {isObservable} from '~/utils';
import type {ObservableMaybe, Child} from '~/types';

/* MAIN */

const Ternary = ({ when, children }: { when: ObservableMaybe<boolean>, children: Child[] }): Child => {

  if ( isObservable ( when ) ) {

    return useComputed ( () => {

      if ( when () ) return children[0];

      return children[1];

    });

  } else {

    if ( when ) return children[0];

    return children[1];

  }

};

/* EXPORT */

export default Ternary;
