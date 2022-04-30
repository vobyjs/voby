
/* IMPORT */

import SuspenseContext from '~/components/suspense.context';
import useCleanup from '~/hooks/use_cleanup';
import useComputed from '~/hooks/use_computed';
import useRoot from '~/hooks/use_root';
import useSampleElement from '~/hooks/use_sample_element';
import resolve from '~/methods/resolve';
import type {Child, ChildResolved, ObservableReadonly} from '~/types';

/* MAIN */

const Suspense = ({ fallback, children }: { fallback?: Child, children: Child }): ObservableReadonly<ChildResolved> => {

  const [dispose, result] = useRoot ( dispose => {

    const suspense = SuspenseContext.new ();

    const resultFallback = useComputed ( () => {

      return resolve ( useSampleElement ( fallback ) );

    });

    const resultChildren = useComputed ( () => {

      return resolve ( useSampleElement ( children ) );

    });

    const result = useComputed ( () => {

      if ( suspense.active () ) return resultFallback ();

      return resultChildren ();

    });

    return [dispose, result];

  });

  useCleanup ( dispose );

  return result;

};

/* EXPORT */

export default Suspense;
