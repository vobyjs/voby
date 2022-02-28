
/* IMPORT */

import type {Child, Context} from './types';
import useComputed from './hooks/use_computed';
import {$} from './observable';
import sample from './sample';
import {isUndefined} from './utils/lang';
import {resolveChildDeep} from './utils/resolvers';

/* MAIN */

const createContext = <T> ( defaultValue?: T ): Context<T> => {

  const symbol = Symbol ();

  const Provider = ({ value, children }: { value: T, children: Child }): Child => {

    return useComputed ( () => {

      $.context ( symbol, value );

      return sample ( () => {

        return resolveChildDeep ( children );

      });

    });

  };

  const Consumer = ({ children }: { children: (( value?: T ) => Child) }): Child => {

    const valueContext = $.context<T> ( symbol );
    const value = isUndefined ( valueContext ) ? defaultValue : valueContext;

    return children ( value );

  };

  return {Provider, Consumer};

};

/* EXPORT */

export default createContext;
