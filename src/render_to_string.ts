
/* IMPORT */

import type {Child} from './types';
import Portal from './components/portal';
import {$} from './observable';
import {delay} from './utils';

/* MAIN */

//TODO: Implement this properly, without relying on JSDOM or stuff like that

const renderToString = ( child: Child, timeout: number = 1 ): Promise<string> => {

  return new Promise ( resolve => {

    $.root ( dispose => {

      const {portal} = Portal ({ children: child }).metadata;

      delay ( timeout ).then ( () => {

        resolve ( portal.innerHTML );

        dispose ();

      });

    });

  });

};

/* EXPORT */

export default renderToString;
