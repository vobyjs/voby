"use strict";
/* IMPORT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const use_cleanup_1 = __importDefault(require("~/hooks/use_cleanup"));
const render_1 = __importDefault(require("~/render"));
/* MAIN */
const Portal = ({ mount, children }) => {
    const anchor = mount || document.body;
    const container = document.createElement('div');
    anchor.insertBefore(container, null);
    (0, render_1.default)(children[0], container);
    (0, use_cleanup_1.default)(() => {
        anchor.removeChild(container);
    });
    return null;
};
/* EXPORT */
exports.default = Portal;
