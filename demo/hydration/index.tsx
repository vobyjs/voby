
/* IMPORT */

import {$, hydrate, renderToString} from 'voby';

/* MAIN */

const Counter = (): JSX.Element => {

  const value = $(0);

  const increment = () => value ( prev => prev + 1 );
  const decrement = () => value ( prev => prev - 1 );

  return (
    <>
      <h1>Counter</h1>
      <p>{value}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );

};

/* RENDER */

const render = async () => {

  const app = document.getElementById ( 'app' );

  console.time('renderToString');
  app.innerHTML = await renderToString ( <Counter />, { hydration: true } );
  console.timeEnd('renderToString');

  console.log ( app.innerHTML );
  await new Promise ( resolve => setTimeout ( resolve, 1000 ) );

  console.time('hydrate');
  hydrate ( <Counter />, app );
  console.timeEnd('hydrate');

};

render ();
