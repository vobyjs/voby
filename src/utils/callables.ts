
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import {on, off} from '~/oby';
import {setChildStatic} from '~/utils/setters';
import type {Child, Fragment, ObservableReadonly} from '~/types';

/* MAIN */

abstract class Callable<T> {

  /* VARIABLES */

  protected observable: ObservableReadonly<T>;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<T> ) {

    this.observable = observable;

  }

  /* API */

  init (): void {

    on ( this.observable, this );

    useCleanup ( this );

  }

  call (): void {

    if ( arguments.length === 1 ) {

      this.cleanup ();

    } else {

      this.update ( arguments[1], arguments[2] );

    }

  }

  cleanup (): void {

    off ( this.observable, this );

  }

  abstract update ( value: T, valuePrev?: T ): void;

}

class CallableChildStatic extends Callable<Child> {

  /* VARIABLES */

  private parent: HTMLElement;
  private fragment: Fragment;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<Child>, parent: HTMLElement, fragment: Fragment ) {

    super ( observable );

    this.parent = parent;
    this.fragment = fragment;

    this.init ();

  }

  /* API */

  update ( value: Child ): void {

    setChildStatic ( this.parent, this.fragment, value );

  }

}

/* EXPORT */

export {Callable, CallableChildStatic};
