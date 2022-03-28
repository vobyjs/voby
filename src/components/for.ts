
/* IMPORT */

import type {Child, ForCache, FunctionMaybe, ObservableReadonlyWithoutInitial} from '../types';
import useCleanup from '../hooks/use_cleanup';
import useComputed from '../hooks/use_computed';
import {isFunction} from '../utils/lang';
import Cache from './for.cache';

/* MAIN */

const For = <T> ({ Cache, values, children }: { Cache?: ForCache<T>, values: FunctionMaybe<T[]>, children: (( value: T ) => Child) }): ObservableReadonlyWithoutInitial<Child[]> | Child[] => {

  if ( isFunction ( values ) ) {

    Cache = Cache || For.Cache;

    const cache = new Cache ( children );
    const {dispose, before, after, render} = cache;

    useCleanup ( dispose );

    return useComputed ( () => {

      before ();

      const result = values ().map ( render );

      after ();

      return result;

    });

  } else {

    return values.map ( children );

  }

};

/* UTILITIES */

For.Cache = Cache;

/* EXPORT */

export default For;
