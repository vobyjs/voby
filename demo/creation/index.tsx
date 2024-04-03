
/* IMPORT */

import {$$, h, createElement, template, Dynamic} from 'voby';

/* HELPERS */

const delay = ms => {
  return new Promise ( resolve => {
    setTimeout ( resolve, ms );
  });
};

/* MAIN */

const testDocumentCreateElement = () => {
  return document.createElement ( 'div' );
};

const testCloneNode = (() => {
  const node = document.createElement ( 'div' );
  return () => {
    return node.cloneNode ( true );
  };
})();

const testH = () => {
  return $$(h ( 'button' ));
};

const testCreateElement = () => {
  return $$(createElement ( 'button' ));
};

const testJSX = () => {
  return $$(<button />);
};

const testDynamic = () => {
  return $$($$(<Dynamic component="button" />));
};

const testDynamicRaw = () => {
  return $$(Dynamic ({ component: 'button' }));
};

const testTemplate = (() => {
  const PROPS = {};
  const tmpl = template (() => {
    return h ( 'button' );
  });
  return () => {
    return $$(tmpl ( PROPS ));
  };
})();

const test = async () => {

  const tests: [string, Function][] = [
    ['document.createElement', testDocumentCreateElement],
    ['cloneNode', testCloneNode],
    ['h', testH],
    ['createElement', testCreateElement],
    ['jsx', testJSX],
    ['dynamic', testDynamic],
    ['dynamic.raw', testDynamicRaw],
    ['template', testTemplate]
  ];

  console.time ( 'total' );

  for ( const [name, fn] of tests ) {

    console.time ( name );

    for ( let i = 0; i < 1_000_000; i++ ) {
      fn ();
    }

    console.timeEnd ( name );

    // await delay ( 500 );

  }

  console.timeEnd ( 'total' );

};

test ();
