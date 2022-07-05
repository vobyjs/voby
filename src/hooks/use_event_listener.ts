
/* IMPORT */

import useReaction from '~/hooks/use_reaction';
import useResolved from '~/hooks/use_resolved';
import $$ from '~/methods/SS';
import type {Disposer, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const useEventListener = ( target: FunctionMaybe<EventTarget>, event: FunctionMaybe<string>, handler: ObservableMaybe<EventListener>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer => {

  return useReaction ( () => {

    const fn = $$(handler, false);

    return useResolved ( [target, event, options], ( target, event, options ) => {

      target.addEventListener ( event, fn, options );

      return () => {

        target.removeEventListener ( event, fn, options );

      };

    });

  });

};

/* EXPORT */

export default useEventListener;
