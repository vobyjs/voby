
/* IMPORT */

import type {Observable, ObservableWithoutInitial, ObservableOptions} from './types';
import {$} from './observable';

/* MAIN */

function createObservable <T> (): ObservableWithoutInitial<T>;
function createObservable <T> ( value: undefined, options?: ObservableOptions<T, T | undefined> ): ObservableWithoutInitial<T>;
function createObservable <T> ( value: T, options?: ObservableOptions<T, T> ): Observable<T>;
function createObservable <T> ( value?: T, options?: ObservableOptions<T, T | undefined> ) {

  return $( value, options );

}

/* EXPORT */

export default createObservable;
