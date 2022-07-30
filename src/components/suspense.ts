
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useMemo from '~/hooks/use_memo';
import resolve from '~/methods/resolve';
import $$ from '~/methods/SS';
import {suspense as _suspense, ternary} from '~/oby';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const Suspense = ({ when, fallback, children }: { when?: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  return useMemo ( () => {

    const suspense = SuspenseContext.new ();

    const condition = useMemo ( () => !!$$(when) || suspense.active () );

    const childrenSuspended = _suspense ( condition, () => resolve ( children ) );

    return ternary ( condition, fallback, childrenSuspended );

  });

};

/* EXPORT */

export default Suspense;
