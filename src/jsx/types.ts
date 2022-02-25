
/* GLOBALS */

interface Document {
  onbeforeinput: (( this: GlobalEventHandlers, event: Event ) => any) | null,
  onfocusin: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null,
  onfocusout: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null
}

interface HTMLElement {
  cloneNode ( deep?: boolean ): HTMLElement
}

interface Object {
  isPrototypeOf<T extends Object> ( this: T, object: Object ): object is T
}

/* HELPERS */

type ObservableResolver<T = unknown> = T | ({
  (): ObservableResolver<T>,
  get (): ObservableResolver<T>,
  sample (): ObservableResolver<T>
});

type FunctionResolver<T = unknown> = ({ (): FunctionResolver<T> }) | T;

type AllClassProperties = {
  [key: string]: FunctionResolver<null | undefined | boolean>
};

type AllCSSProperties = {
  [key: string]: FunctionResolver<string | number | null | undefined>
};

type DOMCSSProperties = {
  [key in keyof Omit<CSSStyleDeclaration, 'item' | 'setProperty' | 'removeProperty' | 'getPropertyValue' | 'getPropertyPriority'>]?: FunctionResolver<string | number | null | undefined>
};

type HTMLAttributeReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';

interface HTMLWebViewElement extends HTMLElement {}

/* MAIN */

declare namespace JSX {

  type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ((() => Child) & { metadata: any }) | ({ (): Child, get (): Child, sample (): Child });

  type Children = Child;

  type Element = Child;

  type ElementClass<P = {}, S = {}> = { render: () => Child };

  type Ref<T = unknown> = (( value: T ) => unknown);

  interface ClassProperties extends AllClassProperties {}

  interface StyleProperties extends AllCSSProperties, DOMCSSProperties {}

  type TargetedEvent<T extends EventTarget = EventTarget, TypedEvent extends Event = Event> = Omit<TypedEvent, 'currentTarget'> & { readonly currentTarget: T };
  type TargetedAnimationEvent<T extends EventTarget> = TargetedEvent<T, AnimationEvent>;
  type TargetedClipboardEvent<T extends EventTarget> = TargetedEvent<T, ClipboardEvent>;
  type TargetedCompositionEvent<T extends EventTarget> = TargetedEvent<T, CompositionEvent>;
  type TargetedDragEvent<T extends EventTarget> = TargetedEvent<T, DragEvent>;
  type TargetedFocusEvent<T extends EventTarget> = TargetedEvent<T, FocusEvent>;
  type TargetedKeyboardEvent<T extends EventTarget> = TargetedEvent<T, KeyboardEvent>;
  type TargetedMouseEvent<T extends EventTarget> = TargetedEvent<T, MouseEvent>;
  type TargetedPointerEvent<T extends EventTarget> = TargetedEvent<T, PointerEvent>;
  type TargetedTouchEvent<T extends EventTarget> = TargetedEvent<T, TouchEvent>;
  type TargetedTransitionEvent<T extends EventTarget> = TargetedEvent<T, TransitionEvent>;
  type TargetedUIEvent<T extends EventTarget> = TargetedEvent<T, UIEvent>;
  type TargetedWheelEvent<T extends EventTarget> = TargetedEvent<T, WheelEvent>;

  type EventHandler<Event extends TargetedEvent> = { ( this: never, event: Event ): void };
  type AnimationEventHandler<T extends EventTarget> = EventHandler<TargetedAnimationEvent<T>>;
  type ClipboardEventHandler<T extends EventTarget> = EventHandler<TargetedClipboardEvent<T>>;
  type CompositionEventHandler<T extends EventTarget> = EventHandler<TargetedCompositionEvent<T>>;
  type DragEventHandler<T extends EventTarget> = EventHandler<TargetedDragEvent<T>>;
  type FocusEventHandler<T extends EventTarget> = EventHandler<TargetedFocusEvent<T>>;
  type GenericEventHandler<T extends EventTarget> = EventHandler<TargetedEvent<T>>;
  type KeyboardEventHandler<T extends EventTarget> = EventHandler<TargetedKeyboardEvent<T>>;
  type MouseEventHandler<T extends EventTarget> = EventHandler<TargetedMouseEvent<T>>;
  type PointerEventHandler<T extends EventTarget> = EventHandler<TargetedPointerEvent<T>>;
  type TouchEventHandler<T extends EventTarget> = EventHandler<TargetedTouchEvent<T>>;
  type TransitionEventHandler<T extends EventTarget> = EventHandler<TargetedTransitionEvent<T>>;
  type UIEventHandler<T extends EventTarget> = EventHandler<TargetedUIEvent<T>>;
  type WheelEventHandler<T extends EventTarget> = EventHandler<TargetedWheelEvent<T>>;

  type DetailedHTMLProps<Attributes extends HTMLAttributes<T>, T extends EventTarget> = ClassAttributes<T> & Attributes;

  interface ClassAttributes<T> {
    ref?: Ref<T>
  }

  interface ElementAttributesProperty {
    props: any
  }

  interface ElementChildrenAttribute {
    children: any
  }

  interface IntrinsicAttributes {
    key?: string
  }

