
/* IMPORT */

import {SYMBOL_HYDRATION} from '~/constants';
import {context} from '~/oby';
import type {ComponentIntrinsicElement, HydrationData} from '~/types';

/* MAIN */

const createComment = (): Comment => {

  const ctx = context<HydrationData>( SYMBOL_HYDRATION );

  if ( ctx && ctx.phase === 1 ){
    const node = document.createComment ( '' );
    return node;
  } else {
    const node = document.createComment ( '' );
    return node;
  }

};

const createHTMLNode = ( tagName: ComponentIntrinsicElement ): HTMLElement => {

  const ctx = context<HydrationData>( SYMBOL_HYDRATION );


  if ( ctx && ctx.phase === 0 ) {
    const node = document.createElement ( tagName );
    const hk = String(ctx.elementCounter++);
    node.setAttribute ( 'data-hk', hk );
    return node;
  } else if ( ctx && ctx.phase === 1 ) {
    const selector = `[data-hk="${String(ctx.elementCounter++)}"]`;
    const node = document.querySelector(selector);
    return node;
  } else {
    const node = document.createElement ( tagName );
    return node;
  }

};

const createSVGNode = ( tagName: ComponentIntrinsicElement ): Element => {

  const ctx = context<HydrationData>( SYMBOL_HYDRATION );


  if ( ctx && ctx.phase === 0 ) {
    const node = document.createElementNS ( 'http://www.w3.org/2000/svg', tagName );
    node.setAttribute ( 'data-hk', String(ctx.elementCounter++) );
    return node;
  } else if ( ctx && ctx.phase === 1 ) {
    const node = document.querySelector(`[data-hk="${String(ctx.elementCounter++)}"]`);
console.log({node});
    return node;
  } else {
    const node = document.createElementNS ( 'http://www.w3.org/2000/svg', tagName );
    return node;
  }

};

const createText = ( value: any ): Text => {

  const ctx = context<HydrationData>( SYMBOL_HYDRATION );

  // README
  // README
  //TODO: We left off here, how do we know which text node to return here? Are we rendering a sibling text node or an internal text node? Parents execute before chldren, so which direction we are going next seems undecidable, is the previous node a result of a component or an inline node?
  // README
  // README

  // if ( ctx && ctx.phase === 1 ){
  //   const asd = document.querySelector(`[data-hk="${String(ctx.elementCounter)}"]`);
  //   debugger;
  //   let node = asd;
  //   for ( let i = 0, l = ++ctx.textCounter; i < l; i++ ) {
  //     node = node.nextSibling;
  //   }
  //   return node;
  // } else {
    const node = document.createTextNode ( value );
    return node;
  // }

};

/* EXPORT */

export {createComment, createHTMLNode, createSVGNode, createText};
