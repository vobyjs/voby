
/* IMPORT */

import {CONTEXTS_DATA} from '~/constants';
import useComputed from '~/hooks/use_computed';
import resolve from '~/methods/resolve';
import {context} from '~/oby';
import type {Child, Context} from '~/types';

/* MAIN */

const createContext = <T> ( defaultValue?: T ): Context<T> => {

  const symbol = Symbol ();

  const Provider = ({ value, children }: { value: T, children: Child }): Child => {

    return useComputed ( () => {

      context ( symbol, value );

      return resolve ( children );

    });

  };

  const Context = {Provider};

  CONTEXTS_DATA.set ( Context, { symbol, defaultValue } );

  return Context;

};

/* EXPORT */

export default createContext;
