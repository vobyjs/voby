
/* IMPORT */

import useBoolean from '~/hooks/use_boolean';
import useRenderEffect from '~/hooks/use_render_effect';
import render from '~/methods/render';
import $$ from '~/methods/SS';
import {createHTMLNode} from '~/utils/creators';
import {assign} from '~/utils/lang';
import type {Child, ChildWithMetadata, FunctionMaybe} from '~/types';

/* MAIN */

const Portal = ({ when = true, mount, wrapper, children }: { mount?: Child, when?: FunctionMaybe<boolean>, wrapper?: Child, children: Child }): ChildWithMetadata<{ portal: HTMLElement }> => {

  const portal = $$(wrapper) || createHTMLNode ( 'div' );

  if ( !( portal instanceof HTMLElement ) ) throw new Error ( 'Invalid wrapper node' );

  const condition = useBoolean ( when );

  useRenderEffect ( () => {

    if ( !$$(condition) ) return;

    const parent = $$(mount) || document.body;

    if ( !( parent instanceof Element ) ) throw new Error ( 'Invalid mount node' );

    parent.insertBefore ( portal, null );

    return (): void => {

      parent.removeChild ( portal );

    };

  });

  useRenderEffect ( () => {

    if ( !$$(condition) ) return;

    return render ( children, portal );

  });

  return assign ( () => $$(condition) || children, { metadata: { portal } } );

};

/* EXPORT */

export default Portal;
