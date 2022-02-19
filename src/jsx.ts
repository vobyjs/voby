
/* GLOBALS */

interface Document {
  onbeforeinput: (( this: GlobalEventHandlers, event: Event ) => any) | null,
  onfocusin: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null,
  onfocusout: (( this: GlobalEventHandlers, event: FocusEvent ) => any) | null
}

/* HELPERS */

type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ({ (): Child, get (): Child, sample (): Child });

type ComponentClass<P = {}> = {
  new ( props: P ): {
    render: () => Child;
  }
};

type ObservableResolver<T = unknown> = T | ({
  (): ObservableResolver<T>,
  get (): ObservableResolver<T>,
  sample (): ObservableResolver<T>
});

type ViewAttributes = {
  children?: Child,
  textContent?: ObservableResolver<string>,
  innerHTML?: ObservableResolver<string>,
  outerHTML?: ObservableResolver<string>,
  dangerouslySetInnerHTML?: ObservableResolver<{
    __html: ObservableResolver<string>
  }>
};

type AllClassProperties = {
  [key: string]: ObservableResolver<null | undefined | boolean>
};

type AllCSSProperties = {
  [key: string]: ObservableResolver<string | number | null | undefined>
};

type DOMCSSProperties = {
  [key in keyof Omit<CSSStyleDeclaration, 'item' | 'setProperty' | 'removeProperty' | 'getPropertyValue' | 'getPropertyPriority'>]?: ObservableResolver<string | number | null | undefined>
};

/* MAIN */

//URL: https://github.com/preactjs/preact/blob/ebd87f3005d9558bfd3c5f38e0496a5d19553441/src/jsx.d.ts

//FIXME: link children props with return type

declare namespace JSX {

  type Element = Child;

  type ElementClass<P = {}> = ComponentClass<P>;

  interface ClassProperties extends AllClassProperties {}

  interface StyleProperties extends AllCSSProperties, DOMCSSProperties {}

  type TargetedEvent<Element extends EventTarget = EventTarget, TypedEvent extends Event = Event> = Omit<TypedEvent, 'currentTarget'> & { readonly currentTarget?: Element };
  type TargetedAnimationEvent<Element extends EventTarget> = TargetedEvent<Element, AnimationEvent>;
  type TargetedClipboardEvent<Element extends EventTarget> = TargetedEvent<Element, ClipboardEvent>;
  type TargetedCompositionEvent<Element extends EventTarget> = TargetedEvent<Element, CompositionEvent>;
  type TargetedDragEvent<Element extends EventTarget> = TargetedEvent<Element, DragEvent>;
  type TargetedFocusEvent<Element extends EventTarget> = TargetedEvent<Element, FocusEvent>;
  type TargetedKeyboardEvent<Element extends EventTarget> = TargetedEvent<Element, KeyboardEvent>;
  type TargetedMouseEvent<Element extends EventTarget> = TargetedEvent<Element, MouseEvent>;
  type TargetedPointerEvent<Element extends EventTarget> = TargetedEvent<Element, PointerEvent>;
  type TargetedTouchEvent<Element extends EventTarget> = TargetedEvent<Element, TouchEvent>;
  type TargetedTransitionEvent<Element extends EventTarget> = TargetedEvent<Element, TransitionEvent>;
  type TargetedUIEvent<Element extends EventTarget> = TargetedEvent<Element, UIEvent>;
  type TargetedWheelEvent<Element extends EventTarget> = TargetedEvent<Element, WheelEvent>;

