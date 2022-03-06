
/* IMPORT */

import type {Child, EventListener, FunctionMaybe, ObservableMaybe, Ref, TemplateActionProxy} from '../types';
import useEffect from '../hooks/use_effect';
import template from '../template';
import diff from './diff';
import {flatten, isFunction, isNil, isString} from './lang';
import {resolveChild, resolveFunction, resolveObservable} from './resolvers';

/* MAIN */

const setAttributeStatic = ( attributes: NamedNodeMap, key: string, value: null | undefined | boolean | number | string ): void => {

  const attribute = attributes.getNamedItem ( key );

  if ( isNil ( value ) || value === false ) {

    if ( attribute ) {

      attributes.removeNamedItem ( key );

    }

  } else {

    value = ( value === true ) ? '' : String ( value );

    if ( attribute ) {

      if ( attribute.value !== value ) {

        attribute.value = value;

      }

    } else {

      const attribute = document.createAttribute ( key );

      attribute.value = value;

      attributes.setNamedItem ( attribute );

    }

  }

};

const setAttribute = ( element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | boolean | number | string> ): void => {

  const {attributes} = element;

  resolveFunction ( value, value => {

    setAttributeStatic ( attributes, key, value );

  });

};

const setChildReplacementFunction = ( parent: HTMLElement, child: (() => Child), childPrev: Node[] ): void => {

  useEffect ( () => {

    let value = child ();

    while ( typeof value === 'function' ) {

      value = value ();

    }

    childPrev = setChildStatic ( parent, value, childPrev );

  });

};

const setChildReplacementText = ( child: string, childPrev: Node ): Node => {

  if ( childPrev.nodeType === 3 ) {

    if ( childPrev.nodeValue !== child ) {

      childPrev.nodeValue = child;

    }

    return childPrev;

  } else {

    const parent = childPrev.parentElement;

    if ( !parent ) throw new Error ( 'Invalid child replacement' );

    const textNode = new Text ( child );

    parent.replaceChild ( textNode, childPrev );

    return textNode;

  }

};

const setChildReplacement = ( child: Child, childPrev: Node ): void => {

  const type = typeof child;

  if ( type === 'string' ) {

    setChildReplacementText ( child as string, childPrev ); //TSC

  } else if ( type === 'number' || type === 'bigint' ) {

    setChildReplacementText ( String ( child ), childPrev );

  } else {

    const parent = childPrev.parentElement;

    if ( !parent ) throw new Error ( 'Invalid child replacement' );

    if ( type === 'function' ) {

      setChildReplacementFunction ( parent, child as (() => Child), [childPrev] ); //TSC

    } else {

      setChild ( parent, child, [childPrev] );

    }

  }

};

const setChildStatic = ( parent: HTMLElement, child: Child, childrenPrev: Node[] ): Node[] => {

  const childrenPrevLength = childrenPrev.length;

  if ( childrenPrevLength === 0 ) { // Fast path for appending a node the first time

    const type = typeof child;

    if ( type === 'string' || type === 'number' || type === 'bigint' ) {

      const textNode = new Text ( String ( child ) );

      parent.appendChild ( textNode );

      return [textNode];

    } else if ( type === 'object' && child !== null && typeof ( child as Node ).nodeType === 'number' ) { //TSC

      const node = child as Node;

      parent.insertBefore ( node, null );

      return [node];

    }

  }

  if ( childrenPrevLength === 1 ) { // Fast path for single text child

    const type = typeof child;

    if ( type === 'string' ) {

      return [setChildReplacementText ( child as string, childrenPrev[0] )]; //TSC

    } else if ( type === 'number' || type === 'bigint' ) {

      return [setChildReplacementText ( String ( child ), childrenPrev[0] )];

    }

  }

  const childrenNext: Node[] = [];
  const childrenNextSibling = childrenPrev[childrenPrevLength - 1]?.nextSibling || null;

  const children: Node[] = Array.isArray ( child ) ? flatten ( child ) : [child]; //TSC

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

  if ( !childrenNext.length && childrenPrevLength === 1 && childrenPrev[0].nodeType === 8 ) { // It's a comment already, no need to replace it

    return childrenPrev;

  }

  if ( !childrenNext.length || ( childrenPrevLength === 1 && childrenPrev[0].nodeType === 8 ) ) { // Fast path for removing all children and/or replacing the placeholder

    const {childNodes} = parent;

    if ( childNodes.length === childrenPrevLength ) {

      for ( let i = 0, l = childNodes.length; i < l; i++ ) {

        const node = childNodes[i];
        const recycle = node.recycle;

        if ( !recycle ) continue;

        recycle ( node );

      }

      parent.textContent = '';

      if ( !childrenNext.length ) { // Placeholder, to keep the right spot in the array of children

        childrenNext[0] = new Comment ();

      }

      if ( childrenNextSibling ) {

        for ( let i = 0, l = childrenNext.length; i < l; i++ ) {

          parent.insertBefore ( childrenNext[i], childrenNextSibling );

        }

      } else {

        parent.append.apply ( parent, childrenNext );

      }

      return childrenNext;

    }

  }

  if ( !childrenNext.length ) { // Placeholder, to keep the right spot in the array of children

    childrenNext[0] = new Comment ();

  }

  diff ( parent, childrenPrev, childrenNext, childrenNextSibling );

  return childrenNext;

};

