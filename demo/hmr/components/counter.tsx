
/* IMPORT */

import {hmr} from 'voby';
import Button from './button';

/* MAIN */

const Counter = ({ value, onChange }: { value: () => number, onChange: ( value: number ) => void }): JSX.Element => {

  const increment = () => onChange ( value () + 1 );
  const decrement = () => onChange ( value () - 1 );

  return (
    <>
      <p>{value}</p>
      <Button.Repeat label="+" onClick={increment} />
      <Button.Repeat label="-" onClick={decrement} />
    </>
  );

};

/* EXPORT */

export default hmr ( import.meta.hot?.accept?.bind ( import.meta.hot ), Counter );
// export default Counter;
