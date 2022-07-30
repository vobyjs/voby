
/* IMPORT */

import untrack from '~/methods/untrack';
import {tryCatch} from '~/oby';
import {isFunction} from '~/utils/lang';
import type {Callback, Child, FN, ObservableReadonly} from '~/types';

/* MAIN */

const ErrorBoundary = ({ fallback, children }: { fallback: Child | FN<[{ error: Error, reset: Callback }], Child>, children: Child }): ObservableReadonly<Child> => {

  return tryCatch ( children, props => untrack ( () => isFunction ( fallback ) ? fallback ( props ) : fallback ) );

};

/* EXPORT */

export default ErrorBoundary;
