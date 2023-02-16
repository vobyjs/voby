
export const isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope

/* GLOBALS */
export class Element {
  // cloneNode(deep?: boolean): Element
}

export class HTMLElement {
  // cloneNode(deep?: boolean): HTMLElement
  // innerText: string
  // innerHTML: string
  // outerText: string
  // outerHTML: string
  // className: string
}

export class SVGElement {
  // cloneNode(deep?: boolean): SVGElement
}

/* JSX */

// export namespace JSX {

//   /* HELPERS */

//   export type ArrayMaybe<T = unknown> = T[] | T

//   export type FunctionMaybe<T = unknown> = ({ (): T }) | T

//   export type ObservableMaybe<T = unknown> = ({ (): T }) | T

//   export type Nullable<T = unknown> = T | undefined | null

//   export type AllClassProperties = {
//     [key: string]: FunctionMaybe<Nullable<boolean>>
//   }

//   export type DOMCSSProperties = {
//     [key in keyof Omit<CSSStyleDeclaration, 'item' | 'setProperty' | 'removeProperty' | 'getPropertyValue' | 'getPropertyPriority'>]?: FunctionMaybe<Nullable<string | number>>
//   }

//   export type DOMCSSVariables = {
//     [key: `--${string}`]: FunctionMaybe<Nullable<string | number>>
//   }

//   export type HTMLAttributeReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'

//   /* MAIN */

//   export type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child)

//   export type Children = Child

//   export type Class = FunctionMaybe<Nullable<string | ClassProperties | (FunctionMaybe<null | undefined | boolean | string> | Class)[]>>

//   export type Component<P = {}> = (props: P) => Child

//   export type Element = Child

//   export type Ref<T = unknown> = ((value: T) => void)

//   export type Refs<T = unknown> = ArrayMaybe<Nullable<Ref<T>>> | Refs<T>[]

//   export type Style = FunctionMaybe<Nullable<string | StyleProperties>>

//   export type IntrinsicElement<T extends keyof IntrinsicElements> = IntrinsicElements[T]

//   export class ClassProperties extends AllClassProperties { }

//   export class StyleProperties extends DOMCSSProperties, DOMCSSVariables { }

//   export type TargetedEvent<T extends EventTarget = EventTarget, TypedEvent extends Event = Event> = Omit<TypedEvent, 'currentTarget'> & { readonly currentTarget: T }
//   export type TargetedAnimationEvent<T extends EventTarget> = TargetedEvent<T, AnimationEvent>
//   export type TargetedClipboardEvent<T extends EventTarget> = TargetedEvent<T, ClipboardEvent>
//   export type TargetedCompositionEvent<T extends EventTarget> = TargetedEvent<T, CompositionEvent>
//   export type TargetedDragEvent<T extends EventTarget> = TargetedEvent<T, DragEvent>
//   export type TargetedFocusEvent<T extends EventTarget> = TargetedEvent<T, FocusEvent>
//   export type TargetedInputEvent<T extends EventTarget> = TargetedEvent<T, InputEvent>
//   export type TargetedKeyboardEvent<T extends EventTarget> = TargetedEvent<T, KeyboardEvent>
//   export type TargetedMouseEvent<T extends EventTarget> = TargetedEvent<T, MouseEvent>
//   export type TargetedPointerEvent<T extends EventTarget> = TargetedEvent<T, PointerEvent>
//   export type TargetedSubmitEvent<T extends EventTarget> = TargetedEvent<T, SubmitEvent>
//   export type TargetedTouchEvent<T extends EventTarget> = TargetedEvent<T, TouchEvent>
//   export type TargetedTransitionEvent<T extends EventTarget> = TargetedEvent<T, TransitionEvent>
//   export type TargetedUIEvent<T extends EventTarget> = TargetedEvent<T, UIEvent>
//   export type TargetedWheelEvent<T extends EventTarget> = TargetedEvent<T, WheelEvent>

//   export type EventHandler<Event extends TargetedEvent> = { (this: never, event: Event): void }
//   export type AnimationEventHandler<T extends EventTarget> = EventHandler<TargetedAnimationEvent<T>>
//   export type ClipboardEventHandler<T extends EventTarget> = EventHandler<TargetedClipboardEvent<T>>
//   export type CompositionEventHandler<T extends EventTarget> = EventHandler<TargetedCompositionEvent<T>>
//   export type DragEventHandler<T extends EventTarget> = EventHandler<TargetedDragEvent<T>>
//   export type FocusEventHandler<T extends EventTarget> = EventHandler<TargetedFocusEvent<T>>
//   export type GenericEventHandler<T extends EventTarget> = EventHandler<TargetedEvent<T>>
//   export type InputEventHandler<T extends EventTarget> = EventHandler<TargetedInputEvent<T>>
//   export type KeyboardEventHandler<T extends EventTarget> = EventHandler<TargetedKeyboardEvent<T>>
//   export type MouseEventHandler<T extends EventTarget> = EventHandler<TargetedMouseEvent<T>>
//   export type PointerEventHandler<T extends EventTarget> = EventHandler<TargetedPointerEvent<T>>
//   export type SubmitEventHandler<T extends EventTarget> = EventHandler<TargetedSubmitEvent<T>>
//   export type TouchEventHandler<T extends EventTarget> = EventHandler<TargetedTouchEvent<T>>
//   export type TransitionEventHandler<T extends EventTarget> = EventHandler<TargetedTransitionEvent<T>>
//   export type UIEventHandler<T extends EventTarget> = EventHandler<TargetedUIEvent<T>>
//   export type WheelEventHandler<T extends EventTarget> = EventHandler<TargetedWheelEvent<T>>

//   export class ElementAttributesProperty {
//     props: Record<string, any>
//   }

//   export class ElementChildrenAttribute {
//     children: any
//   }

//   export class IntrinsicAttributes {
//   }

//   // export class AriaAttributes {
//   //   ariaActivedescendant?: FunctionMaybe<Nullable<string>>,
//   //   ariaAtomic?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaAutocomplete?: FunctionMaybe<Nullable<'none' | 'inline' | 'list' | 'both'>>,
//   //   ariaBusy?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaChecked?: FunctionMaybe<Nullable<boolean | 'false' | 'mixed' | 'true'>>,
//   //   ariaColcount?: FunctionMaybe<Nullable<number>>,
//   //   ariaColindex?: FunctionMaybe<Nullable<number>>,
//   //   ariaColspan?: FunctionMaybe<Nullable<number>>,
//   //   ariaControls?: FunctionMaybe<Nullable<string>>,
//   //   ariaCurrent?: FunctionMaybe<Nullable<boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'>>,
//   //   ariaDescribedby?: FunctionMaybe<Nullable<string>>,
//   //   ariaDetails?: FunctionMaybe<Nullable<string>>,
//   //   ariaDisabled?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaDropeffect?: FunctionMaybe<Nullable<'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'>>,
//   //   ariaErrormessage?: FunctionMaybe<Nullable<string>>,
//   //   ariaExpanded?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaFlowto?: FunctionMaybe<Nullable<string>>,
//   //   ariaGrabbed?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaHaspopup?: FunctionMaybe<Nullable<boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'>>,
//   //   ariaHidden?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaInvalid?: FunctionMaybe<Nullable<boolean | 'false' | 'true' | 'grammar' | 'spelling'>>,
//   //   ariaKeyshortcuts?: FunctionMaybe<Nullable<string>>,
//   //   ariaLabel?: FunctionMaybe<Nullable<string>>,
//   //   ariaLabelledby?: FunctionMaybe<Nullable<string>>,
//   //   ariaLevel?: FunctionMaybe<Nullable<number>>,
//   //   ariaLive?: FunctionMaybe<Nullable<'off' | 'assertive' | 'polite'>>,
//   //   ariaModal?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaMultiline?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaMultiselectable?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaOrientation?: FunctionMaybe<Nullable<'horizontal' | 'vertical'>>,
//   //   ariaOwns?: FunctionMaybe<Nullable<string>>,
//   //   ariaPlaceholder?: FunctionMaybe<Nullable<string>>,
//   //   ariaPosinset?: FunctionMaybe<Nullable<number>>,
//   //   ariaPressed?: FunctionMaybe<Nullable<boolean | 'false' | 'mixed' | 'true'>>,
//   //   ariaReadonly?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaRelevant?: FunctionMaybe<Nullable<'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals'>>,
//   //   ariaRequired?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaRoledescription?: FunctionMaybe<Nullable<string>>,
//   //   ariaRowcount?: FunctionMaybe<Nullable<number>>,
//   //   ariaRowindex?: FunctionMaybe<Nullable<number>>,
//   //   ariaRowspan?: FunctionMaybe<Nullable<number>>,
//   //   ariaSelected?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   ariaSetsize?: FunctionMaybe<Nullable<number>>,
//   //   ariaSort?: FunctionMaybe<Nullable<'none' | 'ascending' | 'descending' | 'other'>>,
//   //   ariaValuemax?: FunctionMaybe<Nullable<number>>,
//   //   ariaValuemin?: FunctionMaybe<Nullable<number>>,
//   //   ariaValuenow?: FunctionMaybe<Nullable<number>>,
//   //   ariaValuetext?: FunctionMaybe<Nullable<string>>
//   // }

//   export class Directives {
//     // name: [arg1: unknown, arg2: unknown, ...argN: unknown]
//   }

//   export type DirectiveAttributes = {
//     [Directive in keyof Directives as `use:${Directive}`]?: Directives[Directive] extends [infer U] ? U | [U] : Directives[Directive]
//   }

