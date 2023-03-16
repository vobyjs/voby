
/* IMPORT */

import {$, hmr} from 'voby';

/* MAIN */

const Button = (): JSX.Element => {

  throw new Error ( 'Unimplemented' );

};

/* UTILITIES */

Button.Repeat = ({ label, onClick }: { label: string, onClick: () => void }): JSX.Element => {

  const value = $(label);

  const click = (): void => {
    value ( prev => prev + label );
    onClick ();
  };

  return (
    <button onClick={click}>
      {value}
    </button>
  );

};

/* EXPORT */

export default hmr ( import.meta.hot?.accept, Button );
// export default Button;
