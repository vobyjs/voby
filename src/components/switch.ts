
/* IMPORT */

import useComputed from '~/hooks/use_computed';
import {isObservable} from '~/utils';
import {ObservableMaybe, Child} from '~/types';

/* MAIN */

//FIXME: it gets rendered in the wrong spot after it updates itself

const Switch = <T> ({ when, children }: { when: ObservableMaybe<T>, children: (Child[] & ( { when: T } | { default: true } ))[] }): Child => {

  const fns = children.map ( child => child () );
  const get = ( when: T ) => fns.find ( child => 'default' in child || child.when === when );

  if ( isObservable ( when ) ) {

    return useComputed ( () => {

      return get ( when () );

    });

  } else {

    return get ( when );

  }

};

/* UTILITIES */

Switch.Case = ({ when, children }: { when: any, children: Child[] }): Child[] => {

  children['when'] = when;

  return children;

};

Switch.Default = ({ children }: { children: Child[] }): Child[] => {

  children['default'] = true;

  return children;

};

/* EXPORT */

export default Switch;
