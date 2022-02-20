
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {isObservable} from '~/utils';
import type {ObservableMaybe, Child} from '~/types';

/* MAIN */

const If = ({ when, children }: { when: ObservableMaybe<boolean>, children: Child }): Child => {

  if ( isObservable ( when ) ) {

    return useComputed ( () => {

      if ( when () ) return children;

    });

  } else {

    if ( when ) return children;

  }

};

/* EXPORT */

export default If;
