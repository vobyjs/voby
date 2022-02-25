
/* IMPORT */

import diff from 'tiny-diff';
import type {Child, EventListener, FunctionResolver, ObservableResolver, Ref, TemplateActionProxy} from '../types';
import template from '../template';
import {isFunction, isNil, isString} from './lang';
import {resolveChild, resolveFunction, resolveObservable} from './resolvers';

/* MAIN */

//TODO: Optimize the case were we are setting the same thing
//TODO: Optimize the same case where the same class/style is being updated
//TODO: Use the same empty array whenever needed/possible

const setAttributeStatic = ( attributes: NamedNodeMap, key: string, value: null | undefined | boolean | number | string ): void => {

  const attribute = attributes.getNamedItem ( key );

  if ( isNil ( value ) || value === false ) {

    if ( attribute ) {

      attributes.removeNamedItem ( key );

    }

  } else {

    value = ( value === true ) ? '' : String ( value );

    if ( attribute ) {

      attribute.value = value;

    } else {

      const attribute = document.createAttribute ( key );

      attribute.value = value;

      attributes.setNamedItem ( attribute );

    }

  }

};

const setAttribute = ( element: HTMLElement, key: string, value: FunctionResolver<null | undefined | boolean | number | string> ): void => {

  const {attributes} = element;

  resolveFunction ( value, value => {

    setAttributeStatic ( attributes, key, value );

  });

};

const setChildReplacement = ( child: Child, childPrev: Node ): Node[] => {

  const type = typeof child;

  if ( type === 'string' || type === 'number' || type === 'bigint' ) {

    const value = String ( child );

    if ( childPrev.nodeType === 3 ) {

      if ( childPrev.nodeValue !== value ) {

        childPrev.nodeValue = value;

      }

      return [childPrev];

    } else {

      const parent = childPrev.parentElement;

      if ( !parent ) throw new Error ( 'Invalid child replacement' );

      const textNode = new Text ( value );

      parent.replaceChild ( textNode, childPrev );

      return [textNode];

    }

  } else {

    const parent = childPrev.parentElement;

    if ( !parent ) throw new Error ( 'Invalid child replacement' );

    return setChild ( parent, child, [childPrev] );

  }

};

const setChildStatic = (() => {

  return ( parent: HTMLElement, child: Child, childrenPrev: Node[] ): Node[] => {

    //TODO: Fast path for appending nodes to parent, maybe
    //TODO: Fast path for converting string to new text node, maybe

    if ( childrenPrev.length === 1 ) { // Fast path for single text child

      const type = typeof child;

      if ( type === 'string' || type === 'number' || type === 'bigint' ) {

          return setChildReplacement ( child, childrenPrev[0] );

      }

    }

    const childrenNext: Node[] = [];
    const childrenNextSibling = childrenPrev[childrenPrev.length - 1]?.nextSibling || null;

    const children: Node[] = Array.isArray ( child ) ? child.flat ( Infinity ) : [child]; //TSC //TODO: don't create another array if there's no need for flattening

    for ( let i = 0, l = children.length; i < l; i++ ) {

      const child = children[i];
      const type = typeof child;

      if ( type === 'string' || type === 'number' || type === 'bigint' ) {

        childrenNext.push ( new Text ( String ( child ) ) );

      } else if ( type === 'object' && child !== null && typeof child.nodeType === 'number' ) {

        childrenNext.push ( child );

      } else if ( type === 'function' ) {

        let prev: Node[] = [];

        resolveChild ( child, child => {

          const prevLength = prev.length;
          const prevStart = prev[0];

          prev = setChildStatic ( parent, child, prev );

          const prevStartIndex = prevStart ? childrenNext.indexOf ( prevStart ) : childrenNext.length;

          // if ( prevStartIndex === -1 ) debugger; // This should never happen, if it does happen we've got a bug

          childrenNext.splice ( prevStartIndex, prevLength, ...prev );

        });

      }

    }

    if ( !childrenNext.length && childrenPrev.length === 1 && childrenPrev[0].nodeType === 8 ) { // It's a comment already, no need to replace it

      return childrenPrev;

    }

    if ( !childrenNext.length && parent.childNodes.length === childrenPrev.length ) { // Fast path for removing all children

      parent.textContent = '';

      childrenPrev = [];

    }

    if ( !childrenNext.length ) { // Placeholder, to keep the right spot in the array of children

      childrenNext[0] = new Comment ();

    }

    diff ( parent, childrenPrev, childrenNext, childrenNextSibling );

    return childrenNext;

  };

})();

const setChild = ( parent: HTMLElement, child: Child, childPrev: Node[] = [] ): Node[] => {

  resolveChild ( child, child => {

    childPrev = setChildStatic ( parent, child, childPrev );

  });

  return childPrev;

};

const setClassStatic = ( classList: DOMTokenList, key: string, value: null | undefined | boolean ): void => {

  classList.toggle ( key, !!value );

};

const setClass = ( classList: DOMTokenList, key: string, value: FunctionResolver<null | undefined | boolean> ): void => {

  resolveFunction ( value, value => {

    setClassStatic ( classList, key, value );

  });

};

const setClassesStatic = ( element: HTMLElement, classList: DOMTokenList, object: null | undefined | string | Record<string, FunctionResolver<null | undefined | boolean>>, objectPrev?: null | undefined | string | Record<string, FunctionResolver<null | undefined | boolean>> ): void => {

  if ( isString ( object ) ) {

    element.className = object;

  } else {

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        element.className = '';

      } else {

        for ( const key in objectPrev ) {

          if ( object && key in object ) continue;

          setClass ( classList, key, false );

        }

      }

    }

    for ( const key in object ) {

      setClass ( classList, key, object[key] );

    }

  }

};

