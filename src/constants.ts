
/* IMPORT */

import {SYMBOL_OBSERVABLE, SYMBOL_OBSERVABLE_FROZEN, SYMBOL_UNTRACKED_UNWRAPPED} from '~/oby';
import type {ContextData, Context} from '~/types';

/* MAIN */

const CONTEXTS_DATA = new WeakMap<Context<any>, ContextData<any>> ();

const DIRECTIVE_OUTSIDE_SUPER_ROOT = { current: false };

const HMR = !!globalThis.VOBY_HMR;

const SYMBOL_SUSPENSE = Symbol ( 'Suspense' );

const SYMBOL_TEMPLATE_ACCESSOR = Symbol ( 'Template Accessor' );

const SYMBOLS_DIRECTIVES: Record<string, symbol> = {};

/* EXPORT */

export {SYMBOL_OBSERVABLE, SYMBOL_OBSERVABLE_FROZEN, SYMBOL_UNTRACKED_UNWRAPPED};
export {CONTEXTS_DATA, DIRECTIVE_OUTSIDE_SUPER_ROOT, HMR, SYMBOL_SUSPENSE, SYMBOL_TEMPLATE_ACCESSOR, SYMBOLS_DIRECTIVES};
