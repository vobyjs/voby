
//TODO: Check that className and css don't conflict, and in general check that other similar problems are handled
//TODO: Replace some isObservable checks with isFunction checks
//TODO: Implement context support
//TODO: Implement "key" support

/* IMPORT */

import './jsx/types';
import type {Observable, ObservableReadonly, ObservableMaybe, ObservableRecordMaybe, FetchState, PromiseState} from './types';
import {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary} from './components';
import {useAbortController, useAnimationFrame, useAnimationLoop, useCleanup, useComputed, useDisposed, useEffect, useError, useFetch, useFrom, useIdleCallback, useIdleLoop, useInterval, usePromise, useTimeout} from './hooks';
import createElement from './create_element';
import isObservable from './is_observable';
import {$, $$} from './observable';
import render from './render';
import renderToString from './render_to_string';
import styled from './styled';
import svg from './svg';
import template from './template';

/* EXPORT */

export type {Observable, ObservableReadonly, ObservableMaybe, ObservableRecordMaybe, ObservableMaybe as O, ObservableRecordMaybe as OO, FetchState, PromiseState};
export {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary};
export {useAbortController, useAnimationFrame, useAnimationLoop, useCleanup, useComputed, useDisposed, useEffect, useError, useFetch, useFrom, useIdleCallback, useIdleLoop, useInterval, usePromise, useTimeout};
export {$, $$, createElement, isObservable, render, renderToString, styled, svg, template};
