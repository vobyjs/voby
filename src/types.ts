
/* MAIN */

type Callback = () => void;

type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ((() => Child) & { metadata: any }) | ({ (): Child, get (): Child, sample (): Child });

type ChildPrepared = null | string | Node | Array<ChildPrepared> | (() => Child) | ({ (): Child, get (): Child, sample (): Child });

type ChildResolved = null | undefined | boolean | bigint | number | string | symbol | Node | Array<ChildResolved>;

type ChildMounted = Node[] | ChildMounted[];

type ChildWithMetadata<T = unknown> = (() => Child) & { metadata: T };

type ComponentClass<P = {}, S = {}> = Constructor<import ( './components/component' ).default<P, S>>;

type ComponentFunction<P = {}> = ( props: P ) => Child;

type ComponentIntrinsicElement = keyof JSX.IntrinsicElements;

type ComponentNode = Node;

type Component<P = {}> = ComponentClass<P> | ComponentFunction<P> | ComponentIntrinsicElement | ComponentNode;

type Constructor<T = unknown> = { new (): T };

type ConstructorWith<T = unknown, Arguments extends unknown[] = []> = { new ( ...args: Arguments ): T };

type Disposer = () => void;

type EventListener = ( event: Event ) => unknown;

type FunctionResolver<T = unknown> = T | (() => FunctionResolver<T>);

type Key = string;

type Observable<T = unknown> = import ( 'oby/dist/types' ).ObservableCallable<T>;

type ObservableWithoutInitial<T = unknown> = import ( 'oby/dist/types' ).ObservableCallableWithoutInitial<T>;

type ObservableReadonly<T = unknown> = import ( 'oby/dist/types' ).ReadonlyObservableCallable<T>;

type ObservableReadonlyWithoutInitial<T = unknown> = import ( 'oby/dist/types' ).ReadonlyObservableCallableWithoutInitial<T>;

type ObservableAny<T = unknown> = import ( 'oby/dist/types' ).ObservableAny<T>;

type ObservableAccessor<T = unknown> = ({ (): T, get (): T, sample (): T });

type ObservableMaybe<T = unknown> = T | ObservableAny<T>;

type ObservableRecordMaybe<T = {}> = { [P in keyof T]: P extends 'ref' | 'children' ? T[P] : ObservableMaybe<T[P]> };

type ObservableResolver<T = unknown> = ({ (): ObservableResolver<T>, get (): ObservableResolver<T>, sample (): ObservableResolver<T> }) | T;

type PromiseStateLoading = { loading: true, error?: never, value?: never };

type PromiseStateError = { loading: false, error: Error, value?: never };

type PromiseStateSuccess<T = unknown> = { loading: false, error?: never, value: T };

type PromiseState<T = unknown> = PromiseStateLoading | PromiseStateError | PromiseStateSuccess<T>;

type Props = Record<string, any>;

type Ref<T = unknown> = ( value: T ) => unknown;

type TemplateActionPath = number[];

type TemplateActionProxy = ( target: Node, prop: string, targetNode?: Node ) => void;

type TemplateActionWithNodes = [Node, string, string, Node?];

type TemplateActionWithPaths = [TemplateActionPath, string, string, TemplateActionPath?];

/* EXPORT */

export type {Callback, Child, ChildMounted, ChildPrepared, ChildResolved, ChildWithMetadata, ComponentClass, ComponentFunction, ComponentIntrinsicElement, ComponentNode, Component, Constructor, ConstructorWith, Disposer, EventListener, FunctionResolver, Key, Observable, ObservableWithoutInitial, ObservableReadonly, ObservableReadonlyWithoutInitial, ObservableAny, ObservableAccessor, ObservableMaybe, ObservableRecordMaybe, ObservableResolver, PromiseStateLoading, PromiseStateError, PromiseStateSuccess, PromiseState, Props, Ref, TemplateActionPath, TemplateActionProxy, TemplateActionWithNodes, TemplateActionWithPaths};
