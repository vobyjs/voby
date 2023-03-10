
/* IMPORT */

import Page404 from '../pages/404';
import PageCounter from '../pages/counter';
import PageHome from '../pages/home';
import PageUser from '../pages/user';
import {Navigate} from 'voby-simple-router';
import type {RouterRoute} from 'voby-simple-router';

/* MAIN */

const Routes: RouterRoute[] = [
  {
    path: '/',
    to: PageHome
  },
  {
    path: '/counter',
    to: PageCounter
  },
  {
    path: '/redirect',
    to: <Navigate to="/counter" />
  },
  {
    path: '/user/:name',
    to: PageUser
  },
  {
    path: '/404',
    to: Page404
  }
];

/* EXPORT */

export default Routes;
