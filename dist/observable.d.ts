import observable from 'oby';
declare const $: typeof observable;
declare const $$: <T>(value: T | import("oby/dist/types").ObservableCallableWithoutInitial<T> | import("oby/dist/types").ObservableCallable<T>) => T;
export { $, $$ };