//   export class EventAttributes<T extends EventTarget> {
//     /* IMAGE EVENTS */
//     onLoad?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onLoadCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onError?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onErrorCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     /* CLIPBOARD EVENTS */
//     onCopy?: ObservableMaybe<Nullable<ClipboardEventHandler<T>>>,
//     onCopyCapture?: ObservableMaybe<Nullable<ClipboardEventHandler<T>>>,
//     onCut?: ObservableMaybe<Nullable<ClipboardEventHandler<T>>>,
//     onCutCapture?: ObservableMaybe<Nullable<ClipboardEventHandler<T>>>,
//     onPaste?: ObservableMaybe<Nullable<ClipboardEventHandler<T>>>,
//     onPasteCapture?: ObservableMaybe<Nullable<ClipboardEventHandler<T>>>,
//     /* COMPOSITION EVENTS */
//     onCompositionEnd?: ObservableMaybe<Nullable<CompositionEventHandler<T>>>,
//     onCompositionEndCapture?: ObservableMaybe<Nullable<CompositionEventHandler<T>>>,
//     onCompositionStart?: ObservableMaybe<Nullable<CompositionEventHandler<T>>>,
//     onCompositionStartCapture?: ObservableMaybe<Nullable<CompositionEventHandler<T>>>,
//     onCompositionUpdate?: ObservableMaybe<Nullable<CompositionEventHandler<T>>>,
//     onCompositionUpdateCapture?: ObservableMaybe<Nullable<CompositionEventHandler<T>>>,
//     /* DETAILS EVENTS */
//     onToggle?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     /* FOCUS EVENTS */
//     onFocus?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     onFocusCapture?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     onFocusIn?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     onFocusInCapture?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     onFocusOut?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     onFocusOutCapture?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     onBlur?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     onBlurCapture?: ObservableMaybe<Nullable<FocusEventHandler<T>>>,
//     /* FORM EVENTS */
//     onChange?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     onChangeCapture?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     onInput?: ObservableMaybe<Nullable<InputEventHandler<T>>>,
//     onInputCapture?: ObservableMaybe<Nullable<InputEventHandler<T>>>,
//     onBeforeInput?: ObservableMaybe<Nullable<InputEventHandler<T>>>,
//     onBeforeInputCapture?: ObservableMaybe<Nullable<InputEventHandler<T>>>,
//     onSearch?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSearchCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSubmit?: ObservableMaybe<Nullable<SubmitEventHandler<T>>>,
//     onSubmitCapture?: ObservableMaybe<Nullable<SubmitEventHandler<T>>>,
//     onInvalid?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onInvalidCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onReset?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onResetCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onFormData?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onFormDataCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     /* KEYBOARD EVENTS */
//     onKeyDown?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     onKeyDownCapture?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     onKeyPress?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     onKeyPressCapture?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     onKeyUp?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     onKeyUpCapture?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>,
//     /* MEDIA EVENTS */
//     onAbort?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onAbortCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onCanPlay?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onCanPlayCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onCanPlayThrough?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onCanPlayThroughCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onDurationChange?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onDurationChangeCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onEmptied?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onEmptiedCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onEncrypted?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onEncryptedCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onEnded?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onEndedCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onLoadedData?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onLoadedDataCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onLoadedMetadata?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onLoadedMetadataCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onLoadStart?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onLoadStartCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onPause?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onPauseCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onPlay?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onPlayCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onPlaying?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onPlayingCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onProgress?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onProgressCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onRateChange?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onRateChangeCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSeeked?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSeekedCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSeeking?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSeekingCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onStalled?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onStalledCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSuspend?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSuspendCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onTimeUpdate?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onTimeUpdateCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onVolumeChange?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onVolumeChangeCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onWaiting?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onWaitingCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     /* MOUSE EVENTS */
//     onAuxClick?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onAuxClickCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onClick?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onClickCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onContextMenu?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onContextMenuCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onDblClick?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onDblClickCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onDrag?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragEnd?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragEndCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragEnter?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragEnterCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragExit?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragExitCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragLeave?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragLeaveCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragOver?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragOverCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragStart?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDragStartCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDrop?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onDropCapture?: ObservableMaybe<Nullable<DragEventHandler<T>>>,
//     onMouseDown?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseDownCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseEnter?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseEnterCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseLeave?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseLeaveCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseMove?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseMoveCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseOut?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseOutCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseOver?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseOverCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseUp?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     onMouseUpCapture?: ObservableMaybe<Nullable<MouseEventHandler<T>>>,
//     /* SELECTION EVENTS */
//     onSelect?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     onSelectCapture?: ObservableMaybe<Nullable<GenericEventHandler<T>>>,
//     /* TOUCH EVENTS */
//     onTouchCancel?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     onTouchCancelCapture?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     onTouchEnd?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     onTouchEndCapture?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     onTouchMove?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     onTouchMoveCapture?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     onTouchStart?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     onTouchStartCapture?: ObservableMaybe<Nullable<TouchEventHandler<T>>>,
//     /* POINTER EVENTS */
//     onPointerOver?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerOverCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerEnter?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerEnterCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerDown?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerDownCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerMove?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerMoveCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerUp?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerUpCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerCancel?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerCancelCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerOut?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerOutCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerLeave?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onPointerLeaveCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onGotPointerCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onGotPointerCaptureCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onLostPointerCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     onLostPointerCaptureCapture?: ObservableMaybe<Nullable<PointerEventHandler<T>>>,
//     /* UI EVENTS */
//     onScroll?: ObservableMaybe<Nullable<UIEventHandler<T>>>,
//     onScrollPassive?: ObservableMaybe<Nullable<UIEventHandler<T>>>,
//     onScrollCapture?: ObservableMaybe<Nullable<UIEventHandler<T>>>,
//     onScrollCapturePassive?: ObservableMaybe<Nullable<UIEventHandler<T>>>,
//     onScrollEnd?: ObservableMaybe<Nullable<UIEventHandler<T>>>,
//     onScrollEndPassive?: ObservableMaybe<Nullable<UIEventHandler<T>>>,
//     /* WHEEL EVENTS */
//     onWheel?: ObservableMaybe<Nullable<WheelEventHandler<T>>>,
//     onWheelPassive?: ObservableMaybe<Nullable<WheelEventHandler<T>>>,
//     onWheelCapture?: ObservableMaybe<Nullable<WheelEventHandler<T>>>,
//     onWheelCapturePassive?: ObservableMaybe<Nullable<WheelEventHandler<T>>>,
//     /* ANIMATION EVENTS */
//     onAnimationStart?: ObservableMaybe<Nullable<AnimationEventHandler<T>>>,
//     onAnimationStartCapture?: ObservableMaybe<Nullable<AnimationEventHandler<T>>>,
//     onAnimationEnd?: ObservableMaybe<Nullable<AnimationEventHandler<T>>>,
//     onAnimationEndCapture?: ObservableMaybe<Nullable<AnimationEventHandler<T>>>,
//     onAnimationIteration?: ObservableMaybe<Nullable<AnimationEventHandler<T>>>,
//     onAnimationIterationCapture?: ObservableMaybe<Nullable<AnimationEventHandler<T>>>,
//     /* TRANSITION EVENTS */
//     onTransitionEnd?: ObservableMaybe<Nullable<TransitionEventHandler<T>>>,
//     onTransitionEndCapture?: ObservableMaybe<Nullable<TransitionEventHandler<T>>>
//   }

//   export class ViewAttributes {
//     children?: Children,
//     dangerouslySetInnerHTML?: FunctionMaybe<{
//       __html: FunctionMaybe<Nullable<string>>
//     }>
//   }

//   export class DOMAttributes<T extends EventTarget> extends EventAttributes<T> {

//   }

//   // export class VoidHTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T>, DirectiveAttributes {
//   //   ref?: Refs<T>,

