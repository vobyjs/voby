
/* IMPORT */

import oby from '~/oby';
import type {Observable, ObservableOptions} from '~/types';

/* MAIN */

function $ <T> (): Observable<T | undefined>;
function $ <T> ( value: undefined, options?: ObservableOptions<T | undefined> ): Observable<T | undefined>;
function $ <T> ( value: T, options?: ObservableOptions<T> ): Observable<T>;
function $ <T> ( value?: T, options?: ObservableOptions<T | undefined> ) {

  return oby ( value, options );

}

/* EXPORT */

export default $;