const setChild = ( parent: HTMLElement, child: Child, childPrev: Node[] = [] ): Node[] => {

  resolveChild ( child, child => {

    childPrev = setChildStatic ( parent, child, childPrev );

  });

  return childPrev;

};

const setClassStatic = ( classList: DOMTokenList, key: string, value: null | undefined | boolean ): void => {

  classList.toggle ( key, !!value );

};

const setClass = ( classList: DOMTokenList, key: string, value: FunctionMaybe<null | undefined | boolean> ): void => {

  resolveFunction ( value, value => {

    setClassStatic ( classList, key, value );

  });

};

const setClassesStatic = ( element: HTMLElement, classList: DOMTokenList, object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | boolean>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | boolean>> ): void => {

  if ( isString ( object ) ) {

    if ( element.className !== object ) {

      element.className = object;

    }

  } else {

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        if ( objectPrev ) {

          element.className = '';

        }

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

const setClasses = ( element: HTMLElement, object: FunctionMaybe<null | undefined | string | Record<string, FunctionMaybe<null | undefined | boolean>>> ): void => {

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

const setEvent = ( element: HTMLElement, event: string, value: ObservableMaybe<null | undefined | EventListener> ): void => {

  resolveObservable ( value, value => {

    setEventStatic ( element, event, value );

  });

};

const setHTMLStatic = ( element: HTMLElement, value: null | undefined | number | string ): void => {

  element.innerHTML = String ( value ?? '' );

};

const setHTML = ( element: HTMLElement, value: FunctionMaybe<{ __html: FunctionMaybe<null | undefined | number | string> }> ): void => {

  resolveFunction ( value, value => {

    resolveFunction ( value.__html, html => {

      setHTMLStatic ( element, html );

    });

  });

};

const setPropertyStatic = ( element: HTMLElement, key: string, value: null | undefined | boolean | number | string ): void => {

  if ( key === 'className' ) {

    const className = String ( value ?? '' );

    if ( element.className !== className ) {

      element.className = className;

    }

  } else {

    if ( element[key] !== value ) {

      element[key] = value;

    }

  }

};

const setProperty = ( element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | boolean | number | string> ): void => {

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

      value = ( isString ( value ) || propertyNonDimensionalRe.test ( key ) ? value : `${value}px` );

      if ( style[key] !== value ) {

        style[key] = value;

      }

    }

  };

})();

const setStyle = ( style: CSSStyleDeclaration, key: string, value: FunctionMaybe<null | undefined | number | string> ): void => {

  resolveFunction ( value, value => {

    setStyleStatic ( style, key, value );

  });

};

const setStylesStatic = ( style: CSSStyleDeclaration, object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>> ): void => {

  if ( isString ( object ) ) {

    if ( style.cssText !== object ) {

      style.cssText = object;

    }

  } else {

    if ( objectPrev ) {

      if ( isString ( objectPrev ) ) {

        if ( objectPrev ) {

          style.cssText = '';

        }

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

const setStyles = ( element: HTMLElement, object: FunctionMaybe<null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>> ): void => {

  const {style} = element;

  resolveFunction ( object, ( object, objectPrev ) => {

    setStylesStatic ( style, object, objectPrev );

  });

};

const setTemplateAccessor = ( element: HTMLElement, key: string, value: TemplateActionProxy ): void => {

  if ( key === 'children' ) {

    const placeholder = new Text ();

    element.insertBefore ( placeholder, null );

    value ( element, 'setChildReplacement', undefined, placeholder );

  } else if ( key === 'ref' ) {

    value ( element, 'setRef' );

  } else if ( key === 'style' ) {

    value ( element, 'setStyles' );

  } else if ( key === 'class' ) {

    element.className = '';

    value ( element, 'setClasses' );

  } else if ( key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' ) {

    // Forbidden props

  } else if ( key === 'dangerouslySetInnerHTML' ) {

    value ( element, 'setHTML' );

  } else if ( key.charCodeAt ( 0 ) === 111 && key.charCodeAt ( 1 ) === 110 ) { // /^on/

    value ( element, 'setEvent', key.toLowerCase () );

  } else if ( key in element ) {

    if ( key === 'className' ) {

      element.className = '';

    }

    value ( element, 'setProperty', key );

  } else {

    element.setAttribute ( key, '' );

    value ( element, 'setAttribute', key );

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
