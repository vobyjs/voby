
/* IMPORT */

import diff from 'tiny-diff';
import type {Child, ChildResolved, EventListener, ObservableResolver, Ref} from './types';
import useEffect from './hooks/use_effect';
import {castArray, isArray, isFunction, isNil, isObservable, isString, isTemplateActionProxy, keys} from './utils';

//TODO: Support functions as values that get wrapped in an automatic effect

/* HELPERS */

const resolveChild = ( child: Child ): ChildResolved => { //TODO: this function should probably be removed 🤔

  if ( isFunction ( child ) ) return resolveChild ( child () );

  if ( isArray ( child ) ) {

    const childResolved: ChildResolved[] = new Array ( child.length );

    for ( let i = 0, l = child.length; i < l; i++ ) {

      childResolved[i] = resolveChild ( child[i] );

    }

    return childResolved;

  }

  return child;

};

/* MAIN */

const setAbstract = <T> ( value: ObservableResolver<T>, setter: (( value: T, valuePrev?: T ) => void), resolveFunctions: boolean = false ): void => {

  if ( isObservable ( value ) ) {

    let valuePrev: T | undefined;

    useEffect ( () => {

      const valueNext = value ();

      if ( isObservable ( valueNext ) ) {

        setAbstract ( valueNext, setter, resolveFunctions );

      } else {

        setter ( valueNext, valuePrev );

        valuePrev = valueNext;

      }

    });

  } else if ( resolveFunctions && isFunction ( value ) ) {

    setAbstract ( value (), setter, resolveFunctions ); //TODO: Should this be wrapped in a useEffect?

  } else {

    setter ( value );

  }

};

const setAttributeStatic = ( attributes: NamedNodeMap, key: string, value: null | undefined | boolean | number | string ): void => {

  const attr = attributes.getNamedItem ( key );

  if ( isNil ( value ) || isFunction ( value ) || value === false ) {

    if ( attr ) {

      attributes.removeNamedItem ( key );

    }

  } else {

    value = ( value === true ) ? '' : String ( value );

    if ( attr ) {

      attr.value = value;

    } else {

      const attr = document.createAttribute ( key );

      attr.value = value;

      attributes.setNamedItem ( attr );

    }

  }

};

const setAttribute = ( element: HTMLElement, key: string, value: ObservableResolver<null | undefined | boolean | number | string> ): void => {

  const {attributes} = element;

  setAbstract ( value, value => {

    setAttributeStatic ( attributes, key, value );

  });

};

const setChildReplacement = ( child: Child, childPrev: Node ): void => {

  const type = typeof child;

  if ( type === 'string' || type === 'number' || type === 'bigint' ) {

    const value = String ( child );

    if ( childPrev.nodeType === 3 ) {

      if ( childPrev.nodeValue !== value ) {

        childPrev.nodeValue = value;

      }

    } else {

      const parent = childPrev.parentElement;

      if ( !parent ) throw new Error ( 'Invalid child replacement' );

      const textNode = new Text ( value );

      parent.replaceChild ( textNode, childPrev );

    }

  } else {

    const parent = childPrev.parentElement;

    if ( !parent ) throw new Error ( 'Invalid child replacement' );

    setChild ( parent, child, [childPrev] );

  }

};

const setChildStatic = (() => { //FIXME: This function is most probably buggy in some way, it should be tested extensively, clearing doesn't work //TODO: Optimize this further, until it's comparable with Solid

  const cache = new WeakMap ();

  return ( parent: HTMLElement, child: Child, childrenPrev: Node[], childrenPrevSibling: Node | null = null ): Node[] => {

    if ( childrenPrev.length === 1 && childrenPrev[0].nodeType === 3 ) { // Simple text child shortcut

      const type = typeof child;

      if ( type === 'string' || type === 'number' || type === 'bigint' ) {

        const value = String ( child );

        if ( childrenPrev[0].nodeValue !== value ) {

          childrenPrev[0].nodeValue = value;

        }

        return childrenPrev;

      }

    }

    const next: Node[] = [];
    const nextSibling = childrenPrev[childrenPrev.length - 1]?.nextSibling || childrenPrevSibling;

    const children: Node[] = castArray ( child ).flat ( Infinity ); //TSC

    for ( let i = 0, l = children.length; i < l; i++ ) {

      const child = children[i];
      const type = typeof child;

      if ( type === 'string' || type === 'number' || type === 'bigint' ) {

        next.push ( new Text ( String ( child ) ) );

      } else if ( type === 'object' && child !== null && typeof child.nodeType === 'number' ) {

        next.push ( child );

      } else if ( type === 'function' ) {

        let prev: Node[] = [];

        setAbstract ( child, childResolved => {

          prev = cache.get ( child ) || prev;

          prev = setChildStatic ( parent, childResolved, prev, nextSibling );

          cache.set ( child, prev );

          next.push.apply ( next, prev );

        }, true );

      }

    }

    if ( !next.length && childrenPrev.length === 1 && childrenPrev[0].nodeType === 8 ) { // It's a comment already

      return childrenPrev;

    }

    if ( !next.length && parent.childNodes.length === childrenPrev.length ) { // Fast path for removing all children

      parent.textContent = '';

      childrenPrev = [];

    }

    if ( !next.length ) { // Placeholder, to keep the right spot in the array of children

      next[0] = new Comment ();

    }

    diff ( parent, childrenPrev, next, nextSibling );

    return next;

  };

})();

