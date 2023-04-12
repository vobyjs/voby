
/* IMPORT */

import useCleanup from '~/hooks/use_cleanup';
import useMemo from '~/hooks/use_memo';
import useResolved from '~/hooks/use_resolved';
import useRoot from '~/hooks/use_root';
import useSuspense from '~/hooks/use_suspense';
import resolve from '~/methods/resolve';
import $ from '~/methods/S';
import {with as _with} from '~/oby';
import type {Child, Disposer, FunctionMaybe, Observable, ObservableReadonly} from '~/types';

/* TYPES */

type Item = {
  id: string,
  lock: number,
  result?: Child,
  suspended?: Observable<boolean>,
  dispose?: Disposer,
  reset?: Disposer
};

/* HELPERS */

const cache: Record<string, Item> = {};
const runWithSuperRoot = _with ();

let lockId = 1;

/* MAIN */

//TODO: Support hot-swapping owner and context, to make the context JustWork™

const KeepAlive = ({ id, ttl, children }: { id: FunctionMaybe<string>, ttl?: FunctionMaybe<number>, children: Child }): ObservableReadonly<Child> => {

  return useMemo ( () => {

    return useResolved ( [id, ttl], ( id, ttl ) => {

      const lock = lockId++;
      const item = cache[id] ||= { id, lock };

      item.lock = lock;
      item.reset?.();
      item.suspended ||= $(false);
      item.suspended ( false );

      if ( !item.dispose || !item.result ) {

        runWithSuperRoot ( () => {

          useRoot ( dispose => {

            item.dispose = () => {

              delete cache[id];

              dispose ();

            };

            useSuspense ( item.suspended, () => {

              item.result = resolve ( children );

            });

          });

        });

      }

      useCleanup ( () => {

        const hasLock = () => lock === item.lock;

        if ( !hasLock () ) return;

        item.suspended?.( true );

        if ( !ttl || ttl <= 0 || ttl >= Infinity ) return;

        const dispose = () => hasLock () && item.dispose?.();
        const timeoutId = setTimeout ( dispose, ttl );
        const reset = () => clearTimeout ( timeoutId );

        item.reset = reset;

      });

      return item.result;

    });

  });

};

/* EXPORT */

export default KeepAlive;
