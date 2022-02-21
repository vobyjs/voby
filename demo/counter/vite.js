
/* IMPORT */

const path = require ( 'path' );
const {defineConfig} = require ( 'vite' );
const voby = require ( 'voby/vite-plugin' );

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

module.exports = config;
