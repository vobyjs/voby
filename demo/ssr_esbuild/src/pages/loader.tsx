
/* IMPORT */

import {Suspense} from 'voby';
import {useLoader} from 'voby-simple-router';

/* MAIN */

const PageLoader = (): JSX.Element => {

  const resource = useLoader<number> ();
  const value = () => resource ().value;

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <h1>Loaded: {value}</h1>
    </Suspense>
   );

};

/* EXPORT */

export default PageLoader;
