
/* IMPORT */

import {SYMBOL_ELEMENT, SYMBOL_OBSERVABLE_FROZEN} from '~/constants';
import useReaction from '~/hooks/use_reaction';
import isObservable from '~/methods/is_observable';
import $$ from '~/methods/SS';
import {flatten, isArray, isFunction, isString, isVoidChild} from '~/utils/lang';
import type {Classes, ObservableMaybe} from '~/types';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T | T[] ) => void) ): void => {

  if ( isFunction ( value ) ) {

    if ( SYMBOL_ELEMENT in value || SYMBOL_OBSERVABLE_FROZEN in value ) {

      resolveChild ( value (), setter );

    } else {

      useReaction ( () => {

        resolveChild ( value (), setter );

      });

    }

  } else if ( isArray ( value ) ) {

    const values = flatten ( value );

    if ( values.some ( isObservable ) ) {

      useReaction ( () => {

        setter ( resolveResolved ( values, [] ) );

      });

    } else {

      setter ( values );

    }

  } else {

    setter ( value );

  }

};

const resolveClass = ( classes: Classes, resolved: Record<string, true> = {} ): Record<string, true> => {

  if ( isString ( classes ) ) {

    classes.split ( /\s+/g ).filter ( Boolean ).filter ( cls => {

      resolved[cls] = true;

    });

  } else if ( isFunction ( classes ) ) {

    resolveClass ( classes (), resolved );

  } else if ( isArray ( classes ) ) {

    classes.forEach ( cls => {

      resolveClass ( cls as Classes, resolved ); //TSC

    });

  } else if ( classes ) {

    for ( const key in classes ) {

      const value = classes[key];
      const isActive = !!$$(value);

      if ( !isActive ) continue;

      resolved[key] = true;

    }

  }

  return resolved;

};

const resolveResolved = <T> ( value: T, values: any[] ): any => {

  while ( isObservable<T> ( value ) ) {

    value = value ();

  }

  if ( isArray ( value ) ) {

    for ( let i = 0, l = value.length; i < l; i++ ) {

      resolveResolved ( value[i], values );

    }

  } else if ( !isVoidChild ( value ) ) { // It's cheaper to discard void children here

    values.push ( value );

  }

  return values;

};

/* EXPORT */

export {resolveChild, resolveClass, resolveResolved};