  type EventHandler<Event extends TargetedEvent> = { ( this: never, event: Event ): void };
  type AnimationEventHandler<Element extends EventTarget> = EventHandler<TargetedAnimationEvent<Element>>;
  type ClipboardEventHandler<Element extends EventTarget> = EventHandler<TargetedClipboardEvent<Element>>;
  type CompositionEventHandler<Element extends EventTarget> = EventHandler<TargetedCompositionEvent<Element>>;
  type DragEventHandler<Element extends EventTarget> = EventHandler<TargetedDragEvent<Element>>;
  type FocusEventHandler<Element extends EventTarget> = EventHandler<TargetedFocusEvent<Element>>;
  type GenericEventHandler<Element extends EventTarget> = EventHandler<TargetedEvent<Element>>;
  type KeyboardEventHandler<Element extends EventTarget> = EventHandler<TargetedKeyboardEvent<Element>>;
  type MouseEventHandler<Element extends EventTarget> = EventHandler<TargetedMouseEvent<Element>>;
  type PointerEventHandler<Element extends EventTarget> = EventHandler<TargetedPointerEvent<Element>>;
  type TouchEventHandler<Element extends EventTarget> = EventHandler<TargetedTouchEvent<Element>>;
  type TransitionEventHandler<Element extends EventTarget> = EventHandler<TargetedTransitionEvent<Element>>;
  type UIEventHandler<Element extends EventTarget> = EventHandler<TargetedUIEvent<Element>>;
  type WheelEventHandler<Element extends EventTarget> = EventHandler<TargetedWheelEvent<Element>>;

  interface ClassAttributes<T> {
    ref?: (( value: T ) => unknown)
  }

