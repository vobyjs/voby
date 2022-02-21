
/* IMPORT */

const {defineConfig} = require ( 'vite' );
const voby = require ( 'voby/vite-plugin' );

/* MAIN */

const config = defineConfig ({
  plugins: [
    voby ()
  ]
});

/* EXPORT */

module.exports = config;
