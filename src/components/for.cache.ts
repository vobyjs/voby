
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
  private bool = false; // The bool is flipped with each iteration, the roots that don't have the updated one are disposed, it's like a cheap counter basically
  private prevCount: number = 0; // Number of previous items
  private nextCount: number = 0; // Number of next items

  /* CONSTRUCTOR */

  constructor ( component: ComponentFunction<T> ) {

    this.component = component;

  }

  /* API */

  cleanup = (): void => {

    if ( !this.prevCount ) return; // There was nothing before, no need to cleanup

    if ( !this.nextCount ) return this.dispose (); // There is nothing after, quickly disposing

    const {cache, bool} = this;

    cache.forEach ( root => {

      if ( root['bool'] === bool ) return;

      root.dispose ();

      cache.delete ( root['value'] );

    });

  };

  dispose = (): void => {

    this.cache.forEach ( root => {

      root.dispose ();

    });

    this.cache.clear ();

  };

  before = (): void => {

    this.bool = !this.bool;
    this.nextCount = 0;

  };

  after = ( values: T[] ): void => {

    this.nextCount = values.length;

    this.cleanup ();

    this.prevCount = this.nextCount;

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
