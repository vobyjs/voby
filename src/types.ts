
/* MAIN */

type ArrayMaybe<T = unknown> = T[] | T;

type Callback = () => void;

type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child);

type ChildWithMetadata<T = unknown> = (() => Child) & { metadata: T };

type ComponentClass<P = {}> = ConstructorWith<import ( '~/components/component' ).default<P>, [P]>;

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

type Element<T = Child> = () => T;

type EventListener = ( event: Event ) => void;

type FN<Arguments extends unknown[], Return extends unknown = void> = ( ...args: Arguments ) => Return;

type FunctionMaybe<T = unknown> = (() => T) | T;

type Observable<T = unknown> = import ( 'oby' ).Observable<T>;

type ObservableReadonly<T = unknown> = import ( 'oby' ).ObservableReadonly<T>;

type ObservableMaybe<T = unknown> = Observable<T> | ObservableReadonly<T> | T;

type ObservableOptions<T = unknown> = import ( 'oby' ).ObservableOptions<T>;

type PromiseMaybe<T = unknown> = Promise<T> | T;

type Props = Record<string, any>;

type Ref<T = unknown> = ( value: T | undefined ) => void;

type ResourceLoading = { loading: true, error?: never, value?: never };

type ResourceRejected = { loading: false, error: Error, value?: never };

type ResourceResolved<T = unknown> = { loading: false, error?: never, value: T };

type Resource<T = unknown> = ResourceLoading | ResourceRejected | ResourceResolved<T>;

type SuspenseData = { active: Observable<boolean>, increment: Callback, decrement: Callback };

type TemplateActionPath = number[];

type TemplateActionProxy = ( target: Node, method: string, key?: string, targetNode?: Node ) => void;

type TemplateActionWithNodes = [Node, string, string, string?, Node?];

type TemplateActionWithPaths = [TemplateActionPath, string, string, string?, TemplateActionPath?];

type TemplateOptions = { recycle?: boolean };

type TemplateVariableProperties = string[];

type TemplateVariableData = { path: TemplateActionPath, properties: TemplateVariableProperties };

type TemplateVariablesMap = Map<TemplateActionPath, string>;

/* EXPORT */

export type {ArrayMaybe, Callback, Child, ChildWithMetadata, ComponentClass, ComponentFunction, ComponentIntrinsicElement, ComponentNode, Component, Constructor, ConstructorWith, ContextConsumer, ContextProvider, Context, Disposer, Element, EventListener, FN, FunctionMaybe, Observable, ObservableReadonly, ObservableMaybe, ObservableOptions, PromiseMaybe, Props, Ref, ResourceLoading, ResourceRejected, ResourceResolved, Resource, SuspenseData, TemplateActionPath, TemplateActionProxy, TemplateActionWithNodes, TemplateActionWithPaths, TemplateOptions, TemplateVariableProperties, TemplateVariableData, TemplateVariablesMap};
