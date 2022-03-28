
/* IMPORT */

import {styled as goober, setup} from 'goober';
import {prefix} from 'goober/prefixer';
import type {Child, ComponentIntrinsicElement, ComponentStyled, Component, Props, StyledElements} from '../types';
import createElement from '../create_element';
import {isFunction} from '../utils/lang';
import autoglobal from './autoglobal';
import cls from './class';
import css from './css';
import global from './global';
import keyframes from './keyframes';

/* SETUP */

setup ( createElement, prefix );

/* MAIN */

const styled = <P extends Props = {}> ( component: Component ): (( strings: TemplateStringsArray, ...expressions: any[] ) => ( props: P ) => Child) => {

  const styled = goober<Component, P> ( component as any ); //TSC

  const classNamePrev = isFunction ( component ) ? component['className'] || '' : '';
  const classNew = cls ( 'styled' );
  const classNameNext = classNamePrev ? `${classNamePrev} ${classNew.raw}` : classNew.raw;

  return function () {

    const component: ComponentStyled = styled.apply ( styled, arguments );

    component.className = classNameNext;
    component.toString = () => classNew.cooked;

    return component;

  };

};

/* UTILITIES */

styled.autoglobal = autoglobal;
styled.class = cls;
styled.css = css;
styled.global = global;
styled.keyframes = keyframes;

const styledWithElements = new Proxy ( styled, {
  get ( target: object, key: ComponentIntrinsicElement ) {
    return ( key in target ) ? target[key] : styled ( key );
  }
}) as (typeof styled & StyledElements); //TSC

/* EXPORT */

export default styledWithElements;
