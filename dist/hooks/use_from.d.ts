declare const useFrom: <T>(fn: import("oby/dist/types").FromFunction<T>, options?: import("oby/dist/types").ObservableOptions<T, T | undefined> | undefined) => import("oby/dist/types").ObservableCallableWithoutInitial<T>;
export default useFrom;
