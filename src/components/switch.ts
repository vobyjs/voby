
/* IMPORT */

import type {Child, ChildWithMetadata, ObservableMaybe} from '../types';
import useComputed from '../hooks/use_computed';
import useResolved from '../hooks/use_resolved';
import {assign, isFunction} from '../utils/lang';

/* MAIN */

//TODO: Enforce children of Switch to be of type Switch.Case or Switch.Default

const Switch = <T> ({ when, children }: { when: ObservableMaybe<T>, children: Child[] }): Child => {

  const items = ( children as (() => ChildWithMetadata<{ default?: boolean, when?: T }>)[] ).map ( child => child () ); //TSC
  const child = ( when: T ) => items.find ( item => item.metadata.default || item.metadata.when === when );

  if ( isFunction ( when ) ) {

    return useComputed ( () => {

      return child ( useResolved ( when ) );

    });

  } else {

    return child ( when );

  }

};

/* UTILITIES */

Switch.Case = <T> ({ when, children }: { when: T, children: Child }): ChildWithMetadata<{ when: T }> => {

  return assign ( () => children, { metadata: { when } } );

};

Switch.Default = ({ children }: { children: Child }): ChildWithMetadata<{ default: boolean }> => {

  return assign ( () => children, { metadata: { default: true } } );

};

/* EXPORT */

export default Switch;
