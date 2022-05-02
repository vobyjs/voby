
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useComputed from '~/hooks/use_computed';
import oby from '~/oby';
import type {Child, ObservableReadonly} from '~/types';

/* MAIN */

const Suspense = ({ fallback, children }: { fallback?: Child, children: Child }): ObservableReadonly<Child> => {

  return useComputed ( () => {

    const suspense = SuspenseContext.new ();

    return oby.suspense ( suspense.active, [[true, fallback], [children]] );

  });

};

/* EXPORT */

export default Suspense;
