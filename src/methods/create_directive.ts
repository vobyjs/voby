
/* IMPORT */

import {SYMBOLS_DIRECTIVES} from '~/constants';
import useComputed from '~/hooks/use_computed';
import useReadonly from '~/hooks/use_readonly';
import resolve from '~/methods/resolve';
import $ from '~/methods/S';
import {context} from '~/oby';
import {once} from '~/utils/lang';
import type {Child, DirectiveFunction, Directive} from '~/types';

/* MAIN */

const createDirective = <T extends unknown[] = []> ( name: string, fn: DirectiveFunction<T> ): Directive<T> => {

  const symbol = SYMBOLS_DIRECTIVES[name] || ( SYMBOLS_DIRECTIVES[name] = Symbol () );

  const Provider = ({ children }: { children: Child }): Child => {

    return useComputed ( () => {

      register ();

      return resolve ( children );

    });

  };

  const ref = ( ...args: T ) => {

    const observable = $<Element | undefined>();
    const readonly = useReadonly ( observable );
    const call = once ( () => fn ( readonly, ...args ) );

    return ( element: Element | undefined ): void => {

      observable ( element );

      return call ();

    };

  };

  const register = (): void => {

    context ( symbol, fn );

  };

  return {Provider, ref, register};

};

/* EXPORT */

export default createDirective;
