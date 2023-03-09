
/* IMPORT */

import {useParams} from 'voby-simple-router';

/* MAIN */

const User = (): JSX.Element => {

  const params = useParams ();
  const name = () => params ().name;

  return <h1>Hello {name}</h1>;

};

/* EXPORT */

export default User;
