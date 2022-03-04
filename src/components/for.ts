
/* IMPORT */

import type {Child, ComponentFunction, ConstructorWith, FunctionMaybe, ObservableReadonlyWithoutInitial} from '../types';
import useComputed from '../hooks/use_computed';
import {isFunction} from '../utils/lang';
import {Cache, CacheStatic, CacheDynamic} from './for.caches';

/* MAIN */

const For = <T> ({ Cache, values, children }: { Cache?: ConstructorWith<Cache<T>, [ComponentFunction<T>]>, values: FunctionMaybe<T[]>, children: (( value: T ) => Child) }): ObservableReadonlyWithoutInitial<Child[]> | Child[] => {

  if ( isFunction ( values ) ) {

    Cache = Cache || For.CacheDynamic;

    const cache = new Cache ( children );

    return useComputed ( () => {

      cache.before ();

      const result = values ().map ( value => {

        return cache.render ( value );

      });

      cache.after ();

      return result;

    });

  } else {

    return values.map ( children );

  }

};

/* UTILITIES */

For.Cache = Cache;
For.CacheStatic = CacheStatic;
For.CacheDynamic = CacheDynamic;

/* EXPORT */

export default For;
