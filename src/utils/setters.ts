
/* IMPORT */

import type {Child, EventListener, FunctionMaybe, ObservableMaybe, Ref, TemplateActionProxy} from '../types';
import useEffect from '../hooks/use_effect';
import template from '../template';
import {createText, createComment} from './creators';
import diff from './diff';
import Fragment from './fragment';
import {flatten, isFunction, isNil, isPrimitive, isString} from './lang';
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

      attribute.value = value;

    } else {

      const attribute = document.createAttribute ( key );

      attribute.value = value;

      attributes.setNamedItem ( attribute );

    }

  }

};

const setAttribute = ( element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | boolean | number | string> ): void => {

  const {attributes} = element;

  resolveFunction ( value, setAttributeStatic.bind ( undefined, attributes, key ) );

};

const setChildReplacementFunction = ( parent: HTMLElement, fragment: Fragment, child: (() => Child) ): void => {

  let valuePrev: Child | undefined;
  let valuePrimitive = false;

  useEffect ( () => {

    let valueNext = child ();

    while ( isFunction ( valueNext ) ) {

      valueNext = valueNext ();

    }

    if ( valuePrimitive && valuePrev === valueNext ) return; // Nothing actually changed, skipping

    setChildStatic ( parent, fragment, valueNext );

    valuePrev = valueNext;
    valuePrimitive = isPrimitive ( valueNext );

  });

};

const setChildReplacementText = ( child: string, childPrev: Node ): Node => {

  if ( childPrev.nodeType === 3 ) {

    childPrev.nodeValue = child;

    return childPrev;

  } else {

    const parent = childPrev.parentElement;

    if ( !parent ) throw new Error ( 'Invalid child replacement' );

    const textNode = createText ( child );

    parent.replaceChild ( textNode, childPrev );

    return textNode;

  }

};

const setChildReplacement = ( child: Child, childPrev: Node ): void => {

  const type = typeof child;

  if ( type === 'string' || type === 'number' || type === 'bigint' ) {

    setChildReplacementText ( String ( child ), childPrev );

  } else {

    const parent = childPrev.parentElement;

    if ( !parent ) throw new Error ( 'Invalid child replacement' );

    const fragment = new Fragment ();

    fragment.pushNode ( childPrev );

    if ( type === 'function' ) {

      setChildReplacementFunction ( parent, fragment, child as (() => Child) ); //TSC

    } else {

      setChild ( parent, child, fragment );

    }

  }

};

const setChildStatic = ( parent: HTMLElement, fragment: Fragment, child: Child ): void => {

  const prev = fragment.children ();
  const prevLength = prev.length;
  const prevFirst = prev[0];
  const prevLast = prev[prevLength - 1];
  const prevSibling = prevLast?.nextSibling || null;

  if ( prevLength === 0 ) { // Fast path for appending a node the first time

    const type = typeof child;

    if ( type === 'string' || type === 'number' || type === 'bigint' ) {

      const textNode = createText ( child );

      parent.appendChild ( textNode );

      fragment.setNode ( textNode );

      return;

    } else if ( type === 'object' && child !== null && typeof ( child as Node ).nodeType === 'number' ) { //TSC

      const node = child as Node;

      parent.insertBefore ( node, null );

      fragment.setNode ( node );

      return;

    }

  }

  if ( prevLength === 1 ) { // Fast path for single text child

    const type = typeof child;

    if ( type === 'string' || type === 'number' || type === 'bigint' ) {

      const node = setChildReplacementText ( String ( child ), prevFirst );

      fragment.setNode ( node );

      return;

    }

  }

  const fragmentNext = new Fragment ();

  const children: Node[] = Array.isArray ( child ) ? flatten ( child ) : [child]; //TSC

  for ( let i = 0, l = children.length; i < l; i++ ) {

    const child = children[i];
    const type = typeof child;

    if ( type === 'string' || type === 'number' || type === 'bigint' ) {

      fragmentNext.pushNode ( createText ( child ) );

    } else if ( type === 'object' && child !== null && typeof child.nodeType === 'number' ) {

      fragmentNext.pushNode ( child );

    } else if ( type === 'function' ) {

      const fragment = new Fragment ();

      fragmentNext.pushFragment ( fragment );

      resolveChild ( child, setChildStatic.bind ( undefined, parent, fragment ) );

    }

  }

  const next = fragmentNext.children ();
  const nextLength = next.length;

  if ( nextLength === 0 && prevLength === 1 && prevFirst.nodeType === 8 ) { // It's a placeholder already, no need to replace it

    return;

  }

  if ( nextLength === 0 || ( prevLength === 1 && prevFirst.nodeType === 8 ) ) { // Fast path for removing all children and/or replacing the placeholder

    const {childNodes} = parent;

    if ( childNodes.length === prevLength ) { // Maybe this fragment doesn't handle all children but only a range of them, checking for that here

      for ( let i = 0, l = childNodes.length; i < l; i++ ) {

        const node = childNodes[i];
        const recycle = node.recycle;

        if ( !recycle ) continue;

        recycle ( node );

      }

      parent.textContent = '';

      if ( nextLength === 0 ) { // Placeholder, to keep the right spot in the array of children

        const placeholder = createComment ();

        fragmentNext.pushNode ( placeholder );

        if ( next !== fragmentNext.values ) {

          next.push ( placeholder );

        }

      }

      if ( prevSibling ) {

        for ( let i = 0, l = next.length; i < l; i++ ) {

          parent.insertBefore ( next[i], prevSibling );

        }

      } else {

        for ( let i = 0, l = next.length; i < l; i++ ) {

          parent.append ( next[i] );

        }

      }

      fragment.replaceWithFragment ( fragmentNext );

      return;

    }

  }

  if ( nextLength === 0 ) { // Placeholder, to keep the right spot in the array of children

    const placeholder = createComment ();

    fragmentNext.pushNode ( placeholder );

    if ( next !== fragmentNext.values ) {

      next.push ( placeholder );

    }

  }

  diff ( parent, prev, next, prevSibling );

  fragment.replaceWithFragment ( fragmentNext );

};

