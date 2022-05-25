
/* IMPORT */

import useSample from '~/hooks/use_sample';
import {tryCatch} from '~/oby';
import {isFunction} from '~/utils/lang';
import type {Child, Disposer, FN, ObservableReadonly} from '~/types';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: Child | FN<[{ error: Error, reset: Disposer }], Child>, children: Child }): ObservableReadonly<Child> => {

  return tryCatch ( children, props => useSample ( () => isFunction ( fallback ) ? fallback ( props ) : fallback ) );

};

/* EXPORT */

export default ErrorBoundary;
