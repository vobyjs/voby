
/* IMPORT */

import oby from '~/oby';
import type {Child, ChildResolved, Disposer, FN, ObservableReadonly} from '~/types';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: FN<[{ error: Error, reset: Disposer }], Child>, children: Child }): ObservableReadonly<ChildResolved> => {

  return oby.tryCatch ( children, fallback );

};

/* EXPORT */

export default ErrorBoundary;
