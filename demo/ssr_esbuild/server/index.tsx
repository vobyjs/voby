
/* IMPORT */

import 'linkedom-global'; //TODO: Delete this dependency
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {serveStatic} from 'noren/middlewares';
import Server from 'noren/node';
import {renderToString} from 'voby';
import Root from '../src/pages/root';

/* HELPERS */

const INDEX_PATH = path.join ( process.cwd (), 'public', 'index.html' );
const INDEX_CONTENT = fs.readFileSync ( INDEX_PATH, 'utf8' );

/* MAIN */

const app = new Server ();

app.use ( serveStatic ( './dist/client' ) );
app.use ( serveStatic ( './public' ) );

app.get ( '*', async ( req, res ) => {

  try {

    const app = await renderToString ( <Root path={`/${req.url.pathname}`} /> );
    const page = INDEX_CONTENT.replace ( '<div id="app"></div>', `<div id="app">${app}</div>` );

    res.html ( page );

  } catch ( error: unknown ) {

    res.status ( 500 );

    console.error ( error );

  }

});

app.listen ( 3000, () => {

  console.log ( `Listening on: http://localhost:3000` );

});
