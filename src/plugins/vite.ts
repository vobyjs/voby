
/* MAIN */

const vite = () => {

  return {
    name: 'voby',
    config: () => {

      return {
        esbuild: {
          jsxInject: `import {createElement, Fragment} from 'voby';\n`,
          jsxFactory: 'createElement',
          jsxFragment: 'Fragment'
        }
      };

    }
  };

};

/* EXPORT */

export default vite;
