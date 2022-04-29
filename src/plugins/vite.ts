
/* MAIN */

//TODO: Implement this much better, ensuring the runtime functions are used
//TODO: Implement an esbuild plugin

const vite = () => {

  return {
    name: 'voby:runtime',
    config: () => {

      return {
        esbuild: {
          jsxInject: `import {h as $$h, Fragment as $$f} from 'voby';\n`,
          jsxFactory: '$$h',
          jsxFragment: '$$f'
        }
      };

    }
  };

};

/* EXPORT */

export default vite;
