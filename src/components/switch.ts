
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {isObservable} from '~/utils';
import type {ObservableMaybe, Child} from '~/types';

/* MAIN */

const Switch = <T> ({ when, children }: { when: ObservableMaybe<T>, children: (() => ({ when: T, children: Child } | { default: true, children: Child }))[] }): Child => {

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

Switch.Case = <T> ({ when, children }: { when: T, children: Child }): { when: T, children: Child } => {

  return { when, children };

};

Switch.Default = ({ children }: { children: Child }): { default: true, children: Child } => {

  return { default: true, children };

};

/* EXPORT */

export default Switch;
