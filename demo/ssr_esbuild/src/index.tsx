
/* IMPORT */

import livereload from 'tiny-livereload/fetch';
import {render} from 'voby';
import App from './app';

/* MAIN */

livereload ( 200 );

render ( <App />, document.getElementById ( 'app' ) );