//   //   accept?: FunctionMaybe<Nullable<string>>,
//   //   acceptCharset?: FunctionMaybe<Nullable<string>>,
//   //   accessKey?: FunctionMaybe<Nullable<string>>,
//   //   action?: FunctionMaybe<Nullable<string>>,
//   //   allow?: FunctionMaybe<Nullable<string>>,
//   //   allowFullScreen?: FunctionMaybe<Nullable<boolean>>,
//   //   allowTransparency?: FunctionMaybe<Nullable<boolean>>,
//   //   alt?: FunctionMaybe<Nullable<string>>,
//   //   as?: FunctionMaybe<Nullable<string>>,
//   //   async?: FunctionMaybe<Nullable<boolean>>,
//   //   autoComplete?: FunctionMaybe<Nullable<string>>,
//   //   autoCorrect?: FunctionMaybe<Nullable<string>>,
//   //   autofocus?: FunctionMaybe<Nullable<boolean>>,
//   //   autoFocus?: FunctionMaybe<Nullable<boolean>>,
//   //   autoPlay?: FunctionMaybe<Nullable<boolean>>,
//   //   capture?: FunctionMaybe<Nullable<boolean | string>>,
//   //   cellPadding?: FunctionMaybe<Nullable<number | string>>,
//   //   cellSpacing?: FunctionMaybe<Nullable<number | string>>,
//   //   charSet?: FunctionMaybe<Nullable<string>>,
//   //   challenge?: FunctionMaybe<Nullable<string>>,
//   //   checked?: FunctionMaybe<Nullable<boolean>>,
//   //   cite?: FunctionMaybe<Nullable<string>>,
//   //   class?: Class,
//   //   cols?: FunctionMaybe<Nullable<number>>,
//   //   colSpan?: FunctionMaybe<Nullable<number>>,
//   //   content?: FunctionMaybe<Nullable<string>>,
//   //   contentEditable?: FunctionMaybe<Nullable<boolean | 'caret' | 'events' | 'plaintext-only' | 'typing' | 'inherit'>>,
//   //   contextMenu?: FunctionMaybe<Nullable<string>>,
//   //   controls?: FunctionMaybe<Nullable<boolean>>,
//   //   controlsList?: FunctionMaybe<Nullable<string>>,
//   //   coords?: FunctionMaybe<Nullable<string>>,
//   //   crossOrigin?: FunctionMaybe<Nullable<string>>,
//   //   data?: FunctionMaybe<Nullable<string>>,
//   //   dateTime?: FunctionMaybe<Nullable<string>>,
//   //   default?: FunctionMaybe<Nullable<boolean>>,
//   //   defaultChecked?: FunctionMaybe<Nullable<boolean>>,
//   //   defaultValue?: FunctionMaybe<Nullable<string>>,
//   //   defer?: FunctionMaybe<Nullable<boolean>>,
//   //   dir?: FunctionMaybe<Nullable<'auto' | 'rtl' | 'ltr'>>,
//   //   disabled?: FunctionMaybe<Nullable<boolean>>,
//   //   disableRemotePlayback?: FunctionMaybe<Nullable<boolean>>,
//   //   download?: FunctionMaybe<Nullable<any>>,
//   //   decoding?: FunctionMaybe<Nullable<'sync' | 'async' | 'auto'>>,
//   //   draggable?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   encType?: FunctionMaybe<Nullable<string>>,
//   //   enterkeyhint?: FunctionMaybe<Nullable<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>>,
//   //   form?: FunctionMaybe<Nullable<string>>,
//   //   formAction?: FunctionMaybe<Nullable<string>>,
//   //   formEncType?: FunctionMaybe<Nullable<string>>,
//   //   formMethod?: FunctionMaybe<Nullable<string>>,
//   //   formNoValidate?: FunctionMaybe<Nullable<boolean>>,
//   //   formTarget?: FunctionMaybe<Nullable<string>>,
//   //   frameBorder?: FunctionMaybe<Nullable<number | string>>,
//   //   headers?: FunctionMaybe<Nullable<string>>,
//   //   height?: FunctionMaybe<Nullable<number | string>>,
//   //   hidden?: FunctionMaybe<Nullable<boolean>>,
//   //   high?: FunctionMaybe<Nullable<number>>,
//   //   href?: FunctionMaybe<Nullable<string>>,
//   //   hrefLang?: FunctionMaybe<Nullable<string>>,
//   //   for?: FunctionMaybe<Nullable<string>>,
//   //   htmlFor?: FunctionMaybe<Nullable<string>>,
//   //   httpEquiv?: FunctionMaybe<Nullable<string>>,
//   //   icon?: FunctionMaybe<Nullable<string>>,
//   //   id?: FunctionMaybe<Nullable<string | number>>,
//   //   inert?: FunctionMaybe<Nullable<boolean>>,
//   //   inputMode?: FunctionMaybe<Nullable<'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'>>,
//   //   integrity?: FunctionMaybe<Nullable<string>>,
//   //   is?: FunctionMaybe<Nullable<string>>,
//   //   keyParams?: FunctionMaybe<Nullable<string>>,
//   //   keyType?: FunctionMaybe<Nullable<string>>,
//   //   kind?: FunctionMaybe<Nullable<string>>,
//   //   label?: FunctionMaybe<Nullable<string>>,
//   //   lang?: FunctionMaybe<Nullable<string>>,
//   //   list?: FunctionMaybe<Nullable<string>>,
//   //   loading?: FunctionMaybe<Nullable<'eager' | 'lazy'>>,
//   //   loop?: FunctionMaybe<Nullable<boolean>>,
//   //   low?: FunctionMaybe<Nullable<number>>,
//   //   manifest?: FunctionMaybe<Nullable<string>>,
//   //   marginHeight?: FunctionMaybe<Nullable<number>>,
//   //   marginWidth?: FunctionMaybe<Nullable<number>>,
//   //   max?: FunctionMaybe<Nullable<number | string>>,
//   //   maxLength?: FunctionMaybe<Nullable<number>>,
//   //   media?: FunctionMaybe<Nullable<string>>,
//   //   mediaGroup?: FunctionMaybe<Nullable<string>>,
//   //   method?: FunctionMaybe<Nullable<string>>,
//   //   min?: FunctionMaybe<Nullable<number | string>>,
//   //   minLength?: FunctionMaybe<Nullable<number>>,
//   //   multiple?: FunctionMaybe<Nullable<boolean>>,
//   //   muted?: FunctionMaybe<Nullable<boolean>>,
//   //   name?: FunctionMaybe<Nullable<string>>,
//   //   nomodule?: FunctionMaybe<Nullable<boolean>>,
//   //   nonce?: FunctionMaybe<Nullable<string>>,
//   //   noValidate?: FunctionMaybe<Nullable<boolean>>,
//   //   open?: FunctionMaybe<Nullable<boolean>>,
//   //   optimum?: FunctionMaybe<Nullable<number>>,
//   //   part?: FunctionMaybe<Nullable<string>>,
//   //   pattern?: FunctionMaybe<Nullable<string>>,
//   //   ping?: FunctionMaybe<Nullable<string>>,
//   //   placeholder?: FunctionMaybe<Nullable<string>>,
//   //   playsInline?: FunctionMaybe<Nullable<boolean>>,
//   //   poster?: FunctionMaybe<Nullable<string>>,
//   //   preload?: FunctionMaybe<Nullable<string>>,
//   //   radioGroup?: FunctionMaybe<Nullable<string>>,
//   //   readonly?: FunctionMaybe<Nullable<boolean>>,
//   //   readOnly?: FunctionMaybe<Nullable<boolean>>,
//   //   referrerpolicy?: FunctionMaybe<Nullable<'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'>>,
//   //   rel?: FunctionMaybe<Nullable<string>>,
//   //   required?: FunctionMaybe<Nullable<boolean>>,
//   //   reversed?: FunctionMaybe<Nullable<boolean>>,
//   //   /* WAI-ARIA */
//   //   role?: FunctionMaybe<Nullable<'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'cell' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem'>>,
//   //   rows?: FunctionMaybe<Nullable<number>>,
//   //   rowSpan?: FunctionMaybe<Nullable<number>>,
//   //   sandbox?: FunctionMaybe<Nullable<string>>,
//   //   scope?: FunctionMaybe<Nullable<string>>,
//   //   scoped?: FunctionMaybe<Nullable<boolean>>,
//   //   scrolling?: FunctionMaybe<Nullable<string>>,
//   //   seamless?: FunctionMaybe<Nullable<boolean>>,
//   //   selected?: FunctionMaybe<Nullable<boolean>>,
//   //   shape?: FunctionMaybe<Nullable<string>>,
//   //   size?: FunctionMaybe<Nullable<number>>,
//   //   sizes?: FunctionMaybe<Nullable<string>>,
//   //   slot?: FunctionMaybe<Nullable<string>>,
//   //   span?: FunctionMaybe<Nullable<number>>,
//   //   spellCheck?: FunctionMaybe<Nullable<boolean | 'true' | 'false'>>,
//   //   src?: FunctionMaybe<Nullable<string>>,
//   //   srcset?: FunctionMaybe<Nullable<string>>,
//   //   srcDoc?: FunctionMaybe<Nullable<string>>,
//   //   srcLang?: FunctionMaybe<Nullable<string>>,
//   //   srcSet?: FunctionMaybe<Nullable<string>>,
//   //   start?: FunctionMaybe<Nullable<number>>,
//   //   step?: FunctionMaybe<Nullable<number | string>>,
//   //   style?: FunctionMaybe<Nullable<string | StyleProperties>>,
//   //   summary?: FunctionMaybe<Nullable<string>>,
//   //   tabIndex?: FunctionMaybe<Nullable<boolean | number>>,
//   //   target?: FunctionMaybe<Nullable<string>>,
//   //   title?: FunctionMaybe<Nullable<string>>,
//   //   type?: FunctionMaybe<Nullable<string>>,
//   //   useMap?: FunctionMaybe<Nullable<string>>,
//   //   value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>,
//   //   volume?: FunctionMaybe<Nullable<string | number>>,
//   //   width?: FunctionMaybe<Nullable<number | string>>,
//   //   wmode?: FunctionMaybe<Nullable<string>>,
//   //   wrap?: FunctionMaybe<Nullable<string>>,

//   //   // Non-standard Attributes
//   //   autoCapitalize?: FunctionMaybe<Nullable<'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'>>,
//   //   autoSave?: FunctionMaybe<Nullable<string>>,
//   //   color?: FunctionMaybe<Nullable<string>>,
//   //   disablePictureInPicture?: FunctionMaybe<Nullable<boolean>>,
//   //   results?: FunctionMaybe<Nullable<number>>,
//   //   security?: FunctionMaybe<Nullable<string>>,
//   //   translate?: FunctionMaybe<Nullable<'yes' | 'no'>>,
//   //   unselectable?: FunctionMaybe<Nullable<'on' | 'off'>>,
//   //   virtualKeyboardPolicy?: FunctionMaybe<Nullable<'auto' | 'manual'>>,

//   //   // RDFa Attributes
//   //   about?: FunctionMaybe<Nullable<string>>,
//   //   datatype?: FunctionMaybe<Nullable<string>>,
//   //   inlist?: FunctionMaybe<Nullable<boolean>>,
//   //   prefix?: FunctionMaybe<Nullable<string>>,
//   //   property?: FunctionMaybe<Nullable<string>>,
//   //   resource?: FunctionMaybe<Nullable<string>>,
//   //   typeof?: FunctionMaybe<Nullable<string>>,
//   //   vocab?: FunctionMaybe<Nullable<string>>,

//   //   // Microdata Attributes
//   //   itemProp?: FunctionMaybe<Nullable<string>>,
//   //   itemScope?: FunctionMaybe<Nullable<boolean>>,
//   //   itemType?: FunctionMaybe<Nullable<string>>,
//   //   itemID?: FunctionMaybe<Nullable<string>>,
//   //   itemRef?: FunctionMaybe<Nullable<string>>
//   // }

//   export class HTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T>, ViewAttributes {
//     innerText?: string | (() => string)
//     innerHTML?: string | (() => string)
//     outerText?: string | (() => string)
//     outerHTML?: string | (() => string)
//     textContent?: string | (() => string)
//     className?: string | (() => string)
//   }

//   export class SVGAttributes<T extends EventTarget = SVGElement> extends HTMLAttributes<T>, DirectiveAttributes {
//     ref?: Refs<T>,

