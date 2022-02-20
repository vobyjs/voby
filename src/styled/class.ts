
/* IMPORT */

import {IS_PRODUCTION} from '~/constants';

/* MAIN */

const cls = (() => {

  let id = 0;

  return ( name: string ) => {

    const suffix = IS_PRODUCTION ? Math.round ( 0xFFFFFF * Math.random () ).toString ( 16 ) : name.replace ( /\s/g, '_' );
    const raw = `cls-${id++}-${suffix}`;
    const cooked = `.${raw}`;

    const fn = () => cooked;

    fn.raw = raw;
    fn.cooked = cooked;
    fn.toString = fn;

    return fn;

  };

})();

/* EXPORT */

export default cls;