  interface DOMAttributes<Element extends EventTarget> extends ViewAttributes {
    /* IMAGE EVENTS */
    onLoad?: ObservableResolver<GenericEventHandler<Element>>,
    onLoadCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onError?: ObservableResolver<GenericEventHandler<Element>>,
    onErrorCapture?: ObservableResolver<GenericEventHandler<Element>>,
    /* CLIPBOARD EVENTS */
    onCopy?: ObservableResolver<ClipboardEventHandler<Element>>,
    onCopyCapture?: ObservableResolver<ClipboardEventHandler<Element>>,
    onCut?: ObservableResolver<ClipboardEventHandler<Element>>,
    onCutCapture?: ObservableResolver<ClipboardEventHandler<Element>>,
    onPaste?: ObservableResolver<ClipboardEventHandler<Element>>,
    onPasteCapture?: ObservableResolver<ClipboardEventHandler<Element>>,
    /* COMPOSITION EVENTS */
    onCompositionEnd?: ObservableResolver<CompositionEventHandler<Element>>,
    onCompositionEndCapture?: ObservableResolver<CompositionEventHandler<Element>>,
    onCompositionStart?: ObservableResolver<CompositionEventHandler<Element>>,
    onCompositionStartCapture?: ObservableResolver<CompositionEventHandler<Element>>,
    onCompositionUpdate?: ObservableResolver<CompositionEventHandler<Element>>,
    onCompositionUpdateCapture?: ObservableResolver<CompositionEventHandler<Element>>,
    /* DETAILS EVENTS */
    onToggle?: ObservableResolver<GenericEventHandler<Element>>,
    /* FOCUS EVENTS */
    onFocus?: ObservableResolver<FocusEventHandler<Element>>,
    onFocusCapture?: ObservableResolver<FocusEventHandler<Element>>,
    onfocusin?: ObservableResolver<FocusEventHandler<Element>>,
    onfocusinCapture?: ObservableResolver<FocusEventHandler<Element>>,
    onfocusout?: ObservableResolver<FocusEventHandler<Element>>,
    onfocusoutCapture?: ObservableResolver<FocusEventHandler<Element>>,
    onBlur?: ObservableResolver<FocusEventHandler<Element>>,
    onBlurCapture?: ObservableResolver<FocusEventHandler<Element>>,
    /* FORM EVENTS */
    onChange?: ObservableResolver<GenericEventHandler<Element>>,
    onChangeCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onInput?: ObservableResolver<GenericEventHandler<Element>>,
    onInputCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onBeforeInput?: ObservableResolver<GenericEventHandler<Element>>,
    onBeforeInputCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onSearch?: ObservableResolver<GenericEventHandler<Element>>,
    onSearchCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onSubmit?: ObservableResolver<GenericEventHandler<Element>>,
    onSubmitCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onInvalid?: ObservableResolver<GenericEventHandler<Element>>,
    onInvalidCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onReset?: ObservableResolver<GenericEventHandler<Element>>,
    onResetCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onFormData?: ObservableResolver<GenericEventHandler<Element>>,
    onFormDataCapture?: ObservableResolver<GenericEventHandler<Element>>,
    /* KEYBOARD EVENTS */
    onKeyDown?: ObservableResolver<KeyboardEventHandler<Element>>,
    onKeyDownCapture?: ObservableResolver<KeyboardEventHandler<Element>>,
    onKeyPress?: ObservableResolver<KeyboardEventHandler<Element>>,
    onKeyPressCapture?: ObservableResolver<KeyboardEventHandler<Element>>,
    onKeyUp?: ObservableResolver<KeyboardEventHandler<Element>>,
    onKeyUpCapture?: ObservableResolver<KeyboardEventHandler<Element>>,
    /* MEDIA EVENTS */
    onAbort?: ObservableResolver<GenericEventHandler<Element>>,
    onAbortCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onCanPlay?: ObservableResolver<GenericEventHandler<Element>>,
    onCanPlayCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onCanPlayThrough?: ObservableResolver<GenericEventHandler<Element>>,
    onCanPlayThroughCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onDurationChange?: ObservableResolver<GenericEventHandler<Element>>,
    onDurationChangeCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onEmptied?: ObservableResolver<GenericEventHandler<Element>>,
    onEmptiedCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onEncrypted?: ObservableResolver<GenericEventHandler<Element>>,
    onEncryptedCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onEnded?: ObservableResolver<GenericEventHandler<Element>>,
    onEndedCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onLoadedData?: ObservableResolver<GenericEventHandler<Element>>,
    onLoadedDataCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onLoadedMetadata?: ObservableResolver<GenericEventHandler<Element>>,
    onLoadedMetadataCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onLoadStart?: ObservableResolver<GenericEventHandler<Element>>,
    onLoadStartCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onPause?: ObservableResolver<GenericEventHandler<Element>>,
    onPauseCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onPlay?: ObservableResolver<GenericEventHandler<Element>>,
    onPlayCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onPlaying?: ObservableResolver<GenericEventHandler<Element>>,
    onPlayingCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onProgress?: ObservableResolver<GenericEventHandler<Element>>,
    onProgressCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onRateChange?: ObservableResolver<GenericEventHandler<Element>>,
    onRateChangeCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onSeeked?: ObservableResolver<GenericEventHandler<Element>>,
    onSeekedCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onSeeking?: ObservableResolver<GenericEventHandler<Element>>,
    onSeekingCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onStalled?: ObservableResolver<GenericEventHandler<Element>>,
    onStalledCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onSuspend?: ObservableResolver<GenericEventHandler<Element>>,
    onSuspendCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onTimeUpdate?: ObservableResolver<GenericEventHandler<Element>>,
    onTimeUpdateCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onVolumeChange?: ObservableResolver<GenericEventHandler<Element>>,
    onVolumeChangeCapture?: ObservableResolver<GenericEventHandler<Element>>,
    onWaiting?: ObservableResolver<GenericEventHandler<Element>>,
    onWaitingCapture?: ObservableResolver<GenericEventHandler<Element>>,
    /* MOUSE EVENTS */
    onClick?: ObservableResolver<MouseEventHandler<Element>>,
    onClickCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onContextMenu?: ObservableResolver<MouseEventHandler<Element>>,
    onContextMenuCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onDblClick?: ObservableResolver<MouseEventHandler<Element>>,
    onDblClickCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onDrag?: ObservableResolver<DragEventHandler<Element>>,
    onDragCapture?: ObservableResolver<DragEventHandler<Element>>,
    onDragEnd?: ObservableResolver<DragEventHandler<Element>>,
    onDragEndCapture?: ObservableResolver<DragEventHandler<Element>>,
    onDragEnter?: ObservableResolver<DragEventHandler<Element>>,
    onDragEnterCapture?: ObservableResolver<DragEventHandler<Element>>,
    onDragExit?: ObservableResolver<DragEventHandler<Element>>,
    onDragExitCapture?: ObservableResolver<DragEventHandler<Element>>,
    onDragLeave?: ObservableResolver<DragEventHandler<Element>>,
    onDragLeaveCapture?: ObservableResolver<DragEventHandler<Element>>,
    onDragOver?: ObservableResolver<DragEventHandler<Element>>,
    onDragOverCapture?: ObservableResolver<DragEventHandler<Element>>,
    onDragStart?: ObservableResolver<DragEventHandler<Element>>,
    onDragStartCapture?: ObservableResolver<DragEventHandler<Element>>,
    onDrop?: ObservableResolver<DragEventHandler<Element>>,
    onDropCapture?: ObservableResolver<DragEventHandler<Element>>,
    onMouseDown?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseDownCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseEnter?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseEnterCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseLeave?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseLeaveCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseMove?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseMoveCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseOut?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseOutCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseOver?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseOverCapture?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseUp?: ObservableResolver<MouseEventHandler<Element>>,
    onMouseUpCapture?: ObservableResolver<MouseEventHandler<Element>>,
    /* SELECTION EVENTS */
    onSelect?: ObservableResolver<GenericEventHandler<Element>>,
    onSelectCapture?: ObservableResolver<GenericEventHandler<Element>>,
    /* TOUCH EVENTS */
    onTouchCancel?: ObservableResolver<TouchEventHandler<Element>>,
    onTouchCancelCapture?: ObservableResolver<TouchEventHandler<Element>>,
    onTouchEnd?: ObservableResolver<TouchEventHandler<Element>>,
    onTouchEndCapture?: ObservableResolver<TouchEventHandler<Element>>,
    onTouchMove?: ObservableResolver<TouchEventHandler<Element>>,
    onTouchMoveCapture?: ObservableResolver<TouchEventHandler<Element>>,
    onTouchStart?: ObservableResolver<TouchEventHandler<Element>>,
    onTouchStartCapture?: ObservableResolver<TouchEventHandler<Element>>,
    /* POINTER EVENTS */
    onPointerOver?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerOverCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerEnter?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerEnterCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerDown?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerDownCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerMove?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerMoveCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerUp?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerUpCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerCancel?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerCancelCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerOut?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerOutCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerLeave?: ObservableResolver<PointerEventHandler<Element>>,
    onPointerLeaveCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onGotPointerCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onGotPointerCaptureCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onLostPointerCapture?: ObservableResolver<PointerEventHandler<Element>>,
    onLostPointerCaptureCapture?: ObservableResolver<PointerEventHandler<Element>>,
    /* UI EVENTS */
    onScroll?: ObservableResolver<UIEventHandler<Element>>,
    onScrollCapture?: ObservableResolver<UIEventHandler<Element>>,
    /* WHEEL EVENTS */
    onWheel?: ObservableResolver<WheelEventHandler<Element>>,
    onWheelCapture?: ObservableResolver<WheelEventHandler<Element>>,
    /* ANIMATION EVENTS */
    onAnimationStart?: ObservableResolver<AnimationEventHandler<Element>>,
    onAnimationStartCapture?: ObservableResolver<AnimationEventHandler<Element>>,
    onAnimationEnd?: ObservableResolver<AnimationEventHandler<Element>>,
    onAnimationEndCapture?: ObservableResolver<AnimationEventHandler<Element>>,
    onAnimationIteration?: ObservableResolver<AnimationEventHandler<Element>>,
    onAnimationIterationCapture?: ObservableResolver<AnimationEventHandler<Element>>,
    /* TRANSITION EVENTS */
    onTransitionEnd?: ObservableResolver<TransitionEventHandler<Element>>,
    onTransitionEndCapture?: ObservableResolver<TransitionEventHandler<Element>>
  }

