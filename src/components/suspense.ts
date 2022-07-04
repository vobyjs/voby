
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useComputed from '~/hooks/use_computed';
import resolve from '~/methods/resolve';
import $$ from '~/methods/SS';
import {suspense as _suspense, ternary} from '~/oby';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const Suspense = ({ when, fallback, children }: { when?: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  return useComputed ( () => {

    const suspense = SuspenseContext.new ();

    const condition = useComputed ( () => !!$$(when) || suspense.active () );

    const childrenSuspended = _suspense ( condition, () => resolve ( children ) );

    return ternary ( condition, fallback, childrenSuspended );

  });

};

/* EXPORT */

export default Suspense;
