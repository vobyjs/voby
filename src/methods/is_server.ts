
/* HELPERS */

const IS_BROWSER = !!globalThis.CDATASection?.toString?.().match ( /^\s*function\s+CDATASection\s*\(\s*\)\s*\{\s*\[native code\]\s*\}\s*$/ );

/* MAIN */

const isServer = (): boolean => {

  return !IS_BROWSER;

};

/* EXPORT */

export default isServer;
