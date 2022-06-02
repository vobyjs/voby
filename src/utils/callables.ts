
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import {on, off} from '~/oby';
import {setAttributeStatic, setChildStatic, setClassStatic, setClassBooleanStatic, setClassesStatic, setEventStatic, setPropertyStatic, setStyleStatic, setStylesStatic} from '~/utils/setters';
import type {Child, EventListener, Fragment, FunctionMaybe, ObservableReadonly} from '~/types';

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

class CallableAttributeStatic extends Callable<null | undefined | boolean | number | string> {

  /* VARIABLES */

  private element: HTMLElement;
  private key: string;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | boolean | number | string>, element: HTMLElement, key: string ) {

    super ( observable );

    this.element = element;
    this.key = key;

    this.init ();

  }

  /* API */

  update ( value: null | undefined | boolean | number | string ): void {

    setAttributeStatic ( this.element, this.key, value );

  }

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

class CallableClassStatic extends Callable<null | undefined | boolean> {

  /* VARIABLES */

  private element: HTMLElement;
  private key: string;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | boolean>, element: HTMLElement, key: string ) {

    super ( observable );

    this.element = element;
    this.key = key;

    this.init ();

  }

  /* API */

  update ( value: null | undefined | boolean ): void {

    setClassStatic ( this.element, this.key, value );

  }

}

class CallableClassBooleanStatic extends Callable<null | undefined | boolean | string> {

  /* VARIABLES */

  private element: HTMLElement;
  private value: boolean;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | boolean | string>, element: HTMLElement, value: boolean ) {

    super ( observable );

    this.element = element;
    this.value = value;

    this.init ();

  }

  /* API */

  update ( key: null | undefined | boolean | string, keyPrev?: null | undefined | boolean | string ): void {

    setClassBooleanStatic ( this.element, this.value, key, keyPrev );

  }

}

class CallableClassesStatic extends Callable<null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>> {

  /* VARIABLES */

  private element: HTMLElement;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>>, element: HTMLElement ) {

    super ( observable );

    this.element = element;

    this.init ();

  }

  /* API */

  update ( object: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>>, objectPrev?: null | undefined | string | FunctionMaybe<null | undefined | boolean | string>[] | Record<string, FunctionMaybe<null | undefined | boolean>> ): void {

    setClassesStatic ( this.element, object, objectPrev );

  }

}

class CallableEventStatic extends Callable<null | undefined | EventListener> {

  /* VARIABLES */

  private element: HTMLElement;
  private event: string;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | EventListener>, element: HTMLElement, event: string ) {

    super ( observable );

    this.element = element;
    this.event = event;

    this.init ();

  }

  /* API */

  update ( value: null | undefined | EventListener ): void {

    setEventStatic ( this.element, this.event, value );

  }

}

class CallablePropertyStatic extends Callable<null | undefined | boolean | number | string> {

  /* VARIABLES */

  private element: HTMLElement;
  private key: string;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | boolean | number | string>, element: HTMLElement, key: string ) {

    super ( observable );

    this.element = element;
    this.key = key;

    this.init ();

  }

  /* API */

  update ( value: null | undefined | boolean | number | string ): void {

    setPropertyStatic ( this.element, this.key, value );

  }

}

class CallableStyleStatic extends Callable<null | undefined | number | string> {

  /* VARIABLES */

  private element: HTMLElement;
  private key: string;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | number | string>, element: HTMLElement, key: string ) {

    super ( observable );

    this.element = element;
    this.key = key;

    this.init ();

  }

  /* API */

  update ( value: null | undefined | number | string ): void {

    setStyleStatic ( this.element, this.key, value );

  }

}

class CallableStylesStatic extends Callable<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>> {

  /* VARIABLES */

  private element: HTMLElement;

  /* CONSTRUCTOR */

  constructor ( observable: ObservableReadonly<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>>, element: HTMLElement ) {

    super ( observable );

    this.element = element;

    this.init ();

  }

  /* API */

  update ( object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>> ): void {

    setStylesStatic ( this.element, object, objectPrev );

  }

}

/* EXPORT */

export {Callable, CallableAttributeStatic, CallableChildStatic, CallableClassStatic, CallableClassBooleanStatic, CallableClassesStatic, CallableEventStatic, CallablePropertyStatic, CallableStyleStatic, CallableStylesStatic};
