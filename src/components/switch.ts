
/* IMPORT */

import {switch as _switch} from '~/oby';
import {assign, castArray} from '~/utils/lang';
import type {Child, ChildWithMetadata, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

//TODO: Enforce children of Switch to be of type Switch.Case or Switch.Default

const Switch = <T> ({ when, fallback, children }: { when: FunctionMaybe<T>, fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  const childrenWithValues = castArray ( children ) as (() => ChildWithMetadata<[T, Child] | [Child]>)[]; //TSC
  const values = childrenWithValues.map ( child => child ().metadata );

  return _switch ( when, values as any, fallback ); //TSC

};

/* UTILITIES */

Switch.Case = <T> ({ when, children }: { when: T, children: Child }): ChildWithMetadata<[T, Child]> => {

  const metadata: { metadata: [T, Child] } = { metadata: [when, children] };

  return assign ( () => children, metadata );

};

Switch.Default = ({ children }: { children: Child }): ChildWithMetadata<[Child]> => {

  const metadata: { metadata: [Child] } = { metadata: [children] };

  return assign ( () => children, metadata );

};

/* EXPORT */

export default Switch;
