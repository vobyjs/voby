
/* IMPORT */

import 'happy-dom-global'; //TODO: Delete this dependency
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {serveStatic} from 'noren/middlewares';
import Server from 'noren/node';
import {renderToString} from 'voby';
import Root from '../src/pages/root';

/* MAIN */

const app = new Server ();

app.use ( serveStatic ( './dist/client' ) );
app.use ( serveStatic ( './public' ) );

app.get ( '*', async ( req, res ) => {

  try {

    const indexPath = path.join ( process.cwd (), 'public', 'index.html' );
    const index = await fs.readFile ( indexPath, 'utf8' );
    const app = await renderToString ( <Root path={`/${req.url.pathname}`} /> );
    const page = index.replace ( '<div id="app"></div>', `<div id="app">${app}</div>` );

    res.html ( page );

  } catch ( error: unknown ) {

    res.status ( 500 );

    console.error ( error );

  }

});

app.listen ( 3000, () => {

  console.log ( `Listening on: http://localhost:3000` );

});
