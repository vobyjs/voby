/* IMPORT */
import { $, render, useEffect } from 'voby';
/* MAIN */
const Counter = () => {
    const value = $(0);
    const increment = () => value(prev => prev + 1);
    const decrement = () => value(prev => prev - 1);
    return (<>
            <h1>Counter</h1>
            <p>{value}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>);
};
render(<Counter />, document.getElementById('app'));
