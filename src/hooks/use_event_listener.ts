
/* IMPORT */

import useReaction from '~/hooks/use_reaction';
import useResolved from '~/hooks/use_resolved';
import type {Disposer, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

const useEventListener = ( target: FunctionMaybe<EventTarget>, event: FunctionMaybe<string>, handler: ObservableMaybe<EventListener>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer => {

  return useReaction ( () => {

    return useResolved ( [target, event, handler, options], ( target, event, handler, options ) => {

      target.addEventListener ( event, handler, options );

      return () => {

        target.removeEventListener ( event, handler, options );

      };

    });

  });

};

/* EXPORT */

export default useEventListener;
