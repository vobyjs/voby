
/* IMPORT */

import livereload from 'tiny-livereload/fetch';
import {render} from 'voby';
import Root from './pages/root';

/* MAIN */

livereload ( 200 );

render ( <Root />, document.getElementById ( 'app' ) );
