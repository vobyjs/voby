"use strict";
/* IMPORT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_disposed_1 = __importDefault(require("~/hooks/use_disposed"));
const use_effect_1 = __importDefault(require("~/hooks/use_effect"));
const observable_1 = require("~/observable");
const utils_1 = require("~/utils");
/* MAIN */
const usePromise = (promise) => {
    const state = (0, observable_1.$)({ loading: true });
    (0, use_effect_1.default)(() => {
        const disposed = (0, use_disposed_1.default)();
        state({ loading: true });
        const onResolve = (value) => {
            if (disposed())
                return;
            state({ loading: false, value });
        };
        const onReject = (exception) => {
            if (disposed())
                return;
            const error = (0, utils_1.castError)(exception);
            state({ loading: false, error });
        };
        (0, observable_1.$$)(promise).then(onResolve, onReject);
    });
    return state;
};
/* EXPORT */
exports.default = usePromise;
