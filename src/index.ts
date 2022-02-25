
//TODO: Check that className and class don't conflict, and in general check that other similar problems are handled
//TODO: Implement context support
//TODO: add sample and batch functions (maybe others?)

/* IMPORT */

import './jsx/types';
import type {Observable, ObservableWithoutInitial, ObservableReadonly, ObservableReadonlyWithoutInitial, ObservableMaybe, ObservableRecordMaybe, FetchState, PromiseState, Resolvable} from './types';
import {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary} from './components';
import {useAbortController, useAnimationFrame, useAnimationLoop, useCleanup, useComputed, useDisposed, useEffect, useError, useFetch, useFrom, useIdleCallback, useIdleLoop, useInterval, usePromise, useResolved, useRoot, useTimeout} from './hooks';
import batch from './batch';
import createElement from './create_element';
import isObservable from './is_observable';
import {$, $$} from './observable';
import render from './render';
import renderToString from './render_to_string';
import sample from './sample';
import styled from './styled';
import svg from './svg';
import template from './template';

/* EXPORT */

export type {Observable, ObservableWithoutInitial, ObservableReadonly, ObservableReadonlyWithoutInitial, ObservableMaybe, ObservableRecordMaybe, ObservableMaybe as O, ObservableRecordMaybe as OO, FetchState, PromiseState, Resolvable};
export {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary};
export {useAbortController, useAnimationFrame, useAnimationLoop, useCleanup, useComputed, useDisposed, useEffect, useError, useFetch, useFrom, useIdleCallback, useIdleLoop, useInterval, usePromise, useResolved, useRoot, useTimeout};
export {$, $$, batch, createElement, isObservable, render, renderToString, sample, styled, svg, template};
