"use strict";
/* IMPORT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProps = exports.setProp = exports.setStyles = exports.setStylesStatic = exports.setStyle = exports.setStyleStatic = exports.setProperty = exports.setPropertyStatic = exports.setHTML = exports.setHTMLStatic = exports.setClasses = exports.setClassesStatic = exports.setClass = exports.setClassStatic = exports.setChildren = exports.setChild = exports.setChildStatic = exports.replaceChild = exports.setAttribute = exports.setAttributeStatic = exports.setAbstract = exports.prepareChild = exports.prepareChildren = exports.normalizeChildren = void 0;
const observable_1 = require("~/observable");
const template_1 = __importDefault(require("~/template"));
const utils_1 = require("~/utils");
/* HELPERS */
const resolveObservable = (fn) => {
    const value = fn();
    if (!(0, utils_1.isObservable)(value))
        return value;
    return resolveObservable(value);
};
const normalizeChildren = (children) => {
    // It flattes the array and removes nil and boolean values, quickly
    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        if ((0, utils_1.isNil)(child) || (0, utils_1.isBoolean)(child)) {
            children.splice(i, 1);
        }
        else if ((0, utils_1.isArray)(child)) {
            for (let ci = child.length - 1; ci >= 0; ci--) {
                const childChild = child[ci];
                if ((0, utils_1.isNil)(childChild) || (0, utils_1.isBoolean)(childChild)) {
                    child.splice(ci, 1);
                }
            }
            children.splice(i, 1, ...child);
        }
    }
    return children;
};
exports.normalizeChildren = normalizeChildren;
const prepareChildren = (children) => {
    children = normalizeChildren(children);
    if (children.length === 0)
        return null;
    if (children.length === 1)
        return prepareChild(children[0]);
    for (let i = children.length - 1; i >= 0; i--) {
        children[i] = prepareChild(children[i]);
    }
    return children;
};
exports.prepareChildren = prepareChildren;
const prepareChild = (child) => {
    if ((0, utils_1.isNil)(child))
        return null;
    if ((0, utils_1.isBoolean)(child))
        return null;
    if ((0, utils_1.isNode)(child))
        return child;
    if ((0, utils_1.isObservable)(child))
        return child;
    if ((0, utils_1.isFunction)(child))
        return prepareChild(child());
    if ((0, utils_1.isArray)(child)) {
        if (child.length === 0)
            return null;
        if (child.length === 1)
            return prepareChild(child[0]);
        return prepareChildren(child);
    }
    return String(child);
};
exports.prepareChild = prepareChild;
const removeChildren = (parent, children) => {
    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        if ((0, utils_1.isArray)(child)) {
            removeChildren(parent, child);
        }
        else if ((0, utils_1.isNode)(child)) {
            parent.removeChild(child);
        }
    }
};
/* MAIN */
const setAbstract = (value, setter) => {
    if ((0, utils_1.isObservable)(value)) {
        let valuePrev;
        observable_1.$.effect(() => {
            const valueNext = resolveObservable(value);
            setter(valueNext, valuePrev);
            valuePrev = valueNext;
        });
    }
    else {
        setter(value);
    }
};
exports.setAbstract = setAbstract;
const setAttributeStatic = (attributes, key, value) => {
    const attr = attributes.getNamedItem(key);
    if ((0, utils_1.isNil)(value) || (0, utils_1.isFunction)(value) || value === false) {
        if (attr) {
            attributes.removeNamedItem(key);
        }
    }
    else {
        value = (value === true) ? '' : String(value);
        if (attr) {
            attr.value = value;
        }
        else {
            const attr = document.createAttribute(key);
            attr.value = value;
            attributes.setNamedItem(attr);
        }
    }
};
exports.setAttributeStatic = setAttributeStatic;
const setAttribute = (element, key, value) => {
    const { attributes } = element;
    setAbstract(value, value => {
        setAttributeStatic(attributes, key, value);
    });
};
exports.setAttribute = setAttribute;
const replaceChild = (child, childPrev) => {
    if ((0, utils_1.isString)(child) && (0, utils_1.isText)(childPrev)) {
        childPrev.data = child;
    }
    else {
        const parent = childPrev.parentElement; //TSC
        setChild(parent, child, [childPrev]);
    }
};
exports.replaceChild = replaceChild;
const setChildStatic = (parent, child, childrenPrev) => {
    //TODO: Optimize this massively, after it works reliably, currently it may not quite work and it certainly has terrible performance
    //TODO: This function should trigger onMount/onUnmount hooks somehow, and/or update refs
    //URL: https://github.com/adamhaile/surplus/blob/2aca5a36ceb6a7cbb4d609cd04ee631714602f91/src/runtime/content.ts
    //URL: https://github.com/adamhaile/surplus/blob/2aca5a36ceb6a7cbb4d609cd04ee631714602f91/src/runtime/insert.ts
    //URL: https://github.com/luwes/sinuous/blob/master/packages/sinuous/h/src/h.js
    //URL: https://github.com/ryansolid/dom-expressions/blob/main/packages/dom-expressions/src/client.js
    if (childrenPrev.length === 0 && template_1.default.isProxy(child)) { // Template proxy function
        const placeholder = new Text();
        parent.insertBefore(placeholder, null);
        child(parent, 'child', placeholder);
        return [placeholder];
    }
    else if ((0, utils_1.isFunction)(child) && !(0, utils_1.isObservable)(child)) { // Function child
        return setChildStatic(parent, child(), childrenPrev);
    }
    else { // Regular child
        const childrenNext = (0, utils_1.castArray)(((0, utils_1.isArray)(child) ? prepareChildren(child) : prepareChild(child)) ?? new Text());
        const afterNode = childrenPrev[childrenPrev.length - 1]?.nextSibling || null;
        removeChildren(parent, childrenPrev);
        for (let i = 0, l = childrenNext.length; i < l; i++) {
            const childNext = childrenNext[i];
            if ((0, utils_1.isObservable)(childNext)) {
                let childrenPrev = [];
                observable_1.$.effect(() => {
                    childrenNext[i] = childrenPrev = setChildStatic(parent, childNext(), childrenPrev);
                });
            }
            else if ((0, utils_1.isFunction)(childNext)) {
                childrenNext[i] = setChild(parent, childNext(), []);
            }
            else if ((0, utils_1.isString)(childNext)) {
                const textNode = new Text(childNext);
                parent.insertBefore(textNode, afterNode);
                childrenNext[i] = textNode;
            }
            else if ((0, utils_1.isNode)(childNext)) {
                parent.insertBefore(childNext, afterNode);
            }
        }
        return childrenNext;
    }
};
exports.setChildStatic = setChildStatic;
const setChild = (parent, child, childrenPrev = []) => {
    setAbstract(child, child => {
        childrenPrev = setChildStatic(parent, child, childrenPrev);
    });
    return childrenPrev;
};
exports.setChild = setChild;
const setChildren = (parent, children) => {
    for (let i = 0, l = children.length; i < l; i++) {
        setChild(parent, children[i]);
    }
};
exports.setChildren = setChildren;
const setClassStatic = (classList, key, value) => {
    classList.toggle(key, value);
};
exports.setClassStatic = setClassStatic;
const setClass = (classList, key, value) => {
    setAbstract(value, value => {
        setClassStatic(classList, key, value);
    });
};
exports.setClass = setClass;
const setClassesStatic = (element, object, objectPrev) => {
    if ((0, utils_1.isString)(object)) {
        element.className = object;
    }
    else {
        const { classList } = element;
        if (objectPrev) {
            if ((0, utils_1.isString)(objectPrev)) {
                element.className = '';
            }
            else {
                for (const key in objectPrev) {
                    if (key in object)
                        continue;
                    setClass(classList, key, false);
                }
            }
        }
        for (const key in object) {
            setClass(classList, key, object[key]);
        }
    }
};
exports.setClassesStatic = setClassesStatic;
const setClasses = (element, object) => {
    setAbstract(object, (object, objectPrev) => {
        setClassesStatic(element, object, objectPrev);
    });
};
exports.setClasses = setClasses;
const setEventStatic = (() => {
    const delegatedEvents = {
        onbeforeinput: '_onbeforeinput',
        onclick: '_onclick',
        ondblclick: '_ondblclick',
        onfocusin: '_onfocusin',
        onfocusout: '_onfocusout',
        oninput: '_oninput',
        onkeydown: '_onkeydown',
        onkeyup: '_onkeyup',
        onmousedown: '_onmousedown',
        // onmousemove: '_onmousemove',
        // onmouseout: '_onmouseout',
        // onmouseover: '_onmouseover',
        onmouseup: '_onmouseup',
        // onpointerdown: '_onpointerdown',
        // onpointermove: '_onpointermove',
        // onpointerout: '_onpointerout',
        // onpointerover: '_onpointerover',
        // onpointerup: '_onpointerup',
        // ontouchend: '_ontouchend',
        // ontouchmove: '_ontouchmove',
        // ontouchstart: '_ontouchstart'
    };
    for (const event in delegatedEvents) {
        const key = delegatedEvents[event];
        document[event] = event => {
            let node = event.composedPath()[0];
            while (node) {
                const handler = node[key];
                if (handler && !node.disabled) {
                    Object.defineProperty(event, 'currentTarget', {
                        configurable: true,
                        get() {
                            return node || document;
                        }
                    });
                    handler(event);
                    if (event.cancelBubble)
                        break;
                }
                node = node.parentNode;
            }
        };
    }
    return (element, event, value) => {
        //TODO: Support capturing events
        if (event in delegatedEvents) {
            element[delegatedEvents[event]] = value;
        }
        else {
            element[event] = value;
        }
    };
})();
const setEvent = (element, event, value) => {
    setAbstract(value, value => {
        setEventStatic(element, event, value);
    });
};
const setHTMLStatic = (element, value) => {
    element.innerHTML = String(value ?? '');
};
exports.setHTMLStatic = setHTMLStatic;
const setHTML = (element, value) => {
    setAbstract(value, value => {
        setAbstract(value.__html, html => {
            setHTMLStatic(element, html);
        });
    });
};
exports.setHTML = setHTML;
const setPropertyStatic = (element, key, value) => {
    value = (key === 'className') ? (value ?? '') : value;
    element[key] = value;
};
exports.setPropertyStatic = setPropertyStatic;
const setProperty = (element, key, value) => {
    setAbstract(value, value => {
        setPropertyStatic(element, key, value);
    });
};
exports.setProperty = setProperty;
const setStyleStatic = (style, key, value) => {
    if (key === 'cssText') {
        style.cssText = String(value ?? '');
    }
    else if (key.charCodeAt(0) === 45) { // -*
        style.setProperty(key, String(value));
    }
    else if ((0, utils_1.isNil)(value)) {
        style[key] = null;
    }
    else {
        style[key] = ((0, utils_1.isString)(value) || (0, utils_1.isPropertyNonDimensional)(key) ? value : `${value}px`);
    }
};
exports.setStyleStatic = setStyleStatic;
const setStyle = (style, key, value) => {
    setAbstract(value, value => {
        setStyleStatic(style, key, value);
    });
};
exports.setStyle = setStyle;
const setStylesStatic = (style, object, objectPrev) => {
    if ((0, utils_1.isString)(object)) {
        style.cssText = object;
    }
    else {
        if (objectPrev) {
            if ((0, utils_1.isString)(objectPrev)) {
                style.cssText = '';
            }
            else {
                for (const key in objectPrev) {
                    if (key in object)
                        continue;
                    setStyleStatic(style, key, null);
                }
            }
        }
        for (const key in object) {
            setStyle(style, key, object[key]);
        }
    }
};
exports.setStylesStatic = setStylesStatic;
const setStyles = (element, object) => {
    const { style } = element;
    setAbstract(object, (object, objectPrev) => {
        setStylesStatic(style, object, objectPrev);
    });
};
exports.setStyles = setStyles;
const setProp = (element, key, value) => {
    if (template_1.default.isProxy(value)) {
        value(element, key);
    }
    else if (key === 'children') {
        setChildren(element, value);
    }
    else if (key === 'style') {
        setStyles(element, value);
    }
    else if (key === 'class') {
        setClasses(element, value);
    }
    else if (key === 'innerHTML' || key === 'outerHTML' || key === 'textContent') {
        // Forbidden prop
    }
    else if (key === 'dangerouslySetInnerHTML') {
        setHTML(element, value);
    }
    else if ((key.charCodeAt(0) === 111 || key.charCodeAt(0) === 79) && (key.charCodeAt(1) === 110 || key.charCodeAt(1) === 78)) { // /^on/i
        setEvent(element, key.toLowerCase(), value);
    }
    else if (key in element) {
        setProperty(element, key, value);
    }
    else {
        setAttribute(element, key, value);
    }
};
exports.setProp = setProp;
const setProps = (element, object) => {
    for (const key in object) {
        setProp(element, key, object[key]);
    }
};
exports.setProps = setProps;
