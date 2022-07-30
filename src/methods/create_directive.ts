
/* IMPORT */

import {SYMBOLS_DIRECTIVES} from '~/constants';
import useMemo from '~/hooks/use_memo';
import resolve from '~/methods/resolve';
import {context} from '~/oby';
import type {Child, DirectiveFunction, Directive, DirectiveData, DirectiveOptions} from '~/types';

/* MAIN */

const createDirective = <T extends unknown[] = []> ( name: string, fn: DirectiveFunction<T>, options?: DirectiveOptions ): Directive<T> => {

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

    context ( symbol, data );

  };

  return {Provider, ref, register};

};

/* EXPORT */

export default createDirective;
