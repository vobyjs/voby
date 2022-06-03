
/* IMPORT */

import {isString} from '~/utils/lang';

/* HELPERS */

const whitespaceRe = /\s+/g;
const split = ( str: string ): string[] => str.split ( whitespaceRe ).filter ( Boolean );

/* MAIN */

// This function manipulates the "class" attribute directly, whenever possible, because going through the classList API leaks DOMTokenList objects...

const classesToggle = ( element: HTMLElement, classes: string, force: null | undefined | boolean ): void => {

  const {className} = element;

  if ( !isString ( className ) ) { // "className" is not always a string for SVGs, resorting to classList

    split ( classes ).forEach ( cls => {

      element.classList.toggle ( cls, !!force );

    });

  } else if ( !className ) { // Optimized addition

    if ( force ) {

      element.className = classes;

    }

  } else if ( !force && className === classes ) { // Optimized deletion

    element.className = '';

  } else { // Regular toggling

    const set = new Set ( split ( className ) );

    split ( classes ).forEach ( cls => {

      if ( force ) {

        set.add ( cls );

      } else {

        set.delete ( cls );

      }

    });

    element.className = Array.from ( set ).join ( ' ' );

  }

};

/* EXPORT */

export {classesToggle};