//     accentHeight?: FunctionMaybe<Nullable<number | string>>,
//     accumulate?: FunctionMaybe<Nullable<'none' | 'sum'>>,
//     additive?: FunctionMaybe<Nullable<'replace' | 'sum'>>,
//     alignmentBaseline?: FunctionMaybe<Nullable<'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical' | 'inherit'>>,
//     allowReorder?: FunctionMaybe<Nullable<'no' | 'yes'>>,
//     alphabetic?: FunctionMaybe<Nullable<number | string>>,
//     amplitude?: FunctionMaybe<Nullable<number | string>>,
//     arabicForm?: FunctionMaybe<Nullable<'initial' | 'medial' | 'terminal' | 'isolated'>>,
//     ascent?: FunctionMaybe<Nullable<number | string>>,
//     attributeName?: FunctionMaybe<Nullable<string>>,
//     attributeType?: FunctionMaybe<Nullable<string>>,
//     autoReverse?: FunctionMaybe<Nullable<number | string>>,
//     azimuth?: FunctionMaybe<Nullable<number | string>>,
//     baseFrequency?: FunctionMaybe<Nullable<number | string>>,
//     baselineShift?: FunctionMaybe<Nullable<number | string>>,
//     baseProfile?: FunctionMaybe<Nullable<number | string>>,
//     bbox?: FunctionMaybe<Nullable<number | string>>,
//     begin?: FunctionMaybe<Nullable<number | string>>,
//     bias?: FunctionMaybe<Nullable<number | string>>,
//     by?: FunctionMaybe<Nullable<number | string>>,
//     calcMode?: FunctionMaybe<Nullable<number | string>>,
//     capHeight?: FunctionMaybe<Nullable<number | string>>,
//     clip?: FunctionMaybe<Nullable<number | string>>,
//     clipPath?: FunctionMaybe<Nullable<string>>,
//     clipPathUnits?: FunctionMaybe<Nullable<number | string>>,
//     clipRule?: FunctionMaybe<Nullable<number | string>>,
//     colorInterpolation?: FunctionMaybe<Nullable<number | string>>,
//     colorInterpolationFilters?: FunctionMaybe<Nullable<'auto' | 'sRGB' | 'linearRGB' | 'inherit'>>,
//     colorProfile?: FunctionMaybe<Nullable<number | string>>,
//     colorRendering?: FunctionMaybe<Nullable<number | string>>,
//     contentScriptType?: FunctionMaybe<Nullable<number | string>>,
//     contentStyleType?: FunctionMaybe<Nullable<number | string>>,
//     cursor?: FunctionMaybe<Nullable<number | string>>,
//     cx?: FunctionMaybe<Nullable<number | string>>,
//     cy?: FunctionMaybe<Nullable<number | string>>,
//     d?: FunctionMaybe<Nullable<string>>,
//     decelerate?: FunctionMaybe<Nullable<number | string>>,
//     descent?: FunctionMaybe<Nullable<number | string>>,
//     diffuseConstant?: FunctionMaybe<Nullable<number | string>>,
//     direction?: FunctionMaybe<Nullable<number | string>>,
//     display?: FunctionMaybe<Nullable<number | string>>,
//     divisor?: FunctionMaybe<Nullable<number | string>>,
//     dominantBaseline?: FunctionMaybe<Nullable<number | string>>,
//     dur?: FunctionMaybe<Nullable<number | string>>,
//     dx?: FunctionMaybe<Nullable<number | string>>,
//     dy?: FunctionMaybe<Nullable<number | string>>,
//     edgeMode?: FunctionMaybe<Nullable<number | string>>,
//     elevation?: FunctionMaybe<Nullable<number | string>>,
//     enableBackground?: FunctionMaybe<Nullable<number | string>>,
//     end?: FunctionMaybe<Nullable<number | string>>,
//     exponent?: FunctionMaybe<Nullable<number | string>>,
//     externalResourcesRequired?: FunctionMaybe<Nullable<number | string>>,
//     fill?: FunctionMaybe<Nullable<string>>,
//     fillOpacity?: FunctionMaybe<Nullable<number | string>>,
//     fillRule?: FunctionMaybe<Nullable<'nonzero' | 'evenodd' | 'inherit'>>,
//     filter?: FunctionMaybe<Nullable<string>>,
//     filterRes?: FunctionMaybe<Nullable<number | string>>,
//     filterUnits?: FunctionMaybe<Nullable<number | string>>,
//     floodColor?: FunctionMaybe<Nullable<number | string>>,
//     floodOpacity?: FunctionMaybe<Nullable<number | string>>,
//     focusable?: FunctionMaybe<Nullable<number | string>>,
//     fontFamily?: FunctionMaybe<Nullable<string>>,
//     fontSize?: FunctionMaybe<Nullable<number | string>>,
//     fontSizeAdjust?: FunctionMaybe<Nullable<number | string>>,
//     fontStretch?: FunctionMaybe<Nullable<number | string>>,
//     fontStyle?: FunctionMaybe<Nullable<number | string>>,
//     fontVariant?: FunctionMaybe<Nullable<number | string>>,
//     fontWeight?: FunctionMaybe<Nullable<number | string>>,
//     format?: FunctionMaybe<Nullable<number | string>>,
//     from?: FunctionMaybe<Nullable<number | string>>,
//     fx?: FunctionMaybe<Nullable<number | string>>,
//     fy?: FunctionMaybe<Nullable<number | string>>,
//     g1?: FunctionMaybe<Nullable<number | string>>,
//     g2?: FunctionMaybe<Nullable<number | string>>,
//     glyphName?: FunctionMaybe<Nullable<number | string>>,
//     glyphOrientationHorizontal?: FunctionMaybe<Nullable<number | string>>,
//     glyphOrientationVertical?: FunctionMaybe<Nullable<number | string>>,
//     glyphRef?: FunctionMaybe<Nullable<number | string>>,
//     gradientTransform?: FunctionMaybe<Nullable<string>>,
//     gradientUnits?: FunctionMaybe<Nullable<string>>,
//     hanging?: FunctionMaybe<Nullable<number | string>>,
//     horizAdvX?: FunctionMaybe<Nullable<number | string>>,
//     horizOriginX?: FunctionMaybe<Nullable<number | string>>,
//     ideographic?: FunctionMaybe<Nullable<number | string>>,
//     imageRendering?: FunctionMaybe<Nullable<number | string>>,
//     in2?: FunctionMaybe<Nullable<number | string>>,
//     in?: FunctionMaybe<Nullable<string>>,
//     intercept?: FunctionMaybe<Nullable<number | string>>,
//     k1?: FunctionMaybe<Nullable<number | string>>,
//     k2?: FunctionMaybe<Nullable<number | string>>,
//     k3?: FunctionMaybe<Nullable<number | string>>,
//     k4?: FunctionMaybe<Nullable<number | string>>,
//     k?: FunctionMaybe<Nullable<number | string>>,
//     kernelMatrix?: FunctionMaybe<Nullable<number | string>>,
//     kernelUnitLength?: FunctionMaybe<Nullable<number | string>>,
//     kerning?: FunctionMaybe<Nullable<number | string>>,
//     keyPoints?: FunctionMaybe<Nullable<number | string>>,
//     keySplines?: FunctionMaybe<Nullable<number | string>>,
//     keyTimes?: FunctionMaybe<Nullable<number | string>>,
//     lengthAdjust?: FunctionMaybe<Nullable<number | string>>,
//     letterSpacing?: FunctionMaybe<Nullable<number | string>>,
//     lightingColor?: FunctionMaybe<Nullable<number | string>>,
//     limitingConeAngle?: FunctionMaybe<Nullable<number | string>>,
//     local?: FunctionMaybe<Nullable<number | string>>,
//     markerEnd?: FunctionMaybe<Nullable<string>>,
//     markerHeight?: FunctionMaybe<Nullable<number | string>>,
//     markerMid?: FunctionMaybe<Nullable<string>>,
//     markerStart?: FunctionMaybe<Nullable<string>>,
//     markerUnits?: FunctionMaybe<Nullable<number | string>>,
//     markerWidth?: FunctionMaybe<Nullable<number | string>>,
//     mask?: FunctionMaybe<Nullable<string>>,
//     maskContentUnits?: FunctionMaybe<Nullable<number | string>>,
//     maskUnits?: FunctionMaybe<Nullable<number | string>>,
//     mathematical?: FunctionMaybe<Nullable<number | string>>,
//     mode?: FunctionMaybe<Nullable<number | string>>,
//     numOctaves?: FunctionMaybe<Nullable<number | string>>,
//     offset?: FunctionMaybe<Nullable<number | string>>,
//     opacity?: FunctionMaybe<Nullable<number | string>>,
//     operator?: FunctionMaybe<Nullable<number | string>>,
//     order?: FunctionMaybe<Nullable<number | string>>,
//     orient?: FunctionMaybe<Nullable<number | string>>,
//     orientation?: FunctionMaybe<Nullable<number | string>>,
//     origin?: FunctionMaybe<Nullable<number | string>>,
//     overflow?: FunctionMaybe<Nullable<number | string>>,
//     overlinePosition?: FunctionMaybe<Nullable<number | string>>,
//     overlineThickness?: FunctionMaybe<Nullable<number | string>>,
//     paintOrder?: FunctionMaybe<Nullable<number | string>>,
//     panose1?: FunctionMaybe<Nullable<number | string>>,
//     pathLength?: FunctionMaybe<Nullable<number | string>>,
//     patternContentUnits?: FunctionMaybe<Nullable<string>>,
//     patternTransform?: FunctionMaybe<Nullable<number | string>>,
//     patternUnits?: FunctionMaybe<Nullable<string>>,
//     pointerEvents?: FunctionMaybe<Nullable<number | string>>,
//     points?: FunctionMaybe<Nullable<string>>,
//     pointsAtX?: FunctionMaybe<Nullable<number | string>>,
//     pointsAtY?: FunctionMaybe<Nullable<number | string>>,
//     pointsAtZ?: FunctionMaybe<Nullable<number | string>>,
//     preserveAlpha?: FunctionMaybe<Nullable<number | string>>,
//     preserveAspectRatio?: FunctionMaybe<Nullable<string>>,
//     primitiveUnits?: FunctionMaybe<Nullable<number | string>>,
//     r?: FunctionMaybe<Nullable<number | string>>,
//     radius?: FunctionMaybe<Nullable<number | string>>,
//     refX?: FunctionMaybe<Nullable<number | string>>,
//     refY?: FunctionMaybe<Nullable<number | string>>,
//     renderingIntent?: FunctionMaybe<Nullable<number | string>>,
//     repeatCount?: FunctionMaybe<Nullable<number | string>>,
//     repeatDur?: FunctionMaybe<Nullable<number | string>>,
//     requiredExtensions?: FunctionMaybe<Nullable<number | string>>,
//     requiredFeatures?: FunctionMaybe<Nullable<number | string>>,
//     restart?: FunctionMaybe<Nullable<number | string>>,
//     result?: FunctionMaybe<Nullable<string>>,
//     rotate?: FunctionMaybe<Nullable<number | string>>,
//     rx?: FunctionMaybe<Nullable<number | string>>,
//     ry?: FunctionMaybe<Nullable<number | string>>,
//     scale?: FunctionMaybe<Nullable<number | string>>,
//     seed?: FunctionMaybe<Nullable<number | string>>,
//     shapeRendering?: FunctionMaybe<Nullable<number | string>>,
//     slope?: FunctionMaybe<Nullable<number | string>>,
//     spacing?: FunctionMaybe<Nullable<number | string>>,
//     specularConstant?: FunctionMaybe<Nullable<number | string>>,
//     specularExponent?: FunctionMaybe<Nullable<number | string>>,
//     speed?: FunctionMaybe<Nullable<number | string>>,
//     spreadMethod?: FunctionMaybe<Nullable<string>>,
//     startOffset?: FunctionMaybe<Nullable<number | string>>,
//     stdDeviation?: FunctionMaybe<Nullable<number | string>>,
//     stemh?: FunctionMaybe<Nullable<number | string>>,
//     stemv?: FunctionMaybe<Nullable<number | string>>,
//     stitchTiles?: FunctionMaybe<Nullable<number | string>>,
//     stopColor?: FunctionMaybe<Nullable<string>>,
//     stopOpacity?: FunctionMaybe<Nullable<number | string>>,
//     strikethroughPosition?: FunctionMaybe<Nullable<number | string>>,
//     strikethroughThickness?: FunctionMaybe<Nullable<number | string>>,
//     string?: FunctionMaybe<Nullable<number | string>>,
//     stroke?: FunctionMaybe<Nullable<string>>,
//     strokeDasharray?: FunctionMaybe<Nullable<string | number>>,
//     strokeDashoffset?: FunctionMaybe<Nullable<string | number>>,
//     strokeLinecap?: FunctionMaybe<Nullable<'butt' | 'round' | 'square' | 'inherit'>>,
//     strokeLinejoin?: FunctionMaybe<Nullable<'miter' | 'round' | 'bevel' | 'inherit'>>,
//     strokeMiterlimit?: FunctionMaybe<Nullable<string | number>>,
//     strokeOpacity?: FunctionMaybe<Nullable<number | string>>,
//     strokeWidth?: FunctionMaybe<Nullable<number | string>>,
//     surfaceScale?: FunctionMaybe<Nullable<number | string>>,
//     systemLanguage?: FunctionMaybe<Nullable<number | string>>,
//     tableValues?: FunctionMaybe<Nullable<number | string>>,
//     targetX?: FunctionMaybe<Nullable<number | string>>,
//     targetY?: FunctionMaybe<Nullable<number | string>>,
//     textAnchor?: FunctionMaybe<Nullable<string>>,
//     textDecoration?: FunctionMaybe<Nullable<number | string>>,
//     textLength?: FunctionMaybe<Nullable<number | string>>,
//     textRendering?: FunctionMaybe<Nullable<number | string>>,
//     to?: FunctionMaybe<Nullable<number | string>>,
//     transform?: FunctionMaybe<Nullable<string>>,
//     u1?: FunctionMaybe<Nullable<number | string>>,
//     u2?: FunctionMaybe<Nullable<number | string>>,
//     underlinePosition?: FunctionMaybe<Nullable<number | string>>,
//     underlineThickness?: FunctionMaybe<Nullable<number | string>>,
//     unicode?: FunctionMaybe<Nullable<number | string>>,
//     unicodeBidi?: FunctionMaybe<Nullable<number | string>>,
//     unicodeRange?: FunctionMaybe<Nullable<number | string>>,
//     unitsPerEm?: FunctionMaybe<Nullable<number | string>>,
//     vAlphabetic?: FunctionMaybe<Nullable<number | string>>,
//     values?: FunctionMaybe<Nullable<string>>,
//     vectorEffect?: FunctionMaybe<Nullable<number | string>>,
//     version?: FunctionMaybe<Nullable<string>>,
//     vertAdvY?: FunctionMaybe<Nullable<number | string>>,
//     vertOriginX?: FunctionMaybe<Nullable<number | string>>,
//     vertOriginY?: FunctionMaybe<Nullable<number | string>>,
//     vHanging?: FunctionMaybe<Nullable<number | string>>,
//     vIdeographic?: FunctionMaybe<Nullable<number | string>>,
//     viewBox?: FunctionMaybe<Nullable<string>>,
//     viewTarget?: FunctionMaybe<Nullable<number | string>>,
//     visibility?: FunctionMaybe<Nullable<number | string>>,
//     vMathematical?: FunctionMaybe<Nullable<number | string>>,
//     widths?: FunctionMaybe<Nullable<number | string>>,
//     wordSpacing?: FunctionMaybe<Nullable<number | string>>,
//     writingMode?: FunctionMaybe<Nullable<number | string>>,
//     x1?: FunctionMaybe<Nullable<number | string>>,
//     x2?: FunctionMaybe<Nullable<number | string>>,
//     x?: FunctionMaybe<Nullable<number | string>>,
//     xChannelSelector?: FunctionMaybe<Nullable<string>>,
//     xHeight?: FunctionMaybe<Nullable<number | string>>,
//     xlinkActuate?: FunctionMaybe<Nullable<string>>,
//     xlinkArcrole?: FunctionMaybe<Nullable<string>>,
//     xlinkHref?: FunctionMaybe<Nullable<string>>,
//     xlinkRole?: FunctionMaybe<Nullable<string>>,
//     xlinkShow?: FunctionMaybe<Nullable<string>>,
//     xlinkTitle?: FunctionMaybe<Nullable<string>>,
//     xlinkType?: FunctionMaybe<Nullable<string>>,
//     xmlBase?: FunctionMaybe<Nullable<string>>,
//     xmlLang?: FunctionMaybe<Nullable<string>>,
//     xmlns?: FunctionMaybe<Nullable<string>>,
//     xmlnsXlink?: FunctionMaybe<Nullable<string>>,
//     xmlSpace?: FunctionMaybe<Nullable<string>>,
//     y1?: FunctionMaybe<Nullable<number | string>>,
//     y2?: FunctionMaybe<Nullable<number | string>>,
//     y?: FunctionMaybe<Nullable<number | string>>,
//     yChannelSelector?: FunctionMaybe<Nullable<string>>,
//     z?: FunctionMaybe<Nullable<number | string>>,
//     zoomAndPan?: FunctionMaybe<Nullable<string>>

