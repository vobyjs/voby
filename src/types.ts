
/* MAIN */

type Child = null | undefined | boolean | bigint | number | string | symbol | Node | Array<Child> | (() => Child) | ({ (): Child, get (): Child, sample (): Child });

type ChildPrepared = null | string | Node | Array<ChildPrepared> | (() => Child) | ({ (): Child, get (): Child, sample (): Child });

type ComponentClass<P = {}, S = {}> = ConstructorWith<import ( '~/components/component' ).default<P, S>, [P]>;

type ComponentFunction<P = {}> = ( props: P ) => Child;

type ComponentIntrinsicElement = keyof JSX.IntrinsicElements;

type ComponentNode = Node;

type Component<P = {}> = ComponentClass<P> | ComponentFunction<P> | ComponentIntrinsicElement | ComponentNode;

type Constructor<T = unknown> = { new (): T };

type ConstructorWith<T = unknown, Arguments extends unknown[] = []> = { new ( ...args: Arguments ): T };

type Disposer = () => void;

type FunctionResolver<T = unknown> = T | (() => FunctionResolver<T>);

type Observable<T = unknown> = import ( 'oby/dist/types' ).ObservableCallable<T>;

type ObservableWithoutInitial<T = unknown> = import ( 'oby/dist/types' ).ObservableCallableWithoutInitial<T>;

type ObservableReadonly<T = unknown> = import ( 'oby/dist/types' ).ReadonlyObservableCallable<T>;

type ObservableReadonlyWithoutInitial<T = unknown> = import ( 'oby/dist/types' ).ReadonlyObservableCallableWithoutInitial<T>;

type ObservableAccessor<T = unknown> = ({ (): T, get (): T, sample (): T });

type ObservableMaybe<T = unknown> = T | Observable<T>;

type ObservableResolver<T = unknown> = T | ({ (): ObservableResolver<T>, get (): ObservableResolver<T>, sample (): ObservableResolver<T> });

type PromiseStateLoading = { loading: true, error?: never, value?: never };

type PromiseStateError = { loading: false, error: Error, value?: never };

type PromiseStateSuccess<T> = { loading: false, error?: never, value: T };

type PromiseState<T> = PromiseStateLoading | PromiseStateError | PromiseStateSuccess<T>;

type Props = Record<string, any>;

type TemplateActionPath = number[];

type TemplateActionProxy = ( target: Node, prop: string, targetNode?: Node ) => void;

type TemplateActionWithNodes = [Node, string, string, Node?];

type TemplateActionWithPaths = [TemplateActionPath, string, string, TemplateActionPath?];

/* EXPORT */

export type {Child, ChildPrepared, ComponentClass, ComponentFunction, ComponentIntrinsicElement, ComponentNode, Component, Constructor, ConstructorWith, Disposer, FunctionResolver, Observable, ObservableWithoutInitial, ObservableReadonly, ObservableReadonlyWithoutInitial, ObservableAccessor, ObservableMaybe, ObservableResolver, PromiseStateLoading, PromiseStateError, PromiseStateSuccess, PromiseState, Props, TemplateActionPath, TemplateActionProxy, TemplateActionWithNodes, TemplateActionWithPaths};
