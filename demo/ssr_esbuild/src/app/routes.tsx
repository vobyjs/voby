
/* IMPORT */

import Page404 from '../pages/404';
import PageCounter from '../pages/counter';
import PageHome from '../pages/home';
import PageLoader from '../pages/loader';
import PageScrolling from '../pages/scrolling';
import PageSearch from '../pages/search';
import PageUser from '../pages/user';
import {lazy} from 'voby';
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
    path: '/loader',
    // to: lazy ( () => import ( '../pages/loader' ) ), //FIXME: https://github.com/evanw/esbuild/issues/2983
    to: PageLoader,
    loader: () => new Promise ( resolve => setTimeout ( resolve, 1000, 123 ) )
  },
  {
    path: '/redirect',
    to: <Navigate to="/counter" />
  },
  {
    path: '/scrolling',
    to: PageScrolling
  },
  {
    path: '/search',
    to: PageSearch
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
