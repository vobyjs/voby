
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
function useEventListener <T extends HTMLFrameSetElement, U extends keyof HTMLFrameSetElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLFrameSetElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends HTMLMediaElement, U extends keyof HTMLMediaElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLMediaElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends HTMLVideoElement, U extends keyof HTMLVideoElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLVideoElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends HTMLElement, U extends keyof HTMLElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[HTMLElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SVGSVGElement, U extends keyof SVGSVGElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SVGSVGElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SVGElement, U extends keyof SVGElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SVGElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MathMLElement, U extends keyof MathMLElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MathMLElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Element, U extends keyof ElementEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[ElementEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends AbortSignal, U extends keyof AbortSignalEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AbortSignalEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends AbstractWorker, U extends keyof AbstractWorkerEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AbstractWorkerEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Animation, U extends keyof AnimationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AnimationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends BroadcastChannel, U extends keyof BroadcastChannelEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[BroadcastChannelEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends CSSAnimation, U extends keyof AnimationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AnimationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends CSSTransition, U extends keyof AnimationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AnimationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends FileReader, U extends keyof FileReaderEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[FileReaderEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends IDBDatabase, U extends keyof IDBDatabaseEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[IDBDatabaseEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends IDBOpenDBRequest, U extends keyof IDBOpenDBRequestEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[IDBOpenDBRequestEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends IDBRequest, U extends keyof IDBRequestEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[IDBRequestEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends IDBTransaction, U extends keyof IDBTransactionEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[IDBTransactionEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaDevices, U extends keyof MediaDevicesEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaDevicesEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaKeySession, U extends keyof MediaKeySessionEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaKeySessionEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaQueryList, U extends keyof MediaQueryListEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaQueryListEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaRecorder, U extends keyof MediaRecorderEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaRecorderEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaSource, U extends keyof MediaSourceEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaSourceEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaStream, U extends keyof MediaStreamEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaStreamEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MediaStreamTrack, U extends keyof MediaStreamTrackEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MediaStreamTrackEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MessagePort, U extends keyof MessagePortEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MessagePortEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MIDIAccess, U extends keyof MIDIAccessEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MIDIAccessEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MIDIInput, U extends keyof MIDIInputEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MIDIInputEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MIDIOutput, U extends keyof MIDIPortEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MIDIPortEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends MIDIPort, U extends keyof MIDIPortEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[MIDIPortEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Notification, U extends keyof NotificationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[NotificationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends PaymentRequest, U extends keyof PaymentRequestEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[PaymentRequestEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Performance, U extends keyof PerformanceEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[PerformanceEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends PermissionStatus, U extends keyof PermissionStatusEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[PermissionStatusEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends PictureInPictureWindow, U extends keyof PictureInPictureWindowEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[PictureInPictureWindowEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends RemotePlayback, U extends keyof RemotePlaybackEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[RemotePlaybackEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends ScreenOrientation, U extends keyof ScreenOrientationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[ScreenOrientationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends ServiceWorker, U extends keyof ServiceWorkerEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[ServiceWorkerEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends ServiceWorkerContainer, U extends keyof ServiceWorkerContainerEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[ServiceWorkerContainerEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends ServiceWorkerRegistration, U extends keyof ServiceWorkerRegistrationEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[ServiceWorkerRegistrationEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends ShadowRoot, U extends keyof ShadowRootEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[ShadowRootEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SharedWorker, U extends keyof AbstractWorkerEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[AbstractWorkerEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SourceBuffer, U extends keyof SourceBufferEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SourceBufferEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SourceBufferList, U extends keyof SourceBufferListEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SourceBufferListEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SpeechSynthesis, U extends keyof SpeechSynthesisEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SpeechSynthesisEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends SpeechSynthesisUtterance, U extends keyof SpeechSynthesisUtteranceEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[SpeechSynthesisUtteranceEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends VisualViewport, U extends keyof VisualViewportEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[VisualViewportEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends WebSocket, U extends keyof WebSocketEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[WebSocketEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends Worker, U extends keyof WorkerEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[WorkerEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends XMLDocument, U extends keyof DocumentEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[DocumentEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends XMLHttpRequest, U extends keyof XMLHttpRequestEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[XMLHttpRequestEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends XMLHttpRequestEventTarget, U extends keyof XMLHttpRequestEventTargetEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[XMLHttpRequestEventTargetEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
function useEventListener <T extends XMLHttpRequestUpload, U extends keyof XMLHttpRequestEventTargetEventMap> ( target: FunctionMaybe<ArrayMaybe<T>>, event: FunctionMaybe<U>, handler: ObservableMaybe<FN<[XMLHttpRequestEventTargetEventMap[U]], void>>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
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
