
/* MAIN */

type Callback = () => void;

type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ((() => Child) & { metadata: any }) | ({ (): Child, get (): Child, sample (): Child });

type ChildResolved = null | undefined | boolean | bigint | number | string | symbol | Node | Array<ChildResolved>;

type ChildWithMetadata<T = unknown> = (() => Child) & { metadata: T };

type ComponentClass<P = {}, S = {}> = ConstructorWith<import ( './components/component' ).default<P, S>, [P]>;

type ComponentFunction<P = {}> = ( props: P ) => Child;

type ComponentIntrinsicElement = keyof JSX.IntrinsicElements;

type ComponentNode = Node;

type Component<P = {}> = ComponentClass<P> | ComponentFunction<P> | ComponentIntrinsicElement | ComponentNode;

type Constructor<T = unknown> = { new (): T };

type ConstructorWith<T = unknown, Arguments extends unknown[] = []> = { new ( ...args: Arguments ): T };

type Disposer = () => void;

type EventListener = ( event: Event ) => unknown;

type FetchStateLoading = { loading: true, error?: never, response?: never };

type FetchStateRejected = { loading: false, error: Error, response?: never };

type FetchStateResolved = { loading: false, error?: never, response: Response };

type FetchState = FetchStateLoading | FetchStateRejected | FetchStateResolved;

type FunctionResolver<T = unknown> = T | (() => FunctionResolver<T>);

type Key = string;

type Observable<T = unknown> = import ( 'oby/dist/types' ).ObservableCallable<T>;

type ObservableWithoutInitial<T = unknown> = import ( 'oby/dist/types' ).ObservableCallableWithoutInitial<T>;

type ObservableReadonly<T = unknown> = import ( 'oby/dist/types' ).ReadonlyObservableCallable<T>;

type ObservableReadonlyWithoutInitial<T = unknown> = import ( 'oby/dist/types' ).ReadonlyObservableCallableWithoutInitial<T>;

type ObservableAny<T = unknown> = import ( 'oby/dist/types' ).ObservableAny<T>;

type ObservableAccessor<T = unknown> = ({ (): T, get (): T, sample (): T });

type ObservableMaybe<T = unknown> = T | Observable<T> | ObservableReadonly<T>;

type ObservableRecordMaybe<T = {}> = { [P in keyof T]: P extends 'ref' | 'children' ? T[P] : ObservableMaybe<T[P]> };

type ObservableResolver<T = unknown> = ({ (): ObservableResolver<T>, get (): ObservableResolver<T>, sample (): ObservableResolver<T> }) | T;

type PromiseStateLoading = { loading: true, error?: never, value?: never };

type PromiseStateRejected = { loading: false, error: Error, value?: never };

type PromiseStateResolved<T = unknown> = { loading: false, error?: never, value: T };

type PromiseState<T = unknown> = PromiseStateLoading | PromiseStateRejected | PromiseStateResolved<T>;

type Props = Record<string, any>;

type Ref<T = unknown> = ( value: T ) => unknown;

type TemplateActionPath = number[];

type TemplateActionProxy = ( target: Node, prop: string, targetNode?: Node ) => void;

type TemplateActionWithNodes = [Node, string, string, Node?];

type TemplateActionWithPaths = [TemplateActionPath, string, string, TemplateActionPath?];

/* EXPORT */

export type {Callback, Child, ChildResolved, ChildWithMetadata, ComponentClass, ComponentFunction, ComponentIntrinsicElement, ComponentNode, Component, Constructor, ConstructorWith, Disposer, EventListener, FetchStateLoading, FetchStateRejected, FetchStateResolved, FetchState, FunctionResolver, Key, Observable, ObservableWithoutInitial, ObservableReadonly, ObservableReadonlyWithoutInitial, ObservableAny, ObservableAccessor, ObservableMaybe, ObservableRecordMaybe, ObservableResolver, PromiseStateLoading, PromiseStateRejected, PromiseStateResolved, PromiseState, Props, Ref, TemplateActionPath, TemplateActionProxy, TemplateActionWithNodes, TemplateActionWithPaths};
