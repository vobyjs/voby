
/* IMPORT */

import Portal from '~/components/portal';
import useRoot from '~/hooks/use_root';
import type {Child} from '~/types';

/* MAIN */

//TODO: Implement this properly, without relying on JSDOM or stuff like that

const renderToString = ( child: Child, timeout: number = 1 ): Promise<string> => {

  return new Promise ( resolve => {

    useRoot ( dispose => {

      const {portal} = Portal ({ children: child }).metadata;

      setTimeout ( () => {

        resolve ( portal.innerHTML );

        dispose ();

      }, timeout );

    });

  });

};

/* EXPORT */

export default renderToString;