  interface ElementAttributesProperty {
    props: any
  }

  interface ElementChildrenAttribute {
    children: any
  }

  interface HTMLAttributes<Element extends EventTarget = EventTarget> extends ClassAttributes<Element>, DOMAttributes<Element> {
    /* STANDARD ATTRIBUTES */
    accept?: ObservableResolver<string>,
    acceptCharset?: ObservableResolver<string>,
    accessKey?: ObservableResolver<string>,
    action?: ObservableResolver<string>,
    allow?: ObservableResolver<string>,
    allowFullScreen?: ObservableResolver<boolean>,
    allowTransparency?: ObservableResolver<boolean>,
    alt?: ObservableResolver<string>,
    as?: ObservableResolver<string>,
    async?: ObservableResolver<boolean>,
    autocomplete?: ObservableResolver<string>,
    autoComplete?: ObservableResolver<string>,
    autocorrect?: ObservableResolver<string>,
    autoCorrect?: ObservableResolver<string>,
    autofocus?: ObservableResolver<boolean>,
    autoFocus?: ObservableResolver<boolean>,
    autoPlay?: ObservableResolver<boolean>,
    capture?: ObservableResolver<boolean | string>,
    cellPadding?: ObservableResolver<number | string>,
    cellSpacing?: ObservableResolver<number | string>,
    charSet?: ObservableResolver<string>,
    challenge?: ObservableResolver<string>,
    checked?: ObservableResolver<boolean>,
    cite?: ObservableResolver<string>,
    class?: ObservableResolver<string | ClassProperties>,
    className?: ObservableResolver<string>,
    cols?: ObservableResolver<number>,
    colSpan?: ObservableResolver<number>,
    content?: ObservableResolver<string>,
    contentEditable?: ObservableResolver<boolean>,
    contextMenu?: ObservableResolver<string>,
    controls?: ObservableResolver<boolean>,
    controlsList?: ObservableResolver<string>,
    coords?: ObservableResolver<string>,
    crossOrigin?: ObservableResolver<string>,
    data?: ObservableResolver<string>,
    dateTime?: ObservableResolver<string>,
    default?: ObservableResolver<boolean>,
    defer?: ObservableResolver<boolean>,
    dir?: ObservableResolver<'auto' | 'rtl' | 'ltr'>,
    disabled?: ObservableResolver<boolean>,
    disableRemotePlayback?: ObservableResolver<boolean>,
    download?: ObservableResolver<boolean>,
    decoding?: ObservableResolver<'sync' | 'async' | 'auto'>,
    draggable?: ObservableResolver<boolean>,
    encType?: ObservableResolver<string>,
    enterkeyhint?: ObservableResolver<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>,
    form?: ObservableResolver<string>,
    formAction?: ObservableResolver<string>,
    formEncType?: ObservableResolver<string>,
    formMethod?: ObservableResolver<string>,
    formNoValidate?: ObservableResolver<boolean>,
    formTarget?: ObservableResolver<string>,
    frameBorder?: ObservableResolver<number | string>,
    headers?: ObservableResolver<string>,
    height?: ObservableResolver<number | string>,
    hidden?: ObservableResolver<boolean>,
    high?: ObservableResolver<number>,
    href?: ObservableResolver<string>,
    hrefLang?: ObservableResolver<string>,
    for?: ObservableResolver<string>,
    htmlFor?: ObservableResolver<string>,
    httpEquiv?: ObservableResolver<string>,
    icon?: ObservableResolver<string>,
    id?: ObservableResolver<string>,
    inputMode?: ObservableResolver<string>,
    integrity?: ObservableResolver<string>,
    is?: ObservableResolver<string>,
    keyParams?: ObservableResolver<string>,
    keyType?: ObservableResolver<string>,
    kind?: ObservableResolver<string>,
    label?: ObservableResolver<string>,
    lang?: ObservableResolver<string>,
    list?: ObservableResolver<string>,
    loading?: ObservableResolver<'eager' | 'lazy'>,
    loop?: ObservableResolver<boolean>,
    low?: ObservableResolver<number>,
    manifest?: ObservableResolver<string>,
    marginHeight?: ObservableResolver<number>,
    marginWidth?: ObservableResolver<number>,
    max?: ObservableResolver<number | string>,
    maxLength?: ObservableResolver<number>,
    media?: ObservableResolver<string>,
    mediaGroup?: ObservableResolver<string>,
    method?: ObservableResolver<string>,
    min?: ObservableResolver<number | string>,
    minLength?: ObservableResolver<number>,
    multiple?: ObservableResolver<boolean>,
    muted?: ObservableResolver<boolean>,
    name?: ObservableResolver<string>,
    nomodule?: ObservableResolver<boolean>,
    nonce?: ObservableResolver<string>,
    noValidate?: ObservableResolver<boolean>,
    open?: ObservableResolver<boolean>,
    optimum?: ObservableResolver<number>,
    pattern?: ObservableResolver<string>,
    ping?: ObservableResolver<string>,
    placeholder?: ObservableResolver<string>,
    playsInline?: ObservableResolver<boolean>,
    poster?: ObservableResolver<string>,
    preload?: ObservableResolver<string>,
    radioGroup?: ObservableResolver<string>,
    readonly?: ObservableResolver<boolean>,
    readOnly?: ObservableResolver<boolean>,
    referrerpolicy?: ObservableResolver<'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'>,
    rel?: ObservableResolver<string>,
    required?: ObservableResolver<boolean>,
    reversed?: ObservableResolver<boolean>,
    role?: ObservableResolver<string>,
    rows?: ObservableResolver<number>,
    rowSpan?: ObservableResolver<number>,
    sandbox?: ObservableResolver<string>,
    scope?: ObservableResolver<string>,
    scoped?: ObservableResolver<boolean>,
    scrolling?: ObservableResolver<string>,
    seamless?: ObservableResolver<boolean>,
    selected?: ObservableResolver<boolean>,
    shape?: ObservableResolver<string>,
    size?: ObservableResolver<number>,
    sizes?: ObservableResolver<string>,
    slot?: ObservableResolver<string>,
    span?: ObservableResolver<number>,
    spellcheck?: ObservableResolver<boolean>,
    spellCheck?: ObservableResolver<boolean>,
    src?: ObservableResolver<string>,
    srcset?: ObservableResolver<string>,
    srcDoc?: ObservableResolver<string>,
    srcLang?: ObservableResolver<string>,
    srcSet?: ObservableResolver<string>,
    start?: ObservableResolver<number>,
    step?: ObservableResolver<number | string>,
    style?: ObservableResolver<string | StyleProperties>,
    summary?: ObservableResolver<string>,
    tabIndex?: ObservableResolver<number>,
    target?: ObservableResolver<string>,
    title?: ObservableResolver<string>,
    type?: ObservableResolver<string>,
    useMap?: ObservableResolver<string>,
    value?: ObservableResolver<string | string[] | number>,
    volume?: ObservableResolver<string | number>,
    width?: ObservableResolver<number | string>,
    wmode?: ObservableResolver<string>,
    wrap?: ObservableResolver<string>,
    /* NON-STANDARD ATTRIBUTES */
    autocapitalize?: ObservableResolver<'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'>,
    autoCapitalize?: ObservableResolver<'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'>,
    disablePictureInPicture?: ObservableResolver<boolean>,
    results?: ObservableResolver<number>,
    translate?: ObservableResolver<'yes' | 'no'>,
    /* RDFa ATTRIBUTES */
    about?: ObservableResolver<string>,
    datatype?: ObservableResolver<string>,
    inlist?: ObservableResolver<boolean>,
    prefix?: ObservableResolver<string>,
    property?: ObservableResolver<string>,
    resource?: ObservableResolver<string>,
    typeof?: ObservableResolver<string>,
    vocab?: ObservableResolver<string>,
    /* MICRODATA ATTRIBUTES */
    itemProp?: ObservableResolver<string>,
    itemScope?: ObservableResolver<boolean>,
    itemType?: ObservableResolver<string>,
    itemID?: ObservableResolver<string>,
    itemRef?: ObservableResolver<string>
  }

