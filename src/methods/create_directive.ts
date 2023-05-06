
/* IMPORT */

import {DIRECTIVES, SYMBOLS_DIRECTIVES} from '~/constants';
import resolve from '~/methods/resolve';
import {context} from '~/oby';
import type {Child, DirectiveFunction, Directive, DirectiveData, DirectiveOptions, ExtractArray} from '~/types';

/* MAIN */

const createDirective = <T extends keyof JSX.Directives> ( name: T, fn: DirectiveFunction<ExtractArray<JSX.Directives[T]>>, options?: DirectiveOptions ): Directive<ExtractArray<JSX.Directives[T]>> => {

  const immediate = !!options?.immediate;
  const data: DirectiveData<ExtractArray<JSX.Directives[T]>> = { fn, immediate };
  const symbol = ( SYMBOLS_DIRECTIVES[name] ||= Symbol () );

  const Provider = ({ children }: { children: Child }): Child => {

    return context ( { [symbol]: data }, () => {

      return resolve ( children );

    });

  };

  const ref = ( ...args: ExtractArray<JSX.Directives[T]> ) => {

    return ( element: Element ): void => {

      fn ( element, ...args );

    };

  };

  const register = (): void => {

    if ( symbol in DIRECTIVES ) throw new Error ( 'Directive "name" is already registered' );

    DIRECTIVES[symbol] = data;

  };

  return {Provider, ref, register};

};

/* EXPORT */

export default createDirective;
