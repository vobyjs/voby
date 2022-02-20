
/* MAIN */

const IS_PRODUCTION = ( globalThis.process?.env?.NODE_ENV === 'production' );

const SYMBOL_TEMPLATE_PROPERTY_ACCESSOR = Symbol ();

/* EXPORT */

export {IS_PRODUCTION, SYMBOL_TEMPLATE_PROPERTY_ACCESSOR};
