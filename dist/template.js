"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const setters_1 = require("~/setters");
const utils_1 = require("~/utils");
/* HELPERS */
const SYMBOL_PROPERTY_ACCESSOR = Symbol();
/* MAIN */
//TODO: Implement predictive pre-rendering
const template = (fn) => {
    const checkValidProperty = (property) => {
        if ((0, utils_1.isString)(property) && (0, utils_1.isAlphanumeric)(property))
            return true;
        throw new Error(`Only alphanumeric properties can be used when using templates, received: "${property}"`);
    };
    const makeAccessor = (actionsWithElements) => {
        return new Proxy({}, {
            get(target, key) {
                checkValidProperty(key);
                const accessor = (element, prop, targetElement) => {
                    checkValidProperty(prop);
                    actionsWithElements.push([element, prop, key, targetElement]);
                };
                accessor[SYMBOL_PROPERTY_ACCESSOR] = true;
                return accessor;
            }
        });
    };
    const makeActionsWithElementsAndTemplate = () => {
        const actionsWithElements = [];
        const accessor = makeAccessor(actionsWithElements);
        const template = fn(accessor)();
        return { actionsWithElements, template };
    };
    const makeActionsWithPaths = (actionsWithElements) => {
        const actionsWithPaths = [];
        for (let i = 0, l = actionsWithElements.length; i < l; i++) {
            const [element, prop, key, targetElement] = actionsWithElements[i];
            const elementPath = makeElementPath(element);
            const targetElementPath = targetElement ? makeElementPath(targetElement) : undefined;
            actionsWithPaths.push([elementPath, prop, key, targetElementPath]);
        }
        return actionsWithPaths;
    };
    const makeElementPath = (() => {
        let prevElement = null;
        let prevPath;
        return (element) => {
            if (element === prevElement)
                return prevPath; // Cache hit
            const path = [];
            let child = element;
            let parent = child.parentElement;
            while (parent) {
                const index = (0, utils_1.indexOf)(parent.childNodes, child);
                path.push(index);
                child = parent;
                parent = parent.parentElement;
            }
            prevElement = element;
            prevPath = path;
            return path;
        };
    })();
    const makeReviverActions = (actionsWithPaths) => {
        const actions = [];
        for (let i = 0, l = actionsWithPaths.length; i < l; i++) {
            const [elementPath, prop, key, targetElementPath] = actionsWithPaths[i];
            if (targetElementPath) {
                if (targetElementPath.length) {
                    actions.push(`this.replaceChild ( props["${key}"], root.${targetElementPath.map(index => (index === 0) ? 'firstChild' : `childNodes[${index}]`).reverse().join('.')} );`);
                }
                else {
                    actions.push(`this.replaceChild ( props["${key}"], root );`);
                }
            }
            else {
                if (elementPath.length) {
                    actions.push(`this.setProp ( root.${elementPath.map(index => (index === 0) ? 'firstChild' : `childNodes[${index}]`).reverse().join('.')}, "${prop}", props["${key}"] );`);
                }
                else {
                    actions.push(`this.setProp ( root, "${prop}", props["${key}"] );`);
                }
            }
        }
        return actions;
    };
    const makeReviver = (actionsWithPaths) => {
        const actions = makeReviverActions(actionsWithPaths);
        const fn = new Function('root', 'props', `${actions.join('')}return root;`);
        const apis = { replaceChild: setters_1.replaceChild, setProp: setters_1.setProp };
        return fn.bind(apis);
    };
    // const makeClone = (() => {
    //   const stash: HTMLElement[] = [];
    //   return (template) => {
    //     if ( !stash.length ) {
    //       for ( let i = 0, l = 100000; i < l; i++ ) {
    //         stash.push ( template.cloneNode ( true ) );
    //       }
    //     }
    //     return stash.pop ();
    //   }
    // })();
    const makeComponent = () => {
        const { actionsWithElements, template } = makeActionsWithElementsAndTemplate();
        const actionsWithPaths = makeActionsWithPaths(actionsWithElements);
        const reviver = makeReviver(actionsWithPaths);
        return (props) => {
            return () => {
                // const root = makeClone ( template );
                const root = template.cloneNode(true); //TSC
                return reviver(root, props);
            };
        };
    };
    return makeComponent();
};
/* UTILITIES */
template.isProxy = (x) => (0, utils_1.isFunction)(x) && x.hasOwnProperty(SYMBOL_PROPERTY_ACCESSOR);
/* EXPORT */
exports.default = template;
