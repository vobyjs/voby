
/* IMPORT */

import NotFound from './404';
import Counter from './counter';
import Home from './home';
import User from './user';
import {Link, Navigate, Route, Router} from 'voby-simple-router';
import type {RouterPath, RouterRoute} from 'voby-simple-router';

/* HELPERS */

const Routes: RouterRoute[] = [
  {
    path: '/',
    to: Home
  },
  {
    path: '/counter',
    to: Counter
  },
  {
    path: '/redirect',
    to: <Navigate to="/counter" />
  },
  {
    path: '/user/:name',
    to: User
  },
  {
    path: '/404',
    to: NotFound
  }
];

/* MAIN */

const Root = ({ path }: { path?: RouterPath }): JSX.Element => {

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

export default Root;