  interface AriaAttributes {
    ariaActivedescendant?: FunctionResolver<string>,
    ariaAtomic?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaAutocomplete?: FunctionResolver<'none' | 'inline' | 'list' | 'both'>,
    ariaBusy?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaChecked?: FunctionResolver<boolean | 'false' | 'mixed' | 'true'>,
    ariaColcount?: FunctionResolver<number>,
    ariaColindex?: FunctionResolver<number>,
    ariaColspan?: FunctionResolver<number>,
    ariaControls?: FunctionResolver<string>,
    ariaCurrent?: FunctionResolver<boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'>,
    ariaDescribedby?: FunctionResolver<string>,
    ariaDetails?: FunctionResolver<string>,
    ariaDisabled?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaDropeffect?: FunctionResolver<'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'>,
    ariaErrormessage?: FunctionResolver<string>,
    ariaExpanded?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaFlowto?: FunctionResolver<string>,
    ariaGrabbed?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaHaspopup?: FunctionResolver<boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'>,
    ariaHidden?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaInvalid?: FunctionResolver<boolean | 'false' | 'true' | 'grammar' | 'spelling'>,
    ariaKeyshortcuts?: FunctionResolver<string>,
    ariaLabel?: FunctionResolver<string>,
    ariaLabelledby?: FunctionResolver<string>,
    ariaLevel?: FunctionResolver<number>,
    ariaLive?: FunctionResolver<'off' | 'assertive' | 'polite'>,
    ariaModal?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaMultiline?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaMultiselectable?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaOrientation?: FunctionResolver<'horizontal' | 'vertical'>,
    ariaOwns?: FunctionResolver<string>,
    ariaPlaceholder?: FunctionResolver<string>,
    ariaPosinset?: FunctionResolver<number>,
    ariaPressed?: FunctionResolver<boolean | 'false' | 'mixed' | 'true'>,
    ariaReadonly?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaRelevant?: FunctionResolver<'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals'>,
    ariaRequired?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaRoledescription?: FunctionResolver<string>,
    ariaRowcount?: FunctionResolver<number>,
    ariaRowindex?: FunctionResolver<number>,
    ariaRowspan?: FunctionResolver<number>,
    ariaSelected?: FunctionResolver<boolean | 'true' | 'false'>,
    ariaSetsize?: FunctionResolver<number>,
    ariaSort?: FunctionResolver<'none' | 'ascending' | 'descending' | 'other'>,
    ariaValuemax?: FunctionResolver<number>,
    ariaValuemin?: FunctionResolver<number>,
    ariaValuenow?: FunctionResolver<number>,
    ariaValuetext?: FunctionResolver<string>
  }

