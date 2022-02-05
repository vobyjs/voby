
/* IMPORT */

import {$} from '~/observable';
import template from '~/template';
import {castArray, isArray, isBoolean, isFunction, isNil, isNode, isObservable, isPropertyNonDimensional, isString, isText} from '~/utils';
import {Observable, ObservableMaybe, ViewElement, ViewChild} from '~/types';

/* HELPERS */

const resolveObservable = <T> ( fn: Observable<T> ): T | undefined => {

  const value = fn ();

  if ( !isObservable ( value ) ) return value;

  return resolveObservable ( value );

};

const normalizeChildren = ( children: ViewChild[] ): ViewChild[] => {

  // It flattes the array and removes nil and boolean values, quickly

  for ( let i = children.length - 1; i >= 0; i-- ) {

    const child = children[i];

    if ( isNil ( child ) || isBoolean ( child ) ) {

      children.splice ( i, 1 );

    } else if ( isArray ( child ) ) {

      for ( let ci = child.length -1; ci >= 0; ci-- ) {

        const childChild = child[ci];

        if ( isNil ( childChild ) || isBoolean ( childChild ) ) {

          child.splice ( ci, 1 );

        }

      }

      children.splice ( i, 1, ...child );

    }

  }

  return children;

};

const prepareChildren = ( children: ViewChild[] ): ViewElement => {

  children = normalizeChildren ( children );

  if ( children.length === 0 ) return null;

  if ( children.length === 1 ) return prepareChild ( children[0] );

  for ( let i = children.length - 1; i >= 0; i-- ) {

    children[i] = prepareChild ( children[i] );

  }

  return children;

};

const prepareChild = ( child: ViewChild ): ViewElement => {

  if ( isNil ( child ) ) return null;

  if ( isBoolean ( child ) ) return null;

  if ( isNode ( child ) ) return child;

  if ( isObservable ( child ) ) return child;

  if ( isFunction ( child ) ) return prepareChild ( child () );

  if ( isArray ( child ) ) {

    if ( child.length === 0 ) return null;

    if ( child.length === 1 ) return prepareChild ( child[0] );

    return prepareChildren ( child );

  }

  return String ( child );

};

const removeChildren = ( parent: HTMLElement, children: Node[] ): void => {

  for ( let i = 0, l = children.length; i < l; i++ ) {

    const child = children[i];

    if ( isArray ( child ) ) {

      removeChildren ( parent, child );

    } else if ( isNode ( child ) ) {

      parent.removeChild ( child );

    }

  }

};

/* MAIN */

