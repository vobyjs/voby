"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.render = exports.createElement = exports.$$ = exports.$ = exports.usePromise = exports.useObservable = exports.useFrom = exports.useError = exports.useEffect = exports.useDisposed = exports.useComputed = exports.useCleanup = exports.Portal = exports.If = exports.Fragment = exports.For = exports.ErrorBoundary = exports.Component = void 0;
/* IMPORT */
const components_1 = require("./components");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return components_1.Component; } });
Object.defineProperty(exports, "ErrorBoundary", { enumerable: true, get: function () { return components_1.ErrorBoundary; } });
Object.defineProperty(exports, "For", { enumerable: true, get: function () { return components_1.For; } });
Object.defineProperty(exports, "Fragment", { enumerable: true, get: function () { return components_1.Fragment; } });
Object.defineProperty(exports, "If", { enumerable: true, get: function () { return components_1.If; } });
Object.defineProperty(exports, "Portal", { enumerable: true, get: function () { return components_1.Portal; } });
const hooks_1 = require("./hooks");
Object.defineProperty(exports, "useCleanup", { enumerable: true, get: function () { return hooks_1.useCleanup; } });
Object.defineProperty(exports, "useComputed", { enumerable: true, get: function () { return hooks_1.useComputed; } });
Object.defineProperty(exports, "useDisposed", { enumerable: true, get: function () { return hooks_1.useDisposed; } });
Object.defineProperty(exports, "useEffect", { enumerable: true, get: function () { return hooks_1.useEffect; } });
Object.defineProperty(exports, "useError", { enumerable: true, get: function () { return hooks_1.useError; } });
Object.defineProperty(exports, "useFrom", { enumerable: true, get: function () { return hooks_1.useFrom; } });
Object.defineProperty(exports, "useObservable", { enumerable: true, get: function () { return hooks_1.useObservable; } });
Object.defineProperty(exports, "usePromise", { enumerable: true, get: function () { return hooks_1.usePromise; } });
const create_element_1 = __importDefault(require("./create_element"));
exports.createElement = create_element_1.default;
const observable_1 = require("./observable");
Object.defineProperty(exports, "$", { enumerable: true, get: function () { return observable_1.$; } });
Object.defineProperty(exports, "$$", { enumerable: true, get: function () { return observable_1.$$; } });
const render_1 = __importDefault(require("./render"));
exports.render = render_1.default;
const template_1 = __importDefault(require("./template"));
exports.template = template_1.default;
