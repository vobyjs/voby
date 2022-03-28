
/* IMPORT */

import type {FunctionMaybe, ObservableReadonly} from './types';
import useComputed from './hooks/use_computed';
import useResolved from './hooks/use_resolved';
import {createNode} from './utils/creators';

/* MAIN */

//TODO: This function is unsafe, and potentially slow, SVG support should be implemented natively

const svg = ( statics: TemplateStringsArray, ...dynamics: FunctionMaybe<boolean | number | bigint | string>[] ): ObservableReadonly<Node | null | undefined> => {

  return useComputed ( (): Node | null | undefined => {

    let html = statics[0];

    for ( let i = 1, l = statics.length; i < l; i++ ) {

      html += String ( useResolved ( dynamics[i - 1], true ) );
      html += statics[i];

    }

    const container = createNode ( 'div' );

    container.innerHTML = html.trim ();

    return container.firstChild;

  });

};

/* EXPORT */

export default svg;
