
/* IMPORT */

import useGuarded from '~/hooks/use_guarded';
import untrack from '~/methods/untrack';
import {ternary} from '~/oby';
import {isFunction, isTruthy} from '~/utils/lang';
import type {Child, FunctionMaybe, ObservableReadonly, Truthy} from '~/types';

/* MAIN */

//TODO: Support an is/guard prop, maybe

const If = <T> ({ when, fallback, children }: { when: FunctionMaybe<T>, fallback?: Child, children: Child | (( value: (() => Truthy<T>) ) => Child) }): ObservableReadonly<Child> => {

  if ( isFunction ( children ) && children.length ) { // Calling the children function with an (() => Truthy<T>)

    const truthy = useGuarded ( when, isTruthy );

    return ternary ( when, () => untrack ( () => children ( truthy ) ), fallback );

  } else { // Just passing the children along

    return ternary ( when, () => untrack ( children as Child ), fallback ); //TSC

  }

};

/* EXPORT */

export default If;