//     // XMLNS
//     'xlink:href'?: FunctionMaybe<Nullable<string>>,
//     'xmlns:xlink'?: FunctionMaybe<Nullable<string>>,
//   }

//   export class AnchorHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     download?: FunctionMaybe<Nullable<boolean>>,
//     href?: FunctionMaybe<Nullable<string>>,
//     hrefLang?: FunctionMaybe<Nullable<string>>,
//     media?: FunctionMaybe<Nullable<string>>,
//     ping?: FunctionMaybe<Nullable<string>>,
//     rel?: FunctionMaybe<Nullable<string>>,
//     target?: FunctionMaybe<Nullable<'_self' | '_blank' | '_parent' | '_top'>>,
//     type?: FunctionMaybe<Nullable<string>>,
//     referrerPolicy?: FunctionMaybe<Nullable<HTMLAttributeReferrerPolicy>>
//   }

//   export class AudioHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {

//   }

//   export class AreaHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     alt?: FunctionMaybe<Nullable<string>>,
//     coords?: FunctionMaybe<Nullable<string>>,
//     download?: FunctionMaybe<Nullable<boolean>>,
//     href?: FunctionMaybe<Nullable<string>>,
//     hrefLang?: FunctionMaybe<Nullable<string>>,
//     media?: FunctionMaybe<Nullable<string>>,
//     referrerPolicy?: FunctionMaybe<Nullable<HTMLAttributeReferrerPolicy>>,
//     rel?: FunctionMaybe<Nullable<string>>,
//     shape?: FunctionMaybe<Nullable<string>>,
//     target?: FunctionMaybe<Nullable<string>>
//   }

//   export class BaseHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     href?: FunctionMaybe<Nullable<string>>,
//     target?: FunctionMaybe<Nullable<string>>
//   }

//   export class BlockquoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     cite?: FunctionMaybe<Nullable<string>>
//   }

//   export class BrHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {

//   }

//   export class ButtonHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     autoFocus?: FunctionMaybe<Nullable<boolean>>,
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     form?: FunctionMaybe<Nullable<string>>,
//     formAction?: FunctionMaybe<Nullable<string>>,
//     formEncType?: FunctionMaybe<Nullable<string>>,
//     formMethod?: FunctionMaybe<Nullable<string>>,
//     formNoValidate?: FunctionMaybe<Nullable<boolean>>,
//     formTarget?: FunctionMaybe<Nullable<string>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     type?: FunctionMaybe<Nullable<'submit' | 'reset' | 'button'>>,
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>
//   }

//   export class CanvasHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     height?: FunctionMaybe<Nullable<number | string>>,
//     width?: FunctionMaybe<Nullable<number | string>>
//   }

//   export class ColHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     span?: FunctionMaybe<Nullable<number>>,
//     width?: FunctionMaybe<Nullable<number | string>>
//   }

//   export class ColgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     span?: FunctionMaybe<Nullable<number>>
//   }

//   export class DataHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>
//   }

//   export class DetailsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     open?: FunctionMaybe<Nullable<boolean>>,
//     onToggle?: ObservableMaybe<Nullable<GenericEventHandler<T>>>
//   }

//   export class DelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     cite?: FunctionMaybe<Nullable<string>>,
//     dateTime?: FunctionMaybe<Nullable<string>>
//   }

//   export class DialogHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     open?: FunctionMaybe<Nullable<boolean>>
//   }

//   export class EmbedHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     height?: FunctionMaybe<Nullable<number | string>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     type?: FunctionMaybe<Nullable<string>>,
//     width?: FunctionMaybe<Nullable<number | string>>
//   }

//   export class FieldsetHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     form?: FunctionMaybe<Nullable<string>>,
//     name?: FunctionMaybe<Nullable<string>>
//   }

//   export class FormHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     acceptCharset?: FunctionMaybe<Nullable<string>>,
//     action?: FunctionMaybe<Nullable<string>>,
//     autoComplete?: FunctionMaybe<Nullable<string>>,
//     encType?: FunctionMaybe<Nullable<string>>,
//     method?: FunctionMaybe<Nullable<string>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     noValidate?: FunctionMaybe<Nullable<boolean>>,
//     target?: FunctionMaybe<Nullable<string>>
//   }

//   export class HrHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {

//   }

//   export class HtmlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     manifest?: FunctionMaybe<Nullable<string>>
//   }

//   export class IframeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     allow?: FunctionMaybe<Nullable<string>>,
//     allowFullScreen?: FunctionMaybe<Nullable<boolean>>,
//     allowTransparency?: FunctionMaybe<Nullable<boolean>>,
//     /** @deprecated */
//     frameBorder?: FunctionMaybe<Nullable<number | string>>,
//     height?: FunctionMaybe<Nullable<number | string>>,
//     loading?: FunctionMaybe<Nullable<'eager' | 'lazy'>>,
//     /** @deprecated */
//     marginHeight?: FunctionMaybe<Nullable<number>>,
//     /** @deprecated */
//     marginWidth?: FunctionMaybe<Nullable<number>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     referrerPolicy?: FunctionMaybe<Nullable<HTMLAttributeReferrerPolicy>>,
//     sandbox?: FunctionMaybe<Nullable<string>>,
//     /** @deprecated */
//     scrolling?: FunctionMaybe<Nullable<string>>,
//     seamless?: FunctionMaybe<Nullable<boolean>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     srcDoc?: FunctionMaybe<Nullable<string>>,
//     width?: FunctionMaybe<Nullable<number | string>>
//   }

