
/* IMPORT */

import oby from '~/oby';
import useSample from '~/hooks/use_sample';
import type {Child, ChildResolved, Disposer, FN, ObservableReadonly} from '~/types';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: FN<[{ error: Error, reset: Disposer }], Child>, children: Child }): ObservableReadonly<ChildResolved> => {

  return oby.tryCatch ( () => useSample ( children ), props => useSample ( () => fallback ( props ) ) );

};

/* EXPORT */

export default ErrorBoundary;