const setChild = ( parent: HTMLElement, child: Child, childrenPrev: Node[] = [], childrenPrevSibling: Node | null = null ): void => {

  setAbstract ( child, child => {

    childrenPrev = setChildStatic ( parent, child, childrenPrev, childrenPrevSibling );

  });

};

const setChildren = ( parent: HTMLElement, children: Child | Child[] ): void => {

  if ( isArray ( children ) ) {

    for ( let i = 0, l = children.length; i < l; i++ ) {

      setChild ( parent, children[i] );

    }

  } else {

    setChild ( parent, children );

  }

};

const setClassStatic = ( classList: DOMTokenList, key: string, value: null | undefined | boolean ): void => {

  classList.toggle ( key, !!value );

};

const setClass = ( classList: DOMTokenList, key: string, value: ObservableResolver<null | undefined | boolean> ): void => {

  setAbstract ( value, value => {

    setClassStatic ( classList, key, value );

  });

};

const setClassesStatic = ( element: HTMLElement, object: string | Record<string, ObservableResolver<null | undefined | boolean>>, objectPrev?: string | Record<string, ObservableResolver<null | undefined | boolean>> ): void => {

  if ( isString ( object ) ) {

    element.className = object;

  } else {

    const {classList} = element;

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        element.className = '';

      } else {

        for ( const key in objectPrev ) {

          if ( key in object ) continue;

          setClass ( classList, key, false );

        }

      }

    }

    for ( const key in object ) {

      setClass ( classList, key, object[key] );

    }

  }

};

const setClasses = ( element: HTMLElement, object: ObservableResolver<string | Record<string, ObservableResolver<null | undefined | boolean>>> ): void => {

  setAbstract ( object, ( object, objectPrev ) => {

    setClassesStatic ( element, object, objectPrev );

  });

};

const setEventStatic = (() => {

  //TODO: Maybe delegate more events (on demand?): [onmousemove, onmouseout, onmouseover, onpointerdown, onpointermove, onpointerout, onpointerover, onpointerup, ontouchend, ontouchmove, ontouchstart]

  const delegatedEvents = <const> {
    onbeforeinput: '_onbeforeinput',
    onclick: '_onclick',
    ondblclick: '_ondblclick',
    onfocusin: '_onfocusin',
    onfocusout: '_onfocusout',
    oninput: '_oninput',
    onkeydown: '_onkeydown',
    onkeyup: '_onkeyup',
    onmousedown: '_onmousedown',
    onmouseup: '_onmouseup'
  };

  for ( const event of keys ( delegatedEvents ) ) {

    const key = delegatedEvents[event];

    document[event] = ( event: Event ): void => {

      const targets = event.composedPath ();
      const target = targets[0] || document;

      Object.defineProperty ( event, 'currentTarget', {
        configurable: true,
        get () {
          return target;
        }
      });

      for ( let i = 0, l = targets.length; i < l; i++ ) {

        const handler = targets[i][key];

        if ( !handler ) continue;

        handler ( event );

        if ( event.cancelBubble ) break;

      }

    };

  }

  return ( element: HTMLElement, event: string, value: null | undefined | EventListener ): void => {

    if ( event.endsWith ( 'capture' ) ) {

      const type = event.slice ( 2, -7 );
      const key = `_${event}`;

      const valuePrev = element[key];

      if ( valuePrev ) element.removeEventListener ( type, valuePrev, { capture: true } );

      if ( value ) element.addEventListener ( type, value, { capture: true } );

      element[key] = value;

    } else {

      const key: string = delegatedEvents[event] || event;

      element[key] = value;

    }

  };

})();

const setEvent = ( element: HTMLElement, event: string, value: ObservableResolver<null | undefined | EventListener> ): void => {

  setAbstract ( value, value => {

    setEventStatic ( element, event, value );

  });

};

