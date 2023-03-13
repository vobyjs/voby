
/* IMPORT */

import livereload from 'tiny-livereload/fetch';
import {render} from 'voby';
import App from './app';

/* MAIN */

livereload ();

render ( <App />, document.getElementById ( 'app' ) );
