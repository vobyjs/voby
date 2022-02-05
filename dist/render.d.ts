import { Disposer, ViewElement } from '~/types';
declare const render: (element: (() => ViewElement), parent: HTMLElement) => Disposer;
export default render;
