import { Observable, ViewComponent } from '~/types';
declare const For: <T>({ values, children }: {
    values: Observable<Observable<T>[]>;
    children: (value: T) => ViewComponent;
}) => Observable<Observable<ViewComponent>[]>;
export default For;
