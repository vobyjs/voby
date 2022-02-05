import { ViewElement } from '~/types';
declare const ErrorBoundary: ({ fallback, children }: {
    fallback: ViewElement | HTMLElement;
    children: ViewElement;
}) => ViewElement;
export default ErrorBoundary;