const setClasses = ( element: HTMLElement, object: FunctionResolver<null | undefined | string | Record<string, FunctionResolver<null | undefined | boolean>>> ): void => {

  const {classList} = element;

  resolveFunction ( object, ( object, objectPrev ) => {

    setClassesStatic ( element, classList, object, objectPrev );

  });

};

const setEventStatic = (() => {

  //TODO: Maybe delegate more events: [onmousemove, onmouseout, onmouseover, onpointerdown, onpointermove, onpointerout, onpointerover, onpointerup, ontouchend, ontouchmove, ontouchstart]

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

  const delegatedEventsListening: Record<string, boolean> = {};

  const delegate = ( event: keyof typeof delegatedEvents ): void => {

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

  };

  return ( element: HTMLElement, event: string, value: null | undefined | EventListener ): void => {

    if ( event.endsWith ( 'capture' ) ) {

      const type = event.slice ( 2, -7 );
      const key = `_${event}`;

      const valuePrev = element[key];

      if ( valuePrev ) element.removeEventListener ( type, valuePrev, { capture: true } );

      if ( value ) element.addEventListener ( type, value, { capture: true } );

      element[key] = value;

    } else if ( event in delegatedEvents ) {

      if ( !( event in delegatedEventsListening ) ) {

        delegatedEventsListening[event] = true;

        delegate ( event as any ); //TSC

      }

      element[delegatedEvents[event]] = value;

    } else {

      element[event] = value;

    }

  };

})();

const setEvent = ( element: HTMLElement, event: string, value: ObservableResolver<null | undefined | EventListener> ): void => {

  resolveObservable ( value, value => {

    setEventStatic ( element, event, value );

  });

};

const setHTMLStatic = ( element: HTMLElement, value: null | undefined | number | string ): void => {

  element.innerHTML = String ( value ?? '' );

};

const setHTML = ( element: HTMLElement, value: FunctionResolver<{ __html: FunctionResolver<null | undefined | number | string> }> ): void => {

  resolveFunction ( value, value => {

    resolveFunction ( value.__html, html => {

      setHTMLStatic ( element, html );

    });

  });

};

const setPropertyStatic = ( element: HTMLElement, key: string, value: null | undefined | boolean | number | string ): void => {

  if ( key === 'className' ) {

    element[key] = String ( value ?? '' );

  } else {

    element[key] = value;

  }

};

const setProperty = ( element: HTMLElement, key: string, value: FunctionResolver<null | undefined | boolean | number | string> ): void => {

  resolveFunction ( value, value => {

    setPropertyStatic ( element, key, value );

  });

};

const setRef = <T> ( element: T, value: null | undefined | Ref<T> ): void => {

  if ( !isFunction ( value ) ) throw new Error ( 'Invalid ref' );

  queueMicrotask ( () => { // Scheduling a microtask to dramatically increase the probability that the element will get connected to the DOM in the meantime, which would be more convenient

    value ( element );

  });

};

const setStyleStatic = (() => {

  const propertyNonDimensionalRe = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

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

const setStyle = ( style: CSSStyleDeclaration, key: string, value: FunctionResolver<null | undefined | number | string> ): void => {

  resolveFunction ( value, value => {

    setStyleStatic ( style, key, value );

  });

};

const setStylesStatic = ( style: CSSStyleDeclaration, object: null | undefined | string | Record<string, FunctionResolver<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionResolver<null | undefined | number | string>> ): void => {

  if ( isString ( object ) ) {

    style.cssText = object;

  } else {

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        style.cssText = '';

      } else {

        for ( const key in objectPrev ) {

          if ( object && key in object ) continue;

          setStyleStatic ( style, key, null );

        }

      }

    }

    for ( const key in object ) {

      setStyle ( style, key, object[key] );

    }

  }

};

const setStyles = ( element: HTMLElement, object: FunctionResolver<null | undefined | string | Record<string, FunctionResolver<null | undefined | number | string>>> ): void => {

  const {style} = element;

  resolveFunction ( object, ( object, objectPrev ) => {

    setStylesStatic ( style, object, objectPrev );

  });

};

const setTemplateAccessor = ( element: HTMLElement, key: string, value: TemplateActionProxy ): void => {

  if ( key === 'children' ) {

    const placeholder = new Text ();

    element.insertBefore ( placeholder, null );

    value ( element, 'child', placeholder );

  } else {

    value ( element, key );

  }

};

const setProp = ( element: HTMLElement, key: string, value: any ): void => {

  if ( template.isAccessor ( value ) ) {

    setTemplateAccessor ( element, key, value );

  } else if ( key === 'children' ) {

    setChild ( element, value );

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

  } else if ( key.charCodeAt ( 0 ) === 111 && key.charCodeAt ( 1 ) === 110 ) { // /^on/

    setEvent ( element, key.toLowerCase (), value );

  } else if ( key in element ) {

    setProperty ( element, key, value );

  } else {

    setAttribute ( element, key, value );

  }

};

const setProps = ( element: HTMLElement, object: Record<string, unknown> ): void => {

  for ( const key in object ) {

    setProp ( element, key, object[key] );

  }

};

/* EXPORT */

export {setAttributeStatic, setAttribute, setChildReplacement, setChildStatic, setChild, setClassStatic, setClass, setClassesStatic, setClasses, setEventStatic, setEvent, setHTMLStatic, setHTML, setPropertyStatic, setProperty, setRef, setStyleStatic, setStyle, setStylesStatic, setStyles, setProp, setProps};