const setChild = ( parent: HTMLElement, child: Child, fragment: Fragment = new Fragment () ): void => {

  resolveChild ( child, setChildStatic.bind ( undefined, parent, fragment ) );

};

const setClassStatic = ( classList: DOMTokenList, key: string, value: null | undefined | boolean ): void => {

  classList.toggle ( key, !!value );

};

const setClass = ( classList: DOMTokenList, key: string, value: FunctionMaybe<null | undefined | boolean> ): void => {

  resolveFunction ( value, setClassStatic.bind ( undefined, classList, key ) );

};

const setClassesStatic = ( element: HTMLElement, classList: DOMTokenList, object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | boolean>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | boolean>> ): void => {

  if ( isString ( object ) ) {

    element.className = object;

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

  resolveFunction ( object, setClassesStatic.bind ( undefined, element, classList ) );

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

  resolveObservable ( value, setEventStatic.bind ( undefined, element, event ) );

};

const setHTMLStatic = ( element: HTMLElement, value: null | undefined | number | string ): void => {

  element.innerHTML = String ( value ?? '' );

};

const setHTML = ( element: HTMLElement, value: FunctionMaybe<{ __html: FunctionMaybe<null | undefined | number | string> }> ): void => {

  resolveFunction ( value, value => {

    resolveFunction ( value.__html, setHTMLStatic.bind ( undefined, element ) );

  });

};

const setPropertyStatic = ( element: HTMLElement, key: string, value: null | undefined | boolean | number | string ): void => {

  if ( key === 'className' ) {

    element.className = String ( value ?? '' );

  } else {

    element[key] = value;

  }

};

const setProperty = ( element: HTMLElement, key: string, value: FunctionMaybe<null | undefined | boolean | number | string> ): void => {

  resolveFunction ( value, setPropertyStatic.bind ( undefined, element, key ) );

};

const setRef = <T> ( element: T, value: null | undefined | Ref<T> ): void => {

  if ( !isFunction ( value ) ) throw new Error ( 'Invalid ref' );

  queueMicrotask ( value.bind ( undefined, element ) ); // Scheduling a microtask to dramatically increase the probability that the element will get connected to the DOM in the meantime, which would be more convenient

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

const setStyle = ( style: CSSStyleDeclaration, key: string, value: FunctionMaybe<null | undefined | number | string> ): void => {

  resolveFunction ( value, setStyleStatic.bind ( undefined, style, key ) );

};

const setStylesStatic = ( style: CSSStyleDeclaration, object: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>>, objectPrev?: null | undefined | string | Record<string, FunctionMaybe<null | undefined | number | string>> ): void => {

  if ( isString ( object ) ) {

    style.cssText = object;

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

  resolveFunction ( object, setStylesStatic.bind ( undefined, style ) );

};

const setTemplateAccessor = ( element: HTMLElement, key: string, value: TemplateActionProxy ): void => {

  if ( key === 'children' ) {

    const placeholder = createText ( '' ); // Using a Text node rather than a Comment as the former may be what we actually want ultimately

    element.insertBefore ( placeholder, null );

    value ( element, 'setChildReplacement', undefined, placeholder );

  } else if ( key === 'ref' ) {

    value ( element, 'setRef' );

  } else if ( key === 'style' ) {

    value ( element, 'setStyles' );

  } else if ( key === 'class' ) {

    element.className = ''; // Ensuring the attribute is present

    value ( element, 'setClasses' );

  } else if ( key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' ) {

    // Forbidden props

  } else if ( key === 'dangerouslySetInnerHTML' ) {

    value ( element, 'setHTML' );

  } else if ( key.charCodeAt ( 0 ) === 111 && key.charCodeAt ( 1 ) === 110 ) { // /^on/

    value ( element, 'setEvent', key.toLowerCase () );

  } else if ( key in element ) {

    if ( key === 'className' ) { // Ensuring the attribute is present

      element.className = '';

    }

    value ( element, 'setProperty', key );

  } else {

    element.setAttribute ( key, '' ); // Ensuring the attribute is present

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

export {setAttributeStatic, setAttribute, setChildReplacementFunction, setChildReplacementText, setChildReplacement, setChildStatic, setChild, setClassStatic, setClass, setClassesStatic, setClasses, setEventStatic, setEvent, setHTMLStatic, setHTML, setPropertyStatic, setProperty, setRef, setStyleStatic, setStyle, setStylesStatic, setStyles, setTemplateAccessor, setProp, setProps};
