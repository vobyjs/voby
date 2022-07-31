
/* IMPORT */

import useBoolean from '~/hooks/use_boolean';
import useEffect from '~/hooks/use_effect';
import render from '~/methods/render';
import $$ from '~/methods/SS';
import {createHTMLNode} from '~/utils/creators';
import {assign} from '~/utils/lang';
import type {Child, ChildWithMetadata, FunctionMaybe} from '~/types';

/* MAIN */

const Portal = ({ when = true, mount, children }: { mount?: FunctionMaybe<Element | null>, when?: FunctionMaybe<boolean>, children: Child }): ChildWithMetadata<{ portal: HTMLElement }> => {

  const portal = createHTMLNode ( 'div' );
  const boolean = useBoolean ( when );

  useEffect ( () => {

    if ( !$$(boolean) ) return;

    const parent = $$(mount) || document.body;

    parent.insertBefore ( portal, null );

    return () => {

      parent.removeChild ( portal );

    };

  });

  useEffect ( () => {

    if ( !$$(boolean) ) return;

    return render ( children, portal );

  });

  return assign ( () => $$(boolean) || children, { metadata: { portal } } );

};

/* EXPORT */

export default Portal;
