
/* IMPORT */

import path from 'node:path';
import process from 'node:process';
import {defineConfig} from 'vite';
// import voby from 'voby-vite';

/* MAIN */

const config = defineConfig ({
  // plugins: [
  //   voby ({
  //     hmr: {
  //       enabled: true
  //     }
  //   })
  // ],
  resolve: {
    alias: {
      '~': path.resolve ( '../../src' ),
      'voby/jsx-dev-runtime': process.argv.includes ( 'dev' ) ? path.resolve ( '../../src/jsx/runtime' ) : 'voby/jsx-dev-runtime',
      'voby/jsx-runtime': process.argv.includes ( 'dev' ) ? path.resolve ( '../../src/jsx/runtime' ) : 'voby/jsx-runtime',
      'voby': process.argv.includes ( 'dev' ) ? path.resolve ( '../../src' ) : 'voby'
    }
  }
});

/* EXPORT */

export default config;
