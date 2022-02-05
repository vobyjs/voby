"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("~/observable");
/* MAIN */
const For = ({ values, children }) => {
    const cache = new WeakMap();
    return observable_1.$.computed(() => {
        return (0, observable_1.$$)(values).map(value => {
            return observable_1.$.computed(() => {
                const key = (0, observable_1.$$)(value);
                const cached = cache.get(key);
                if (cached)
                    return cached;
                const result = children[0](value)();
                cache.set(key, result);
                return result;
            });
        });
    });
};
/* EXPORT */
exports.default = For;
