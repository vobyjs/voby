
/* IMPORT */

import fs from 'node:fs/promises';
import path from 'node:path';

/* MAIN */

const esbuild = () => {

  const jsxInject = `import {createElement as $$h, Fragment as $$f} from 'voby';\n`;
  const jsxFactory = '$$h';
  const jsxFragment = '$$f';

  return {
    name: 'voby',
    setup: build => {

      build.initialOptions.jsxFactory = jsxFactory;
      build.initialOptions.jsxFragment = jsxFragment;

      build.onLoad ( { filter: /\.[jt]sx$/ }, async args => {

        const contentsRaw = await fs.readFile ( args.path, 'utf8' );
        const contents = `${jsxInject}${contentsRaw}`;
        const loader = path.extname ( args.path ).slice ( 1 );

        return { contents, loader };

      });

    }
  };

};

/* EXPORT */

export default esbuild;
