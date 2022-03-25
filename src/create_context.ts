
/* IMPORT */

import type {Child, Context} from './types';
import $ from './$';
import useComputed from './hooks/use_computed';
import resolve from './resolve';
import sample from './sample';

/* MAIN */

const createContext = <T> ( defaultValue?: T ): Context<T> => {

  const symbol = Symbol ();

  const Provider = ({ value, children }: { value: T, children: Child }): Child => {

    return useComputed ( () => {

      $.context ( symbol, value );

      return sample ( () => {

        return resolve ( children );

      });

    });

  };

  const Consumer = ({ children }: { children: (( value?: T ) => Child) }): Child => {

    const value = $.context<T> ( symbol ) ?? defaultValue;

    return children ( value );

  };

  return {Provider, Consumer};

};

/* EXPORT */

export default createContext;
