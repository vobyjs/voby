
/* IMPORT */

import type {Child, ChildWithMetadata, ObservableMaybe} from '../types';
import useComputed from '../hooks/use_computed';
import {extend, isObservable} from '../utils';

/* MAIN */

//TODO: Enforce children of Switch to be of type Switch.Case or Switch.Default

const Switch = <T> ({ when, children }: { when: ObservableMaybe<T>, children: Child[] }): Child => {

  const items = ( children as (() => ChildWithMetadata<{ default?: boolean, when?: T }>)[] ).map ( child => child () ); //TSC
  const child = ( when: T ) => items.find ( item => item.metadata.default || item.metadata.when === when );

  if ( isObservable ( when ) ) {

    return useComputed ( () => {

      return child ( when () );

    });

  } else {

    return child ( when );

  }

};

/* UTILITIES */

Switch.Case = <T> ({ when, children }: { when: T, children: Child }): ChildWithMetadata<{ when: T }> => {

  return extend ( () => children, { metadata: { when } } );

};

Switch.Default = ({ children }: { children: Child }): ChildWithMetadata<{ default: boolean }> => {

  return extend ( () => children, { metadata: { default: true } } );

};

/* EXPORT */

export default Switch;
