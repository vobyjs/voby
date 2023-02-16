
/* IMPORT */

import { CONTEXTS_DATA } from '../constants'
import { context } from 'oby'
import { isNil } from '../utils/lang'
import type { Context, ContextWithDefault } from '../types'

/* MAIN */

function useContext<T>(Context: ContextWithDefault<T>): T
function useContext<T>(Context: Context<T>): T | undefined
function useContext<T>(Context: ContextWithDefault<T> | Context<T>): T | undefined {

    const { symbol, defaultValue } = CONTEXTS_DATA.get(Context) || { symbol: Symbol() }
    const valueContext = context(symbol)
    const value = isNil(valueContext) ? defaultValue : valueContext

    return value

}

/* EXPORT */

export default useContext
