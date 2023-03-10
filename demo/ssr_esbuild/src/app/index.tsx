
/* IMPORT */

import Routes from './routes';
import {Link, Route, Router} from 'voby-simple-router';
import type {RouterPath} from 'voby-simple-router';

/* MAIN */

const App = ({ path }: { path?: RouterPath }): JSX.Element => {

  return (
    <Router routes={Routes} path={path}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
          <li>
            <Link to="/redirect">Redirect</Link>
          </li>
          <li>
            <Link to="/user/alice">User:Alice</Link>
          </li>
          <li>
            <Link to="/user/bob">User:Bob</Link>
          </li>
        </ul>
      </nav>
      <Route />
    </Router>
  );

};

/* EXPORT */

export default App;
