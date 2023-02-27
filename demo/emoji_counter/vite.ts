
/* IMPORT */

import path from 'node:path';
import process from 'node:process';
import {defineConfig} from 'vite';

/* MAIN */

const config = defineConfig ({
  resolve: {
    alias: {
      '~': path.resolve ( process.cwd (), 'src' ),
      'voby/jsx-runtime': process.argv.includes ( 'dev' ) ? path.resolve ( process.cwd (), 'src/jsx/runtime' ) : 'voby/jsx-runtime',
      'voby': process.argv.includes ( 'dev' ) ? path.resolve ( process.cwd (), 'src' ) : 'voby'
    }
  }
});

/* EXPORT */

export default config;
