
/* IMPORT */

import type {Child, ComponentFunction, Owner} from '../types';
import useRoot from '../hooks/use_root';
import owner from '../owner';
import resolve from '../resolve';

/* MAIN */

class Cache<T> {

  /* VARIABLES */

  private component: ComponentFunction<T>;
  private cache: Map<T, Owner> = new Map ();
  private bool = false; // The bool is flipped with each iteration, the roots that don't have the updated one are disposed, it's like a cheap counter

  /* CONSTRUCTOR */

  constructor ( component: ComponentFunction<T> ) {

    this.component = component;

  }

  /* API */

  cleanup = (): void => {

    const {cache, bool} = this;

    for ( const root of cache.values () ) {

      if ( root['bool'] === bool ) continue;

      root.dispose ();

      cache.delete ( root['value'] );

    }

  };

  dispose = (): void => {

    for ( const root of this.cache.values () ) {

      root.dispose ();

    }

  };

  before = (): void => {

    this.bool = !this.bool;

  };

  after = (): void => {

    this.cleanup ();

  };

  render = ( value: T ): Child => {

    const {cache, bool} = this;

    const cached = cache.get ( value );

    if ( cached ) {

      cached['bool'] = bool;

      return cached['result'];

    } else {

      let result: Child;

      useRoot ( () => {

        const root = owner ()!;

        result = resolve ( this.component ( value ) );

        root['value'] = value;
        root['result'] = result;
        root['bool'] = bool;

        cache.set ( value, root );

      });

      return result;

    }

  };

};

/* EXPORT */

export default Cache;