//   export class ImgHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     alt?: FunctionMaybe<Nullable<string>>,
//     crossOrigin?: FunctionMaybe<Nullable<'anonymous' | 'use-credentials' | ''>>,
//     decoding?: FunctionMaybe<Nullable<'async' | 'auto' | 'sync'>>,
//     height?: FunctionMaybe<Nullable<number | string>>,
//     loading?: FunctionMaybe<Nullable<'eager' | 'lazy'>>,
//     referrerPolicy?: FunctionMaybe<Nullable<HTMLAttributeReferrerPolicy>>,
//     sizes?: FunctionMaybe<Nullable<string>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     srcSet?: FunctionMaybe<Nullable<string>>,
//     useMap?: FunctionMaybe<Nullable<string>>,
//     width?: FunctionMaybe<Nullable<number | string>>
//   }

//   export class InsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     cite?: FunctionMaybe<Nullable<string>>,
//     dateTime?: FunctionMaybe<Nullable<string>>
//   }

//   export class InputHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     accept?: FunctionMaybe<Nullable<string>>,
//     alt?: FunctionMaybe<Nullable<string>>,
//     autoComplete?: FunctionMaybe<Nullable<string>>,
//     autoFocus?: FunctionMaybe<Nullable<boolean>>,
//     capture?: FunctionMaybe<Nullable<boolean | 'user' | 'environment'>>,
//     checked?: FunctionMaybe<Nullable<boolean>>,
//     crossOrigin?: FunctionMaybe<Nullable<string>>,
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     enterKeyHint?: FunctionMaybe<Nullable<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>>,
//     form?: FunctionMaybe<Nullable<string>>,
//     formAction?: FunctionMaybe<Nullable<string>>,
//     formEncType?: FunctionMaybe<Nullable<string>>,
//     formMethod?: FunctionMaybe<Nullable<string>>,
//     formNoValidate?: FunctionMaybe<Nullable<boolean>>,
//     formTarget?: FunctionMaybe<Nullable<string>>,
//     height?: FunctionMaybe<Nullable<number | string>>,
//     list?: FunctionMaybe<Nullable<string>>,
//     max?: FunctionMaybe<Nullable<number | string>>,
//     maxLength?: FunctionMaybe<Nullable<number>>,
//     min?: FunctionMaybe<Nullable<number | string>>,
//     minLength?: FunctionMaybe<Nullable<number>>,
//     multiple?: FunctionMaybe<Nullable<boolean>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     pattern?: FunctionMaybe<Nullable<string>>,
//     placeholder?: FunctionMaybe<Nullable<string>>,
//     readOnly?: FunctionMaybe<Nullable<boolean>>,
//     required?: FunctionMaybe<Nullable<boolean>>,
//     size?: FunctionMaybe<Nullable<number>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     step?: FunctionMaybe<Nullable<number | string>>,
//     type?: FunctionMaybe<Nullable<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'>>,
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>,
//     width?: FunctionMaybe<Nullable<number | string>>,
//     onChange?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>
//   }

//   export class KeygenHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     autoFocus?: FunctionMaybe<Nullable<boolean>>,
//     challenge?: FunctionMaybe<Nullable<string>>,
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     form?: FunctionMaybe<Nullable<string>>,
//     keyType?: FunctionMaybe<Nullable<string>>,
//     keyParams?: FunctionMaybe<Nullable<string>>,
//     name?: FunctionMaybe<Nullable<string>>
//   }

//   export class LabelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     form?: FunctionMaybe<Nullable<string>>,
//     htmlFor?: FunctionMaybe<Nullable<string>>,
//     for?: FunctionMaybe<Nullable<string>>
//   }

//   export class LiHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>
//   }

//   export class LinkHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     as?: FunctionMaybe<Nullable<string>>,
//     crossOrigin?: FunctionMaybe<Nullable<string>>,
//     href?: FunctionMaybe<Nullable<string>>,
//     hrefLang?: FunctionMaybe<Nullable<string>>,
//     integrity?: FunctionMaybe<Nullable<string>>,
//     media?: FunctionMaybe<Nullable<string>>,
//     imageSrcSet?: FunctionMaybe<Nullable<string>>,
//     referrerPolicy?: FunctionMaybe<Nullable<HTMLAttributeReferrerPolicy>>,
//     rel?: FunctionMaybe<Nullable<string>>,
//     sizes?: FunctionMaybe<Nullable<string>>,
//     type?: FunctionMaybe<Nullable<string>>,
//     charSet?: FunctionMaybe<Nullable<string>>
//   }

//   export class MapHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     name?: FunctionMaybe<Nullable<string>>
//   }

//   export class MenuHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     type?: FunctionMaybe<Nullable<string>>
//   }

//   export class MediaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     autoPlay?: FunctionMaybe<Nullable<boolean>>,
//     controls?: FunctionMaybe<Nullable<boolean>>,
//     controlsList?: FunctionMaybe<Nullable<string>>,
//     crossOrigin?: FunctionMaybe<Nullable<string>>,
//     loop?: FunctionMaybe<Nullable<boolean>>,
//     mediaGroup?: FunctionMaybe<Nullable<string>>,
//     muted?: FunctionMaybe<Nullable<boolean>>,
//     playsInline?: FunctionMaybe<Nullable<boolean>>,
//     preload?: FunctionMaybe<Nullable<string>>,
//     src?: FunctionMaybe<Nullable<string>>
//   }

//   export class MetaHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     charSet?: FunctionMaybe<Nullable<string>>,
//     content?: FunctionMaybe<Nullable<string>>,
//     httpEquiv?: FunctionMaybe<Nullable<string>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     media?: FunctionMaybe<Nullable<string>>
//   }

//   export class MeterHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     form?: FunctionMaybe<Nullable<string>>,
//     high?: FunctionMaybe<Nullable<number>>,
//     low?: FunctionMaybe<Nullable<number>>,
//     max?: FunctionMaybe<Nullable<number | string>>,
//     min?: FunctionMaybe<Nullable<number | string>>,
//     optimum?: FunctionMaybe<Nullable<number>>,
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>
//   }

//   export class QuoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     cite?: FunctionMaybe<Nullable<string>>
//   }

//   export class ObjectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     classID?: FunctionMaybe<Nullable<string>>,
//     data?: FunctionMaybe<Nullable<string>>,
//     form?: FunctionMaybe<Nullable<string>>,
//     height?: FunctionMaybe<Nullable<number | string>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     type?: FunctionMaybe<Nullable<string>>,
//     useMap?: FunctionMaybe<Nullable<string>>,
//     width?: FunctionMaybe<Nullable<number | string>>,
//     wmode?: FunctionMaybe<Nullable<string>>
//   }

//   export class OlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     reversed?: FunctionMaybe<Nullable<boolean>>,
//     start?: FunctionMaybe<Nullable<number>>,
//     type?: FunctionMaybe<Nullable<'1' | 'a' | 'A' | 'i' | 'I'>>
//   }

//   export class OptgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     label?: FunctionMaybe<Nullable<string>>
//   }

//   export class OptionHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     label?: FunctionMaybe<Nullable<string>>,
//     selected?: FunctionMaybe<Nullable<boolean>>,
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>
//   }

//   export class OutputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     form?: FunctionMaybe<Nullable<string>>,
//     htmlFor?: FunctionMaybe<Nullable<string>>,
//     for?: FunctionMaybe<Nullable<string>>,
//     name?: FunctionMaybe<Nullable<string>>
//   }

//   export class ParamHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     name?: FunctionMaybe<Nullable<string>>,
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>
//   }

//   export class ProgressHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     max?: FunctionMaybe<Nullable<number | string>>,
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>,
//   }

//   export class SlotHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     name?: FunctionMaybe<Nullable<string>>
//   }

//   export class ScriptHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     async?: FunctionMaybe<Nullable<boolean>>,
//     /** @deprecated */
//     charSet?: FunctionMaybe<Nullable<string>>,
//     crossOrigin?: FunctionMaybe<Nullable<string>>,
//     defer?: FunctionMaybe<Nullable<boolean>>,
//     integrity?: FunctionMaybe<Nullable<string>>,
//     noModule?: FunctionMaybe<Nullable<boolean>>,
//     nonce?: FunctionMaybe<Nullable<string>>,
//     referrerPolicy?: FunctionMaybe<Nullable<HTMLAttributeReferrerPolicy>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     type?: FunctionMaybe<Nullable<string>>
//   }

//   export class SelectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     autoComplete?: FunctionMaybe<Nullable<string>>,
//     autoFocus?: FunctionMaybe<Nullable<boolean>>,
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     form?: FunctionMaybe<Nullable<string>>,
//     multiple?: FunctionMaybe<Nullable<boolean>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     required?: FunctionMaybe<Nullable<boolean>>,
//     size?: FunctionMaybe<Nullable<number>>,
//     value?: FunctionMaybe<Nullable<string>>,
//     onChange?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>
//   }

//   export class SourceHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     height?: FunctionMaybe<Nullable<number | string>>,
//     media?: FunctionMaybe<Nullable<string>>,
//     sizes?: FunctionMaybe<Nullable<string>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     srcSet?: FunctionMaybe<Nullable<string>>,
//     type?: FunctionMaybe<Nullable<string>>,
//     width?: FunctionMaybe<Nullable<number | string>>
//   }

//   export class StyleHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     media?: FunctionMaybe<Nullable<string>>,
//     nonce?: FunctionMaybe<Nullable<string>>,
//     scoped?: FunctionMaybe<Nullable<boolean>>,
//     type?: FunctionMaybe<Nullable<string>>
//   }

//   export class TableHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     cellPadding?: FunctionMaybe<Nullable<number | string>>,
//     cellSpacing?: FunctionMaybe<Nullable<number | string>>,
//     summary?: FunctionMaybe<Nullable<string>>,
//     width?: FunctionMaybe<Nullable<number | string>>
//   }

