
/* IMPORT */

import {DIRECTIVE_OUTSIDE_SUPER_ROOT, SYMBOLS_DIRECTIVES} from '~/constants';
import useMemo from '~/hooks/use_memo';
import resolve from '~/methods/resolve';
import {context, owner} from '~/oby';
import type {Child, DirectiveFunction, Directive, DirectiveData, DirectiveOptions} from '~/types';

/* MAIN */

//TODO: Fix types, JSX.Directives may be collapsed as "never", due to a bug in TS

const createDirective = <T extends keyof JSX.Directives> ( name: T, fn: DirectiveFunction<JSX.Directives[T]>, options?: DirectiveOptions ): Directive<T> => {

  const immediate = !!options?.immediate;
  const data: DirectiveData<T> = { fn, immediate };
  const symbol = SYMBOLS_DIRECTIVES[name] || ( SYMBOLS_DIRECTIVES[name] = Symbol () );

  const Provider = ({ children }: { children: Child }): Child => {

    return useMemo ( () => {

      register ();

      return resolve ( children );

    });

  };

  const ref = ( ...args: T ) => {

    return ( element: Element ): void => {

      fn ( element, ...args );

    };

  };

  const register = (): void => {

    DIRECTIVE_OUTSIDE_SUPER_ROOT.current ||= !owner ().isSuperRoot;

    context ( symbol, data );

  };

  return {Provider, ref, register};

};

/* EXPORT */

export default createDirective;