const setAbstract = <T> ( value: ObservableMaybe<T>, setter: (( value: T, valuePrev?: T ) => void) ): void => {

  if ( isObservable ( value ) ) {

    let valuePrev: T | undefined;

    $.effect ( () => {

      const valueNext = resolveObservable ( value );

      setter ( valueNext, valuePrev );

      valuePrev = valueNext;

    });

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

const setAttribute = ( element: HTMLElement, key: string, value: ObservableMaybe<null | undefined | boolean | number | string> ): void => {

  const {attributes} = element;

  setAbstract ( value, value => {

    setAttributeStatic ( attributes, key, value );

  });

};

const replaceChild = ( child: ViewChild, childPrev: Node ): void => {

  if ( isString ( child ) && isText ( childPrev ) ) {

    childPrev.data = child;

  } else {

    const parent = childPrev.parentElement!; //TSC

    setChild ( parent, child, [childPrev] );

  }

};

const setChildStatic = ( parent: HTMLElement, child: ViewChild, childrenPrev: Node[] ): Node[] => {

  //TODO: Optimize this massively, after it works reliably, currently it may not quite work and it certainly has terrible performance
  //TODO: This function should trigger onMount/onUnmount hooks somehow, and/or update refs
  //URL: https://github.com/adamhaile/surplus/blob/2aca5a36ceb6a7cbb4d609cd04ee631714602f91/src/runtime/content.ts
  //URL: https://github.com/adamhaile/surplus/blob/2aca5a36ceb6a7cbb4d609cd04ee631714602f91/src/runtime/insert.ts
  //URL: https://github.com/luwes/sinuous/blob/master/packages/sinuous/h/src/h.js
  //URL: https://github.com/ryansolid/dom-expressions/blob/main/packages/dom-expressions/src/client.js

  if ( childrenPrev.length === 0 && template.isProxy ( child ) ) { // Template proxy function

    const placeholder = new Text ();

    parent.insertBefore ( placeholder, null );

    child ( parent, 'child', placeholder );

    return [placeholder];

  } else if ( isFunction ( child ) && !isObservable ( child ) ) { // Function child

    return setChildStatic ( parent, child (), childrenPrev );

  } else { // Regular child

    const childrenNext = castArray ( ( isArray ( child ) ? prepareChildren ( child ) : prepareChild ( child ) ) ?? new Text () );

    const afterNode = childrenPrev[childrenPrev.length - 1]?.nextSibling || null;

    removeChildren ( parent, childrenPrev );

    for ( let i = 0, l = childrenNext.length; i < l; i++ ) {

      const childNext = childrenNext[i];

      if ( isObservable ( childNext ) ) {

        let childrenPrev: Node[] = [];

        $.effect ( () => {

          childrenNext[i] = childrenPrev = setChildStatic ( parent, childNext (), childrenPrev );

        });

      } else if ( isFunction ( childNext ) ) {

        childrenNext[i] = setChild ( parent, childNext (), [] );

      } else if ( isString ( childNext ) ) {

        const textNode = new Text ( childNext );

        parent.insertBefore ( textNode, afterNode );

        childrenNext[i] = textNode;

      } else if ( isNode ( childNext ) ) {

        parent.insertBefore ( childNext, afterNode );

      }

    }

    return childrenNext;

  }

};

const setChild = ( parent: HTMLElement, child: ViewChild, childrenPrev: Node[] = [] ): Node[] => {

  setAbstract ( child, child => {

    childrenPrev = setChildStatic ( parent, child, childrenPrev );

  });

  return childrenPrev;

};

const setChildren = ( parent: HTMLElement, children: ViewChild[] ): void => {

  for ( let i = 0, l = children.length; i < l; i++ ) {

    setChild ( parent, children[i] );

  }

};

const setClassStatic = ( classList: DOMTokenList, key: string, value: boolean ): void => {

  classList.toggle ( key, value );

};

const setClass = ( classList: DOMTokenList, key: string, value: ObservableMaybe<boolean> ): void => {

  setAbstract ( value, value => {

    setClassStatic ( classList, key, value );

  });

};

const setClassesStatic = ( element: HTMLElement, object: string | Record<string, ObservableMaybe<boolean>>, objectPrev?: string | Record<string, ObservableMaybe<boolean>> ): void => {

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

const setClasses = ( element: HTMLElement, object: ObservableMaybe<string | Record<string, ObservableMaybe<boolean>>> ): void => {

  setAbstract ( object, ( object, objectPrev ) => {

    setClassesStatic ( element, object, objectPrev );

  });

};

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

  for ( const event in delegatedEvents ) {
    const key = delegatedEvents[event];
    document[event] = event => {
      let node = event.composedPath ()[0];
      while ( node ) {
        const handler = node[key];
        if ( handler && !node.disabled ) {
          Object.defineProperty ( event, 'currentTarget', {
            configurable: true,
            get () {
              return node || document;
            }
          });
          handler ( event );
          if ( event.cancelBubble ) break;
        }
        node = node.parentNode;
      }
    };
  }

  return ( element: HTMLElement, event: string, value: Function ): void => {

    //TODO: Support capturing events

    if ( event in delegatedEvents ) {

      element[delegatedEvents[event]] = value;

    } else {

      element[event] = value;

    }

  };

})();

const setEvent = ( element: HTMLElement, event: string, value: ObservableMaybe<Function> ): void => {

  setAbstract ( value, value => {

    setEventStatic ( element, event, value );

  });

};

const setHTMLStatic = ( element: HTMLElement, value: null | undefined | number | string ): void => {

  element.innerHTML = String ( value ?? '' );

};

const setHTML = ( element: HTMLElement, value: ObservableMaybe<{ __html: ObservableMaybe<null | undefined | number | string> }> ): void => {

  setAbstract ( value, value => {

    setAbstract ( value.__html, html => {

      setHTMLStatic ( element, html );

    });

  });

};

const setPropertyStatic = ( element: HTMLElement, key: string, value: null | undefined | boolean | number | string | Function ): void => {

  value = ( key === 'className' ) ? ( value ?? '' ) : value;

  element[key] = value;

};

const setProperty = ( element: HTMLElement, key: string, value: ObservableMaybe<null | undefined | boolean | number | string | Function> ): void => {

  setAbstract ( value, value => {

    setPropertyStatic ( element, key, value );

  });

};

const setStyleStatic = ( style: CSSStyleDeclaration, key: string, value: null | undefined | number | string ): void => {

  if ( key === 'cssText' ) {

    style.cssText = String ( value ?? '' );

  } else if ( key.charCodeAt ( 0 ) === 45 ) { // -*

    style.setProperty ( key, String ( value ) );

  } else if ( isNil ( value ) ) {

    style[key] = null;

  } else {

    style[key] = ( isString ( value ) || isPropertyNonDimensional ( key ) ? value : `${value}px` );

  }

};

const setStyle = ( style: CSSStyleDeclaration, key: string, value: ObservableMaybe<null | undefined | number | string> ): void => {

  setAbstract ( value, value => {

    setStyleStatic ( style, key, value );

  });

};

const setStylesStatic = ( style: CSSStyleDeclaration, object: string | Record<string, ObservableMaybe<null | undefined | number | string>>, objectPrev?: string | Record<string, ObservableMaybe<null | undefined | number | string>> ): void => {

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

const setStyles = ( element: HTMLElement, object: ObservableMaybe<string | Record<string, ObservableMaybe<null | undefined | number | string>>> ): void => {

  const {style} = element;

  setAbstract ( object, ( object, objectPrev ) => {

    setStylesStatic ( style, object, objectPrev );

  });

};

const setProp = ( element: HTMLElement, key: string, value: any ): void => {

  if ( template.isProxy ( value ) ) {

    value ( element, key );

  } else if ( key === 'children' ) {

    setChildren ( element, value );

  } else if ( key === 'style' ) {

    setStyles ( element, value );

  } else if ( key === 'class' ) {

    setClasses ( element, value );

  } else if ( key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' ) {

    // Forbidden prop

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

export {normalizeChildren, prepareChildren, prepareChild};
export {setAbstract, setAttributeStatic, setAttribute, replaceChild, setChildStatic, setChild, setChildren, setClassStatic, setClass, setClassesStatic, setClasses, setHTMLStatic, setHTML, setPropertyStatic, setProperty, setStyleStatic, setStyle, setStylesStatic, setStyles, setProp, setProps};
