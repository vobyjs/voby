
/* IMPORT */

import useReaction from '~/hooks/use_reaction';
import useResolved from '~/hooks/use_resolved';
import $$ from '~/methods/SS';
import {castArray} from '~/utils/lang';
import type {ArrayMaybe, Disposer, FN, FunctionMaybe, ObservableMaybe} from '~/types';

/* MAIN */

function useEventListener <T extends Window, U extends keyof WindowEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[WindowEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Document, U extends keyof DocumentEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[DocumentEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends HTMLBodyElement, U extends keyof HTMLBodyElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLBodyElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends HTMLMediaElement, U extends keyof HTMLMediaElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLMediaElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends HTMLVideoElement, U extends keyof HTMLVideoElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLVideoElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends HTMLElement, U extends keyof HTMLElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SVGSVGElement, U extends keyof SVGSVGElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SVGSVGElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SVGElement, U extends keyof SVGElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SVGElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends AbortSignal, U extends keyof AbortSignalEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AbortSignalEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends AbstractWorker, U extends keyof AbstractWorkerEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AbstractWorkerEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends BroadcastChannel, U extends keyof BroadcastChannelEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[BroadcastChannelEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Worker, U extends keyof WorkerEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[WorkerEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends FileReader, U extends keyof FileReaderEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[FileReaderEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends IDBDatabase, U extends keyof IDBDatabaseEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[IDBDatabaseEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends IDBOpenDBRequest, U extends keyof IDBOpenDBRequestEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[IDBOpenDBRequestEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends IDBTransaction, U extends keyof IDBTransactionEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[IDBTransactionEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaQueryList, U extends keyof MediaQueryListEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaQueryListEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MessagePort, U extends keyof MessagePortEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MessagePortEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Notification, U extends keyof NotificationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[NotificationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends PermissionStatus, U extends keyof PermissionStatusEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[PermissionStatusEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends PictureInPictureWindow, U extends keyof PictureInPictureWindowEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[PictureInPictureWindowEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends ScreenOrientation, U extends keyof ScreenOrientationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[ScreenOrientationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends XMLHttpRequest, U extends keyof XMLHttpRequestEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[XMLHttpRequestEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends XMLHttpRequestEventTarget, U extends keyof XMLHttpRequestEventTargetEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[XMLHttpRequestEventTargetEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends EventSource, U extends keyof EventSourceEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[EventSourceEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends EventTarget> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<string>, handler: ObservableMaybe<EventListener>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer {

  return useReaction ( () => {

    const fn = $$(handler, false);

    return useResolved ( [target, event, options], ( target, event, options ) => {

      const targets = castArray ( target );

      targets.forEach ( target => {

        target.addEventListener ( event, fn, options );

      });

      return () => {

        targets.forEach ( target => {

          target.removeEventListener ( event, fn, options );

        });

      };

    });

  });

}

/* EXPORT */

export default useEventListener;
