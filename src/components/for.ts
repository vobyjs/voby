
/* IMPORT */

import type {Child, ComponentFunction, ConstructorWith, ObservableReadonlyWithoutInitial, Resolvable} from '../types';
import useComputed from '../hooks/use_computed';
import useResolved from '../hooks/use_resolved';
import {Cache, CacheStatic, CacheDynamic} from './for.caches';

/* MAIN */

//TODO: Write and test this much better

const For = <T> ({ Cache, values, children }: { Cache?: ConstructorWith<Cache<T>, [ComponentFunction<T>]>, values: Resolvable<T[]>, children: (( value: T ) => Child) }): ObservableReadonlyWithoutInitial<Child[]> => {

  Cache = Cache || For.CacheDynamic;

  const cache = new Cache ( children );

  return useComputed ( () => {

    cache.before ();

    const result = useResolved ( [values], values => {

      return values.map ( value => {

        return cache.render ( value );

      });

    }, true );

    cache.after ();

    return result;

  });

};

/* UTILITIES */

For.Cache = Cache;
For.CacheStatic = CacheStatic;
For.CacheDynamic = CacheDynamic;

/* EXPORT */

export default For;
