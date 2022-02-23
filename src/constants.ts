
/* MAIN */

const IS_PRODUCTION = ( globalThis.process?.env?.NODE_ENV === 'production' );

const NOOP = (): void => {};

const SYMBOL_TEMPLATE_PROPERTY_ACCESSOR = Symbol ();

/* EXPORT */

export {IS_PRODUCTION, NOOP ,SYMBOL_TEMPLATE_PROPERTY_ACCESSOR};
