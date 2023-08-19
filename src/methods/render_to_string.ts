
/* IMPORT */

import Portal from '~/components/portal';
import SuspenseCollector from '~/components/suspense.collector';
import {SYMBOL_HYDRATION} from '~/constants';
import useEffect from '~/hooks/use_effect';
import useRoot from '~/hooks/use_root';
import $$ from '~/methods/SS';
import {context} from '~/oby';
import type {Child, HydrationData, RenderOptions} from '~/types';

/* MAIN */

//TODO: Implement this properly, without relying on JSDOM or stuff like that

const renderToString = ( child: Child, options: RenderOptions ): Promise<string> => {

  return new Promise ( resolve => {

    useRoot ( dispose => {

      const hydration: HydrationData = { phase: 0, elementCounter: 0, textCounter: 0, map: {} };
      const ctx = options.hydration ? { [SYMBOL_HYDRATION]: hydration } : {};

      context ( ctx, () => {

      $$(SuspenseCollector.wrap ( suspenses => {

        const {portal} = Portal ({ children: child }).metadata;

        useEffect ( () => {

          if ( suspenses.active () ) return;

          resolve ( portal.innerHTML );

          dispose ();

        }, { suspense: false } );

      }));

      });

    });

  });

};

/* EXPORT */

export default renderToString;
