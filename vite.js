
/* IMPORT */

const path = require ( 'path' );
const {defineConfig} = require ( 'vite' );

/* MAIN */

const config = defineConfig ({
  resolve: {
    alias: {
      '~': path.resolve ( __dirname, './src' )
    }
  }
});

/* EXPORT */

module.exports = config;
