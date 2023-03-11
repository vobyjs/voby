
/* IMPORT */

import {useSearchParams} from 'voby-simple-router';

/* MAIN */

const PageSearch = (): JSX.Element => {

  const params = useSearchParams ();
  const query = () => params ().get ( 'q' );

  return <h1>Query: {query}</h1>;

};

/* EXPORT */

export default PageSearch;
