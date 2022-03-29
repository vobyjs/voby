
/* MAIN */

//TODO: Implement this much better, ensuring the runtime functions are used
//TODO: Implement an esbuild plugin

const plugin = () => {

  return {
    name: 'voby:runtime',
    config: () => {
      return {
        esbuild: {
          jsxInject: `import {Fragment as __Fragment, createElement as __createElement} from 'voby';\nconst React = { Fragment: __Fragment, createElement: __createElement };\n`
        }
      };
    }
  };

};

/* EXPORT */

export default plugin;