  interface IntrinsicAttributes {
    key?: string
  }

  interface IntrinsicElements {
    a: HTMLAttributes<HTMLAnchorElement>,
    abbr: HTMLAttributes<HTMLElement>,
    address: HTMLAttributes<HTMLElement>,
    area: HTMLAttributes<HTMLAreaElement>,
    article: HTMLAttributes<HTMLElement>,
    aside: HTMLAttributes<HTMLElement>,
    audio: HTMLAttributes<HTMLAudioElement>,
    b: HTMLAttributes<HTMLElement>,
    base: HTMLAttributes<HTMLBaseElement>,
    bdi: HTMLAttributes<HTMLElement>,
    bdo: HTMLAttributes<HTMLElement>,
    big: HTMLAttributes<HTMLElement>,
    blockquote: HTMLAttributes<HTMLQuoteElement>,
    body: HTMLAttributes<HTMLBodyElement>,
    br: HTMLAttributes<HTMLBRElement>,
    button: HTMLAttributes<HTMLButtonElement>,
    canvas: HTMLAttributes<HTMLCanvasElement>,
    caption: HTMLAttributes<HTMLTableCaptionElement>,
    cite: HTMLAttributes<HTMLElement>,
    code: HTMLAttributes<HTMLElement>,
    col: HTMLAttributes<HTMLTableColElement>,
    colgroup: HTMLAttributes<HTMLTableColElement>,
    data: HTMLAttributes<HTMLDataElement>,
    datalist: HTMLAttributes<HTMLDataListElement>,
    dd: HTMLAttributes<HTMLElement>,
    del: HTMLAttributes<HTMLModElement>,
    details: HTMLAttributes<HTMLDetailsElement>,
    dfn: HTMLAttributes<HTMLElement>,
    dialog: HTMLAttributes<HTMLDialogElement>,
    div: HTMLAttributes<HTMLDivElement>,
    dl: HTMLAttributes<HTMLDListElement>,
    dt: HTMLAttributes<HTMLElement>,
    em: HTMLAttributes<HTMLElement>,
    embed: HTMLAttributes<HTMLEmbedElement>,
    fieldset: HTMLAttributes<HTMLFieldSetElement>,
    figcaption: HTMLAttributes<HTMLElement>,
    figure: HTMLAttributes<HTMLElement>,
    footer: HTMLAttributes<HTMLElement>,
    form: HTMLAttributes<HTMLFormElement>,
    h1: HTMLAttributes<HTMLHeadingElement>,
    h2: HTMLAttributes<HTMLHeadingElement>,
    h3: HTMLAttributes<HTMLHeadingElement>,
    h4: HTMLAttributes<HTMLHeadingElement>,
    h5: HTMLAttributes<HTMLHeadingElement>,
    h6: HTMLAttributes<HTMLHeadingElement>,
    head: HTMLAttributes<HTMLHeadElement>,
    header: HTMLAttributes<HTMLElement>,
    hgroup: HTMLAttributes<HTMLElement>,
    hr: HTMLAttributes<HTMLHRElement>,
    html: HTMLAttributes<HTMLHtmlElement>,
    i: HTMLAttributes<HTMLElement>,
    iframe: HTMLAttributes<HTMLIFrameElement>,
    img: HTMLAttributes<HTMLImageElement>,
    input: HTMLAttributes<HTMLInputElement>,
    ins: HTMLAttributes<HTMLModElement>,
    kbd: HTMLAttributes<HTMLElement>,
    keygen: HTMLAttributes<HTMLUnknownElement>,
    label: HTMLAttributes<HTMLLabelElement>,
    legend: HTMLAttributes<HTMLLegendElement>,
    li: HTMLAttributes<HTMLLIElement>,
    link: HTMLAttributes<HTMLLinkElement>,
    main: HTMLAttributes<HTMLElement>,
    map: HTMLAttributes<HTMLMapElement>,
    mark: HTMLAttributes<HTMLElement>,
    marquee: HTMLAttributes<HTMLMarqueeElement>,
    menu: HTMLAttributes<HTMLMenuElement>,
    menuitem: HTMLAttributes<HTMLUnknownElement>,
    meta: HTMLAttributes<HTMLMetaElement>,
    meter: HTMLAttributes<HTMLMeterElement>,
    nav: HTMLAttributes<HTMLElement>,
    noscript: HTMLAttributes<HTMLElement>,
    object: HTMLAttributes<HTMLObjectElement>,
    ol: HTMLAttributes<HTMLOListElement>,
    optgroup: HTMLAttributes<HTMLOptGroupElement>,
    option: HTMLAttributes<HTMLOptionElement>,
    output: HTMLAttributes<HTMLOutputElement>,
    p: HTMLAttributes<HTMLParagraphElement>,
    param: HTMLAttributes<HTMLParamElement>,
    picture: HTMLAttributes<HTMLPictureElement>,
    pre: HTMLAttributes<HTMLPreElement>,
    progress: HTMLAttributes<HTMLProgressElement>,
    q: HTMLAttributes<HTMLQuoteElement>,
    rp: HTMLAttributes<HTMLElement>,
    rt: HTMLAttributes<HTMLElement>,
    ruby: HTMLAttributes<HTMLElement>,
    s: HTMLAttributes<HTMLElement>,
    samp: HTMLAttributes<HTMLElement>,
    script: HTMLAttributes<HTMLScriptElement>,
    section: HTMLAttributes<HTMLElement>,
    select: HTMLAttributes<HTMLSelectElement>,
    slot: HTMLAttributes<HTMLSlotElement>,
    small: HTMLAttributes<HTMLElement>,
    source: HTMLAttributes<HTMLSourceElement>,
    span: HTMLAttributes<HTMLSpanElement>,
    strong: HTMLAttributes<HTMLElement>,
    style: HTMLAttributes<HTMLStyleElement>,
    sub: HTMLAttributes<HTMLElement>,
    summary: HTMLAttributes<HTMLElement>,
    sup: HTMLAttributes<HTMLElement>,
    table: HTMLAttributes<HTMLTableElement>,
    tbody: HTMLAttributes<HTMLTableSectionElement>,
    td: HTMLAttributes<HTMLTableCellElement>,
    textarea: HTMLAttributes<HTMLTextAreaElement>,
    tfoot: HTMLAttributes<HTMLTableSectionElement>,
    th: HTMLAttributes<HTMLTableCellElement>,
    thead: HTMLAttributes<HTMLTableSectionElement>,
    time: HTMLAttributes<HTMLTimeElement>,
    title: HTMLAttributes<HTMLTitleElement>,
    tr: HTMLAttributes<HTMLTableRowElement>,
    track: HTMLAttributes<HTMLTrackElement>,
    u: HTMLAttributes<HTMLElement>,
    ul: HTMLAttributes<HTMLUListElement>,
    var: HTMLAttributes<HTMLElement>,
    video: HTMLAttributes<HTMLVideoElement>,
    wbr: HTMLAttributes<HTMLElement>
  }

}
