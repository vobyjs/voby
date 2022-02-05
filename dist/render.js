"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("~/observable");
const setters_1 = require("~/setters");
const utils_1 = require("~/utils");
/* MAIN */
const render = (element, parent) => {
    let dispose;
    observable_1.$.root(disposeRoot => {
        dispose = disposeRoot;
        const children = (0, setters_1.normalizeChildren)((0, utils_1.castArray)(element()));
        (0, setters_1.setChildren)(parent, children);
    });
    return () => {
        dispose();
        parent.textContent = ''; //TODO: Preserve pre-existing nodes instead
    };
};
/* EXPORT */
exports.default = render;
