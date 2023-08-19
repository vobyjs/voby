
/* IMPORT */

import {SYMBOL_HYDRATION} from '~/constants';
import useRoot from '~/hooks/use_root';
import {context} from '~/oby';
import {setChild} from '~/utils/setters';
import type {Child, Disposer, HydrationData} from '~/types';

/* MAIN */

//TODO: Ensure all created elements are covered
//TODO: Ensure Suspense and other components are handled

const hydrate = ( child: Child, parent?: Element | null ): Disposer => {

  if ( !parent || !( parent instanceof HTMLElement ) ) throw new Error ( 'Invalid parent node' );

  return useRoot ( dispose => {

    const hydration: HydrationData = { phase: 1, elementCounter: 1, textCounter: 0, map: {} };
    const ctx = { [SYMBOL_HYDRATION]: hydration };

    context ( ctx, () => {

      setChild ( parent, child );

    });

    //TODO: Maybe allow multi-render same-target stuff

    return (): void => {

      dispose ();

      parent.textContent = '';

    };

  });

};

/* EXPORT */

export default hydrate;
