
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {extend, isObservable} from '~/utils';
import type {ObservableMaybe, Child} from '~/types';

/* MAIN */

const Switch = <T> ({ when, children }: { when: ObservableMaybe<T>, children: any }): Child => {

  const data = children.map ( child => child () );
  const get = ( when: T ) => data.find ( datum => 'default' in datum || datum.when === when )?.children;

  if ( isObservable ( when ) ) {

    return useComputed ( () => {

      return get ( when () );

    });

  } else {

    return get ( when );

  }

};

/* UTILITIES */

Switch.Case = <T> ({ when, children }: { when: T, children: Child }): ((() => Child) & ({ when: T })) => {

  return extend ( () => children, { when } );

};

Switch.Default = ({ children }: { children: Child }): ((() => Child) & ({ default: boolean })) => {

  return extend ( () => children, { default: true } );

};

/* EXPORT */

export default Switch;
