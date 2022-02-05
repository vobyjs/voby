import Component from '~/components/component';
import { Constructor, Observable } from '~/types';
declare const castArray: <T>(x: T | T[]) => T[];
declare const castError: (exception: unknown) => Error;
declare const identity: <T>(x: T) => T;
declare const indexOf: <T>(arr: T[], value: T) => number;
declare const isAlphanumeric: (x: string) => boolean;
declare const isArray: (x: unknown) => x is unknown[];
declare const isBoolean: (x: unknown) => x is boolean;
declare const isComment: (x: unknown) => x is Text;
declare const isComponent: (x: unknown) => x is Constructor<Component<{}>>;
declare const isElement: (x: unknown) => x is HTMLElement;
declare const isError: (x: unknown) => x is Error;
declare const isFunction: (x: unknown) => x is (...args: unknown[]) => unknown;
declare const isNil: (x: unknown) => x is null | undefined;
declare const isNode: (x: unknown) => x is Node;
declare const isNumber: (x: unknown) => x is number;
declare const isObservable: <T>(x: T | Observable<T>) => x is Observable<T>;
declare const isPropertyNonDimensional: (property: string) => boolean;
declare const isString: (x: unknown) => x is string;
declare const isText: (x: unknown) => x is Text;
export { castArray, castError, identity, indexOf, isAlphanumeric, isArray, isBoolean, isComment, isComponent, isElement, isError, isFunction, isNil, isNode, isNumber, isObservable, isPropertyNonDimensional, isString, isText };
