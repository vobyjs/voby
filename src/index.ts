
//TODO: Ensure that aria-* labels are set properly, they may work specially with regards to boolean values
//TODO: Ensure that tabIndex/download/etc. attributes work properly. e.g. ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
//TODO: htmlFor/for etc.

//TODO: Implement Switch (maybe)
//TODO: Implement Ternary

//TODO: Implement jsx entrypoints for TS
//TODO: Capture events

//TODO: Use "key" properly
//TODO: Implement context

//TODO: Support SVG
//TODO: Implement rendering to a string

/* IMPORT */

import './jsx';
import {Component, ErrorBoundary, For, Fragment, If, Portal} from './components';
import {useCleanup, useComputed, useDisposed, useEffect, useError, usePromise} from './hooks';
import createElement from './create_element';
import {$, $$} from './observable';
import render from './render';
import styled from './styled';
import template from './template';

/* EXPORT */

export {Component, ErrorBoundary, For, Fragment, If, Portal};
export {useCleanup, useComputed, useDisposed, useEffect, useError, usePromise};
export {$, $$, createElement, render, styled, template};
