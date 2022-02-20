
//TODO: Implement JSX entrypoints for TS
//TODO: Implement "key" support
//TODO: Implement context support
//TODO: Implement SVG support

/* IMPORT */

import './jsx/types';
import {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary} from './components';
import {useCleanup, useComputed, useDisposed, useEffect, useError, useInterval, usePromise, useTimeout} from './hooks';
import createElement from './create_element';
import {$, $$} from './observable';
import render from './render';
import renderToString from './render_to_string';
import styled from './styled';
import template from './template';

/* EXPORT */

export {Component, ErrorBoundary, For, Fragment, If, Portal, Switch, Ternary};
export {useCleanup, useComputed, useDisposed, useEffect, useError, useInterval, usePromise, useTimeout};
export {$, $$, createElement, render, renderToString, styled, template};
