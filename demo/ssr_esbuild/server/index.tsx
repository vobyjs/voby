
/* IMPORT */

import 'linkedom-global'; //TODO: Delete this dependency
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {favicon, serveStatic} from 'noren/middlewares';
import Server from 'noren/node';
import livereload from 'tiny-livereload/express';
import {renderToString} from 'voby';
import {useRouter} from 'voby-simple-router';
import Routes from '../src/app/routes';
import App from '../src/app';

/* HELPERS */

const INDEX_PATH = path.join ( process.cwd (), 'public', 'index.html' );
const INDEX_CONTENT = fs.readFileSync ( INDEX_PATH, 'utf8' );
const IS_PRODUCTION = ( process.env.NODE_ENV === 'production' );

/* MAIN */

const app = new Server ();
const router = useRouter ( Routes );

app.use ( favicon ( './public/favicon.ico' ) );
app.use ( serveStatic ( './public' ) );
app.use ( serveStatic ( './dist/client' ) );
app.use ( livereload ( './dist/client' ) );

app.get ( '*', async ( req, res ) => {

  if ( router.route ( req.path ) ) { // Route found

    if ( IS_PRODUCTION ) { // Using SSR

      try {

        const app = await renderToString ( <App path={`/${req.url.pathname}`} /> );
        const page = INDEX_CONTENT.replace ( '<div id="app"></div>', `<div id="app">${app}</div>` );

        res.html ( page );

      } catch ( error: unknown ) {

        res.status ( 500 );

        console.error ( error );

      }

    } else { // Not using SSR

      res.html ( INDEX_CONTENT );

    }

  } else { // Route not found

    res.status ( 404 );

  }

});

app.listen ( 3000, () => {

  console.log ( `Listening on: http://localhost:3000` );

});
