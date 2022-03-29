
/* IMPORT */

import path from 'path';
import {defineConfig} from 'vite';
import voby from 'voby/vite-plugin';

/* MAIN */

const config = defineConfig ({
  plugins: [
    voby ()
  ],
  resolve: {
    alias: {
      voby: process.env.DEV ? path.resolve ( __dirname, '../../src' ) : 'voby'
    }
  }
});

/* EXPORT */

export default config;
