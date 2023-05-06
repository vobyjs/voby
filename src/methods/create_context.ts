
/* IMPORT */

import {CONTEXTS_DATA} from '~/constants';
import resolve from '~/methods/resolve';
import {context} from '~/oby';
import type {Child, Context, ContextWithDefault} from '~/types';

/* MAIN */

function createContext <T> ( defaultValue: T ): ContextWithDefault<T>;
function createContext <T> ( defaultValue?: T ): Context<T>;
function createContext <T> ( defaultValue?: T ): ContextWithDefault<T> | Context<T> {

  const symbol = Symbol ();

  const Provider = ({ value, children }: { value: T, children: Child }): Child => {

    return context ( { [symbol]: value }, () => {

      return resolve ( children );

    });

  };

  const Context = {Provider};

  CONTEXTS_DATA.set ( Context, { symbol, defaultValue } );

  return Context;

}

/* EXPORT */

export default createContext;
