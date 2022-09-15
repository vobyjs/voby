
/* IMPORT */

import {isString} from '~/utils/lang';

/* HELPERS */

const split = ( str: string ): string[] => {

  if ( !str.includes ( ' ' ) ) return [str];

  return str.split ( ' ' ).filter ( Boolean );

};

/* MAIN */

// This function exists to optimize memory usage in some cases, where the classList API won't be touched without sacrificing performance

const classesToggle = ( element: HTMLElement, classes: string, force: null | undefined | boolean ): void => {

  const {className} = element;

  /* OPTIMIZED PATH */

  if ( isString ( className ) ) {

    if ( !className ) { // Optimized addition/deletion

      if ( force ) { // Optimized addition

        element.className = classes;

        return;

      } else { // Optimized deletion, nothing to do really

        return;

      }

    } else if ( !force && className === classes ) { // Optimized deletion

      element.className = '';

      return;

    }

  }

  /* REGULAR PATH */

  split ( classes ).forEach ( cls => {

    element.classList.toggle ( cls, !!force );

  });

};

/* EXPORT */

export {classesToggle};
