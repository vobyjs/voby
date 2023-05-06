
/* IMPORT */

import Portal from '~/components/portal';
import Suspense from '~/components/suspense';
import SuspenseContext from '~/components/suspense.context';
import {SYMBOL_SUSPENSE} from '~/constants';
import useEffect from '~/hooks/use_effect';
import useRoot from '~/hooks/use_root';
import {context} from '~/oby';
import type {Child} from '~/types';

/* MAIN */

//TODO: Implement this properly, without relying on JSDOM or stuff like that

const renderToString = ( child: Child ): Promise<string> => {

  return new Promise ( resolve => {

    useRoot ( dispose => {

      context ( { [SYMBOL_SUSPENSE]: undefined }, () => { // Ensuring the parent Suspense boundary, if any, is not triggered

        SuspenseContext.wrap ( suspense => {

          const {portal} = Portal ({ children: Suspense ({ children: child }) }).metadata;

          useEffect ( () => {

            if ( suspense.active () ) return;

            resolve ( portal.innerHTML );

            dispose ();

          });

        });

      });

    });

  });

};

/* EXPORT */

export default renderToString;
