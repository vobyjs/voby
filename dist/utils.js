"use strict";
/* IMPORT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isText = exports.isString = exports.isPropertyNonDimensional = exports.isObservable = exports.isNumber = exports.isNode = exports.isNil = exports.isFunction = exports.isError = exports.isElement = exports.isComponent = exports.isComment = exports.isBoolean = exports.isArray = exports.isAlphanumeric = exports.indexOf = exports.identity = exports.castError = exports.castArray = void 0;
const component_1 = __importDefault(require("~/components/component"));
const observable_1 = require("~/observable");
/* MAIN */
const castArray = (x) => {
    return isArray(x) ? x : [x];
};
exports.castArray = castArray;
const castError = (exception) => {
    if (isError(exception))
        return exception;
    if (isString(exception))
        return new Error(exception);
    return new Error('Unknown error');
};
exports.castError = castError;
const identity = (x) => {
    return x;
};
exports.identity = identity;
const indexOf = (arr, value) => {
    return Array.prototype.indexOf.call(arr, value);
};
exports.indexOf = indexOf;
const isAlphanumeric = (x) => {
    return /^[a-z0-9]+$/i.test(x);
};
exports.isAlphanumeric = isAlphanumeric;
const isArray = (x) => {
    return Array.isArray(x);
};
exports.isArray = isArray;
const isBoolean = (x) => {
    return typeof x === 'boolean';
};
exports.isBoolean = isBoolean;
const isComment = (x) => {
    return x !== null && typeof x === 'object' && x['nodeType'] === 8;
};
exports.isComment = isComment;
const isComponent = (x) => {
    return isFunction(x) && component_1.default.isPrototypeOf(x);
};
exports.isComponent = isComponent;
const isElement = (x) => {
    return x instanceof HTMLElement;
};
exports.isElement = isElement;
const isError = (x) => {
    return x instanceof Error;
};
exports.isError = isError;
const isFunction = (x) => {
    return typeof x === 'function';
};
exports.isFunction = isFunction;
const isNil = (x) => {
    return x === null || x === undefined;
};
exports.isNil = isNil;
const isNode = (x) => {
    return x !== null && typeof x === 'object' && isNumber(x['nodeType']);
};
exports.isNode = isNode;
const isNumber = (x) => {
    return typeof x === 'number';
};
exports.isNumber = isNumber;
const isObservable = (x) => {
    return observable_1.$.is(x);
};
exports.isObservable = isObservable;
const isPropertyNonDimensional = (() => {
    const nonDimensionalRe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
    return (property) => {
        return nonDimensionalRe.test(property);
    };
})();
exports.isPropertyNonDimensional = isPropertyNonDimensional;
const isString = (x) => {
    return typeof x === 'string';
};
exports.isString = isString;
const isText = (x) => {
    return x !== null && typeof x === 'object' && x['nodeType'] === 3;
};
exports.isText = isText;