  interface EventAttributes<T extends EventTarget> {
    /* IMAGE EVENTS */
    onLoad?: ObservableResolver<GenericEventHandler<T>>,
    onLoadCapture?: ObservableResolver<GenericEventHandler<T>>,
    onError?: ObservableResolver<GenericEventHandler<T>>,
    onErrorCapture?: ObservableResolver<GenericEventHandler<T>>,
    /* CLIPBOARD EVENTS */
    onCopy?: ObservableResolver<ClipboardEventHandler<T>>,
    onCopyCapture?: ObservableResolver<ClipboardEventHandler<T>>,
    onCut?: ObservableResolver<ClipboardEventHandler<T>>,
    onCutCapture?: ObservableResolver<ClipboardEventHandler<T>>,
    onPaste?: ObservableResolver<ClipboardEventHandler<T>>,
    onPasteCapture?: ObservableResolver<ClipboardEventHandler<T>>,
    /* COMPOSITION EVENTS */
    onCompositionEnd?: ObservableResolver<CompositionEventHandler<T>>,
    onCompositionEndCapture?: ObservableResolver<CompositionEventHandler<T>>,
    onCompositionStart?: ObservableResolver<CompositionEventHandler<T>>,
    onCompositionStartCapture?: ObservableResolver<CompositionEventHandler<T>>,
    onCompositionUpdate?: ObservableResolver<CompositionEventHandler<T>>,
    onCompositionUpdateCapture?: ObservableResolver<CompositionEventHandler<T>>,
    /* DETAILS EVENTS */
    onToggle?: ObservableResolver<GenericEventHandler<T>>,
    /* FOCUS EVENTS */
    onFocus?: ObservableResolver<FocusEventHandler<T>>,
    onFocusCapture?: ObservableResolver<FocusEventHandler<T>>,
    onfocusin?: ObservableResolver<FocusEventHandler<T>>,
    onfocusinCapture?: ObservableResolver<FocusEventHandler<T>>,
    onfocusout?: ObservableResolver<FocusEventHandler<T>>,
    onfocusoutCapture?: ObservableResolver<FocusEventHandler<T>>,
    onBlur?: ObservableResolver<FocusEventHandler<T>>,
    onBlurCapture?: ObservableResolver<FocusEventHandler<T>>,
    /* FORM EVENTS */
    onChange?: ObservableResolver<GenericEventHandler<T>>,
    onChangeCapture?: ObservableResolver<GenericEventHandler<T>>,
    onInput?: ObservableResolver<GenericEventHandler<T>>,
    onInputCapture?: ObservableResolver<GenericEventHandler<T>>,
    onBeforeInput?: ObservableResolver<GenericEventHandler<T>>,
    onBeforeInputCapture?: ObservableResolver<GenericEventHandler<T>>,
    onSearch?: ObservableResolver<GenericEventHandler<T>>,
    onSearchCapture?: ObservableResolver<GenericEventHandler<T>>,
    onSubmit?: ObservableResolver<GenericEventHandler<T>>,
    onSubmitCapture?: ObservableResolver<GenericEventHandler<T>>,
    onInvalid?: ObservableResolver<GenericEventHandler<T>>,
    onInvalidCapture?: ObservableResolver<GenericEventHandler<T>>,
    onReset?: ObservableResolver<GenericEventHandler<T>>,
    onResetCapture?: ObservableResolver<GenericEventHandler<T>>,
    onFormData?: ObservableResolver<GenericEventHandler<T>>,
    onFormDataCapture?: ObservableResolver<GenericEventHandler<T>>,
    /* KEYBOARD EVENTS */
    onKeyDown?: ObservableResolver<KeyboardEventHandler<T>>,
    onKeyDownCapture?: ObservableResolver<KeyboardEventHandler<T>>,
    onKeyPress?: ObservableResolver<KeyboardEventHandler<T>>,
    onKeyPressCapture?: ObservableResolver<KeyboardEventHandler<T>>,
    onKeyUp?: ObservableResolver<KeyboardEventHandler<T>>,
    onKeyUpCapture?: ObservableResolver<KeyboardEventHandler<T>>,
    /* MEDIA EVENTS */
    onAbort?: ObservableResolver<GenericEventHandler<T>>,
    onAbortCapture?: ObservableResolver<GenericEventHandler<T>>,
    onCanPlay?: ObservableResolver<GenericEventHandler<T>>,
    onCanPlayCapture?: ObservableResolver<GenericEventHandler<T>>,
    onCanPlayThrough?: ObservableResolver<GenericEventHandler<T>>,
    onCanPlayThroughCapture?: ObservableResolver<GenericEventHandler<T>>,
    onDurationChange?: ObservableResolver<GenericEventHandler<T>>,
    onDurationChangeCapture?: ObservableResolver<GenericEventHandler<T>>,
    onEmptied?: ObservableResolver<GenericEventHandler<T>>,
    onEmptiedCapture?: ObservableResolver<GenericEventHandler<T>>,
    onEncrypted?: ObservableResolver<GenericEventHandler<T>>,
    onEncryptedCapture?: ObservableResolver<GenericEventHandler<T>>,
    onEnded?: ObservableResolver<GenericEventHandler<T>>,
    onEndedCapture?: ObservableResolver<GenericEventHandler<T>>,
    onLoadedData?: ObservableResolver<GenericEventHandler<T>>,
    onLoadedDataCapture?: ObservableResolver<GenericEventHandler<T>>,
    onLoadedMetadata?: ObservableResolver<GenericEventHandler<T>>,
    onLoadedMetadataCapture?: ObservableResolver<GenericEventHandler<T>>,
    onLoadStart?: ObservableResolver<GenericEventHandler<T>>,
    onLoadStartCapture?: ObservableResolver<GenericEventHandler<T>>,
    onPause?: ObservableResolver<GenericEventHandler<T>>,
    onPauseCapture?: ObservableResolver<GenericEventHandler<T>>,
    onPlay?: ObservableResolver<GenericEventHandler<T>>,
    onPlayCapture?: ObservableResolver<GenericEventHandler<T>>,
    onPlaying?: ObservableResolver<GenericEventHandler<T>>,
    onPlayingCapture?: ObservableResolver<GenericEventHandler<T>>,
    onProgress?: ObservableResolver<GenericEventHandler<T>>,
    onProgressCapture?: ObservableResolver<GenericEventHandler<T>>,
    onRateChange?: ObservableResolver<GenericEventHandler<T>>,
    onRateChangeCapture?: ObservableResolver<GenericEventHandler<T>>,
    onSeeked?: ObservableResolver<GenericEventHandler<T>>,
    onSeekedCapture?: ObservableResolver<GenericEventHandler<T>>,
    onSeeking?: ObservableResolver<GenericEventHandler<T>>,
    onSeekingCapture?: ObservableResolver<GenericEventHandler<T>>,
    onStalled?: ObservableResolver<GenericEventHandler<T>>,
    onStalledCapture?: ObservableResolver<GenericEventHandler<T>>,
    onSuspend?: ObservableResolver<GenericEventHandler<T>>,
    onSuspendCapture?: ObservableResolver<GenericEventHandler<T>>,
    onTimeUpdate?: ObservableResolver<GenericEventHandler<T>>,
    onTimeUpdateCapture?: ObservableResolver<GenericEventHandler<T>>,
    onVolumeChange?: ObservableResolver<GenericEventHandler<T>>,
    onVolumeChangeCapture?: ObservableResolver<GenericEventHandler<T>>,
    onWaiting?: ObservableResolver<GenericEventHandler<T>>,
    onWaitingCapture?: ObservableResolver<GenericEventHandler<T>>,
    /* MOUSE EVENTS */
    onClick?: ObservableResolver<MouseEventHandler<T>>,
    onClickCapture?: ObservableResolver<MouseEventHandler<T>>,
    onContextMenu?: ObservableResolver<MouseEventHandler<T>>,
    onContextMenuCapture?: ObservableResolver<MouseEventHandler<T>>,
    onDblClick?: ObservableResolver<MouseEventHandler<T>>,
    onDblClickCapture?: ObservableResolver<MouseEventHandler<T>>,
    onDrag?: ObservableResolver<DragEventHandler<T>>,
    onDragCapture?: ObservableResolver<DragEventHandler<T>>,
    onDragEnd?: ObservableResolver<DragEventHandler<T>>,
    onDragEndCapture?: ObservableResolver<DragEventHandler<T>>,
    onDragEnter?: ObservableResolver<DragEventHandler<T>>,
    onDragEnterCapture?: ObservableResolver<DragEventHandler<T>>,
    onDragExit?: ObservableResolver<DragEventHandler<T>>,
    onDragExitCapture?: ObservableResolver<DragEventHandler<T>>,
    onDragLeave?: ObservableResolver<DragEventHandler<T>>,
    onDragLeaveCapture?: ObservableResolver<DragEventHandler<T>>,
    onDragOver?: ObservableResolver<DragEventHandler<T>>,
    onDragOverCapture?: ObservableResolver<DragEventHandler<T>>,
    onDragStart?: ObservableResolver<DragEventHandler<T>>,
    onDragStartCapture?: ObservableResolver<DragEventHandler<T>>,
    onDrop?: ObservableResolver<DragEventHandler<T>>,
    onDropCapture?: ObservableResolver<DragEventHandler<T>>,
    onMouseDown?: ObservableResolver<MouseEventHandler<T>>,
    onMouseDownCapture?: ObservableResolver<MouseEventHandler<T>>,
    onMouseEnter?: ObservableResolver<MouseEventHandler<T>>,
    onMouseEnterCapture?: ObservableResolver<MouseEventHandler<T>>,
    onMouseLeave?: ObservableResolver<MouseEventHandler<T>>,
    onMouseLeaveCapture?: ObservableResolver<MouseEventHandler<T>>,
    onMouseMove?: ObservableResolver<MouseEventHandler<T>>,
    onMouseMoveCapture?: ObservableResolver<MouseEventHandler<T>>,
    onMouseOut?: ObservableResolver<MouseEventHandler<T>>,
    onMouseOutCapture?: ObservableResolver<MouseEventHandler<T>>,
    onMouseOver?: ObservableResolver<MouseEventHandler<T>>,
    onMouseOverCapture?: ObservableResolver<MouseEventHandler<T>>,
    onMouseUp?: ObservableResolver<MouseEventHandler<T>>,
    onMouseUpCapture?: ObservableResolver<MouseEventHandler<T>>,
    /* SELECTION EVENTS */
    onSelect?: ObservableResolver<GenericEventHandler<T>>,
    onSelectCapture?: ObservableResolver<GenericEventHandler<T>>,
    /* TOUCH EVENTS */
    onTouchCancel?: ObservableResolver<TouchEventHandler<T>>,
    onTouchCancelCapture?: ObservableResolver<TouchEventHandler<T>>,
    onTouchEnd?: ObservableResolver<TouchEventHandler<T>>,
    onTouchEndCapture?: ObservableResolver<TouchEventHandler<T>>,
    onTouchMove?: ObservableResolver<TouchEventHandler<T>>,
    onTouchMoveCapture?: ObservableResolver<TouchEventHandler<T>>,
    onTouchStart?: ObservableResolver<TouchEventHandler<T>>,
    onTouchStartCapture?: ObservableResolver<TouchEventHandler<T>>,
    /* POINTER EVENTS */
    onPointerOver?: ObservableResolver<PointerEventHandler<T>>,
    onPointerOverCapture?: ObservableResolver<PointerEventHandler<T>>,
    onPointerEnter?: ObservableResolver<PointerEventHandler<T>>,
    onPointerEnterCapture?: ObservableResolver<PointerEventHandler<T>>,
    onPointerDown?: ObservableResolver<PointerEventHandler<T>>,
    onPointerDownCapture?: ObservableResolver<PointerEventHandler<T>>,
    onPointerMove?: ObservableResolver<PointerEventHandler<T>>,
    onPointerMoveCapture?: ObservableResolver<PointerEventHandler<T>>,
    onPointerUp?: ObservableResolver<PointerEventHandler<T>>,
    onPointerUpCapture?: ObservableResolver<PointerEventHandler<T>>,
    onPointerCancel?: ObservableResolver<PointerEventHandler<T>>,
    onPointerCancelCapture?: ObservableResolver<PointerEventHandler<T>>,
    onPointerOut?: ObservableResolver<PointerEventHandler<T>>,
    onPointerOutCapture?: ObservableResolver<PointerEventHandler<T>>,
    onPointerLeave?: ObservableResolver<PointerEventHandler<T>>,
    onPointerLeaveCapture?: ObservableResolver<PointerEventHandler<T>>,
    onGotPointerCapture?: ObservableResolver<PointerEventHandler<T>>,
    onGotPointerCaptureCapture?: ObservableResolver<PointerEventHandler<T>>,
    onLostPointerCapture?: ObservableResolver<PointerEventHandler<T>>,
    onLostPointerCaptureCapture?: ObservableResolver<PointerEventHandler<T>>,
    /* UI EVENTS */
    onScroll?: ObservableResolver<UIEventHandler<T>>,
    onScrollCapture?: ObservableResolver<UIEventHandler<T>>,
    /* WHEEL EVENTS */
    onWheel?: ObservableResolver<WheelEventHandler<T>>,
    onWheelCapture?: ObservableResolver<WheelEventHandler<T>>,
    /* ANIMATION EVENTS */
    onAnimationStart?: ObservableResolver<AnimationEventHandler<T>>,
    onAnimationStartCapture?: ObservableResolver<AnimationEventHandler<T>>,
    onAnimationEnd?: ObservableResolver<AnimationEventHandler<T>>,
    onAnimationEndCapture?: ObservableResolver<AnimationEventHandler<T>>,
    onAnimationIteration?: ObservableResolver<AnimationEventHandler<T>>,
    onAnimationIterationCapture?: ObservableResolver<AnimationEventHandler<T>>,
    /* TRANSITION EVENTS */
    onTransitionEnd?: ObservableResolver<TransitionEventHandler<T>>,
    onTransitionEndCapture?: ObservableResolver<TransitionEventHandler<T>>
  }

