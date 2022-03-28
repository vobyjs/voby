
/* IMPORT */

import type {Child, ComponentFunction, Disposer} from '../types';
import useRoot from '../hooks/use_root';
import resolve from '../resolve';

/* MAIN */

//TODO: Maybe use a single Map, it could be faster!
//TODO: Maybe use a different value data structure, it could use less memory!

class Cache<T> {

  /* VARIABLES */

  private component: ComponentFunction<T>;
  private current: Map<T, [Child, Disposer]> = new Map ();
  private next: Map<T, [Child, Disposer]> = new Map ();

  /* CONSTRUCTOR */

  constructor ( component: ComponentFunction<T> ) {

    this.component = component;

  }

  /* API */

  dispose = (): void => {

    for ( const value of this.current.values () ) {

      value[1]();

    }

  };

  before = (): void => {

    this.next = new Map ();

  };

  after = (): void => {

    this.dispose ();

    this.current = this.next;

  };

  render = ( value: T ): Child => {

    const {current, next} = this;

    const cached = current.get ( value );

    if ( cached ) {

      current.delete ( value );
      next.set ( value, cached );

      return cached[0];

    } else {

      let result: Child;

      useRoot ( dispose => {

        result = resolve ( this.component ( value ) );

        next.set ( value, [result, dispose] );

      });

      return result;

    }

  };

};

/* EXPORT */

export default Cache;
