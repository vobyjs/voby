
/* IMPORT */

import {SYMBOL_OBSERVABLE_FROZEN, SYMBOL_UNTRACKED} from '~/constants';
import useReaction from '~/hooks/use_reaction';
import isObservable from '~/methods/is_observable';
import $$ from '~/methods/SS';
import {createText} from '~/utils/creators';
import {isArray, isFunction, isString, isVoidChild} from '~/utils/lang';
import type {Classes, ObservableMaybe} from '~/types';

/* MAIN */

const resolveChild = <T> ( value: ObservableMaybe<T>, setter: (( value: T | T[], dynamic: boolean ) => void), _dynamic: boolean = false ): void => {

  if ( isFunction ( value ) ) {

    if ( SYMBOL_UNTRACKED in value || SYMBOL_OBSERVABLE_FROZEN in value ) {

      resolveChild ( value (), setter, _dynamic );

    } else {

      useReaction ( () => {

        resolveChild ( value (), setter, true );

      });

    }

  } else if ( isArray ( value ) ) {

    const values = resolveStatics ( value.flat ( Infinity ) ); // Makig a clone at the same time too //TODO: Combine the recursive flattening and the static resolution into a single pass

    if ( values.some ( isObservable ) ) {

      useReaction ( () => {

        setter ( resolveResolved ( values, [] ), true );

      });

    } else {

      setter ( values, _dynamic );

    }

  } else {

    setter ( value, _dynamic );

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

const resolveStatics = ( values: any[] ): any => { // It's important to resolve these soon enough or they will be re-created multiple times

  for ( let i = 0, l = values.length; i < l; i++ ) {

    const value = values[i];
    const type = typeof value;

    if ( type === 'string' || type === 'number' || type === 'bigint' ) {

      values[i] = createText ( value );

    }

  }

  return values;

};

/* EXPORT */

export {resolveChild, resolveClass, resolveResolved, resolveStatics};
