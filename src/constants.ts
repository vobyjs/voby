
/* IMPORT */

import {SYMBOL_OBSERVABLE, SYMBOL_SAMPLED} from '~/oby';

/* MAIN */

const SYMBOL_ELEMENT = Symbol ( 'Element' );

const SYMBOL_SUSPENSE = Symbol ( 'Suspense' );

const SYMBOL_TEMPLATE_ACCESSOR = Symbol ( 'Template Accessor' );

const SYMBOLS_DIRECTIVES: Record<string, symbol> = {};

const TEMPLATE_STATE = { active: false };

/* EXPORT */

export {SYMBOL_ELEMENT, SYMBOL_OBSERVABLE, SYMBOL_SAMPLED, SYMBOL_SUSPENSE, SYMBOL_TEMPLATE_ACCESSOR, SYMBOLS_DIRECTIVES, TEMPLATE_STATE};
