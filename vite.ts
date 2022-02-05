
/* IMPORT */

import path from 'path';
import {defineConfig} from 'vite';

/* MAIN */

const config = defineConfig ({
  resolve: {
    alias: {
      '~': path.resolve ( __dirname, './src' )
    }
  }
});

/* EXPORT */

export default config;
