
/* IMPORT */

import type {Context} from '~/types';

/* MAIN */

const useContext = <T> ( context: Context<T> ): T | undefined => {

  let value: T | undefined;

  context.Consumer ({
    children: ctx => {
      value = ctx;
      return null;
    }
  });

  return value;

};

/* EXPORT */

export default useContext;
