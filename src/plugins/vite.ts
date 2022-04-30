
/* MAIN */

const vite = () => {

  return {
    name: 'voby',
    config: () => {

      return {
        esbuild: {
          jsxInject: `import {createElement as $$h, Fragment as $$f} from 'voby';\n`,
          jsxFactory: '$$h',
          jsxFragment: '$$f'
        }
      };

    }
  };

};

/* EXPORT */

export default vite;
