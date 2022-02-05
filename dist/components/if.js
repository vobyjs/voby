"use strict";
/* IMPORT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_computed_1 = __importDefault(require("~/hooks/use_computed"));
const utils_1 = require("~/utils");
/* MAIN */
const If = ({ when, children }) => {
    if ((0, utils_1.isObservable)(when)) {
        return (0, use_computed_1.default)(() => {
            if (when())
                return children;
            return null;
        });
    }
    else {
        if (when)
            return children;
        return null;
    }
};
/* EXPORT */
exports.default = If;
