import { Observable, ObservableMaybe, ViewPromiseState } from '~/types';
declare const usePromise: <T>(promise: ObservableMaybe<Promise<T>>) => Observable<ViewPromiseState<T>>;
export default usePromise;
