
/* MAIN */

type ArrayMaybe<T = unknown> = T[] | T;

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

type ContextConsumer<T = unknown> = ( props: { children: (( value?: T ) => Child) } ) => Child;

type ContextProvider<T = unknown> = ( props: { value: T, children: Child } ) => Child;

type Context<T = unknown> = { Consumer: ContextConsumer<T>, Provider: ContextProvider<T> };

type Disposer = () => void;

type EventListener = ( event: Event ) => void;

type FN<Arguments extends unknown[], Return extends unknown = void> = ( ...args: Arguments ) => Return;

type FunctionMaybe<T = unknown> = (() => T) | T;

type Observable<T = unknown> = import ( 'oby' ).Observable<T>;

type ObservableWithoutInitial<T = unknown> = import ( 'oby' ).ObservableWithoutInitial<T>;

type ObservableReadonly<T = unknown> = import ( 'oby' ).ObservableReadonly<T>;

type ObservableReadonlyWithoutInitial<T = unknown> = import ( 'oby' ).ObservableReadonlyWithoutInitial<T>;

type ObservableAny<T = unknown> = import ( 'oby' ).ObservableAny<T>;

type ObservableMaybe<T = unknown> = Observable<T> | ObservableReadonly<T> | T;

type ObservableRecordMaybe<T = {}> = { [P in keyof T]: P extends 'ref' | 'children' ? T[P] : ObservableMaybe<T[P]> };

type ObservableOptions<T = unknown, TI = unknown> = import ( 'oby' ).ObservableOptions<T, TI>;

type PromiseMaybe<T = unknown> = Promise<T> | T;

type Props = Record<string, any>;

type Ref<T = unknown> = ( value: T ) => void;

type ResourceLoading = { loading: true, error?: never, value?: never };

type ResourceRejected = { loading: false, error: Error, value?: never };

type ResourceResolved<T = unknown> = { loading: false, error?: never, value: T };

type Resource<T = unknown> = ResourceLoading | ResourceRejected | ResourceResolved<T>;

type TemplateActionPath = number[];

type TemplateActionProxy = ( target: Node, prop: string, targetNode?: Node ) => void;

type TemplateActionWithNodes = [Node, string, string, Node?];

type TemplateActionWithPaths = [TemplateActionPath, string, string, TemplateActionPath?];

/* EXPORT */

export type {ArrayMaybe, Callback, Child, ChildResolved, ChildWithMetadata, ComponentClass, ComponentFunction, ComponentIntrinsicElement, ComponentNode, Component, Constructor, ConstructorWith, ContextConsumer, ContextProvider, Context, Disposer, EventListener, FN, FunctionMaybe, Observable, ObservableWithoutInitial, ObservableReadonly, ObservableReadonlyWithoutInitial, ObservableAny, ObservableMaybe, ObservableRecordMaybe, ObservableOptions, PromiseMaybe, Props, Ref, ResourceLoading, ResourceRejected, ResourceResolved, Resource, TemplateActionPath, TemplateActionProxy, TemplateActionWithNodes, TemplateActionWithPaths};
