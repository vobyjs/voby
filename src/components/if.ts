
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {ternary} from '~/oby';
import {isFunction} from '~/utils/lang';
import type {Child, FunctionMaybe, ObservableReadonly, Truthy} from '~/types';

/* MAIN */

const If = <T> ({ when, fallback, children }: { when: FunctionMaybe<T>, fallback?: Child, children: Child | (( value: ObservableReadonly<Truthy<T>> ) => Child) }): ObservableReadonly<Child> => {

  if ( isFunction ( children ) && children.length ) { // Calling the children function with an ObservableReadonly<Truthy<T>>

    let prev;
    const nonNullable = useComputed<Truthy<T>> ( () => {
      const value = isFunction ( when ) ? when () : when;
      return prev = ( value || prev );
    });

    return ternary ( when, () => children ( nonNullable ), fallback );

  } else { // Just passing the children along

    return ternary ( when, children as Child, fallback ); //TSC

  }

};

/* EXPORT */

export default If;
