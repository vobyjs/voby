
/* MAIN */

const cls = (() => {

  //TODO: Use the provided name during debugging only, and random strings during production

  let id = 0;

  return ( name: string ) => {

    name = name.replace ( /\s/g, '_' );

    const raw = `cls-${id++}-${name}`;
    const cooked = `.${raw}`;

    const toString = () => cooked;

    toString.raw = raw;
    toString.cooked = cooked;
    toString.toString = toString; // 🤪

    return toString;

  };

})();

/* EXPORT */

export default cls;