const setHTMLStatic = ( element: HTMLElement, value: null | undefined | number | string ): void => {

  element.innerHTML = String ( value ?? '' );

};

const setHTML = ( element: HTMLElement, value: ObservableResolver<{ __html: ObservableResolver<null | undefined | number | string> }> ): void => {

  setAbstract ( value, value => {

    setAbstract ( value.__html, html => {

      setHTMLStatic ( element, html );

    });

  });

};

const setPropertyStatic = ( element: HTMLElement, key: string, value: null | undefined | boolean | number | string ): void => {

  value = ( key === 'className' ) ? ( value ?? '' ) : value;

  element[key] = value;

};

const setProperty = ( element: HTMLElement, key: string, value: ObservableResolver<null | undefined | boolean | number | string> ): void => {

  setAbstract ( value, value => {

    setPropertyStatic ( element, key, value );

  });

};

const setRef = <T> ( element: T, value?: Ref<T> ): void => {

  if ( isNil ( value ) ) return;

  if ( !isFunction ( value ) ) throw new Error ( 'Invalid ref' );

  queueMicrotask ( () => { // Scheduling a microtask to dramatically increase the probability that the element gets mounted in the meantime, which would be more convenient

    value ( element );

  });

};

const setStyleStatic = (() => {

  const propertyNonDimensionalRe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i

  return ( style: CSSStyleDeclaration, key: string, value: null | undefined | number | string ): void => {

    if ( key.charCodeAt ( 0 ) === 45 ) { // /^-/

      style.setProperty ( key, String ( value ) );

    } else if ( isNil ( value ) ) {

      style[key] = null;

    } else {

      style[key] = ( isString ( value ) || propertyNonDimensionalRe.test ( key ) ? value : `${value}px` );

    }

  };

})();

const setStyle = ( style: CSSStyleDeclaration, key: string, value: ObservableResolver<null | undefined | number | string> ): void => {

  setAbstract ( value, value => {

    setStyleStatic ( style, key, value );

  });

};

const setStylesStatic = ( style: CSSStyleDeclaration, object: string | Record<string, ObservableResolver<null | undefined | number | string>>, objectPrev?: string | Record<string, ObservableResolver<null | undefined | number | string>> ): void => {

  if ( isString ( object ) ) {

    style.cssText = object;

  } else {

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        style.cssText = '';

      } else {

        for ( const key in objectPrev ) {

          if ( key in object ) continue;

          setStyleStatic ( style, key, null );

        }

      }

    }

    for ( const key in object ) {

      setStyle ( style, key, object[key] );

    }

  }

};

const setStyles = ( element: HTMLElement, object: ObservableResolver<string | Record<string, ObservableResolver<null | undefined | number | string>>> ): void => {

  const {style} = element;

  setAbstract ( object, ( object, objectPrev ) => {

    setStylesStatic ( style, object, objectPrev );

  });

};

const setProp = ( element: HTMLElement, key: string, value: any ): void => {

  if ( isTemplateActionProxy ( value ) ) {

    if ( key === 'children' ) {

      const placeholder = new Text ();

      element.insertBefore ( placeholder, null );

      value ( element, 'child', placeholder );

    } else {

      value ( element, key );

    }

  } else if ( key === 'children' ) {

    setChildren ( element, value );

  } else if ( key === 'ref' ) {

    setRef ( element, value );

  } else if ( key === 'style' ) {

    setStyles ( element, value );

  } else if ( key === 'class' ) {

    setClasses ( element, value );

  } else if ( key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' ) {

    // Forbidden props

  } else if ( key === 'dangerouslySetInnerHTML' ) {

    setHTML ( element, value );

  } else if ( ( key.charCodeAt ( 0 ) === 111 || key.charCodeAt ( 0 ) === 79 ) && ( key.charCodeAt ( 1 ) === 110 || key.charCodeAt ( 1 ) === 78 ) ) { // /^on/i

    setEvent ( element, key.toLowerCase (), value );

  } else if ( key in element ) {

    setProperty ( element, key, value );

  } else {

    setAttribute ( element, key, value );

  }

};

const setProps = ( element: HTMLElement, object: Record<string, any> ): void => {

  for ( const key in object ) {

    setProp ( element, key, object[key] );

  }

};

/* EXPORT */

export {resolveChild, setAbstract, setAttributeStatic, setAttribute, setChildReplacement, setChildStatic, setChild, setChildren, setClassStatic, setClass, setClassesStatic, setClasses, setEventStatic, setEvent, setHTMLStatic, setHTML, setPropertyStatic, setProperty, setRef, setStyleStatic, setStyle, setStylesStatic, setStyles, setProp, setProps};
