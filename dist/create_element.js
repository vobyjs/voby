"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const setters_1 = require("~/setters");
const utils_1 = require("~/utils");
/* MAIN */
const createElement = (type, props, ...children) => {
    return () => {
        const { children: _, key, ref, ...rest } = props || {};
        children = (0, setters_1.normalizeChildren)(children);
        props = { ...rest, children };
        if ((0, utils_1.isElement)(type)) {
            return type;
        }
        else if ((0, utils_1.isComponent)(type)) {
            const instance = new type();
            const element = instance.render(props);
            return element;
        }
        else if ((0, utils_1.isFunction)(type)) {
            const element = type(props);
            return element;
        }
        else if ((0, utils_1.isString)(type)) {
            const element = document.createElement(type);
            (0, setters_1.setProps)(element, props);
            return element;
        }
    };
};
/* EXPORT */
exports.default = createElement;
