import { ViewComponent, ViewElement, ViewChild, ViewProps, ViewType } from '~/types';
declare const createElement: (type: HTMLElement | ViewComponent | ViewType, props: ViewProps | null, ...children: ViewChild[]) => (() => ViewElement);
export default createElement;
