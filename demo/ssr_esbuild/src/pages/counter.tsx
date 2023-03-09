
/* IMPORT */

import {$} from 'voby';

/* MAIN */

const PageCounter = (): JSX.Element => {

  const count = $(0);
  const increment = () => count ( prev => prev + 1 );
  const decrement = () => count ( prev => prev - 1 );

  return (
    <>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );

};

/* EXPORT */

export default PageCounter;
