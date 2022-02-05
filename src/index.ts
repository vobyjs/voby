
//TODO: Implement onMount/onUnmount hooks
//TODO: Implement a "ref" function
//TODO: Implement something like styled components
//TODO: Use "ref" properly
//TODO: Use "key" properly
//TODO: Implement context
//TODO: Add proper types
//TODO: Ensure that aria-* labels are set properly, they may work specially with regards to boolean values // booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
//TODO: Ensure that tabIndex/download/etc. attributes work properly
//TODO: Implement jsx entrypoints for TS
//TODO: Implement rendering to a string
//TODO: Support svgs, maybes
//TODO: htmlFor/for etc.
//WEIRD (the ref looks like its never assigned to): https://playground.solidjs.com/?hash=-2143200221&version=1.3.3

/* IMPORT */

import {Component, ErrorBoundary, For, Fragment, If, Portal} from './components';
import {useCleanup, useComputed, useDisposed, useEffect, useError, useFrom, useObservable, usePromise} from './hooks';
import createElement from './create_element';
import {$, $$} from './observable';
import render from './render';
import template from './template';

/* EXPORT */

export {Component, ErrorBoundary, For, Fragment, If, Portal};
export {useCleanup, useComputed, useDisposed, useEffect, useError, useFrom, useObservable, usePromise};
export {$, $$, createElement, render, template};
