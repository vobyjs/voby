"use strict";
/* IMPORT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_cleanup_1 = __importDefault(require("~/hooks/use_cleanup"));
const observable_1 = require("~/observable");
/* MAIN */
const useDisposed = () => {
    const disposed = (0, observable_1.$)(false);
    (0, use_cleanup_1.default)(() => disposed(true));
    return disposed;
};
/* EXPORT */
exports.default = useDisposed;
