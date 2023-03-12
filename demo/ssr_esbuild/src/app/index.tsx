
/* IMPORT */

import Routes from './routes';
import {Link, Route, Router} from 'voby-simple-router';
import type {RouterPath} from 'voby-simple-router';

/* MAIN */

const App = ({ path }: { path?: RouterPath }): JSX.Element => {

  return (
    <Router backend="path" routes={Routes} path={path}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
          <li>
            <Link to="/loader">Loader</Link>
          </li>
          <li>
            <Link to="/redirect">Redirect</Link>
          </li>
          <li>
            <Link to="/search?q=something">Search:something</Link>
          </li>
          <li>
            <Link to="/user/Alice">User:Alice</Link>
          </li>
          <li>
            <Link to="/user/Bob">User:Bob</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Route />
      </main>
    </Router>
  );

};

/* EXPORT */

export default App;
