
/* MAIN */

/// <reference lib="dom" />
// export namespace JSXInternal {}

type Constructor<T> = { new (): T };

type Disposer = () => void;

type FunctionMaybe<T> = T | (() => T);

type Observable<T = unknown> = import ( 'oby/dist/types' ).ObservableCallable<T>;

type ObservableMaybe<T = unknown> = T | Observable<T>;

type PromiseMaybe<T>  = T | Promise<T>;

type ViewClassComponent<P = {}> = import ( './components/component' ).default<P>;

type ViewFunctionComponent<P = {}> = ( props: P ) => ViewElement;

type ViewComponent<P = {}> = ViewClassComponent<P> | ViewFunctionComponent<P>;

type ViewProps = Record<string, any>;

type ViewElement = ObservableMaybe<null | undefined | string | Node | (null | undefined | string | Node)[]>;

type ViewChild = FunctionMaybe<ViewElement>;

type ViewPromiseStateLoading = {
  loading: true,
  error?: never,
  value?: never
};

type ViewPromiseStateError = {
  loading: false,
  error: Error,
  value?: never
};

type ViewPromiseStateSuccess<T> = {
  loading: false,
  error?: never,
  value: T
};

type ViewPromiseState<T> = ViewPromiseStateLoading | ViewPromiseStateError | ViewPromiseStateSuccess<T>;

type ViewTemplateActionWithElements = [HTMLElement, string, string, HTMLElement?];

type ViewTemplateActionWithPaths = [ViewTemplateActionPath, string, string, ViewTemplateActionPath?];

type ViewTemplateActionPath = number[];

type ViewType = 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'bdi' | 'bdo' | 'big' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'keygen' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'marquee' | 'menu' | 'menuitem' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'slot' | 'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr';

/* EXPORT */

export {Constructor, Disposer, FunctionMaybe, Observable, ObservableMaybe, PromiseMaybe, ViewComponent, ViewProps, ViewElement, ViewChild, ViewPromiseStateLoading, ViewPromiseStateError, ViewPromiseStateSuccess, ViewPromiseState, ViewTemplateActionWithElements, ViewTemplateActionWithPaths, ViewTemplateActionPath, ViewType};
