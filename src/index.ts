
//TODO: Check that className and css don't conflict
//TODO: Implement context support
//TODO: Implement "key" support

/* IMPORT */

import './jsx/types';
import type {Observable, ObservableMaybe, ObservableRecordMaybe, PromiseState} from './types';
import {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary} from './components';
import {useCleanup, useComputed, useDisposed, useEffect, useError, useFrom, useInterval, usePromise, useTimeout} from './hooks';
import createElement from './create_element';
import isObservable from './is_observable';
import {$, $$} from './observable';
import render from './render';
import renderToString from './render_to_string';
import styled from './styled';
import svg from './svg';
import template from './template';

/* EXPORT */

export type {Observable, ObservableMaybe, ObservableRecordMaybe, ObservableMaybe as O, ObservableRecordMaybe as OO, PromiseState};
export {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary};
export {useCleanup, useComputed, useDisposed, useEffect, useError, useFrom, useInterval, usePromise, useTimeout};
export {$, $$, createElement, isObservable, render, renderToString, styled, svg, template};