//   export class TextareaHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     autoComplete?: FunctionMaybe<Nullable<string>>,
//     autoFocus?: FunctionMaybe<Nullable<boolean>>,
//     cols?: FunctionMaybe<Nullable<number>>,
//     dirName?: FunctionMaybe<Nullable<string>>,
//     disabled?: FunctionMaybe<Nullable<boolean>>,
//     form?: FunctionMaybe<Nullable<string>>,
//     maxLength?: FunctionMaybe<Nullable<number>>,
//     minLength?: FunctionMaybe<Nullable<number>>,
//     name?: FunctionMaybe<Nullable<string>>,
//     placeholder?: FunctionMaybe<Nullable<string>>,
//     readOnly?: FunctionMaybe<Nullable<boolean>>,
//     required?: FunctionMaybe<Nullable<boolean>>,
//     rows?: FunctionMaybe<Nullable<number>>,
//     value?: FunctionMaybe<Nullable<string | ReadonlyArray<string> | number>>,
//     wrap?: FunctionMaybe<Nullable<string>>,
//     onChange?: ObservableMaybe<Nullable<KeyboardEventHandler<T>>>
//   }

//   export class TdHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     align?: FunctionMaybe<Nullable<'left' | 'center' | 'right' | 'justify' | 'char'>>,
//     colSpan?: FunctionMaybe<Nullable<number>>,
//     headers?: FunctionMaybe<Nullable<string>>,
//     rowSpan?: FunctionMaybe<Nullable<number>>,
//     scope?: FunctionMaybe<Nullable<string>>,
//     abbr?: FunctionMaybe<Nullable<string>>,
//     height?: FunctionMaybe<Nullable<number | string>>,
//     width?: FunctionMaybe<Nullable<number | string>>,
//     valign?: FunctionMaybe<Nullable<'top' | 'middle' | 'bottom' | 'baseline'>>
//   }

//   export class ThHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     align?: FunctionMaybe<Nullable<'left' | 'center' | 'right' | 'justify' | 'char'>>,
//     colSpan?: FunctionMaybe<Nullable<number>>,
//     headers?: FunctionMaybe<Nullable<string>>,
//     rowSpan?: FunctionMaybe<Nullable<number>>,
//     scope?: FunctionMaybe<Nullable<string>>,
//     abbr?: FunctionMaybe<Nullable<string>>
//   }

//   export class TimeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     dateTime?: FunctionMaybe<Nullable<string>>
//   }

//   export class TrackHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {
//     default?: FunctionMaybe<Nullable<boolean>>,
//     kind?: FunctionMaybe<Nullable<string>>,
//     label?: FunctionMaybe<Nullable<string>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     srcLang?: FunctionMaybe<Nullable<string>>
//   }

//   export class VideoHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {
//     height?: FunctionMaybe<Nullable<number | string>>,
//     playsInline?: FunctionMaybe<Nullable<boolean>>,
//     poster?: FunctionMaybe<Nullable<string>>,
//     width?: FunctionMaybe<Nullable<number | string>>,
//     disablePictureInPicture?: FunctionMaybe<Nullable<boolean>>,
//     disableRemotePlayback?: FunctionMaybe<Nullable<boolean>>
//   }

//   export class WbrHTMLAttributes<T extends EventTarget> extends VoidHTMLAttributes<T> {

//   }

//   export class WebViewHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
//     allowFullScreen?: FunctionMaybe<Nullable<boolean>>,
//     allowpopups?: FunctionMaybe<Nullable<boolean>>,
//     autoFocus?: FunctionMaybe<Nullable<boolean>>,
//     autosize?: FunctionMaybe<Nullable<boolean>>,
//     blinkfeatures?: FunctionMaybe<Nullable<string>>,
//     disableblinkfeatures?: FunctionMaybe<Nullable<string>>,
//     disableguestresize?: FunctionMaybe<Nullable<boolean>>,
//     disablewebsecurity?: FunctionMaybe<Nullable<boolean>>,
//     guestinstance?: FunctionMaybe<Nullable<string>>,
//     httpreferrer?: FunctionMaybe<Nullable<string>>,
//     nodeintegration?: FunctionMaybe<Nullable<boolean>>,
//     partition?: FunctionMaybe<Nullable<string>>,
//     plugins?: FunctionMaybe<Nullable<boolean>>,
//     preload?: FunctionMaybe<Nullable<string>>,
//     src?: FunctionMaybe<Nullable<string>>,
//     useragent?: FunctionMaybe<Nullable<string>>,
//     webpreferences?: FunctionMaybe<Nullable<string>>
//   }

//   export class IntrinsicElementsMap {
//     // HTML
//     a: HTMLAnchorElement,
//     abbr: HTMLElement,
//     address: HTMLElement,
//     area: HTMLAreaElement,
//     article: HTMLElement,
//     aside: HTMLElement,
//     audio: HTMLAudioElement,
//     b: HTMLElement,
//     base: HTMLBaseElement,
//     bdi: HTMLElement,
//     bdo: HTMLElement,
//     big: HTMLElement,
//     blockquote: HTMLElement,
//     body: HTMLBodyElement,
//     br: HTMLBRElement,
//     button: HTMLButtonElement,
//     canvas: HTMLCanvasElement,
//     caption: HTMLElement,
//     cite: HTMLElement,
//     code: HTMLElement,
//     col: HTMLTableColElement,
//     colgroup: HTMLTableColElement,
//     data: HTMLDataElement,
//     datalist: HTMLDataListElement,
//     dd: HTMLElement,
//     del: HTMLElement,
//     details: HTMLElement,
//     dfn: HTMLElement,
//     dialog: HTMLDialogElement,
//     div: HTMLDivElement,
//     dl: HTMLDListElement,
//     dt: HTMLElement,
//     em: HTMLElement,
//     embed: HTMLEmbedElement,
//     fieldset: HTMLFieldSetElement,
//     figcaption: HTMLElement,
//     figure: HTMLElement,
//     footer: HTMLElement,
//     form: HTMLFormElement,
//     h1: HTMLHeadingElement,
//     h2: HTMLHeadingElement,
//     h3: HTMLHeadingElement,
//     h4: HTMLHeadingElement,
//     h5: HTMLHeadingElement,
//     h6: HTMLHeadingElement,
//     head: HTMLHeadElement,
//     header: HTMLElement,
//     hgroup: HTMLElement,
//     hr: HTMLHRElement,
//     html: HTMLHtmlElement,
//     i: HTMLElement,
//     iframe: HTMLIFrameElement,
//     img: HTMLImageElement,
//     input: HTMLInputElement,
//     ins: HTMLModElement,
//     kbd: HTMLElement,
//     keygen: HTMLElement,
//     label: HTMLLabelElement,
//     legend: HTMLLegendElement,
//     li: HTMLLIElement,
//     link: HTMLLinkElement,
//     main: HTMLElement,
//     map: HTMLMapElement,
//     mark: HTMLElement,
//     menu: HTMLElement,
//     menuitem: HTMLElement,
//     meta: HTMLMetaElement,
//     meter: HTMLElement,
//     nav: HTMLElement,
//     noindex: HTMLElement,
//     noscript: HTMLElement,
//     object: HTMLObjectElement,
//     ol: HTMLOListElement,
//     optgroup: HTMLOptGroupElement,
//     option: HTMLOptionElement,
//     output: HTMLElement,
//     p: HTMLParagraphElement,
//     param: HTMLParamElement,
//     picture: HTMLElement,
//     pre: HTMLPreElement,
//     progress: HTMLProgressElement,
//     q: HTMLQuoteElement,
//     rp: HTMLElement,
//     rt: HTMLElement,
//     ruby: HTMLElement,
//     s: HTMLElement,
//     samp: HTMLElement,
//     slot: HTMLSlotElement,
//     script: HTMLScriptElement,
//     section: HTMLElement,
//     select: HTMLSelectElement,
//     small: HTMLElement,
//     source: HTMLSourceElement,
//     span: HTMLSpanElement,
//     strong: HTMLElement,
//     style: HTMLStyleElement,
//     sub: HTMLElement,
//     summary: HTMLElement,
//     sup: HTMLElement,
//     table: HTMLTableElement,
//     template: HTMLTemplateElement,
//     tbody: HTMLTableSectionElement,
//     td: HTMLTableDataCellElement,
//     textarea: HTMLTextAreaElement,
//     tfoot: HTMLTableSectionElement,
//     th: HTMLTableHeaderCellElement,
//     thead: HTMLTableSectionElement,
//     time: HTMLElement,
//     title: HTMLTitleElement,
//     tr: HTMLTableRowElement,
//     track: HTMLTrackElement,
//     u: HTMLElement,
//     ul: HTMLUListElement,
//     var: HTMLElement,
//     video: HTMLVideoElement,
//     wbr: HTMLElement,
//     webview: HTMLElement,

//     // SVG
//     svg: SVGSVGElement,
//     animate: SVGAnimateElement,
//     circle: SVGCircleElement,
//     animateTransform: SVGAnimateElement,
//     clipPath: SVGClipPathElement,
//     defs: SVGDefsElement,
//     desc: SVGDescElement,
//     ellipse: SVGEllipseElement,
//     feBlend: SVGFEBlendElement,
//     feColorMatrix: SVGFEColorMatrixElement,
//     feComponentTransfer: SVGFEComponentTransferElement,
//     feComposite: SVGFECompositeElement,
//     feConvolveMatrix: SVGFEConvolveMatrixElement,
//     feDiffuseLighting: SVGFEDiffuseLightingElement,
//     feDisplacementMap: SVGFEDisplacementMapElement,
//     feDropShadow: SVGFEDropShadowElement,
//     feFlood: SVGFEFloodElement,
//     feFuncA: SVGFEFuncAElement,
//     feFuncB: SVGFEFuncBElement,
//     feFuncG: SVGFEFuncGElement,
//     feFuncR: SVGFEFuncRElement,
//     feGaussianBlur: SVGFEGaussianBlurElement,
//     feImage: SVGFEImageElement,
//     feMerge: SVGFEMergeElement,
//     feMergeNode: SVGFEMergeNodeElement,
//     feMorphology: SVGFEMorphologyElement,
//     feOffset: SVGFEOffsetElement,
//     feSpecularLighting: SVGFESpecularLightingElement,
//     feTile: SVGFETileElement,
//     feTurbulence: SVGFETurbulenceElement,
//     filter: SVGFilterElement,
//     foreignObject: SVGForeignObjectElement,
//     g: SVGGElement,
//     image: SVGImageElement,
//     line: SVGLineElement,
//     linearGradient: SVGLinearGradientElement,
//     marker: SVGMarkerElement,
//     mask: SVGMaskElement,
//     path: SVGPathElement,
//     pattern: SVGPatternElement,
//     polygon: SVGPolygonElement,
//     polyline: SVGPolylineElement,
//     radialGradient: SVGRadialGradientElement,
//     rect: SVGRectElement,
//     stop: SVGStopElement,
//     symbol: SVGSymbolElement,
//     text: SVGTextElement,
//     tspan: SVGTSpanElement,
//     use: SVGUseElement
//   }

