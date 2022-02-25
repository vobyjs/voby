
/* MAIN */

const cls = (() => {

  let id = 0;

  return ( name: string ) => {

    const suffixName = name.replace ( /\s/g, '_' );
    const suffixRandom = Math.round ( 0xFFFFFF * Math.random () ).toString ( 16 );
    const raw = `cls-${id++}-${suffixName}-${suffixRandom}`;
    const cooked = `.${raw}`;

    const fn = (): string => cooked;

    fn.raw = raw;
    fn.cooked = cooked;
    fn.toString = fn;

    return fn;

  };

})();

/* EXPORT */

export default cls;
