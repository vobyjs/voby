
/* IMPORT */

import useSampleElement from '~/hooks/use_sample_element';
import oby from '~/oby';
import {assign} from '~/utils/lang';
import type {Child, ChildResolved, ChildWithMetadata, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

//TODO: Enforce children of Switch to be of type Switch.Case or Switch.Default

const Switch = <T> ({ when, children }: { when: FunctionMaybe<T>, children: Child }): ObservableReadonly<ChildResolved> => {

  const childrenWithValues = children as (() => ChildWithMetadata<[T, Child] | [Child]>)[]; //TSC
  const values = childrenWithValues.map ( child => child ().metadata );

  return oby.switch ( when, values );

};

/* UTILITIES */

Switch.Case = <T> ({ when, children }: { when: T, children: Child }): ChildWithMetadata<[T, Child]> => {

  const metadata: { metadata: [T, Child] } = { metadata: [when, () => useSampleElement ( children )] };

  return assign ( () => children, metadata );

};

Switch.Default = ({ children }: { children: Child }): ChildWithMetadata<[Child]> => {

  const metadata: { metadata: [Child] } = { metadata: [() => useSampleElement ( children )] };

  return assign ( () => children, metadata );

};

/* EXPORT */

export default Switch;
