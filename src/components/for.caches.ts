
/* IMPORT */

import type {Child, ComponentFunction, Disposer} from '../types';
import useCleanup from '../hooks/use_cleanup';
import useRoot from '../hooks/use_root';
import {resolveChildDeep} from '../utils/resolvers';

/* MAIN */

class Cache<T> {

  /* VARIABLES */

  component: ComponentFunction<T>;

  /* CONSTRUCTOR */

  constructor ( component: ComponentFunction<T> ) {

    this.component = component;

    useCleanup ( () => this.dispose () );

  }

  /* API */

  before (): void {}

  after (): void {}

  dispose (): void {}

  render ( value: T ): Child {

    return this.component ( value );

  }

};

class CacheStatic<T> extends Cache<T> {

  /* VARIABLES */

  cache: Map<T, [Child, Disposer]> = new Map ();

  /* API */

  dispose (): void {

    for ( const [child, dispose] of this.cache.values () ) {

      dispose ();

    }

    this.cache.clear ();

  }

  render ( value: T ): Child {

    const cached = this.cache.get ( value );

    if ( cached ) {

      return cached[0];

    } else {

      let result: Child;

      useRoot ( dispose => {

        result = resolveChildDeep ( this.component ( value ) );

        this.cache.set ( value, [result, dispose] );

      });

      return result;

    }

  }

};

class CacheDynamic<T> extends CacheStatic<T> {

  /* VARIABLES */

  next: Map<T, [Child, Disposer]> = new Map ();

  /* API */

  before (): void {

    this.next = new Map ();

  }

  after (): void {

    this.dispose ();

    this.cache = this.next;

  }

  render ( value: T ): Child {

    const cached = this.cache.get ( value );

    if ( cached ) {

      this.cache.delete ( value );
      this.next.set ( value, cached );

      return cached[0];

    } else {

      let result: Child;

      useRoot ( dispose => {

        result = resolveChildDeep ( this.component ( value ) );

        this.next.set ( value, [result, dispose] );

      });

      return result;

    }

  }

};

/* EXPORT */

export {Cache, CacheStatic, CacheDynamic};
