
/* IMPORT */

import './types';
import createElement from '~/create_element';
import Fragment from '~/components/fragment';

/* MAIN */

//TODO: Write this properly

const jsx = ( type, props, key, source, self ) => {

  return createElement ( type, props );

};

/* EXPORT */

export {jsx, jsx as jsxs, jsx as jsxDEV, Fragment};
