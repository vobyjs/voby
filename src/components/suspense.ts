
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useComputed from '~/hooks/use_computed';
import resolve from '~/methods/resolve';
import {suspense as _suspense, ternary} from '~/oby';
import {isFunction} from '~/utils/lang';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const Suspense = ({ when, fallback, children }: { when?: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  return useComputed ( () => {

    const suspense = SuspenseContext.new ();

    const condition = useComputed ( () => isFunction ( when ) ? !!when () || suspense.active () : !!when || suspense.active () );

    const childrenSuspended = _suspense ( condition, () => resolve ( children ) );

    return ternary ( condition, fallback, childrenSuspended );

  });

};

/* EXPORT */

export default Suspense;
