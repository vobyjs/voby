
/* IMPORT */

import oby from '~/oby';
import {assign} from '~/utils/lang';
import type {Child, ChildResolved, ChildWithMetadata, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

//TODO: Enforce children of Switch to be of type Switch.Case or Switch.Default

const Switch = <T, R extends Child> ({ when, children }: { when: FunctionMaybe<T>, children: Child[] }): ObservableReadonly<ChildResolved> => {

  const childrenWithCases = children as (() => ChildWithMetadata<[T, R] | [R]>)[]; //TSC
  const cases = childrenWithCases.map ( child => child ().metadata );

  return oby.switch ( when, cases );

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