//   export class IntrinsicElements {
//     // HTML
//     a: AnchorHTMLAttributes<HTMLAnchorElement>,
//     abbr: HTMLAttributes<HTMLElement>,
//     address: HTMLAttributes<HTMLElement>,
//     area: AreaHTMLAttributes<HTMLAreaElement>,
//     article: HTMLAttributes<HTMLElement>,
//     aside: HTMLAttributes<HTMLElement>,
//     audio: AudioHTMLAttributes<HTMLAudioElement>,
//     b: HTMLAttributes<HTMLElement>,
//     base: BaseHTMLAttributes<HTMLBaseElement>,
//     bdi: HTMLAttributes<HTMLElement>,
//     bdo: HTMLAttributes<HTMLElement>,
//     big: HTMLAttributes<HTMLElement>,
//     blockquote: BlockquoteHTMLAttributes<HTMLElement>,
//     body: HTMLAttributes<HTMLBodyElement>,
//     br: BrHTMLAttributes<HTMLBRElement>,
//     button: ButtonHTMLAttributes<HTMLButtonElement>,
//     canvas: CanvasHTMLAttributes<HTMLCanvasElement>,
//     caption: HTMLAttributes<HTMLElement>,
//     cite: HTMLAttributes<HTMLElement>,
//     code: HTMLAttributes<HTMLElement>,
//     col: ColHTMLAttributes<HTMLTableColElement>,
//     colgroup: ColgroupHTMLAttributes<HTMLTableColElement>,
//     data: DataHTMLAttributes<HTMLDataElement>,
//     datalist: HTMLAttributes<HTMLDataListElement>,
//     dd: HTMLAttributes<HTMLElement>,
//     del: DelHTMLAttributes<HTMLElement>,
//     details: DetailsHTMLAttributes<HTMLElement>,
//     dfn: HTMLAttributes<HTMLElement>,
//     dialog: DialogHTMLAttributes<HTMLDialogElement>,
//     div: HTMLAttributes<HTMLDivElement>,
//     dl: HTMLAttributes<HTMLDListElement>,
//     dt: HTMLAttributes<HTMLElement>,
//     em: HTMLAttributes<HTMLElement>,
//     embed: EmbedHTMLAttributes<HTMLEmbedElement>,
//     fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>,
//     figcaption: HTMLAttributes<HTMLElement>,
//     figure: HTMLAttributes<HTMLElement>,
//     footer: HTMLAttributes<HTMLElement>,
//     form: FormHTMLAttributes<HTMLFormElement>,
//     h1: HTMLAttributes<HTMLHeadingElement>,
//     h2: HTMLAttributes<HTMLHeadingElement>,
//     h3: HTMLAttributes<HTMLHeadingElement>,
//     h4: HTMLAttributes<HTMLHeadingElement>,
//     h5: HTMLAttributes<HTMLHeadingElement>,
//     h6: HTMLAttributes<HTMLHeadingElement>,
//     head: HTMLAttributes<HTMLHeadElement>,
//     header: HTMLAttributes<HTMLElement>,
//     hgroup: HTMLAttributes<HTMLElement>,
//     hr: HrHTMLAttributes<HTMLHRElement>,
//     html: HtmlHTMLAttributes<HTMLHtmlElement>,
//     i: HTMLAttributes<HTMLElement>,
//     iframe: IframeHTMLAttributes<HTMLIFrameElement>,
//     img: ImgHTMLAttributes<HTMLImageElement>,
//     input: InputHTMLAttributes<HTMLInputElement>,
//     ins: InsHTMLAttributes<HTMLModElement>,
//     kbd: HTMLAttributes<HTMLElement>,
//     keygen: KeygenHTMLAttributes<HTMLElement>,
//     label: LabelHTMLAttributes<HTMLLabelElement>,
//     legend: HTMLAttributes<HTMLLegendElement>,
//     li: LiHTMLAttributes<HTMLLIElement>,
//     link: LinkHTMLAttributes<HTMLLinkElement>,
//     main: HTMLAttributes<HTMLElement>,
//     map: MapHTMLAttributes<HTMLMapElement>,
//     mark: HTMLAttributes<HTMLElement>,
//     menu: MenuHTMLAttributes<HTMLElement>,
//     menuitem: HTMLAttributes<HTMLElement>,
//     meta: MetaHTMLAttributes<HTMLMetaElement>,
//     meter: MeterHTMLAttributes<HTMLElement>,
//     nav: HTMLAttributes<HTMLElement>,
//     noindex: HTMLAttributes<HTMLElement>,
//     noscript: HTMLAttributes<HTMLElement>,
//     object: ObjectHTMLAttributes<HTMLObjectElement>,
//     ol: OlHTMLAttributes<HTMLOListElement>,
//     optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>,
//     option: OptionHTMLAttributes<HTMLOptionElement>,
//     output: OutputHTMLAttributes<HTMLElement>,
//     p: HTMLAttributes<HTMLParagraphElement>,
//     param: ParamHTMLAttributes<HTMLParamElement>,
//     picture: HTMLAttributes<HTMLElement>,
//     pre: HTMLAttributes<HTMLPreElement>,
//     progress: ProgressHTMLAttributes<HTMLProgressElement>,
//     q: QuoteHTMLAttributes<HTMLQuoteElement>,
//     rp: HTMLAttributes<HTMLElement>,
//     rt: HTMLAttributes<HTMLElement>,
//     ruby: HTMLAttributes<HTMLElement>,
//     s: HTMLAttributes<HTMLElement>,
//     samp: HTMLAttributes<HTMLElement>,
//     slot: SlotHTMLAttributes<HTMLSlotElement>,
//     script: ScriptHTMLAttributes<HTMLScriptElement>,
//     section: HTMLAttributes<HTMLElement>,
//     select: SelectHTMLAttributes<HTMLSelectElement>,
//     small: HTMLAttributes<HTMLElement>,
//     source: SourceHTMLAttributes<HTMLSourceElement>,
//     span: HTMLAttributes<HTMLSpanElement>,
//     strong: HTMLAttributes<HTMLElement>,
//     style: StyleHTMLAttributes<HTMLStyleElement>,
//     sub: HTMLAttributes<HTMLElement>,
//     summary: HTMLAttributes<HTMLElement>,
//     sup: HTMLAttributes<HTMLElement>,
//     table: TableHTMLAttributes<HTMLTableElement>,
//     template: HTMLAttributes<HTMLTemplateElement>,
//     tbody: HTMLAttributes<HTMLTableSectionElement>,
//     td: TdHTMLAttributes<HTMLTableDataCellElement>,
//     textarea: TextareaHTMLAttributes<HTMLTextAreaElement>,
//     tfoot: HTMLAttributes<HTMLTableSectionElement>,
//     th: ThHTMLAttributes<HTMLTableHeaderCellElement>,
//     thead: HTMLAttributes<HTMLTableSectionElement>,
//     time: TimeHTMLAttributes<HTMLElement>,
//     title: HTMLAttributes<HTMLTitleElement>,
//     tr: HTMLAttributes<HTMLTableRowElement>,
//     track: TrackHTMLAttributes<HTMLTrackElement>,
//     u: HTMLAttributes<HTMLElement>,
//     ul: HTMLAttributes<HTMLUListElement>,
//     var: HTMLAttributes<HTMLElement>,
//     video: VideoHTMLAttributes<HTMLVideoElement>,
//     wbr: WbrHTMLAttributes<HTMLElement>,
//     webview: WebViewHTMLAttributes<HTMLElement>,

//     // SVG
//     svg: SVGAttributes<SVGSVGElement>,
//     animate: SVGAttributes<SVGAnimateElement>,
//     circle: SVGAttributes<SVGCircleElement>,
//     animateTransform: SVGAttributes<SVGAnimateElement>,
//     clipPath: SVGAttributes<SVGClipPathElement>,
//     defs: SVGAttributes<SVGDefsElement>,
//     desc: SVGAttributes<SVGDescElement>,
//     ellipse: SVGAttributes<SVGEllipseElement>,
//     feBlend: SVGAttributes<SVGFEBlendElement>,
//     feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>,
//     feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>,
//     feComposite: SVGAttributes<SVGFECompositeElement>,
//     feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>,
//     feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>,
//     feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>,
//     feDropShadow: SVGAttributes<SVGFEDropShadowElement>,
//     feFlood: SVGAttributes<SVGFEFloodElement>,
//     feFuncA: SVGAttributes<SVGFEFuncAElement>,
//     feFuncB: SVGAttributes<SVGFEFuncBElement>,
//     feFuncG: SVGAttributes<SVGFEFuncGElement>,
//     feFuncR: SVGAttributes<SVGFEFuncRElement>,
//     feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>,
//     feImage: SVGAttributes<SVGFEImageElement>,
//     feMerge: SVGAttributes<SVGFEMergeElement>,
//     feMergeNode: SVGAttributes<SVGFEMergeNodeElement>,
//     feMorphology: SVGAttributes<SVGFEMorphologyElement>,
//     feOffset: SVGAttributes<SVGFEOffsetElement>,
//     feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>,
//     feTile: SVGAttributes<SVGFETileElement>,
//     feTurbulence: SVGAttributes<SVGFETurbulenceElement>,
//     filter: SVGAttributes<SVGFilterElement>,
//     foreignObject: SVGAttributes<SVGForeignObjectElement>,
//     g: SVGAttributes<SVGGElement>,
//     image: SVGAttributes<SVGImageElement>,
//     line: SVGAttributes<SVGLineElement>,
//     linearGradient: SVGAttributes<SVGLinearGradientElement>,
//     marker: SVGAttributes<SVGMarkerElement>,
//     mask: SVGAttributes<SVGMaskElement>,
//     path: SVGAttributes<SVGPathElement>,
//     pattern: SVGAttributes<SVGPatternElement>,
//     polygon: SVGAttributes<SVGPolygonElement>,
//     polyline: SVGAttributes<SVGPolylineElement>,
//     radialGradient: SVGAttributes<SVGRadialGradientElement>,
//     rect: SVGAttributes<SVGRectElement>,
//     stop: SVGAttributes<SVGStopElement>,
//     symbol: SVGAttributes<SVGSymbolElement>,
//     text: SVGAttributes<SVGTextElement>,
//     tspan: SVGAttributes<SVGTSpanElement>,
//     use: SVGAttributes<SVGUseElement>
//   }

// }


