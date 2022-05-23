
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useComputed from '~/hooks/use_computed';
import oby from '~/oby';
import {isFunction} from '~/utils/lang';
import type {Child, FunctionMaybe, ObservableReadonly} from '~/types';

/* MAIN */

const Suspense = ({ when, fallback, children }: { when?: FunctionMaybe<unknown>, fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  return useComputed ( () => {

    const suspense = SuspenseContext.new ();

    const condition = useComputed ( () => isFunction ( when ) ? !!when () || suspense.active () : !!when || suspense.active () );

    return oby.suspense ( condition, [[true, fallback], [children]] );

  });

};

/* EXPORT */

export default Suspense;
