
/* GLOBALS */

interface Document {
  onbeforeinput: (( this: GlobalEventHandlers, event: Event ) => any) | null,
  onfocusin: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null,
  onfocusout: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null
}

/* HELPERS */

type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ({ (): Child, get (): Child, sample (): Child });

type ComponentClass<P = {}> = {
  render: () => Child;
};

type ObservableResolver<T = unknown> = T | ({
  (): ObservableResolver<T>,
  get (): ObservableResolver<T>,
  sample (): ObservableResolver<T>
});

type AllClassProperties = {
  [key: string]: ObservableResolver<null | undefined | boolean>
};

type AllCSSProperties = {
  [key: string]: ObservableResolver<string | number | null | undefined>
};

type DOMCSSProperties = {
  [key in keyof Omit<CSSStyleDeclaration, 'item' | 'setProperty' | 'removeProperty' | 'getPropertyValue' | 'getPropertyPriority'>]?: ObservableResolver<string | number | null | undefined>
};

type HTMLAttributeReferrerPolicy = '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';

interface HTMLWebViewElement extends HTMLElement {}

/* MAIN */

//FIXME: link children props with return type

declare namespace JSX {

  type Element = Child;

  type ElementClass<P = {}> = ComponentClass<P>;

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
    ref?: (( value: T ) => unknown)
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
    ariaActivedescendant?: ObservableResolver<string>,
    ariaAtomic?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaAutocomplete?: ObservableResolver<'none' | 'inline' | 'list' | 'both'>,
    ariaBusy?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaChecked?: ObservableResolver<boolean | 'false' | 'mixed' | 'true'>,
    ariaColcount?: ObservableResolver<number>,
    ariaColindex?: ObservableResolver<number>,
    ariaColspan?: ObservableResolver<number>,
    ariaControls?: ObservableResolver<string>,
    ariaCurrent?: ObservableResolver<boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'>,
    ariaDescribedby?: ObservableResolver<string>,
    ariaDetails?: ObservableResolver<string>,
    ariaDisabled?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaDropeffect?: ObservableResolver<'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'>,
    ariaErrormessage?: ObservableResolver<string>,
    ariaExpanded?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaFlowto?: ObservableResolver<string>,
    ariaGrabbed?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaHaspopup?: ObservableResolver<boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'>,
    ariaHidden?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaInvalid?: ObservableResolver<boolean | 'false' | 'true' | 'grammar' | 'spelling'>,
    ariaKeyshortcuts?: ObservableResolver<string>,
    ariaLabel?: ObservableResolver<string>,
    ariaLabelledby?: ObservableResolver<string>,
    ariaLevel?: ObservableResolver<number>,
    ariaLive?: ObservableResolver<'off' | 'assertive' | 'polite'>,
    ariaModal?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaMultiline?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaMultiselectable?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaOrientation?: ObservableResolver<'horizontal' | 'vertical'>,
    ariaOwns?: ObservableResolver<string>,
    ariaPlaceholder?: ObservableResolver<string>,
    ariaPosinset?: ObservableResolver<number>,
    ariaPressed?: ObservableResolver<boolean | 'false' | 'mixed' | 'true'>,
    ariaReadonly?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaRelevant?: ObservableResolver<'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals'>,
    ariaRequired?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaRoledescription?: ObservableResolver<string>,
    ariaRowcount?: ObservableResolver<number>,
    ariaRowindex?: ObservableResolver<number>,
    ariaRowspan?: ObservableResolver<number>,
    ariaSelected?: ObservableResolver<boolean | 'true' | 'false'>,
    ariaSetsize?: ObservableResolver<number>,
    ariaSort?: ObservableResolver<'none' | 'ascending' | 'descending' | 'other'>,
    ariaValuemax?: ObservableResolver<number>,
    ariaValuemin?: ObservableResolver<number>,
    ariaValuenow?: ObservableResolver<number>,
    ariaValuetext?: ObservableResolver<string>
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
    children?: Child,
    textContent?: ObservableResolver<string>,
    innerHTML?: ObservableResolver<string>,
    outerHTML?: ObservableResolver<string>,
    dangerouslySetInnerHTML?: ObservableResolver<{
      __html: ObservableResolver<string>
    }>
  }

  interface DOMAttributes<T extends EventTarget> extends EventAttributes<T>, ViewAttributes {

  }

  interface HTMLAttributes<T extends EventTarget> extends AriaAttributes, DOMAttributes<T> {
    /* REACT-SPECIFIC ATTRIBUTES */
    defaultChecked?: ObservableResolver<boolean>,
    defaultValue?: ObservableResolver<string | number | ReadonlyArray<string>>,
    suppressContentEditableWarning?: ObservableResolver<boolean>,
    suppressHydrationWarning?: ObservableResolver<boolean>,
    /* STANDARD HTML ATTRIBUTES */
    accessKey?: ObservableResolver<string>,
    class?: ObservableResolver<string | ClassProperties>,
    className?: ObservableResolver<string>,
    contentEditable?: ObservableResolver<boolean | 'true' | 'false' | 'inherit'>,
    contextMenu?: ObservableResolver<string>,
    dir?: ObservableResolver<string>,
    draggable?: ObservableResolver<boolean | 'true' | 'false'>,
    hidden?: ObservableResolver<boolean>,
    id?: ObservableResolver<string>,
    lang?: ObservableResolver<string>,
    placeholder?: ObservableResolver<string>,
    slot?: ObservableResolver<string>,
    spellCheck?: ObservableResolver<boolean | 'true' | 'false'>,
    style?: ObservableResolver<string | StyleProperties>,
    tabIndex?: ObservableResolver<number>,
    title?: ObservableResolver<string>,
    translate?: ObservableResolver<'yes' | 'no'>,
    /* UNKNOWN */
    radioGroup?: ObservableResolver<string>,
    /* WAI-ARIA */
    role?: ObservableResolver<'alert' | 'alertdialog' | 'application' | 'article' | 'banner' | 'button' | 'cell' | 'checkbox' | 'columnheader' | 'combobox' | 'complementary' | 'contentinfo' | 'definition' | 'dialog' | 'directory' | 'document' | 'feed' | 'figure' | 'form' | 'grid' | 'gridcell' | 'group' | 'heading' | 'img' | 'link' | 'list' | 'listbox' | 'listitem' | 'log' | 'main' | 'marquee' | 'math' | 'menu' | 'menubar' | 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' | 'navigation' | 'none' | 'note' | 'option' | 'presentation' | 'progressbar' | 'radio' | 'radiogroup' | 'region' | 'row' | 'rowgroup' | 'rowheader' | 'scrollbar' | 'search' | 'searchbox' | 'separator' | 'slider' | 'spinbutton' | 'status' | 'switch' | 'tab' | 'table' | 'tablist' | 'tabpanel' | 'term' | 'textbox' | 'timer' | 'toolbar' | 'tooltip' | 'tree' | 'treegrid' | 'treeitem'>,
    /* RDFA ATTRIBUTES */
    about?: ObservableResolver<string>,
    datatype?: ObservableResolver<string>,
    inlist?: ObservableResolver<boolean>;
    prefix?: ObservableResolver<string>,
    property?: ObservableResolver<string>,
    resource?: ObservableResolver<string>,
    typeof?: ObservableResolver<string>,
    vocab?: ObservableResolver<string>,
    /* NON-STANDARD ATTRIBUTES */
    autoCapitalize?: ObservableResolver<string>,
    autoCorrect?: ObservableResolver<string>,
    autoSave?: ObservableResolver<string>,
    color?: ObservableResolver<string>,
    itemProp?: ObservableResolver<string>,
    itemScope?: ObservableResolver<boolean>,
    itemType?: ObservableResolver<string>,
    itemID?: ObservableResolver<string>,
    itemRef?: ObservableResolver<string>,
    results?: ObservableResolver<number>,
    security?: ObservableResolver<string>,
    unselectable?: ObservableResolver<'on' | 'off'>,
    /* LIVING STANDARD */
    inputMode?: ObservableResolver<'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'>,
    is?: ObservableResolver<string>
  }

  interface AnchorHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    download?: ObservableResolver<boolean>,
    href?: ObservableResolver<string>,
    hrefLang?: ObservableResolver<string>,
    media?: ObservableResolver<string>,
    ping?: ObservableResolver<string>,
    rel?: ObservableResolver<string>,
    target?: ObservableResolver<'_self' | '_blank' | '_parent' | '_top'>,
    type?: ObservableResolver<string>,
    referrerPolicy?: ObservableResolver<HTMLAttributeReferrerPolicy>
  }

  interface AudioHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {

  }

  interface AreaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    alt?: ObservableResolver<string>,
    coords?: ObservableResolver<string>,
    download?: ObservableResolver<boolean>,
    href?: ObservableResolver<string>,
    hrefLang?: ObservableResolver<string>,
    media?: ObservableResolver<string>,
    referrerPolicy?: ObservableResolver<HTMLAttributeReferrerPolicy>,
    rel?: ObservableResolver<string>,
    shape?: ObservableResolver<string>,
    target?: ObservableResolver<string>
  }

  interface BaseHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    href?: ObservableResolver<string>,
    target?: ObservableResolver<string>
  }

  interface BlockquoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: ObservableResolver<string>
  }

  interface ButtonHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoFocus?: ObservableResolver<boolean>,
    disabled?: ObservableResolver<boolean>,
    form?: ObservableResolver<string>,
    formAction?: ObservableResolver<string>,
    formEncType?: ObservableResolver<string>,
    formMethod?: ObservableResolver<string>,
    formNoValidate?: ObservableResolver<boolean>,
    formTarget?: ObservableResolver<string>,
    name?: ObservableResolver<string>,
    type?: ObservableResolver<'submit' | 'reset' | 'button'>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>
  }

  interface CanvasHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: ObservableResolver<number | string>,
    width?: ObservableResolver<number | string>
  }

  interface ColHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    span?: ObservableResolver<number>,
    width?: ObservableResolver<number | string>
  }

  interface ColgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    span?: ObservableResolver<number>
  }

  interface DataHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    value?: ObservableResolver<string | ReadonlyArray<string> | number>
  }

  interface DetailsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    open?: ObservableResolver<boolean>,
    onToggle?: ObservableResolver<GenericEventHandler<T>>
  }

  interface DelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: ObservableResolver<string>,
    dateTime?: ObservableResolver<string>
  }

  interface DialogHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    open?: ObservableResolver<boolean>
  }

  interface EmbedHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: ObservableResolver<number | string>,
    src?: ObservableResolver<string>,
    type?: ObservableResolver<string>,
    width?: ObservableResolver<number | string>
  }

  interface FieldsetHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: ObservableResolver<boolean>,
    form?: ObservableResolver<string>,
    name?: ObservableResolver<string>
  }

  interface FormHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    acceptCharset?: ObservableResolver<string>,
    action?: ObservableResolver<string>,
    autoComplete?: ObservableResolver<string>,
    encType?: ObservableResolver<string>,
    method?: ObservableResolver<string>,
    name?: ObservableResolver<string>,
    noValidate?: ObservableResolver<boolean>,
    target?: ObservableResolver<string>
  }

  interface HtmlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    manifest?: ObservableResolver<string>
  }

  interface IframeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    allow?: ObservableResolver<string>,
    allowFullScreen?: ObservableResolver<boolean>,
    allowTransparency?: ObservableResolver<boolean>,
    /** @deprecated */
    frameBorder?: ObservableResolver<number | string>,
    height?: ObservableResolver<number | string>,
    loading?: ObservableResolver<'eager' | 'lazy'>,
    /** @deprecated */
    marginHeight?: ObservableResolver<number>,
    /** @deprecated */
    marginWidth?: ObservableResolver<number>,
    name?: ObservableResolver<string>,
    referrerPolicy?: ObservableResolver<HTMLAttributeReferrerPolicy>,
    sandbox?: ObservableResolver<string>,
    /** @deprecated */
    scrolling?: ObservableResolver<string>,
    seamless?: ObservableResolver<boolean>,
    src?: ObservableResolver<string>,
    srcDoc?: ObservableResolver<string>,
    width?: ObservableResolver<number | string>
  }

  interface ImgHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    alt?: ObservableResolver<string>,
    crossOrigin?: ObservableResolver<'anonymous' | 'use-credentials' | ''>,
    decoding?: ObservableResolver<'async' | 'auto' | 'sync'>,
    height?: ObservableResolver<number | string>,
    loading?: ObservableResolver<'eager' | 'lazy'>,
    referrerPolicy?: ObservableResolver<HTMLAttributeReferrerPolicy>,
    sizes?: ObservableResolver<string>,
    src?: ObservableResolver<string>,
    srcSet?: ObservableResolver<string>,
    useMap?: ObservableResolver<string>,
    width?: ObservableResolver<number | string>
  }

  interface InsHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: ObservableResolver<string>,
    dateTime?: ObservableResolver<string>
  }

  interface InputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    accept?: ObservableResolver<string>,
    alt?: ObservableResolver<string>,
    autoComplete?: ObservableResolver<string>,
    autoFocus?: ObservableResolver<boolean>,
    capture?: ObservableResolver<boolean | 'user' | 'environment'>,
    checked?: ObservableResolver<boolean>,
    crossOrigin?: ObservableResolver<string>,
    disabled?: ObservableResolver<boolean>,
    enterKeyHint?: ObservableResolver<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>,
    form?: ObservableResolver<string>,
    formAction?: ObservableResolver<string>,
    formEncType?: ObservableResolver<string>,
    formMethod?: ObservableResolver<string>,
    formNoValidate?: ObservableResolver<boolean>,
    formTarget?: ObservableResolver<string>,
    height?: ObservableResolver<number | string>,
    list?: ObservableResolver<string>,
    max?: ObservableResolver<number | string>,
    maxLength?: ObservableResolver<number>,
    min?: ObservableResolver<number | string>,
    minLength?: ObservableResolver<number>,
    multiple?: ObservableResolver<boolean>,
    name?: ObservableResolver<string>,
    pattern?: ObservableResolver<string>,
    placeholder?: ObservableResolver<string>,
    readOnly?: ObservableResolver<boolean>,
    required?: ObservableResolver<boolean>,
    size?: ObservableResolver<number>,
    src?: ObservableResolver<string>,
    step?: ObservableResolver<number | string>,
    type?: ObservableResolver<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week'>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>,
    width?: ObservableResolver<number | string>,
    onChange?: ObservableResolver<KeyboardEventHandler<T>>
  }

  interface KeygenHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoFocus?: ObservableResolver<boolean>,
    challenge?: ObservableResolver<string>,
    disabled?: ObservableResolver<boolean>,
    form?: ObservableResolver<string>,
    keyType?: ObservableResolver<string>,
    keyParams?: ObservableResolver<string>,
    name?: ObservableResolver<string>
  }

  interface LabelHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: ObservableResolver<string>,
    htmlFor?: ObservableResolver<string>
  }

  interface LiHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    value?: ObservableResolver<string | ReadonlyArray<string> | number>
  }

  interface LinkHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    as?: ObservableResolver<string>,
    crossOrigin?: ObservableResolver<string>,
    href?: ObservableResolver<string>,
    hrefLang?: ObservableResolver<string>,
    integrity?: ObservableResolver<string>,
    media?: ObservableResolver<string>,
    imageSrcSet?: ObservableResolver<string>,
    referrerPolicy?: ObservableResolver<HTMLAttributeReferrerPolicy>,
    rel?: ObservableResolver<string>,
    sizes?: ObservableResolver<string>,
    type?: ObservableResolver<string>,
    charSet?: ObservableResolver<string>
  }

  interface MapHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: ObservableResolver<string>
  }

  interface MenuHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    type?: ObservableResolver<string>
  }

  interface MediaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoPlay?: ObservableResolver<boolean>,
    controls?: ObservableResolver<boolean>,
    controlsList?: ObservableResolver<string>,
    crossOrigin?: ObservableResolver<string>,
    loop?: ObservableResolver<boolean>,
    mediaGroup?: ObservableResolver<string>,
    muted?: ObservableResolver<boolean>,
    playsInline?: ObservableResolver<boolean>,
    preload?: ObservableResolver<string>,
    src?: ObservableResolver<string>
  }

  interface MetaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    charSet?: ObservableResolver<string>,
    content?: ObservableResolver<string>,
    httpEquiv?: ObservableResolver<string>,
    name?: ObservableResolver<string>,
    media?: ObservableResolver<string>
  }

  interface MeterHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: ObservableResolver<string>,
    high?: ObservableResolver<number>,
    low?: ObservableResolver<number>,
    max?: ObservableResolver<number | string>,
    min?: ObservableResolver<number | string>,
    optimum?: ObservableResolver<number>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>
  }

  interface QuoteHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cite?: ObservableResolver<string>
  }

  interface ObjectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    classID?: ObservableResolver<string>,
    data?: ObservableResolver<string>,
    form?: ObservableResolver<string>,
    height?: ObservableResolver<number | string>,
    name?: ObservableResolver<string>,
    type?: ObservableResolver<string>,
    useMap?: ObservableResolver<string>,
    width?: ObservableResolver<number | string>,
    wmode?: ObservableResolver<string>
  }

  interface OlHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    reversed?: ObservableResolver<boolean>,
    start?: ObservableResolver<number>,
    type?: ObservableResolver<'1' | 'a' | 'A' | 'i' | 'I'>
  }

  interface OptgroupHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: ObservableResolver<boolean>,
    label?: ObservableResolver<string>
  }

  interface OptionHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    disabled?: ObservableResolver<boolean>,
    label?: ObservableResolver<string>,
    selected?: ObservableResolver<boolean>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>
  }

  interface OutputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    form?: ObservableResolver<string>,
    htmlFor?: ObservableResolver<string>,
    name?: ObservableResolver<string>
  }

  interface ParamHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: ObservableResolver<string>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>
  }

  interface ProgressHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    max?: ObservableResolver<number | string>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>
  }

  interface SlotHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    name?: ObservableResolver<string>
  }

  interface ScriptHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    async?: ObservableResolver<boolean>,
    /** @deprecated */
    charSet?: ObservableResolver<string>,
    crossOrigin?: ObservableResolver<string>,
    defer?: ObservableResolver<boolean>,
    integrity?: ObservableResolver<string>,
    noModule?: ObservableResolver<boolean>,
    nonce?: ObservableResolver<string>,
    referrerPolicy?: ObservableResolver<HTMLAttributeReferrerPolicy>,
    src?: ObservableResolver<string>,
    type?: ObservableResolver<string>
  }

  interface SelectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoComplete?: ObservableResolver<string>,
    autoFocus?: ObservableResolver<boolean>,
    disabled?: ObservableResolver<boolean>,
    form?: ObservableResolver<string>,
    multiple?: ObservableResolver<boolean>,
    name?: ObservableResolver<string>,
    required?: ObservableResolver<boolean>,
    size?: ObservableResolver<number>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>,
    onChange?: ObservableResolver<KeyboardEventHandler<T>>
  }

  interface SourceHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    height?: ObservableResolver<number | string>,
    media?: ObservableResolver<string>,
    sizes?: ObservableResolver<string>,
    src?: ObservableResolver<string>,
    srcSet?: ObservableResolver<string>,
    type?: ObservableResolver<string>,
    width?: ObservableResolver<number | string>
  }

  interface StyleHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    media?: ObservableResolver<string>,
    nonce?: ObservableResolver<string>,
    scoped?: ObservableResolver<boolean>,
    type?: ObservableResolver<string>
  }

  interface TableHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    cellPadding?: ObservableResolver<number | string>,
    cellSpacing?: ObservableResolver<number | string>,
    summary?: ObservableResolver<string>,
    width?: ObservableResolver<number | string>
  }

  interface TextareaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    autoComplete?: ObservableResolver<string>,
    autoFocus?: ObservableResolver<boolean>,
    cols?: ObservableResolver<number>,
    dirName?: ObservableResolver<string>,
    disabled?: ObservableResolver<boolean>,
    form?: ObservableResolver<string>,
    maxLength?: ObservableResolver<number>,
    minLength?: ObservableResolver<number>,
    name?: ObservableResolver<string>,
    placeholder?: ObservableResolver<string>,
    readOnly?: ObservableResolver<boolean>,
    required?: ObservableResolver<boolean>,
    rows?: ObservableResolver<number>,
    value?: ObservableResolver<string | ReadonlyArray<string> | number>,
    wrap?: ObservableResolver<string>,
    onChange?: ObservableResolver<KeyboardEventHandler<T>>
  }

  interface TdHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    align?: ObservableResolver<'left' | 'center' | 'right' | 'justify' | 'char'>,
    colSpan?: ObservableResolver<number>,
    headers?: ObservableResolver<string>,
    rowSpan?: ObservableResolver<number>,
    scope?: ObservableResolver<string>,
    abbr?: ObservableResolver<string>,
    height?: ObservableResolver<number | string>,
    width?: ObservableResolver<number | string>,
    valign?: ObservableResolver<'top' | 'middle' | 'bottom' | 'baseline'>
  }

  interface ThHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    align?: ObservableResolver<'left' | 'center' | 'right' | 'justify' | 'char'>,
    colSpan?: ObservableResolver<number>,
    headers?: ObservableResolver<string>,
    rowSpan?: ObservableResolver<number>,
    scope?: ObservableResolver<string>,
    abbr?: ObservableResolver<string>
  }

  interface TimeHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    dateTime?: ObservableResolver<string>
  }

  interface TrackHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    default?: ObservableResolver<boolean>,
    kind?: ObservableResolver<string>,
    label?: ObservableResolver<string>,
    src?: ObservableResolver<string>,
    srcLang?: ObservableResolver<string>
  }

  interface VideoHTMLAttributes<T extends EventTarget> extends MediaHTMLAttributes<T> {
    height?: ObservableResolver<number | string>,
    playsInline?: ObservableResolver<boolean>,
    poster?: ObservableResolver<string>,
    width?: ObservableResolver<number | string>,
    disablePictureInPicture?: ObservableResolver<boolean>,
    disableRemotePlayback?: ObservableResolver<boolean>
  }

  interface WebViewHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
    allowFullScreen?: ObservableResolver<boolean>,
    allowpopups?: ObservableResolver<boolean>,
    autoFocus?: ObservableResolver<boolean>,
    autosize?: ObservableResolver<boolean>,
    blinkfeatures?: ObservableResolver<string>,
    disableblinkfeatures?: ObservableResolver<string>,
    disableguestresize?: ObservableResolver<boolean>,
    disablewebsecurity?: ObservableResolver<boolean>,
    guestinstance?: ObservableResolver<string>,
    httpreferrer?: ObservableResolver<string>,
    nodeintegration?: ObservableResolver<boolean>,
    partition?: ObservableResolver<string>,
    plugins?: ObservableResolver<boolean>,
    preload?: ObservableResolver<string>,
    src?: ObservableResolver<string>,
    useragent?: ObservableResolver<string>,
    webpreferences?: ObservableResolver<string>
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