  interface ViewAttributes {
    children?: Children,
    textContent?: FunctionResolver<string>,
    innerHTML?: FunctionResolver<string>,
    outerHTML?: FunctionResolver<string>,
    dangerouslySetInnerHTML?: FunctionResolver<{
      __html: FunctionResolver<string>
    }>
  }

  interface DOMAttributes<T extends EventTarget> extends EventAttributes<T>, ViewAttributes {

  }

  interface HTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
    /* REACT-SPECIFIC ATTRIBUTES */
    defaultChecked?: FunctionResolver<boolean>,
    defaultValue?: FunctionResolver<string | number | ReadonlyArray<string>>,
    suppressContentEditableWarning?: FunctionResolver<boolean>,
    suppressHydrationWarning?: FunctionResolver<boolean>,
    /* STANDARD HTML ATTRIBUTES */
    accessKey?: FunctionResolver<string>,
    class?: FunctionResolver<string | ClassProperties>,
    className?: FunctionResolver<string>,
    contentEditable?: FunctionResolver<boolean | 'true' | 'false' | 'inherit'>,
    contextMenu?: FunctionResolver<string>,
    dir?: FunctionResolver<string>,
    draggable?: FunctionResolver<boolean | 'true' | 'false'>,
    hidden?: FunctionResolver<boolean>,
    id?: FunctionResolver<string>,
    lang?: FunctionResolver<string>,
    placeholder?: FunctionResolver<string>,
    slot?: FunctionResolver<string>,
    spellCheck?: FunctionResolver<boolean | 'true' | 'false'>,
    style?: FunctionResolver<string | StyleProperties>,
    tabIndex?: FunctionResolver<number>,
    title?: FunctionResolver<string>,
    translate?: FunctionResolver<'yes' | 'no'>,
    /* UNKNOWN */
    radioGroup?: FunctionResolver<string>,
    /* WAI-ARIA */
    role?: FunctionResolver<'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'cell' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem'>,
    /* RDFA ATTRIBUTES */
    about?: FunctionResolver<string>,
    datatype?: FunctionResolver<string>,
    inlist?: FunctionResolver<boolean>;
    prefix?: FunctionResolver<string>,
    property?: FunctionResolver<string>,
    resource?: FunctionResolver<string>,
    typeof?: FunctionResolver<string>,
    vocab?: FunctionResolver<string>,
    /* NON-STANDARD ATTRIBUTES */
    autoCapitalize?: FunctionResolver<string>,
    autoCorrect?: FunctionResolver<string>,
    autoSave?: FunctionResolver<string>,
    color?: FunctionResolver<string>,
    itemProp?: FunctionResolver<string>,
    itemScope?: FunctionResolver<boolean>,
    itemType?: FunctionResolver<string>,
    itemID?: FunctionResolver<string>,
    itemRef?: FunctionResolver<string>,
    results?: FunctionResolver<number>,
    security?: FunctionResolver<string>,
    unselectable?: FunctionResolver<'on' | 'off'>,
    /* LIVING STANDARD */
    inputMode?: FunctionResolver<'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'>,
    is?: FunctionResolver<string>
  }

  interface AnchorHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    download?: FunctionResolver<boolean>,
    href?: FunctionResolver<string>,
    hrefLang?: FunctionResolver<string>,
    media?: FunctionResolver<string>,
    ping?: FunctionResolver<string>,
    rel?: FunctionResolver<string>,
    target?: FunctionResolver<'_self' | '_blank' | '_parent' | '_top'>,
    type?: FunctionResolver<string>,
    referrerPolicy?: FunctionResolver<HTMLAttributeReferrerPolicy>
  }

  interface AudioHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {

  }

  interface AreaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    alt?: FunctionResolver<string>,
    coords?: FunctionResolver<string>,
    download?: FunctionResolver<boolean>,
    href?: FunctionResolver<string>,
    hrefLang?: FunctionResolver<string>,
    media?: FunctionResolver<string>,
    referrerPolicy?: FunctionResolver<HTMLAttributeReferrerPolicy>,
    rel?: FunctionResolver<string>,
    shape?: FunctionResolver<string>,
    target?: FunctionResolver<string>
  }

  interface BaseHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    href?: FunctionResolver<string>,
    target?: FunctionResolver<string>
  }

  interface BlockquoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionResolver<string>
  }

  interface ButtonHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoFocus?: FunctionResolver<boolean>,
    disabled?: FunctionResolver<boolean>,
    form?: FunctionResolver<string>,
    formAction?: FunctionResolver<string>,
    formEncType?: FunctionResolver<string>,
    formMethod?: FunctionResolver<string>,
    formNoValidate?: FunctionResolver<boolean>,
    formTarget?: FunctionResolver<string>,
    name?: FunctionResolver<string>,
    type?: FunctionResolver<'submit' | 'reset' | 'button'>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>
  }

  interface CanvasHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: FunctionResolver<number | string>,
    width?: FunctionResolver<number | string>
  }

  interface ColHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    span?: FunctionResolver<number>,
    width?: FunctionResolver<number | string>
  }

  interface ColgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    span?: FunctionResolver<number>
  }

  interface DataHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    value?: FunctionResolver<string | ReadonlyArray<string> | number>
  }

  interface DetailsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    open?: FunctionResolver<boolean>,
    onToggle?: ObservableResolver<GenericEventHandler<T>>
  }

  interface DelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionResolver<string>,
    dateTime?: FunctionResolver<string>
  }

  interface DialogHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    open?: FunctionResolver<boolean>
  }

  interface EmbedHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: FunctionResolver<number | string>,
    src?: FunctionResolver<string>,
    type?: FunctionResolver<string>,
    width?: FunctionResolver<number | string>
  }

  interface FieldsetHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: FunctionResolver<boolean>,
    form?: FunctionResolver<string>,
    name?: FunctionResolver<string>
  }

  interface FormHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    acceptCharset?: FunctionResolver<string>,
    action?: FunctionResolver<string>,
    autoComplete?: FunctionResolver<string>,
    encType?: FunctionResolver<string>,
    method?: FunctionResolver<string>,
    name?: FunctionResolver<string>,
    noValidate?: FunctionResolver<boolean>,
    target?: FunctionResolver<string>
  }

  interface HtmlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    manifest?: FunctionResolver<string>
  }

  interface IframeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    allow?: FunctionResolver<string>,
    allowFullScreen?: FunctionResolver<boolean>,
    allowTransparency?: FunctionResolver<boolean>,
    /** @deprecated */
    frameBorder?: FunctionResolver<number | string>,
    height?: FunctionResolver<number | string>,
    loading?: FunctionResolver<'eager' | 'lazy'>,
    /** @deprecated */
    marginHeight?: FunctionResolver<number>,
    /** @deprecated */
    marginWidth?: FunctionResolver<number>,
    name?: FunctionResolver<string>,
    referrerPolicy?: FunctionResolver<HTMLAttributeReferrerPolicy>,
    sandbox?: FunctionResolver<string>,
    /** @deprecated */
    scrolling?: FunctionResolver<string>,
    seamless?: FunctionResolver<boolean>,
    src?: FunctionResolver<string>,
    srcDoc?: FunctionResolver<string>,
    width?: FunctionResolver<number | string>
  }

  interface ImgHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    alt?: FunctionResolver<string>,
    crossOrigin?: FunctionResolver<'anonymous' | 'use-credentials' | ''>,
    decoding?: FunctionResolver<'async' | 'auto' | 'sync'>,
    height?: FunctionResolver<number | string>,
    loading?: FunctionResolver<'eager' | 'lazy'>,
    referrerPolicy?: FunctionResolver<HTMLAttributeReferrerPolicy>,
    sizes?: FunctionResolver<string>,
    src?: FunctionResolver<string>,
    srcSet?: FunctionResolver<string>,
    useMap?: FunctionResolver<string>,
    width?: FunctionResolver<number | string>
  }

  interface InsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionResolver<string>,
    dateTime?: FunctionResolver<string>
  }

  interface InputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    accept?: FunctionResolver<string>,
    alt?: FunctionResolver<string>,
    autoComplete?: FunctionResolver<string>,
    autoFocus?: FunctionResolver<boolean>,
    capture?: FunctionResolver<boolean | 'user' | 'environment'>,
    checked?: FunctionResolver<boolean>,
    crossOrigin?: FunctionResolver<string>,
    disabled?: FunctionResolver<boolean>,
    enterKeyHint?: FunctionResolver<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>,
    form?: FunctionResolver<string>,
    formAction?: FunctionResolver<string>,
    formEncType?: FunctionResolver<string>,
    formMethod?: FunctionResolver<string>,
    formNoValidate?: FunctionResolver<boolean>,
    formTarget?: FunctionResolver<string>,
    height?: FunctionResolver<number | string>,
    list?: FunctionResolver<string>,
    max?: FunctionResolver<number | string>,
    maxLength?: FunctionResolver<number>,
    min?: FunctionResolver<number | string>,
    minLength?: FunctionResolver<number>,
    multiple?: FunctionResolver<boolean>,
    name?: FunctionResolver<string>,
    pattern?: FunctionResolver<string>,
    placeholder?: FunctionResolver<string>,
    readOnly?: FunctionResolver<boolean>,
    required?: FunctionResolver<boolean>,
    size?: FunctionResolver<number>,
    src?: FunctionResolver<string>,
    step?: FunctionResolver<number | string>,
    type?: FunctionResolver<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>,
    width?: FunctionResolver<number | string>,
    onChange?: ObservableResolver<KeyboardEventHandler<T>>
  }

  interface KeygenHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoFocus?: FunctionResolver<boolean>,
    challenge?: FunctionResolver<string>,
    disabled?: FunctionResolver<boolean>,
    form?: FunctionResolver<string>,
    keyType?: FunctionResolver<string>,
    keyParams?: FunctionResolver<string>,
    name?: FunctionResolver<string>
  }

  interface LabelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: FunctionResolver<string>,
    htmlFor?: FunctionResolver<string>
  }

  interface LiHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    value?: FunctionResolver<string | ReadonlyArray<string> | number>
  }

  interface LinkHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    as?: FunctionResolver<string>,
    crossOrigin?: FunctionResolver<string>,
    href?: FunctionResolver<string>,
    hrefLang?: FunctionResolver<string>,
    integrity?: FunctionResolver<string>,
    media?: FunctionResolver<string>,
    imageSrcSet?: FunctionResolver<string>,
    referrerPolicy?: FunctionResolver<HTMLAttributeReferrerPolicy>,
    rel?: FunctionResolver<string>,
    sizes?: FunctionResolver<string>,
    type?: FunctionResolver<string>,
    charSet?: FunctionResolver<string>
  }

  interface MapHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: FunctionResolver<string>
  }

  interface MenuHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    type?: FunctionResolver<string>
  }

  interface MediaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoPlay?: FunctionResolver<boolean>,
    controls?: FunctionResolver<boolean>,
    controlsList?: FunctionResolver<string>,
    crossOrigin?: FunctionResolver<string>,
    loop?: FunctionResolver<boolean>,
    mediaGroup?: FunctionResolver<string>,
    muted?: FunctionResolver<boolean>,
    playsInline?: FunctionResolver<boolean>,
    preload?: FunctionResolver<string>,
    src?: FunctionResolver<string>
  }

  interface MetaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    charSet?: FunctionResolver<string>,
    content?: FunctionResolver<string>,
    httpEquiv?: FunctionResolver<string>,
    name?: FunctionResolver<string>,
    media?: FunctionResolver<string>
  }

  interface MeterHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: FunctionResolver<string>,
    high?: FunctionResolver<number>,
    low?: FunctionResolver<number>,
    max?: FunctionResolver<number | string>,
    min?: FunctionResolver<number | string>,
    optimum?: FunctionResolver<number>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>
  }

  interface QuoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: FunctionResolver<string>
  }

  interface ObjectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    classID?: FunctionResolver<string>,
    data?: FunctionResolver<string>,
    form?: FunctionResolver<string>,
    height?: FunctionResolver<number | string>,
    name?: FunctionResolver<string>,
    type?: FunctionResolver<string>,
    useMap?: FunctionResolver<string>,
    width?: FunctionResolver<number | string>,
    wmode?: FunctionResolver<string>
  }

  interface OlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    reversed?: FunctionResolver<boolean>,
    start?: FunctionResolver<number>,
    type?: FunctionResolver<'1' | 'a' | 'A' | 'i' | 'I'>
  }

  interface OptgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: FunctionResolver<boolean>,
    label?: FunctionResolver<string>
  }

  interface OptionHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: FunctionResolver<boolean>,
    label?: FunctionResolver<string>,
    selected?: FunctionResolver<boolean>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>
  }

  interface OutputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: FunctionResolver<string>,
    htmlFor?: FunctionResolver<string>,
    name?: FunctionResolver<string>
  }

  interface ParamHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: FunctionResolver<string>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>
  }

  interface ProgressHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    max?: FunctionResolver<number | string>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>
  }

  interface SlotHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: FunctionResolver<string>
  }

  interface ScriptHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    async?: FunctionResolver<boolean>,
    /** @deprecated */
    charSet?: FunctionResolver<string>,
    crossOrigin?: FunctionResolver<string>,
    defer?: FunctionResolver<boolean>,
    integrity?: FunctionResolver<string>,
    noModule?: FunctionResolver<boolean>,
    nonce?: FunctionResolver<string>,
    referrerPolicy?: FunctionResolver<HTMLAttributeReferrerPolicy>,
    src?: FunctionResolver<string>,
    type?: FunctionResolver<string>
  }

  interface SelectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoComplete?: FunctionResolver<string>,
    autoFocus?: FunctionResolver<boolean>,
    disabled?: FunctionResolver<boolean>,
    form?: FunctionResolver<string>,
    multiple?: FunctionResolver<boolean>,
    name?: FunctionResolver<string>,
    required?: FunctionResolver<boolean>,
    size?: FunctionResolver<number>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>,
    onChange?: ObservableResolver<KeyboardEventHandler<T>>
  }

  interface SourceHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: FunctionResolver<number | string>,
    media?: FunctionResolver<string>,
    sizes?: FunctionResolver<string>,
    src?: FunctionResolver<string>,
    srcSet?: FunctionResolver<string>,
    type?: FunctionResolver<string>,
    width?: FunctionResolver<number | string>
  }

  interface StyleHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    media?: FunctionResolver<string>,
    nonce?: FunctionResolver<string>,
    scoped?: FunctionResolver<boolean>,
    type?: FunctionResolver<string>
  }

  interface TableHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cellPadding?: FunctionResolver<number | string>,
    cellSpacing?: FunctionResolver<number | string>,
    summary?: FunctionResolver<string>,
    width?: FunctionResolver<number | string>
  }

  interface TextareaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoComplete?: FunctionResolver<string>,
    autoFocus?: FunctionResolver<boolean>,
    cols?: FunctionResolver<number>,
    dirName?: FunctionResolver<string>,
    disabled?: FunctionResolver<boolean>,
    form?: FunctionResolver<string>,
    maxLength?: FunctionResolver<number>,
    minLength?: FunctionResolver<number>,
    name?: FunctionResolver<string>,
    placeholder?: FunctionResolver<string>,
    readOnly?: FunctionResolver<boolean>,
    required?: FunctionResolver<boolean>,
    rows?: FunctionResolver<number>,
    value?: FunctionResolver<string | ReadonlyArray<string> | number>,
    wrap?: FunctionResolver<string>,
    onChange?: ObservableResolver<KeyboardEventHandler<T>>
  }

  interface TdHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    align?: FunctionResolver<'left' | 'center' | 'right' | 'justify' | 'char'>,
    colSpan?: FunctionResolver<number>,
    headers?: FunctionResolver<string>,
    rowSpan?: FunctionResolver<number>,
    scope?: FunctionResolver<string>,
    abbr?: FunctionResolver<string>,
    height?: FunctionResolver<number | string>,
    width?: FunctionResolver<number | string>,
    valign?: FunctionResolver<'top' | 'middle' | 'bottom' | 'baseline'>
  }

  interface ThHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    align?: FunctionResolver<'left' | 'center' | 'right' | 'justify' | 'char'>,
    colSpan?: FunctionResolver<number>,
    headers?: FunctionResolver<string>,
    rowSpan?: FunctionResolver<number>,
    scope?: FunctionResolver<string>,
    abbr?: FunctionResolver<string>
  }

  interface TimeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    dateTime?: FunctionResolver<string>
  }

  interface TrackHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    default?: FunctionResolver<boolean>,
    kind?: FunctionResolver<string>,
    label?: FunctionResolver<string>,
    src?: FunctionResolver<string>,
    srcLang?: FunctionResolver<string>
  }

  interface VideoHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {
    height?: FunctionResolver<number | string>,
    playsInline?: FunctionResolver<boolean>,
    poster?: FunctionResolver<string>,
    width?: FunctionResolver<number | string>,
    disablePictureInPicture?: FunctionResolver<boolean>,
    disableRemotePlayback?: FunctionResolver<boolean>
  }

  interface WebViewHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    allowFullScreen?: FunctionResolver<boolean>,
    allowpopups?: FunctionResolver<boolean>,
    autoFocus?: FunctionResolver<boolean>,
    autosize?: FunctionResolver<boolean>,
    blinkfeatures?: FunctionResolver<string>,
    disableblinkfeatures?: FunctionResolver<string>,
    disableguestresize?: FunctionResolver<boolean>,
    disablewebsecurity?: FunctionResolver<boolean>,
    guestinstance?: FunctionResolver<string>,
    httpreferrer?: FunctionResolver<string>,
    nodeintegration?: FunctionResolver<boolean>,
    partition?: FunctionResolver<string>,
    plugins?: FunctionResolver<boolean>,
    preload?: FunctionResolver<string>,
    src?: FunctionResolver<string>,
    useragent?: FunctionResolver<string>,
    webpreferences?: FunctionResolver<string>
  }

  interface IntrinsicElementsMap {
    a: HTMLAnchorElement,
    abbr: HTMLElement,
    address: HTMLElement,
    area: HTMLAreaElement,
    article: HTMLElement,
    aside: HTMLElement,
    audio: HTMLAudioElement,
    b: HTMLElement,
    base: HTMLBaseElement,
    bdi: HTMLElement,
    bdo: HTMLElement,
    big: HTMLElement,
    blockquote: HTMLElement,
    body: HTMLBodyElement,
    br: HTMLBRElement,
    button: HTMLButtonElement,
    canvas: HTMLCanvasElement,
    caption: HTMLElement,
    cite: HTMLElement,
    code: HTMLElement,
    col: HTMLTableColElement,
    colgroup: HTMLTableColElement,
    data: HTMLDataElement,
    datalist: HTMLDataListElement,
    dd: HTMLElement,
    del: HTMLElement,
    details: HTMLElement,
    dfn: HTMLElement,
    dialog: HTMLDialogElement,
    div: HTMLDivElement,
    dl: HTMLDListElement,
    dt: HTMLElement,
    em: HTMLElement,
    embed: HTMLEmbedElement,
    fieldset: HTMLFieldSetElement,
    figcaption: HTMLElement,
    figure: HTMLElement,
    footer: HTMLElement,
    form: HTMLFormElement,
    h1: HTMLHeadingElement,
    h2: HTMLHeadingElement,
    h3: HTMLHeadingElement,
    h4: HTMLHeadingElement,
    h5: HTMLHeadingElement,
    h6: HTMLHeadingElement,
    head: HTMLHeadElement,
    header: HTMLElement,
    hgroup: HTMLElement,
    hr: HTMLHRElement,
    html: HTMLHtmlElement,
    i: HTMLElement,
    iframe: HTMLIFrameElement,
    img: HTMLImageElement,
    input: HTMLInputElement,
    ins: HTMLModElement,
    kbd: HTMLElement,
    keygen: HTMLElement,
    label: HTMLLabelElement,
    legend: HTMLLegendElement,
    li: HTMLLIElement,
    link: HTMLLinkElement,
    main: HTMLElement,
    map: HTMLMapElement,
    mark: HTMLElement,
    menu: HTMLElement,
    menuitem: HTMLElement,
    meta: HTMLMetaElement,
    meter: HTMLElement,
    nav: HTMLElement,
    noindex: HTMLElement,
    noscript: HTMLElement,
    object: HTMLObjectElement,
    ol: HTMLOListElement,
    optgroup: HTMLOptGroupElement,
    option: HTMLOptionElement,
    output: HTMLElement,
    p: HTMLParagraphElement,
    param: HTMLParamElement,
    picture: HTMLElement,
    pre: HTMLPreElement,
    progress: HTMLProgressElement,
    q: HTMLQuoteElement,
    rp: HTMLElement,
    rt: HTMLElement,
    ruby: HTMLElement,
    s: HTMLElement,
    samp: HTMLElement,
    slot: HTMLSlotElement,
    script: HTMLScriptElement,
    section: HTMLElement,
    select: HTMLSelectElement,
    small: HTMLElement,
    source: HTMLSourceElement,
    span: HTMLSpanElement,
    strong: HTMLElement,
    style: HTMLStyleElement,
    sub: HTMLElement,
    summary: HTMLElement,
    sup: HTMLElement,
    table: HTMLTableElement,
    template: HTMLTemplateElement,
    tbody: HTMLTableSectionElement,
    td: HTMLTableDataCellElement,
    textarea: HTMLTextAreaElement,
    tfoot: HTMLTableSectionElement,
    th: HTMLTableHeaderCellElement,
    thead: HTMLTableSectionElement,
    time: HTMLElement,
    title: HTMLTitleElement,
    tr: HTMLTableRowElement,
    track: HTMLTrackElement,
    u: HTMLElement,
    ul: HTMLUListElement,
    var: HTMLElement,
    video: HTMLVideoElement,
    wbr: HTMLElement,
    webview: HTMLWebViewElement
  }

  interface IntrinsicElements {
    a: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    abbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    address: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    area: DetailedHTMLProps<AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>,
    article: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    aside: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    audio: DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>,
    b: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    base: DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>,
    bdi: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    bdo: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    big: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    blockquote: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>,
    body: DetailedHTMLProps<HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>,
    br: DetailedHTMLProps<HTMLAttributes<HTMLBRElement>, HTMLBRElement>,
    button: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    canvas: DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>,
    caption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    cite: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    code: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    col: DetailedHTMLProps<ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>,
    colgroup: DetailedHTMLProps<ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>,
    data: DetailedHTMLProps<DataHTMLAttributes<HTMLDataElement>, HTMLDataElement>,
    datalist: DetailedHTMLProps<HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>,
    dd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    del: DetailedHTMLProps<DelHTMLAttributes<HTMLElement>, HTMLElement>,
    details: DetailedHTMLProps<DetailsHTMLAttributes<HTMLElement>, HTMLElement>,
    dfn: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    dialog: DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>,
    div: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    dl: DetailedHTMLProps<HTMLAttributes<HTMLDListElement>, HTMLDListElement>,
    dt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    em: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    embed: DetailedHTMLProps<EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>,
    fieldset: DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>,
    figcaption: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    figure: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    footer: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    form: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    h1: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h2: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h3: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h4: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h5: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    h6: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
    head: DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>,
    header: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    hgroup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    hr: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>,
    html: DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>,
    i: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    iframe: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>,
    img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    input: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ins: DetailedHTMLProps<InsHTMLAttributes<HTMLModElement>, HTMLModElement>,
    kbd: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    keygen: DetailedHTMLProps<KeygenHTMLAttributes<HTMLElement>, HTMLElement>,
    label: DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    legend: DetailedHTMLProps<HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>,
    li: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    link: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>,
    main: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    map: DetailedHTMLProps<MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>,
    mark: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    menu: DetailedHTMLProps<MenuHTMLAttributes<HTMLElement>, HTMLElement>,
    menuitem: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    meta: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>,
    meter: DetailedHTMLProps<MeterHTMLAttributes<HTMLElement>, HTMLElement>,
    nav: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    noindex: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    noscript: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    object: DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>,
    ol: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>,
    optgroup: DetailedHTMLProps<OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>,
    option: DetailedHTMLProps<OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>,
    output: DetailedHTMLProps<OutputHTMLAttributes<HTMLElement>, HTMLElement>,
    p: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
    param: DetailedHTMLProps<ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>,
    picture: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    pre: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
    progress: DetailedHTMLProps<ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>,
    q: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>,
    rp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    rt: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    ruby: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    s: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    samp: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    slot: DetailedHTMLProps<SlotHTMLAttributes<HTMLSlotElement>, HTMLSlotElement>,
    script: DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>,
    section: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    select: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    small: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    source: DetailedHTMLProps<SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>,
    span: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    strong: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    style: DetailedHTMLProps<StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>,
    sub: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    summary: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    sup: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    table: DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>,
    template: DetailedHTMLProps<HTMLAttributes<HTMLTemplateElement>, HTMLTemplateElement>,
    tbody: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>,
    td: DetailedHTMLProps<TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>,
    textarea: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    tfoot: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>,
    th: DetailedHTMLProps<ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>,
    thead: DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>,
    time: DetailedHTMLProps<TimeHTMLAttributes<HTMLElement>, HTMLElement>,
    title: DetailedHTMLProps<HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>,
    tr: DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>,
    track: DetailedHTMLProps<TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>,
    u: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    ul: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
    var: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    video: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
    wbr: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    webview: DetailedHTMLProps<WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>
  }

}
