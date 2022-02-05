"use strict";
/* IMPORT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_element_1 = __importDefault(require("~/create_element"));
const observable_1 = require("~/observable");
const use_computed_1 = __importDefault(require("~/hooks/use_computed"));
const use_error_1 = __importDefault(require("~/hooks/use_error"));
const utils_1 = require("~/utils");
/* MAIN */
const ErrorBoundary = ({ fallback, children }) => {
    const exception = (0, observable_1.$)();
    const hasException = (0, observable_1.$)(false);
    return (0, use_computed_1.default)(() => {
        if (hasException()) {
            const error = (0, utils_1.castError)(exception.sample());
            const reset = () => hasException(false);
            return (0, create_element_1.default)(fallback, { error, reset });
        }
        else {
            (0, use_error_1.default)(err => {
                exception(err);
                hasException(true);
            });
            return children[0]()();
        }
    });
};
/* EXPORT */
exports.default = ErrorBoundary;
