
//TODO: Implement Switch (maybe)
//TODO: Implement Ternary
//TODO: Implement jsx entrypoints for TS
//TODO: Capture events
//TODO: Use "key" properly
//TODO: Implement context
//TODO: Support SVG

/* IMPORT */

import './jsx';
import {Component, ErrorBoundary, For, Fragment, If, Portal} from './components';
import {useCleanup, useComputed, useDisposed, useEffect, useError, usePromise} from './hooks';
import createElement from './create_element';
import {$, $$} from './observable';
import render from './render';
import renderToString from './render_to_string';
import styled from './styled';
import template from './template';

/* EXPORT */

export {Component, ErrorBoundary, For, Fragment, If, Portal};
export {useCleanup, useComputed, useDisposed, useEffect, useError, usePromise};
export {$, $$, createElement, render, renderToString, styled, template};
