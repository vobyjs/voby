
/* MAIN */

//TODO: Implement this much better, ensuring the runtime functions are used
//TODO: Implement an esbuild plugin

const plugin = () => {

  return {
    name: 'voby:runtime',
    config: () => {
      return {
        esbuild: {
          jsxInject: `import * as React from 'voby';`
        }
      };
    }
  };

};

/* EXPORT */

module.exports = plugin;
