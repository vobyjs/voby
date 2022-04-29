
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useComputed from '~/hooks/use_computed';
import resolve from '~/methods/resolve';
import type {Child, ObservableReadonly} from '~/types';

/* MAIN */

const Suspense = ({ fallback, children }: { fallback: Child, children: Child }): ObservableReadonly<Child> => { //TODO: Should return ChildResolved

  const suspense = SuspenseContext.make ();

  return useComputed ( () => {

    SuspenseContext.set ( suspense );

    const branchFallback = resolve ( fallback );
    const branchChildren = resolve ( children );

    return useComputed ( () => {

      if ( suspense.active () ) return branchFallback;

      return branchChildren;

    });

  });

};

/* EXPORT */

export default Suspense;
