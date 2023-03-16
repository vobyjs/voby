
/* IMPORT */

import {$, hmr} from 'voby';
import Counter from './counter';

/* MAIN */

const App = (): JSX.Element => {

  const value = $(0);

  return (
    <>
      <h1>HMR</h1>
      <Counter value={value} onChange={value} />
    </>
  );

};

/* EXPORT */

export default hmr ( import.meta.hot?.accept, App );
