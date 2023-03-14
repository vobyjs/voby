
/* IMPORT */

import { render, store } from 'voby'
import type { JSX } from 'voby'
/* MAIN */

const Counter = (): JSX.Element => {

    const state = store({
        value: 0
    })

    const increment = () => state.value += 1
    const decrement = () => state.value -= 1

    return (
        <>
            <h1>Store Counter</h1>
            <p>{() => state.value}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    )

}

render(<Counter />, document.getElementById('app'))
