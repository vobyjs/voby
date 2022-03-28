
/* MAIN */

type ArrayMaybe<T = unknown> = T[] | T;

type Callback = () => void;

type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ((() => Child) & { metadata: any }) | ({ (): Child, get (): Child, sample (): Child });

type ChildResolved = null | undefined | boolean | bigint | number | string | symbol | Node | Array<ChildResolved>;

type ChildWithMetadata<T = unknown> = (() => Child) & { metadata: T };

type ComponentClass<P = {}> = ConstructorWith<import ( './components/component' ).default<P>, [P]>;

type ComponentFunction<P = {}> = ( props: P ) => Child;

type ComponentIntrinsicElement = keyof JSX.IntrinsicElements;

type ComponentNode = Node;

type ComponentStyled<P = {}> = ({ ( props: P ): Child, className: string, toString: () => string });

type Component<P = {}> = ComponentClass<P> | ComponentFunction<P> | ComponentIntrinsicElement | ComponentNode;

type Constructor<T = unknown> = { new (): T };

type ConstructorWith<T = unknown, Arguments extends unknown[] = []> = { new ( ...args: Arguments ): T };

type ContextConsumer<T = unknown> = ( props: { children: (( value?: T ) => Child) } ) => Child;

type ContextProvider<T = unknown> = ( props: { value: T, children: Child } ) => Child;

type Context<T = unknown> = { Consumer: ContextConsumer<T>, Provider: ContextProvider<T> };

type Disposer = () => void;

type EventListener = ( event: Event ) => void;

type FN<Arguments extends unknown[], Return extends unknown = void> = ( ...args: Arguments ) => Return;

type ForCache<T = unknown> = ConstructorWith<{ dispose: Callback, before: Callback, after: Callback, render: FN<[T], Child> }, [ComponentFunction<T>]>;

type FunctionMaybe<T = unknown> = (() => T) | T;

type Observable<T = unknown> = import ( 'oby' ).Observable<T>;

type ObservableWithoutInitial<T = unknown> = import ( 'oby' ).ObservableWithoutInitial<T>;

type ObservableReadonly<T = unknown> = import ( 'oby' ).ObservableReadonly<T>;

type ObservableReadonlyWithoutInitial<T = unknown> = import ( 'oby' ).ObservableReadonlyWithoutInitial<T>;

type ObservableAny<T = unknown> = import ( 'oby' ).ObservableAny<T>;

type ObservableMaybe<T = unknown> = Observable<T> | ObservableReadonly<T> | T;

type ObservableOptions<T = unknown, TI = unknown> = import ( 'oby' ).ObservableOptions<T, TI>;

type Owner = import ( 'oby' ).Owner;

type PromiseMaybe<T = unknown> = Promise<T> | T;

type Props = Record<string, any>;

type Ref<T = unknown> = ( value: T ) => void;

type ResourceLoading = { loading: true, error?: never, value?: never };

type ResourceRejected = { loading: false, error: Error, value?: never };

type ResourceResolved<T = unknown> = { loading: false, error?: never, value: T };

type Resource<T = unknown> = ResourceLoading | ResourceRejected | ResourceResolved<T>;

type StyledConstructor<P extends Props = {}> = (( component: Component ) => (( strings: TemplateStringsArray, ...expressions: any[] ) => (( props: P ) => Child)));

type StyledElements<P extends Props = {}> = Record<ComponentIntrinsicElement, (( strings: TemplateStringsArray, ...expressions: any[] ) => (( props: P ) => Child))>;

type TemplateActionPath = number[];

type TemplateActionProxy = ( target: Node, method: string, key?: string, targetNode?: Node ) => void;

type TemplateActionWithNodes = [Node, string, string, string?, Node?];

type TemplateActionWithPaths = [TemplateActionPath, string, string, string?, TemplateActionPath?];

type TemplateOptions = { recycle?: boolean };

type TemplateVariableProperties = string[];

type TemplateVariableData = ({ path: TemplateActionPath, properties: TemplateVariableProperties });

type TemplateVariablesMap = Map<TemplateActionPath, string>;

/* EXPORT */

export type {ArrayMaybe, Callback, Child, ChildResolved, ChildWithMetadata, ComponentClass, ComponentFunction, ComponentIntrinsicElement, ComponentNode, ComponentStyled, Component, Constructor, ConstructorWith, ContextConsumer, ContextProvider, Context, Disposer, EventListener, FN, ForCache, FunctionMaybe, Observable, ObservableWithoutInitial, ObservableReadonly, ObservableReadonlyWithoutInitial, ObservableAny, ObservableMaybe, ObservableOptions, Owner, PromiseMaybe, Props, Ref, ResourceLoading, ResourceRejected, ResourceResolved, Resource, StyledConstructor, StyledElements, TemplateActionPath, TemplateActionProxy, TemplateActionWithNodes, TemplateActionWithPaths, TemplateOptions, TemplateVariableProperties, TemplateVariableData, TemplateVariablesMap};
