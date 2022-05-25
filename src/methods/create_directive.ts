
/* IMPORT */

import {SYMBOLS_DIRECTIVES} from '~/constants';
import useComputed from '~/hooks/use_computed';
import resolve from '~/methods/resolve';
import {context} from '~/oby';
import type {Child, DirectiveFunction, Directive} from '~/types';

/* MAIN */

const createDirective = ( name: string, fn: DirectiveFunction ): Directive => {

  const symbol = SYMBOLS_DIRECTIVES[name] || ( SYMBOLS_DIRECTIVES[name] = Symbol () );

  const Provider = ({ children }: { children: Child }): Child => {

    return useComputed ( () => {

      context ( symbol, fn );

      return resolve ( children );

    });

  };

  return {Provider};

};

/* EXPORT */

export default createDirective;
