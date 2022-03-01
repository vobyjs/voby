
/* IMPORT */

import useEffect from '../hooks/use_effect';
import useResolved from '../hooks/use_resolved';
import {Disposer, ObservableMaybe} from '../types';

/* MAIN */

const useEventListener = ({ target, event, handler, options }: { target: ObservableMaybe<Node | Window>, event: ObservableMaybe<string>, handler: ObservableMaybe<EventListener>, options: ObservableMaybe<true | AddEventListenerOptions> }): Disposer => {

  return useEffect ( () => {

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
