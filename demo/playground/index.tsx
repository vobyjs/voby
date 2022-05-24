
/* IMPORT */

import * as Voby from 'voby';
import {Observable} from 'voby';
import {Component, Dynamic, ErrorBoundary, For, If, Portal, Suspense, Switch, Ternary} from 'voby';
import {useBatch, useComputed, useContext, useEffect, useInterval, usePromise, useResource, useTimeout} from 'voby';
import {$, createContext, lazy, render, renderToString, template} from 'voby';

globalThis.Voby = Voby;

/* HELPERS */

const TEST_INTERVAL = 500; // Lowering this makes it easier to spot some memory leaks

const random = Math.random;

/* MAIN */

//TODO: Test that error boundaries wrapped around built-in components work
//TODO: Test template with all sorts of supported props

const TestNullStatic = (): JSX.Element => {
  return (
    <>
      <h3>Null - Static</h3>
      <p>{null}</p>
    </>
  );
};

const TestNullObservable = (): JSX.Element => {
  const o = $<string>( null );
  const toggle = () => o ( prev => ( prev === null ) ? '' : null );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Null - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestNullFunction = (): JSX.Element => {
  const o = $<string>( null );
  const toggle = () => o ( prev => ( prev === null ) ? '' : null );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Null - Function</h3>
      <p>{() => o ()}</p>
    </>
  );
};

const TestNullRemoval = (): JSX.Element => {
  const o = $<string>( null );
  const toggle = () => o ( prev => ( prev === null ) ? '' : null );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Null - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestUndefinedStatic = (): JSX.Element => {
  return (
    <>
      <h3>Undefined - Static</h3>
      <p>{undefined}</p>
    </>
  );
};

const TestUndefinedObservable = (): JSX.Element => {
  const o = $<string>( undefined );
  const toggle = () => o ( prev => ( prev === undefined ) ? '' : undefined );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Undefined - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestUndefinedFunction = (): JSX.Element => {
  const o = $<string>( undefined );
  const toggle = () => o ( prev => ( prev === undefined ) ? '' : undefined );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Undefined - Function</h3>
      <p>{() => o ()}</p>
    </>
  );
};

const TestUndefinedRemoval = (): JSX.Element => {
  const o = $<string>( undefined );
  const toggle = () => o ( prev => ( prev === undefined ) ? '' : undefined );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Undefined - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestBooleanStatic = (): JSX.Element => {
  return (
    <>
      <h3>Boolean - Static</h3>
      <p>{true}{false}</p>
    </>
  );
};

const TestBooleanObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Boolean - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestBooleanFunction = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Boolean - Function</h3>
      <p>{() => o ()}</p>
    </>
  );
};

const TestBooleanRemoval = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => prev ? null : true );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Boolean - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestSymbolStatic = (): JSX.Element => {
  return (
    <>
      <h3>Symbol - Static</h3>
      <p>{Symbol ()}</p>
    </>
  );
};

const TestSymbolObservable = (): JSX.Element => {
  const o = $( Symbol () );
  const randomize = () => o ( Symbol () );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Symbol - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestSymbolFunction = (): JSX.Element => {
  const o = $( Symbol () );
  const randomize = () => o ( Symbol () );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Symbol - Function</h3>
      <p>{() => o ()}</p>
    </>
  );
};

const TestSymbolRemoval = (): JSX.Element => {
  const o = $( Symbol () );
  const randomize = () => o ( prev => prev ? null : Symbol () );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Symbol - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestNumberStatic = (): JSX.Element => {
  return (
    <>
      <h3>Number - Static</h3>
      <p>{123}</p>
    </>
  );
};

const TestNumberObservable = (): JSX.Element => {
  const o = $( random () );
  const randomize = () => o ( random () );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Number - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestNumberFunction = (): JSX.Element => {
  const o = $( random () );
  const randomize = () => o ( random () );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Number - Function</h3>
      <p>{() => o ()}</p>
    </>
  );
};

const TestNumberRemoval = (): JSX.Element => {
  const o = $( random () );
  const randomize = () => o ( prev => prev ? null : random () );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Number - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestBigIntStatic = (): JSX.Element => {
  return (
    <>
      <h3>BigInt - Static</h3>
      <p>{123n}</p>
    </>
  );
};

const TestBigIntObservable = (): JSX.Element => {
  const o = $( BigInt ( random () * 100 | 0 ) );
  const randomize = () => o ( BigInt ( random () * 100 | 0 ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>BigInt - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestBigIntFunction = (): JSX.Element => {
  const o = $( BigInt ( random () * 100 | 0 ) );
  const randomize = () => o ( BigInt ( random () * 100 | 0 ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>BigInt - Function</h3>
      <p>{() => o ()}</p>
    </>
  );
};

const TestBigIntRemoval = (): JSX.Element => {
  const o = $( BigInt ( random () * 100 | 0 ) );
  const randomize = () => o ( prev => prev ? null : BigInt ( random () * 100 | 0 ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>BigInt - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestStringStatic = (): JSX.Element => {
  return (
    <>
      <h3>String - Static</h3>
      <p>{'string'}</p>
    </>
  );
};

const TestStringObservable = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>String - Observable</h3>
      <p>{o}</p>
    </>
  );
};

const TestStringObservableStatic = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>String - Observable Static</h3>
      <p>{o ()}</p>
    </>
  );
};

const TestStringObservableDeepStatic = (): JSX.Element => {
  return useComputed ( () => {
    const Deep = (): JSX.Element => {
      const o = $( String ( random () ) );
      const randomize = () => o ( String ( random () ) );
      useInterval ( randomize, TEST_INTERVAL );
      return (
        <>
          <h3>String - Observable Deep Static</h3>
          <p>{o ()}</p>
        </>
      );
    };
    return <Deep />;
  });
};

const TestStringFunction = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>String - Function</h3>
      <p>{() => o ()}</p>
    </>
  );
};

const TestStringRemoval = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( prev => prev ? null : String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>String - Removal</h3>
      <p>({o})</p>
    </>
  );
};

const TestAttributeStatic = (): JSX.Element => {
  return (
    <>
      <h3>Attribute - Static</h3>
      <p data-color="red">content</p>
    </>
  );
};

const TestAttributeObservable = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Observable</h3>
      <p data-color={o}>content</p>
    </>
  );
};

const TestAttributeObservableBoolean = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Observable Boolean</h3>
      <p data-red={o}>content</p>
    </>
  );
};

const TestAttributeFunction = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Function</h3>
      <p data-color={() => `dark${o ()}`}>content</p>
    </>
  );
};

const TestAttributeFunctionBoolean = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Function Boolean</h3>
      <p data-red={() => !o ()}>content</p>
    </>
  );
};

const TestAttributeRemoval = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => ( prev === 'red' ) ? null : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Attribute - Removal</h3>
      <p data-color={o}>content</p>
    </>
  );
};

const TestPropertyCheckedStatic = (): JSX.Element => {
  return (
    <>
      <h3>Property - Checked Static</h3>
      <p><input type="checkbox" checked={true} /></p>
    </>
  );
};

const TestPropertyCheckedObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Checked Observable</h3>
      <p><input type="checkbox" checked={o} /></p>
    </>
  );
};

const TestPropertyCheckedFunction = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Checked Function</h3>
      <p><input type="checkbox" checked={() => o ()} /></p>
    </>
  );
};

const TestPropertyCheckedRemoval = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => prev ? null : true );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Checked Removal</h3>
      <p><input type="checkbox" checked={o} /></p>
    </>
  );
};

const TestPropertyValueStatic = (): JSX.Element => {
  return (
    <>
      <h3>Property - Value Static</h3>
      <p><input value="value" /></p>
    </>
  );
};

const TestPropertyValueObservable = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Value Observable</h3>
      <p><input value={o} /></p>
    </>
  );
};

const TestPropertyValueFunction = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Value Function</h3>
      <p><input value={() => o ()} /></p>
    </>
  );
};

const TestPropertyValueRemoval = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( prev => prev ? null : String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Property - Value Removal</h3>
      <p><input value={o} /></p>
    </>
  );
};

const TestInputLabelFor = (): JSX.Element => {
  const o = $( String ( random () ) );
  const randomize = () => o ( prev => prev ? null : String ( random () ) );
  useInterval ( randomize, TEST_INTERVAL );
  return (
    <>
      <h3>Input - Label For</h3>
      <p><label htmlFor="for-target">htmlFor</label></p>
      <p><label for="for-target">for</label></p>
      <p><input id="for-target" /></p>
    </>
  );
};

const TestClassNameStatic = (): JSX.Element => {
  return (
    <>
      <h3>ClassName - Static</h3>
      <p className="red">content</p>
    </>
  );
};

const TestClassNameObservable = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>ClassName - Observable</h3>
      <p className={o}>content</p>
    </>
  );
};

const TestClassNameFunction = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>ClassName - Function</h3>
      <p className={() => o ()}>content</p>
    </>
  );
};

const TestClassNameRemoval = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => prev ? null : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>ClassName - Removal</h3>
      <p className={o}>content</p>
    </>
  );
};

const TestClassStatic = (): JSX.Element => {
  return (
    <>
      <h3>Class - Static</h3>
      <p class={{ red: true, blue: false }}>content</p>
    </>
  );
};

const TestClassStaticString = (): JSX.Element => {
  return (
    <>
      <h3>Class - Static String</h3>
      <p class="red">content</p>
    </>
  );
};

const TestClassObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Observable</h3>
      <p class={{ red: o }}>content</p>
    </>
  );
};

const TestClassObservableString = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Observable String</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestClassFunction = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Function Boolean</h3>
      <p class={{ red: () => o () }}>content</p>
    </>
  );
};

const TestClassFunctionString = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Function String</h3>
      <p class={() => o ()}>content</p>
    </>
  );
};

const TestClassRemoval = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => prev ? null : true );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Removal</h3>
      <p class={{ red: o }}>content</p>
    </>
  );
};

const TestClassRemovalString = (): JSX.Element => {
  const o = $( 'red' );
  const toggle = () => o ( prev => prev ? null : 'red' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Class - Removal String</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestClassesStatic = (): JSX.Element => {
  return (
    <>
      <h3>Classes - Static</h3>
      <p class={{ red: true, blue: false }}>content</p>
    </>
  );
};

const TestClassesObservable = (): JSX.Element => {
  const o = $({ red: true, blue: false });
  const toggle = () => o ( prev => prev.red ? { red: false, blue: true } : { red: true, blue: false } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Classes - Observable</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestClassesFunction = (): JSX.Element => {
  const o = $({ red: true, blue: false });
  const toggle = () => o ( prev => prev.red ? { red: false, blue: true } : { red: true, blue: false } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Classes - Function</h3>
      <p class={() => o ()}>content</p>
    </>
  );
};

const TestClassesRemoval = (): JSX.Element => {
  const o = $({ red: true, blue: false });
  const toggle = () => o ( prev => prev ? null : { red: true, blue: false } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Classes - Removal</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestClassesCleanup = (): JSX.Element => {
  const o = $<JSX.ClassProperties>({ red: true });
  const toggle = () => o ( prev => prev.red ? { blue: true } : { red: true } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Classes - Cleanup</h3>
      <p class={o}>content</p>
    </>
  );
};

const TestStyleStatic = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static</h3>
      <p style={{ color: 'green' }}>content</p>
    </>
  );
};

const TestStyleStaticNumeric = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static Numeric</h3>
      <p style={{ flexGrow: 1, height: 50 }}>content</p>
    </>
  );
};

const TestStyleStaticString = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static String</h3>
      <p style="flex-grow: 1; height: 50px;">content</p>
    </>
  );
};

const TestStyleStaticVariable = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static Variable</h3>
      <p style={{ color: 'var(--color)', '--color': 'green' }}>content</p>
    </>
  );
};

const TestStyleObservable = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o ( prev => ( prev === 'green' ) ? 'orange' : 'green' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Observable</h3>
      <p style={{ color: o }}>content</p>
    </>
  );
};

const TestStyleObservableNumeric = (): JSX.Element => {
  const o = $( { flexGrow: 1, width: 50 } );
  const toggle = () => o ( prev => ( prev.flexGrow === 1 ) ? { flexGrow: 2, width: 100 } : { flexGrow: 1, width: 50 } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Observable Numeric</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestStyleObservableString = (): JSX.Element => {
  const o = $( 'color: green' );
  const toggle = () => o ( prev => ( prev === 'color: green' ) ? 'color: orange' : 'color: green' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Observable String</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestStyleObservableVariable = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o ( prev => ( prev === 'orange' ) ? 'green' : 'orange' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Observable Variable</h3>
      <p style={{ color: 'var(--color)', '--color': o }}>content</p>
    </>
  );
};

const TestStyleFunction = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o ( prev => ( prev === 'green' ) ? 'orange' : 'green' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Function</h3>
      <p style={{ color: () => o () }}>content</p>
    </>
  );
};

const TestStyleFunctionNumeric = (): JSX.Element => {
  const o = $( { flexGrow: 1, width: 50 } );
  const toggle = () => o ( prev => ( prev.flexGrow === 1 ) ? { flexGrow: 2, width: 100 } : { flexGrow: 1, width: 50 } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Function Numeric</h3>
      <p style={() => o ()}>content</p>
    </>
  );
};

const TestStyleFunctionString = (): JSX.Element => {
  const o = $( 'color: green' );
  const toggle = () => o ( prev => ( prev === 'color: green' ) ? 'color: orange' : 'color: green' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Function String</h3>
      <p style={() => o ()}>content</p>
    </>
  );
};

const TestStyleFunctionVariable = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o ( prev => ( prev === 'orange' ) ? 'green' : 'orange' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Function Variable</h3>
      <p style={{ color: 'var(--color)', '--color': () => o () }}>content</p>
    </>
  );
};

const TestStyleRemoval = (): JSX.Element => {
  const o = $( 'green' );
  const toggle = () => o ( prev => prev ? null : 'green' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Style - Removal</h3>
      <p style={{ color: o }}>content</p>
    </>
  );
};

const TestStylesStatic = (): JSX.Element => {
  return (
    <>
      <h3>Styles - Static</h3>
      <p style={{ color: 'green' }}>content</p>
    </>
  );
};

const TestStylesObservable = (): JSX.Element => {
  const o = $({ color: 'orange', fontWeight: 'normal' });
  const toggle = () => o ( prev => ( prev.color === 'orange' ) ? { color: 'green', fontWeight: 'bold' } : { color: 'orange', fontWeight: 'normal' } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Styles - Observable</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestStylesFunction = (): JSX.Element => {
  const o = $({ color: 'orange', fontWeight: 'normal' });
  const toggle = () => o ( prev => ( prev.color === 'orange' ) ? { color: 'green', fontWeight: 'bold' } : { color: 'orange', fontWeight: 'normal' } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Styles - Function</h3>
      <p style={() => o ()}>content</p>
    </>
  );
};

const TestStylesRemoval = (): JSX.Element => {
  const o = $({ color: 'orange', fontWeight: 'normal' });
  const toggle = () => o ( prev => prev ? null : { color: 'orange', fontWeight: 'normal' } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Styles - Removal</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestStylesCleanup = (): JSX.Element => {
  const o = $<JSX.StyleProperties>({ color: 'orange', fontWeight: 'bold' });
  const toggle = () => o ( prev => ( prev.color === 'orange' ) ? { fontStyle: 'italic', textDecoration: 'line-through' } : { color: 'orange', fontWeight: 'bold' } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Styles - Observable Cleanup</h3>
      <p style={o}>content</p>
    </>
  );
};

const TestHTMLInnerHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - innerHTML - Static</h3>
      <p innerHTML="<b>danger</b>" />
    </>
  );
};

const TestHTMLInnerHTMLObservable = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - innerHTML - Observable</h3>
      <p innerHTML={o} />
    </>
  );
};

const TestHTMLInnerHTMLFunction = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - innerHTML - Function</h3>
      <p innerHTML={() => o ()} />
    </>
  );
};

const TestHTMLOuterHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - outerHTML - Static</h3>
      <p outerHTML="<b>danger</b>" />
    </>
  );
};

const TestHTMLOuterHTMLObservable = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - outerHTML - Observable</h3>
      <p outerHTML={o} />
    </>
  );
};

const TestHTMLOuterHTMLFunction = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - outerHTML - Function</h3>
      <p outerHTML={() => o ()} />
    </>
  );
};

const TestHTMLTextContentStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - textContent - Static</h3>
      <p textContent="<b>danger</b>" />
    </>
  );
};

const TestHTMLTextContentObservable = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - textContent - Observable</h3>
      <p textContent={o} />
    </>
  );
};

const TestHTMLTextContentFunction = (): JSX.Element => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - textContent - Function</h3>
      <p textContent={() => o ()} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Static</h3>
      <p dangerouslySetInnerHTML={{ __html: '<i>danger</i>' }} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLObservable = (): JSX.Element => {
  const o = $( { __html: '<i>danger</i>' } );
  const toggle = () => o ( prev => ( prev.__html === '<i>danger</i>' ) ? { __html: '<b>danger</b>' } : { __html: '<i>danger</i>' } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Observable</h3>
      <p dangerouslySetInnerHTML={o} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLObservableString = (): JSX.Element => {
  const o = $( '<i>danger</i>' );
  const toggle = () => o ( prev => ( prev === '<i>danger</i>' ) ? '<b>danger</b>' : '<i>danger</i>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Observable String</h3>
      <p dangerouslySetInnerHTML={{ __html: o }} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLFunction = (): JSX.Element => {
  const o = $( { __html: '<i>danger</i>' } );
  const toggle = () => o ( prev => ( prev.__html === '<i>danger</i>' ) ? { __html: '<b>danger</b>' } : { __html: '<i>danger</i>' } );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Function</h3>
      <p dangerouslySetInnerHTML={() => o ()} />
    </>
  );
};

const TestHTMLDangerouslySetInnerHTMLFunctionString = (): JSX.Element => {
  const o = $( '<i>danger</i>' );
  const toggle = () => o ( prev => ( prev === '<i>danger</i>' ) ? '<b>danger</b>' : '<i>danger</i>' );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Function String</h3>
      <p dangerouslySetInnerHTML={{ __html: () => o () }} />
    </>
  );
};

const TestEventClickStatic = (): JSX.Element => {
  const o = $( 0 );
  const increment = () => o ( prev => prev + 1 );
  return (
    <>
      <h3>Event - Click Static</h3>
      <p><button onClick={increment}>{o}</button></p>
    </>
  );
};

const TestEventClickObservable = (): JSX.Element => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const plus2 = () => o ( prev => {
    onClick ( () => minus1 );
    return prev + 2;
  });
  const minus1 = () => o ( prev => {
    onClick ( () => plus2 );
    return prev - 1;
  });
  onClick ( () => plus2 );
  return (
    <>
      <h3>Event - Click Observable</h3>
      <p><button onClick={onClick}>{o}</button></p>
    </>
  );
};

const TestEventClickRemoval = (): JSX.Element => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const increment = () => o ( prev => {
    onClick ( () => null );
    return prev + 1;
  });
  onClick ( () => increment );
  return (
    <>
      <h3>Event - Click Removal</h3>
      <p><button onClick={onClick}>{o}</button></p>
    </>
  );
};

const TestEventClickCaptureStatic = (): JSX.Element => {
  const o = $( 0 );
  const increment = () => o ( prev => prev + 1 );
  return (
    <>
      <h3>Event - Click Capture Static</h3>
      <p><button onClickCapture={increment}>{o}</button></p>
    </>
  );
};

const TestEventClickCaptureObservable = (): JSX.Element => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const plus2 = () => o ( prev => {
    onClick ( () => minus1 );
    return prev + 2;
  });
  const minus1 = () => o ( prev => {
    onClick ( () => plus2 );
    return prev - 1;
  });
  onClick ( () => plus2 );
  return (
    <>
      <h3>Event - Click Capture Observable</h3>
      <p><button onClickCapture={onClick}>{o}</button></p>
    </>
  );
};

const TestEventClickCaptureRemoval = (): JSX.Element => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const increment = () => o ( prev => {
    onClick ( () => null );
    return prev + 1;
  });
  onClick ( () => increment );
  return (
    <>
      <h3>Event - Click Capture Removal</h3>
      <p><button onClickCapture={onClick}>{o}</button></p>
    </>
  );
};

const TestEventClickAndClickCaptureStatic = (): JSX.Element => {
  const o = $( 0 );
  const increment = () => o ( prev => prev + 1 );
  return (
    <>
      <h3>Event - Click & Click Capture Static</h3>
      <p><button onClick={increment} onClickCapture={increment}>{o}</button></p>
    </>
  );
};

const TestEventClickStopPropagation = (): JSX.Element => {
  const outer = $(0);
  const inner = $(0);
  const incrementOuter = () => outer ( prev => prev + 1 );
  const incrementInner = event => {
    event.stopPropagation ();
    inner ( prev => prev + 1 );
  };
  return (
    <>
      <h3>Event - Click - Stop Propagation</h3>
      <p><button onClick={incrementOuter}>{outer}<button onClick={incrementInner}>{inner}</button></button></p>
    </>
  );
};

const TestEventClickStopImmediatePropagation = (): JSX.Element => {
  const outer = $(0);
  const inner = $(0);
  const incrementOuter = () => outer ( prev => prev + 1 );
  const incrementInner = event => {
    event.stopImmediatePropagation ();
    inner ( prev => prev + 1 );
  };
  return (
    <>
      <h3>Event - Click - Stop Immediate Propagation</h3>
      <p><button onClick={incrementOuter}>{outer}<button onClick={incrementInner}>{inner}</button></button></p>
    </>
  );
};

const TestEventEnterStopPropagation = (): JSX.Element => {
  const outer = $(0);
  const inner = $(0);
  const incrementOuter = () => outer ( prev => prev + 1 );
  const incrementInner = event => {
    event.stopPropagation ();
    inner ( prev => prev + 1 );
  };
  return (
    <>
      <h3>Event - Enter - Stop Propagation</h3>
      <p><button onMouseEnter={incrementOuter}>{outer}<button onMouseEnter={incrementInner}>{inner}</button></button></p>
    </>
  );
};

const TestEventEnterStopImmediatePropagation = (): JSX.Element => {
  const outer = $(0);
  const inner = $(0);
  const incrementOuter = () => outer ( prev => prev + 1 );
  const incrementInner = event => {
    event.stopImmediatePropagation ();
    inner ( prev => prev + 1 );
  };
  return (
    <>
      <h3>Event - Enter - Stop Immediate Propagation</h3>
      <p><button onMouseEnter={incrementOuter}>{outer}<button onMouseEnter={incrementInner}>{inner}</button></button></p>
    </>
  );
};

const TestEventEnterAndEnterCaptureStatic = (): JSX.Element => {
  const o = $( 0 );
  const increment = () => o ( prev => prev + 1 );
  return (
    <>
      <h3>Event - Enter & Enter Capture Static</h3>
      <p><button onMouseEnter={increment} onMouseEnterCapture={increment}>{o}</button></p>
    </>
  );
};

const TestABCD = (): JSX.Element => {
  const AB = (): JSX.Element => {
    const a = <i>a</i>;
    const b = <u>b</u>;
    const component = $( a );
    const toggle = () => component ( () => ( component () === a ) ? b : a );
    useInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const CD = (): JSX.Element => {
    const c = <b>c</b>;
    const d = <span>d</span>;
    const component = $( c );
    const toggle = () => component ( () => ( component () === c ) ? d : c );
    useInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const ab = <AB />;
  const cd = <CD />;
  const component = $( ab );
  const toggle = () => component ( () => ( component () === ab ) ? cd : ab );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Children - ABCD</h3>
      <p>{component}</p>
    </>
  );
};

const TestCleanupInner = () => {
  const page = $( true );
  const togglePage = () => page ( prev => !prev );
  const Page1 = () => {
    setTimeout ( togglePage, TEST_INTERVAL );
    return (
      <>
        <p>page1</p>
        <button onClick={togglePage}>Toggle Page</button>
      </>
    );
  };
  const Page2 = () => {
    const bool = $( true );
    const toggle = () => bool ( prev => !prev );
    setTimeout ( toggle, TEST_INTERVAL );
    setTimeout ( togglePage, TEST_INTERVAL * 2 );
    return (
      <>
        <If when={bool}>
          <p>page2 - true</p>
        </If>
        <If when={() => !bool ()}>
          <p>page2 - false</p>
        </If>
        <button onClick={toggle}>Toggle</button>
        <button onClick={togglePage}>Toggle Page</button>
      </>
    );
  };
  return () => {
    const Page = page () ? Page1 : Page2;
    return (
      <>
        <h3>Cleanup - Inner</h3>
        <Page />
      </>
    );
  };
};

const TestCleanupInnerPortal = () => {
  return (
    <Portal>
      <TestCleanupInner />
    </Portal>
  );
};

const TestDynamicHeading = (): JSX.Element => {
  const level = $(1);
  const increment = () => level ( ( level () + 1 ) % 7 || 1 );
  useInterval ( increment, TEST_INTERVAL );
  return (
    <>
      <h3>Dynamic - Heading</h3>
      {() => (
        <Dynamic component={`h${level ()}`}>
          Level: {level}
        </Dynamic>
      )}
    </>
  );
};

const TestDynamicObservableComponent = (): JSX.Element => {
  const level = $(1);
  const component = useComputed ( () => `h${level ()}` );
  const increment = () => level ( ( level () + 1 ) % 7 || 1 );
  useInterval ( increment, TEST_INTERVAL );
  return (
    <>
      <h3>Dynamic - Observable Component</h3>
      <Dynamic component={component}>
        Level: {level}
      </Dynamic>
    </>
  );
};

const TestDynamicObservableProps = (): JSX.Element => {
  const red = { class: 'red' };
  const blue = { class: 'blue' };
  const props = $(red);
  const toggle = () => props ( prev => prev === red ? blue : red );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Dynamic - Observable Props</h3>
      <Dynamic component="h5" props={props}>
        Content
      </Dynamic>
    </>
  );
};

const TestDynamicObservableChildren = (): JSX.Element => {
  const o = $(random ());
  const update = () => o ( random () );
  useInterval ( update, TEST_INTERVAL );
  return (
    <>
      <h3>Dynamic - Observable Props</h3>
      <Dynamic component="h5">
        {o}
      </Dynamic>
    </>
  );
};

const TestIfStatic = (): JSX.Element => {
  return (
    <>
      <h3>If - Static</h3>
      <If when={true}>
        <p>true</p>
      </If>
      <If when={false}>
        <p>false</p>
      </If>
    </>
  );
};

const TestIfObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>If - Observable</h3>
      <p>(<If when={o}>content</If>)</p>
    </>
  );
};

const TestIfFunction = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>If - Function</h3>
      <p>(<If when={() => o ()}>content</If>)</p>
    </>
  );
};

const TestIfChildrenObservableStatic = (): JSX.Element => {
  const Content = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>{o ()}</p>
  };
  return (
    <>
      <h3>If - Children Observable Static</h3>
      <If when={true}><Content /></If>
    </>
  );
};

const TestIfChildrenFunction = (): JSX.Element => {
  const Content = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>{o ()}</p>
  };
  return (
    <>
      <h3>If - Children Function</h3>
      <If when={true}>{Content}</If>
    </>
  );
};

const TestIfFallbackStatic = (): JSX.Element => {
  return (
    <>
      <h3>If - Fallback Static</h3>
      <If when={false} fallback={<p>Fallback!</p>}>Children</If>
    </>
  );
};

const TestIfFallbackObservable = (): JSX.Element => {
  const Fallback = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    return <p>Fallback: {o}</p>
  };
  return (
    <>
      <h3>If - Fallback Observable</h3>
      <If when={false} fallback={<Fallback />}>Children</If>
    </>
  );
};

const TestIfFallbackObservableStatic = (): JSX.Element => {
  const Fallback = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Fallback: {o ()}</p>
  };
  return (
    <>
      <h3>If - Fallback Observable Static</h3>
      <If when={false} fallback={<Fallback />}>Children</If>
    </>
  );
};

const TestIfFallbackFunction = (): JSX.Element => {
  const Fallback = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Fallback: {o ()}</p>
  };
  return (
    <>
      <h3>If - Fallback Function</h3>
      <If when={false} fallback={Fallback}>Children</If>
    </>
  );
};

const TestIfRace = () => {
  const data = $({ deep: 'hi' });
  const visible = $(true);
  setTimeout ( () => {
    useBatch ( () => {
      data ( null );
      visible ( false );
    });
  });
  return (
    <>
      <h3>If - Race</h3>
      <If when={visible}>
        <div>{() => data ().deep}</div>
      </If>
    </>
  );
};

const TestTernaryStatic = (): JSX.Element => {
  return (
    <>
      <h3>Ternary - Static</h3>
      <Ternary when={true}>
        <p>true (1)</p>
        <p>false (1)</p>
      </Ternary>
      <Ternary when={false}>
        <p>true (2)</p>
        <p>false (2)</p>
      </Ternary>
    </>
  );
};

const TestTernaryStaticInline = (): JSX.Element => {
  return (
    <>
      <h3>Ternary - Static Inline</h3>
      <Ternary when={true}><p>true (1)</p><p>false (1)</p></Ternary>
      <Ternary when={false}><p>true (2)</p><p>false (2)</p></Ternary>
    </>
  );
};

const TestTernaryObservable = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Ternary - Observable</h3>
      <Ternary when={o}>
        <p>true</p>
        <p>false</p>
      </Ternary>
    </>
  );
};

const TestTernaryObservableChildren = (): JSX.Element => {
  const AB = (): JSX.Element => {
    const a = <i>a</i>;
    const b = <u>b</u>;
    const component = $( a );
    const toggle = () => component ( () => ( component () === a ) ? b : a );
    useInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const CD = (): JSX.Element => {
    const c = <b>c</b>;
    const d = <span>d</span>;
    const component = $( c );
    const toggle = () => component ( () => ( component () === c ) ? d : c );
    useInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Ternary - Observable Children</h3>
      <Ternary when={o}>
        <AB />
        <CD />
      </Ternary>
    </>
  );
};

const TestTernaryFunction = (): JSX.Element => {
  const o = $( true );
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Ternary - Function</h3>
      <Ternary when={() => !o()}>
        <p>true</p>
        <p>false</p>
      </Ternary>
    </>
  );
};

const TestTernaryChildrenObservableStatic = (): JSX.Element => {
  const True = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>True: {o ()}</p>
  };
  const False = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>False: {o ()}</p>
  };
  return (
    <>
      <h3>Ternary - Children Observable Static</h3>
      <Ternary when={true}>
        <True />
        <False />
      </Ternary>
      <Ternary when={false}>
        <True />
        <False />
      </Ternary>
    </>
  );
};

const TestTernaryChildrenFunction = (): JSX.Element => {
  const True = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>True: {o ()}</p>
  };
  const False = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>False: {o ()}</p>
  };
  return (
    <>
      <h3>Ternary - Children Function</h3>
      <Ternary when={true}>
        {True}
        {False}
      </Ternary>
      <Ternary when={false}>
        {True}
        {False}
      </Ternary>
    </>
  );
};

const TestSwitchStatic = (): JSX.Element => {
  return (
    <>
      <h3>Switch - Static</h3>
      <Switch when={2}>
        <Switch.Case when={0}>
          <p>0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>2</p>
        </Switch.Case>
        <Switch.Default>
          <p>default</p>
        </Switch.Default>
      </Switch>
    </>
  );
};

const TestSwitchObservable = (): JSX.Element => {
  const o = $( 0 );
  const toggle = () => o ( prev => ( prev + 1 ) % 4 );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Switch - Observable</h3>
      <Switch when={o}>
        <Switch.Case when={0}>
          <p>0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>2</p>
        </Switch.Case>
        <Switch.Default>
          <p>default</p>
        </Switch.Default>
      </Switch>
    </>
  );
};

const TestSwitchObservableComplex = (): JSX.Element => {
  const o = $( 0 );
  const toggle = () => o ( prev => ( prev + 1 ) % 4 );
  const o2 = $( 2 );
  const toggle2 = () => o2 ( prev => ( prev + 1 ) % 5 );
  const o3 = $( 4 );
  const toggle3 = () => o3 ( prev => ( prev + 1 ) % 4 );
  useInterval ( toggle, TEST_INTERVAL );
  useInterval ( toggle2, TEST_INTERVAL );
  useInterval ( toggle3, TEST_INTERVAL );
  return (
    <>
      <h3>Switch - Observable Complex</h3>
      <Switch when={o}>
        <Switch.Case when={0}>
          <p>1 - 0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1 - 1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>1 - 2</p>
        </Switch.Case>
      </Switch>
      <Switch when={o2}>
        <Switch.Case when={0}>
          <p>2 - 0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>2 - 1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>2 - 2</p>
        </Switch.Case>
      </Switch>
      <Switch when={o3}>
        <Switch.Case when={0}>
          <p>3 - 0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>3 - 1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>3 - 2</p>
        </Switch.Case>
      </Switch>
    </>
  );
};

const TestSwitchFunction = (): JSX.Element => {
  const o = $( 0 );
  const toggle = () => o ( prev => ( prev + 1 ) % 4 );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Switch - Function</h3>
      <Switch when={() => o ()}>
        <Switch.Case when={0}>
          <p>0</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1</p>
        </Switch.Case>
        <Switch.Case when={2}>
          <p>2</p>
        </Switch.Case>
        <Switch.Default>
          <p>default</p>
        </Switch.Default>
      </Switch>
    </>
  );
};

const TestSwitchCaseObservableStatic = (): JSX.Element => {
  const Case = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Case: {o ()}</p>
  };
  return (
    <>
      <h3>Switch - Case Observable Static</h3>
      <Switch when={0}>
        <Switch.Case when={0}>
          <Case />
        </Switch.Case>
        <Switch.Default>
          <p>default</p>
        </Switch.Default>
      </Switch>
    </>
  );
};

const TestSwitchCaseFunction = (): JSX.Element => {
  const Case = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Case: {o ()}</p>
  };
  return (
    <>
      <h3>Switch - Case Function</h3>
      <Switch when={0}>
        <Switch.Case when={0}>
          {Case}
        </Switch.Case>
        <Switch.Default>
          <p>default</p>
        </Switch.Default>
      </Switch>
    </>
  );
};

const TestSwitchDefaultObservableStatic = (): JSX.Element => {
  const Default = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Default: {o ()}</p>
  };
  return (
    <>
      <h3>Switch - Default Observable Static</h3>
      <Switch when={-1}>
        <Switch.Case when={0}>
          <p>case</p>
        </Switch.Case>
        <Switch.Default>
          <Default />
        </Switch.Default>
      </Switch>
    </>
  );
};

const TestSwitchDefaultFunction = (): JSX.Element => {
  const Default = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Default: {o ()}</p>
  };
  return (
    <>
      <h3>Switch - Default Function</h3>
      <Switch when={-1}>
        <Switch.Case when={0}>
          <p>case</p>
        </Switch.Case>
        <Switch.Default>
          {Default}
        </Switch.Default>
      </Switch>
    </>
  );
};

class TestComponentStatic extends Component<{}> {
  render (): JSX.Element {
    return (
      <>
        <h3>Component - Static</h3>
        <p>content</p>
      </>
    );
  }
}

class TestComponentStaticProps extends Component<{ value: number }> {
  render (): JSX.Element {
    return (
      <>
        <h3>Component - Static Props</h3>
        <p>{this.props.value}</p>
      </>
    );
  }
}

class TestComponentStaticRenderProps extends Component<{ value: number }> {
  render (props): JSX.Element {
    return (
      <>
        <h3>Component - Static Render Props</h3>
        <p>{props.value}</p>
      </>
    );
  }
}

class TestComponentObservable extends Component<{}> {
  getRandom (): number {
    return random ();
  }
  render (): JSX.Element {
    const o = $( this.getRandom () );
    const randomize = () => o ( this.getRandom () );
    useInterval ( randomize, TEST_INTERVAL );
    return (
      <>
        <h3>Component - Observable</h3>
        <p>{o}</p>
      </>
    );
  }
}

class TestComponentFunction extends Component<{}> {
  getRandom (): number {
    return random ();
  }
  render (): JSX.Element {
    const o = $( this.getRandom () );
    const randomize = () => o ( this.getRandom () );
    useInterval ( randomize, TEST_INTERVAL );
    return (
      <>
        <h3>Component - Function</h3>
        <p>{() => o ()}</p>
      </>
    );
  }
}

const TestForStatic = (): JSX.Element => {
  const values = [1, 2, 3];
  return (
    <>
      <h3>For - Static</h3>
      <For values={values}>
        {( value: number ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestForObservables = (): JSX.Element => {
  const v1 = $(1);
  const v2 = $(2);
  const v3 = $(3);
  const values = [v1, v2, v3];
  useInterval ( () => v1 ( v1 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v2 ( v2 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v3 ( v3 () + 1 ), TEST_INTERVAL );
  return (
    <>
      <h3>For - Observables</h3>
      <For values={values}>
        {( value: Observable<number> ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestForObservablesStatic = (): JSX.Element => {
  const v1 = $(1);
  const v2 = $(2);
  const v3 = $(3);
  const values = [v1, v2, v3];
  useInterval ( () => v1 ( v1 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v2 ( v2 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v3 ( v3 () + 1 ), TEST_INTERVAL );
  return (
    <>
      <h3>For - Observables Static</h3>
      <For values={values}>
        {( value: Observable<number> ) => {
          value ();
          return <p>Value: {value ()}</p>
        }}
      </For>
    </>
  )
};

const TestForObservableObservables = (): JSX.Element => {
  const v1 = $(1);
  const v2 = $(2);
  const v3 = $(3);
  const v4 = $(4);
  const v5 = $(5);
  const values = $([v1, v2, v3, v4, v5]);
  useInterval ( () => v1 ( v1 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v2 ( v2 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v3 ( v3 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v4 ( v4 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v5 ( v5 () + 1 ), TEST_INTERVAL );
  useInterval ( () => values ( values ().slice ().sort ( () => .5 - random () ) ), TEST_INTERVAL );
  return (
    <>
      <h3>For - Observable Observables</h3>
      <For values={values}>
        {( value: Observable<number> ) => {
          return <p>Value: {value}</p>;
        }}
      </For>
    </>
  )
};

const TestForFunctionObservables = (): JSX.Element => {
  const v1 = $(1);
  const v2 = $(2);
  const v3 = $(3);
  const values = [v1, v2, v3];
  useInterval ( () => v1 ( v1 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v2 ( v2 () + 1 ), TEST_INTERVAL );
  useInterval ( () => v3 ( v3 () + 1 ), TEST_INTERVAL );
  return (
    <>
      <h3>For - Function Observables</h3>
      <For values={() => values}>
        {( value: Observable<number> ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestForRandom = (): JSX.Element => {
  const values = $([random (), random (), random ()]);
  const update = () => values ( [random (), random (), random ()] );
  useInterval ( update, TEST_INTERVAL );
  return (
    <>
      <h3>For - Random</h3>
      <For values={values}>
        {( value: number ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestForFallbackStatic = (): JSX.Element => {
  return (
    <>
      <h3>For - Fallback Static</h3>
      <For values={[]} fallback={<div>Fallback!</div>}>
        {( value: number ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestForFallbackObservable = (): JSX.Element => {
  const Fallback = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    return (
      <>
        <p>Fallback: {o}</p>
      </>
    );
  };
  return (
    <>
      <h3>For - Fallback Observable</h3>
      <For values={[]} fallback={<Fallback />}>
        {( value: number ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestForFallbackObservableStatic = (): JSX.Element => {
  const Fallback = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return (
      <>
        <p>Fallback: {o ()}</p>
      </>
    );
  };
  return (
    <>
      <h3>For - Fallback Observable Static</h3>
      <For values={[]} fallback={<Fallback />}>
        {( value: number ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestForFallbackFunction = (): JSX.Element => {
  const Fallback = () => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return (
      <>
        <p>Fallback: {o ()}</p>
      </>
    );
  };
  return (
    <>
      <h3>For - Fallback Function</h3>
      <For values={[]} fallback={Fallback}>
        {( value: number ) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
};

const TestFragmentStatic = (): JSX.Element => {
  return (
    <>
      <h3>Fragment - Static</h3>
      <p>content</p>
    </>
  );
};

const TestFragmentStaticComponent = (): JSX.Element => {
  return (
    <Fragment>
      <h3>Fragment - Static Component</h3>
      <p>content</p>
    </Fragment>
  );
};

const TestFragmentStaticDeep = (): JSX.Element => {
  return (
    <>
      <h3>Fragment - Static Deep</h3>
      <>
        <p>first</p>
      </>
      <>
        <p>second</p>
      </>
      <>
        <>
          <>
            <>
              <p>deep</p>
            </>
          </>
        </>
      </>
    </>
  );
};

const TestErrorBoundary = (): JSX.Element => {
  const Erroring = (): JSX.Element => {
    const o = $( true );
    const toggle = () => o ( prev => !prev );
    useTimeout ( toggle, TEST_INTERVAL );
    return useComputed ( () => {
      if ( o () ) return <p>content</p>;
      throw new Error ( 'Custom error' );
    });
  };
  const Fallback = ({ error, reset }): JSX.Element => {
    useTimeout ( reset, TEST_INTERVAL );
    return <p>Error caught: {error.message}</p>;
  };
  return (
    <>
      <h3>Error Boundary</h3>
      <ErrorBoundary fallback={Fallback}>
        <Erroring />
      </ErrorBoundary>
    </>
  );
};

const TestChildren = (): JSX.Element => {
  const A = ({ children }): JSX.Element => {
    return <div class="A">{children}</div>;
  };
  const B = ({ children }): JSX.Element => {
    return <div class="B">{children}</div>;
  };
  const C = ({ children }): JSX.Element => {
    return <div class="C">{children}</div>;
  };
  return (
    <>
      <h3>Children</h3>
      <A>
        <B>
          <C>
            <p>content</p>
          </C>
        </B>
      </A>
    </>
  );
};

const TestErrorBoundaryChildrenObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Children: {o ()}</p>
  };
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>;
  };
  return (
    <>
      <h3>Error Boundary - Children Observable Static</h3>
      <ErrorBoundary fallback={<Fallback />}>
        <Children />
      </ErrorBoundary>
    </>
  );
};

const TestErrorBoundaryChildrenFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Children: {o ()}</p>
  };
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>;
  };
  return (
    <>
      <h3>Error Boundary - Children Function</h3>
      <ErrorBoundary fallback={<Fallback />}>
        {Children}
      </ErrorBoundary>
    </>
  );
};

const TestErrorBoundaryFallbackObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    throw new Error ();
  };
  const Fallback = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Fallback: {o ()}</p>
  };
  return (
    <>
      <h3>Error Boundary - Fallback Observable Static</h3>
      <ErrorBoundary fallback={<Fallback />}>
        <Children />
      </ErrorBoundary>
    </>
  );
};

const TestErrorBoundaryFallbackFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    throw new Error ();
  };
  const Fallback = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Fallback: {o ()}</p>
  };
  return (
    <>
      <h3>Error Boundary - Fallback Function</h3>
      <ErrorBoundary fallback={Fallback}>
        <Children />
      </ErrorBoundary>
    </>
  );
};

const TestRef = (): JSX.Element => {
  const ref = $<HTMLElement>();
  useEffect ( () => {
    if ( !ref () ) return;
    ref ().textContent = `Got ref - Has parent: ${!!ref ()?.parentElement} - Is connected: ${!!ref ()?.isConnected}`;
  });
  return (
    <>
      <h3>Ref</h3>
      <p ref={ref}>content</p>
    </>
  );
};

const TestRefs = (): JSX.Element => {
  const ref1 = $<HTMLElement>();
  const ref2 = $<HTMLElement>();
  useEffect ( () => {
    if ( !ref1 () ) return;
    if ( !ref2 () ) return;
    const content1 = `Got ref1 - Has parent: ${!!ref1 ()?.parentElement} - Is connected: ${!!ref1 ()?.isConnected}`;
    const content2 = `Got ref2 - Has parent: ${!!ref2 ()?.parentElement} - Is connected: ${!!ref2 ()?.isConnected}`;
    ref1 ().textContent = `${content1} / ${content2}`;
  });
  return (
    <>
      <h3>Refs</h3>
      <p ref={[ref1, ref2]}>content</p>
    </>
  );
};

const TestRefUnmounting = (): JSX.Element => {
  const message = $('');
  const mounted = $( true );
  const ref = $<HTMLElement>();
  const toggle = () => mounted ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  useEffect ( () => {
    if ( ref () ) {
      message ( `Got ref - Has parent: ${!!ref ().parentElement} - Is connected: ${ref ().isConnected}` );
    } else {
      message ( `No ref` );
    }
  });
  return (
    <>
      <h3>Ref - Unmounting</h3>
      <p>{message}</p>
      <If when={mounted}>
        <p ref={ref}>content</p>
      </If>
    </>
  );
};

const TestPromise = (): JSX.Element => {
  const resolved = usePromise<number> ( new Promise ( resolve => setTimeout ( () => resolve ( 123 ), TEST_INTERVAL ) ) );
  const rejected = usePromise<number> ( new Promise ( ( _, reject ) => setTimeout ( () => reject ( 'Custom Error' ), TEST_INTERVAL ) ) );
  return (
    <>
      <h3>Promise</h3>
      {() => {
        if ( resolved ().loading ) return <p>loading...</p>;
        if ( resolved ().error ) return <p>{resolved ().error.message}</p>;
        return <p>{resolved ().value}</p>
      }}
      {() => {
        if ( rejected ().loading ) return <p>loading...</p>;
        if ( rejected ().error ) return <p>{rejected ().error.message}</p>;
        return <p>{rejected ().value}</p>
      }}
    </>
  );
};

const TestSVGStatic = (): JSX.Element => {
  const getColor = () => `#${Math.floor ( random () * 0xFFFFFF ).toString ( 16 ).padStart ( 6, '0' )}`;
  return (
    <>
      <h3>SVG - Static</h3>
      <svg viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke={getColor ()} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGStaticComplex = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Static Complex</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="8.838ex" height="2.398ex" role="img" focusable="false" viewBox="0 -966.5 3906.6 1060" xmlns:xlink="http://www.w3.org/1999/xlink" style="vertical-align: -0.212ex;">
        <defs>
          <path id="MJX-1-TEX-N-221A" d="M95 178Q89 178 81 186T72 200T103 230T169 280T207 309Q209 311 212 311H213Q219 311 227 294T281 177Q300 134 312 108L397 -77Q398 -77 501 136T707 565T814 786Q820 800 834 800Q841 800 846 794T853 782V776L620 293L385 -193Q381 -200 366 -200Q357 -200 354 -197Q352 -195 256 15L160 225L144 214Q129 202 113 190T95 178Z"></path>
          <path id="MJX-1-TEX-I-1D44E" d="M33 157Q33 258 109 349T280 441Q331 441 370 392Q386 422 416 422Q429 422 439 414T449 394Q449 381 412 234T374 68Q374 43 381 35T402 26Q411 27 422 35Q443 55 463 131Q469 151 473 152Q475 153 483 153H487Q506 153 506 144Q506 138 501 117T481 63T449 13Q436 0 417 -8Q409 -10 393 -10Q359 -10 336 5T306 36L300 51Q299 52 296 50Q294 48 292 46Q233 -10 172 -10Q117 -10 75 30T33 157ZM351 328Q351 334 346 350T323 385T277 405Q242 405 210 374T160 293Q131 214 119 129Q119 126 119 118T118 106Q118 61 136 44T179 26Q217 26 254 59T298 110Q300 114 325 217T351 328Z"></path>
          <path id="MJX-1-TEX-N-32" d="M109 429Q82 429 66 447T50 491Q50 562 103 614T235 666Q326 666 387 610T449 465Q449 422 429 383T381 315T301 241Q265 210 201 149L142 93L218 92Q375 92 385 97Q392 99 409 186V189H449V186Q448 183 436 95T421 3V0H50V19V31Q50 38 56 46T86 81Q115 113 136 137Q145 147 170 174T204 211T233 244T261 278T284 308T305 340T320 369T333 401T340 431T343 464Q343 527 309 573T212 619Q179 619 154 602T119 569T109 550Q109 549 114 549Q132 549 151 535T170 489Q170 464 154 447T109 429Z"></path>
          <path id="MJX-1-TEX-N-2B" d="M56 237T56 250T70 270H369V420L370 570Q380 583 389 583Q402 583 409 568V270H707Q722 262 722 250T707 230H409V-68Q401 -82 391 -82H389H387Q375 -82 369 -68V230H70Q56 237 56 250Z"></path>
          <path id="MJX-1-TEX-I-1D44F" d="M73 647Q73 657 77 670T89 683Q90 683 161 688T234 694Q246 694 246 685T212 542Q204 508 195 472T180 418L176 399Q176 396 182 402Q231 442 283 442Q345 442 383 396T422 280Q422 169 343 79T173 -11Q123 -11 82 27T40 150V159Q40 180 48 217T97 414Q147 611 147 623T109 637Q104 637 101 637H96Q86 637 83 637T76 640T73 647ZM336 325V331Q336 405 275 405Q258 405 240 397T207 376T181 352T163 330L157 322L136 236Q114 150 114 114Q114 66 138 42Q154 26 178 26Q211 26 245 58Q270 81 285 114T318 219Q336 291 336 325Z"></path>
        </defs>
        <g stroke="currentColor" fill="currentColor" stroke-width="0" transform="scale(1,-1)">
          <g data-mml-node="math">
            <g data-mml-node="msqrt">
              <g transform="translate(853,0)">
                <g data-mml-node="msup">
                  <g data-mml-node="mi">
                    <use data-c="1D44E" xlinkHref="#MJX-1-TEX-I-1D44E"></use>
                  </g>
                  <g data-mml-node="mn" transform="translate(562,289) scale(0.707)">
                    <use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use>
                  </g>
                </g>
                <g data-mml-node="mo" transform="translate(1187.8,0)">
                  <use data-c="2B" xlink:href="#MJX-1-TEX-N-2B"></use>
                </g>
                <g data-mml-node="msup" transform="translate(2188,0)">
                  <g data-mml-node="mi">
                    <use data-c="1D44F" xlink:href="#MJX-1-TEX-I-1D44F"></use>
                  </g>
                  <g data-mml-node="mn" transform="translate(462,289) scale(0.707)">
                    <use data-c="32" xlink:href="#MJX-1-TEX-N-32"></use>
                  </g>
                </g>
              </g>
              <g data-mml-node="mo" transform="translate(0,106.5)">
                <use data-c="221A" xlink:href="#MJX-1-TEX-N-221A"></use>
              </g>
              <rect width="3053.6" height="60" x="853" y="846.5"></rect>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

const TestSVGStaticCamelCase = (): JSX.Element => {
  const getColor = () => `#${Math.floor ( random () * 0xFFFFFF ).toString ( 16 ).padStart ( 6, '0' )}`;
  return (
    <>
      <h3>SVG - Static CamelCase</h3>
      <svg viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke={getColor ()} strokeWidth="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGObservable = (): JSX.Element => {
  const getColor = () => `#${Math.floor ( random () * 0xFFFFFF ).toString ( 16 ).padStart ( 6, '0' )}`;
  const color = $(getColor ());
  const update = () => color ( getColor () );
  useInterval ( update, TEST_INTERVAL / 2 );
  return (
    <>
      <h3>SVG - Observable</h3>
      <svg viewBox="0 0 50 50" width="50px" stroke={color} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGFunction = (): JSX.Element => {
  const getColor = () => `#${Math.floor ( random () * 0xFFFFFF ).toString ( 16 ).padStart ( 6, '0' )}`;
  const color = $(getColor ());
  const update = () => color ( getColor () );
  useInterval ( update, TEST_INTERVAL / 2 );
  return (
    <>
      <h3>SVG - Function</h3>
      <svg viewBox="0 0 50 50" width="50px" stroke={() => color ()} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGStyleObject = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Style Object</h3>
      <svg style={{ stroke: 'red', fill: 'pink' }} viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGStyleString = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Style String</h3>
      <svg style="stroke: red; fill: pink;" viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGClassObject = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Class Object</h3>
      <svg class={{ red: true }} viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGClassString = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Class String</h3>
      <svg class="red" viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestSVGClassNameString = (): JSX.Element => {
  return (
    <>
      <h3>SVG - ClassName String</h3>
      <svg className="red" viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  );
};

const TestTemplateExternal = (): JSX.Element => {
  const Templated = template<{ class: string, color: string }> ( props => {
    return (
      <div class={props.class}>
        <span>outer <span data-color={props.color}>inner</span></span>
      </div>
    );
  });
  return (
    <>
      <h3>Template - External</h3>
      <Templated class="red" color="blue" />
      <Templated class="blue" color="red" />
    </>
  );
};

const TestTemplateSVG = (): JSX.Element => {
  const getColor = () => `#${Math.floor ( random () * 0xFFFFFF ).toString ( 16 ).padStart ( 6, '0' )}`;
  const color = $(getColor ());
  const update = () => color ( getColor () );
  useInterval ( update, TEST_INTERVAL / 2 );
  const Templated = template<{ color }> ( props => {
    return (
      <svg viewBox="0 0 50 50" width="50px" stroke={props.color} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    );
  });
  return (
    <>
      <h3>Template - SVG</h3>
      <Templated color={color} />
    </>
  );
};

const TestContextComponents = (): JSX.Element => {
  const Context = createContext ();
  return (
    <>
      <h3>Context - Components</h3>
      <Context.Provider value="outer">
        <Context.Consumer>
          {value => {
            return <p>{value}</p>;
          }}
        </Context.Consumer>
        <Context.Provider value="inner">
          <Context.Consumer>
            {value => {
              return <p>{value}</p>;
            }}
          </Context.Consumer>
        </Context.Provider>
        <Context.Consumer>
          {value => {
            return <p>{value}</p>;
          }}
        </Context.Consumer>
      </Context.Provider>
    </>
  );
};

const TestContextHook = (): JSX.Element => {
  const Context = createContext ();
  const Reader = (): JSX.Element => {
    const value = useContext ( Context );
    return <p>{value}</p>;
  };
  return (
    <>
      <h3>Context - Hook</h3>
      <Context.Provider value="outer">
        <Reader />
        <Context.Provider value="inner">
          <Reader />
        </Context.Provider>
        <Reader />
      </Context.Provider>
    </>
  );
};

const TestRenderToString = async (): Promise<string> => {
  const App = (): JSX.Element => {
    const o = $( String ( random () ) );
    return (
      <div>
        <h3>renderToString</h3>
        <p>{o}</p>
      </div>
    );
  };
  const html = await renderToString ( <App /> );
  console.log ( { html } );
  return html;
};

const TestRenderToStringSuspense = async (): Promise<string> => {
  const App = (): JSX.Element => {
    const o = $(0);
    const Content = () => {
      useResource ( () => {
        return new Promise<number> ( resolve => {
          setTimeout ( () => {
            resolve ( o ( random () ) );
          }, TEST_INTERVAL );
        });
      });
      return <p>{o}</p>;
    };
    return (
      <div>
        <h3>renderToString - Suspense</h3>
        <Content />
      </div>
    );
  };
  const html = await renderToString ( <App /> );
  console.log ( { html } );
  return html;
};

const TestPortalStatic = (): JSX.Element => {
  return (
    <>
      <h3>Portal - Static</h3>
      <Portal>
        <p>content</p>
      </Portal>
    </>
  );
};

const TestPortalObservable = (): JSX.Element => {
  const AB = (): JSX.Element => {
    const a = <i>a</i>;
    const b = <u>b</u>;
    const component = $( a );
    const toggle = () => component ( () => ( component () === a ) ? b : a );
    useInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const CD = (): JSX.Element => {
    const c = <b>c</b>;
    const d = <span>d</span>;
    const component = $( c );
    const toggle = () => component ( () => ( component () === c ) ? d : c );
    useInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const ab = <AB />;
  const cd = <CD />;
  const component = $( ab );
  const toggle = () => component ( () => ( component () === ab ) ? cd : ab );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Portal - Observable</h3>
      <Portal>
        {component}
      </Portal>
    </>
  );
};

const TestPortalRemoval = (): JSX.Element => {
  const Inner = () => {
    const log = () => console.count ( 'portal.inner' );
    useInterval ( log, TEST_INTERVAL / 4 );
    return <p>content</p>;
  };
  const Portalized = () => {
    const log = () => console.count ( 'portal' );
    useInterval ( log, TEST_INTERVAL / 4 );
    return (
      <Portal>
        <Inner />
      </Portal>
    );
  };
  const o = $( true );
  const toggle = () => o ( prev => prev ? null : true );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Portal - Removal</h3>
      <If when={o}>
        <Portalized />
      </If>
    </>
  );
};

const TestSuspenseAlways = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>;
  };
  const Content = () => {
    useResource ( () => {
      return new Promise ( () => {} );
    });
    return <p>Content!</p>;
  };
  return (
    <>
      <h3>Suspense - Always</h3>
      <Suspense fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  );
};

const TestSuspenseNever = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>;
  };
  const Content = () => {
    return <p>Content!</p>;
  };
  return (
    <>
      <h3>Suspense - Never</h3>
      <Suspense fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  );
};

const TestSuspenseObservable = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>;
  };
  const Content = () => {
    const o = $(0);
    useResource ( () => {
      o ();
      return new Promise<void> ( resolve => {
        setTimeout ( () => {
          resolve ();
        }, TEST_INTERVAL / 2 );
      });
    });
    const refetch = () => o ( prev => prev + 1 );
    useInterval ( refetch, TEST_INTERVAL );
    return <p>Content!</p>;
  };
  return (
    <>
      <h3>Suspense - Observable</h3>
      <Suspense fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  );
};

const TestSuspenseWhen = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>;
  };
  const Content = () => {
    return <p>Content!</p>;
  };
  const o = $(true);
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Suspense - When</h3>
      <Suspense when={o} fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  );
};

const TestSuspenseAlive = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading ({random ()})...</p>;
  };
  const Content = () => {
    return <p>Content ({random ()})!</p>;
  };
  const o = $(true);
  const toggle = () => o ( prev => !prev );
  useInterval ( toggle, TEST_INTERVAL );
  return (
    <>
      <h3>Suspense - Alive</h3>
      <Suspense when={o} fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  );
};

const TestSuspenseChildrenObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Children: {o ()}</p>
  };
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>;
  };
  return (
    <>
      <h3>Suspense - Children Observable Static</h3>
      <Suspense fallback={<Fallback />}>
        <Children />
      </Suspense>
    </>
  );
};

const TestSuspenseChildrenFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Children: {o ()}</p>
  };
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>;
  };
  return (
    <>
      <h3>Suspense - Children Function</h3>
      <Suspense fallback={<Fallback />}>
        {Children}
      </Suspense>
    </>
  );
};

const TestSuspenseFallbackObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    useResource ( () => {
      return new Promise ( () => {} );
    });
    return <p>children</p>;
  };
  const Fallback = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Fallback: {o ()}</p>
  };
  return (
    <>
      <h3>Suspense - Fallback Observable Static</h3>
      <Suspense fallback={<Fallback />}>
        <Children />
      </Suspense>
    </>
  );
};

const TestSuspenseFallbackFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    useResource ( () => {
      return new Promise ( () => {} );
    });
    return <p>children</p>;
  };
  const Fallback = (): JSX.Element => {
    const o = $( String ( random () ) );
    const randomize = () => o ( String ( random () ) );
    useInterval ( randomize, TEST_INTERVAL );
    o ();
    return <p>Fallback: {o ()}</p>
  };
  return (
    <>
      <h3>Suspense - Fallback Function</h3>
      <Suspense fallback={Fallback}>
        <Children />
      </Suspense>
    </>
  );
};

const TestSuspenseCleanup = (): JSX.Element => {
  const ChildrenLoop = () => {
    useResource ( () => {
      return new Promise ( () => {} );
    });
    return <p>Loop!</p>;
  };
  const ChildrenPlain = () => {
    return <p>Loaded!</p>;
  };
  const Children = (): JSX.Element => {
    const o = $(true);
    const toggle = () => o ( prev => !prev );
    setTimeout ( toggle, TEST_INTERVAL );
    return (
      <Ternary when={o}>
        <ChildrenLoop />
        <ChildrenPlain />
      </Ternary>
    );
  };
  const Fallback = (): JSX.Element => {
    return <p>Loading...</p>
  };
  return (
    <>
      <h3>Suspense - Cleanup</h3>
      <Suspense fallback={<Fallback />}>
        <Children />
      </Suspense>
    </>
  );
};

const TestLazy = (): JSX.Element => {
  const Component = (): JSX.Element => {
    return <p>Loaded!</p>;
  }
  const Fallback = (): JSX.Element => {
    return <p>Loading...</p>;
  };
  const lazyFetcher = () => new Promise ( resolve => setTimeout ( () => resolve ( { default: Component } ), TEST_INTERVAL ) );
  const LazyComponent = lazy ( lazyFetcher );
  return (
    <>
      <h3>Lazy</h3>
      <Suspense fallback={<Fallback />}>
        <LazyComponent />
      </Suspense>
    </>
  );
};

const Test = (): JSX.Element => {
  TestRenderToString ();
  TestRenderToStringSuspense ();
  return (
    <>
      <TestNullStatic />
      <TestNullObservable />
      <TestNullFunction />
      <TestNullRemoval />
      <TestUndefinedStatic />
      <TestUndefinedObservable />
      <TestUndefinedFunction />
      <TestUndefinedRemoval />
      <TestBooleanStatic />
      <TestBooleanObservable />
      <TestBooleanFunction />
      <TestBooleanRemoval />
      <TestSymbolStatic />
      <TestSymbolObservable />
      <TestSymbolFunction />
      <TestSymbolRemoval />
      <TestNumberStatic />
      <TestNumberObservable />
      <TestNumberFunction />
      <TestNumberRemoval />
      <TestBigIntStatic />
      <TestBigIntObservable />
      <TestBigIntFunction />
      <TestBigIntRemoval />
      <TestStringStatic />
      <TestStringObservable />
      <TestStringObservableStatic />
      <TestStringObservableDeepStatic />
      <TestStringFunction />
      <TestStringRemoval />
      <TestAttributeStatic />
      <TestAttributeObservable />
      <TestAttributeObservableBoolean />
      <TestAttributeFunction />
      <TestAttributeFunctionBoolean />
      <TestAttributeRemoval />
      <TestPropertyCheckedStatic />
      <TestPropertyCheckedObservable />
      <TestPropertyCheckedFunction />
      <TestPropertyCheckedRemoval />
      <TestPropertyValueStatic />
      <TestPropertyValueObservable />
      <TestPropertyValueFunction />
      <TestPropertyValueRemoval />
      <TestInputLabelFor />
      <TestClassNameStatic />
      <TestClassNameObservable />
      <TestClassNameFunction />
      <TestClassNameRemoval />
      <TestClassStatic />
      <TestClassStaticString />
      <TestClassObservable />
      <TestClassObservableString />
      <TestClassFunction />
      <TestClassFunctionString />
      <TestClassRemoval />
      <TestClassRemovalString />
      <TestClassesStatic />
      <TestClassesObservable />
      <TestClassesFunction />
      <TestClassesRemoval />
      <TestClassesCleanup />
      <TestStyleStatic />
      <TestStyleStaticNumeric />
      <TestStyleStaticString />
      <TestStyleStaticVariable />
      <TestStyleObservable />
      <TestStyleObservableNumeric />
      <TestStyleObservableString />
      <TestStyleObservableVariable />
      <TestStyleFunction />
      <TestStyleFunctionNumeric />
      <TestStyleFunctionString />
      <TestStyleFunctionVariable />
      <TestStyleRemoval />
      <TestStylesStatic />
      <TestStylesObservable />
      <TestStylesFunction />
      <TestStylesRemoval />
      <TestStylesCleanup />
      <TestHTMLInnerHTMLStatic />
      <TestHTMLInnerHTMLObservable />
      <TestHTMLInnerHTMLFunction />
      <TestHTMLOuterHTMLStatic />
      <TestHTMLOuterHTMLObservable />
      <TestHTMLOuterHTMLFunction />
      <TestHTMLTextContentStatic />
      <TestHTMLTextContentObservable />
      <TestHTMLTextContentFunction />
      <TestHTMLDangerouslySetInnerHTMLStatic />
      <TestHTMLDangerouslySetInnerHTMLObservable />
      <TestHTMLDangerouslySetInnerHTMLObservableString />
      <TestHTMLDangerouslySetInnerHTMLFunction />
      <TestHTMLDangerouslySetInnerHTMLFunctionString />
      <TestEventClickStatic />
      <TestEventClickObservable />
      <TestEventClickRemoval />
      <TestEventClickCaptureStatic />
      <TestEventClickCaptureObservable />
      <TestEventClickCaptureRemoval />
      <TestEventClickAndClickCaptureStatic />
      <TestEventClickStopPropagation />
      <TestEventClickStopImmediatePropagation />
      <TestEventEnterStopPropagation />
      <TestEventEnterStopImmediatePropagation />
      <TestEventEnterAndEnterCaptureStatic />
      <TestABCD />
      <TestCleanupInner />
      <TestCleanupInnerPortal />
      <TestDynamicHeading />
      <TestDynamicObservableComponent />
      <TestDynamicObservableProps />
      <TestDynamicObservableChildren />
      <TestIfStatic />
      <TestIfObservable />
      <TestIfFunction />
      <TestIfChildrenObservableStatic />
      <TestIfChildrenFunction />
      <TestIfFallbackStatic />
      <TestIfFallbackObservable />
      <TestIfFallbackObservableStatic />
      <TestIfFallbackFunction />
      {/* <TestIfRace /> */}
      <TestTernaryStatic />
      <TestTernaryStaticInline />
      <TestTernaryObservable />
      <TestTernaryObservableChildren />
      <TestTernaryFunction />
      <TestTernaryChildrenObservableStatic />
      <TestTernaryChildrenFunction />
      <TestSwitchStatic />
      <TestSwitchObservable />
      <TestSwitchObservableComplex />
      <TestSwitchFunction />
      <TestSwitchCaseObservableStatic />
      <TestSwitchCaseFunction />
      <TestSwitchDefaultObservableStatic />
      <TestSwitchDefaultFunction />
      <TestComponentStatic />
      <TestComponentStaticProps value={123} />
      <TestComponentStaticRenderProps value={123} />
      <TestComponentObservable />
      <TestComponentFunction />
      <TestForStatic />
      <TestForObservables />
      <TestForObservablesStatic />
      <TestForObservableObservables />
      <TestForFunctionObservables />
      <TestForRandom />
      <TestForFallbackStatic />
      <TestForFallbackObservable />
      <TestForFallbackObservableStatic />
      <TestForFallbackFunction />
      <TestFragmentStatic />
      <TestFragmentStaticComponent />
      <TestFragmentStaticDeep />
      <TestErrorBoundary />
      <TestErrorBoundaryChildrenObservableStatic />
      <TestErrorBoundaryChildrenFunction />
      <TestErrorBoundaryFallbackObservableStatic />
      <TestErrorBoundaryFallbackFunction />
      <TestChildren />
      <TestRef />
      <TestRefs />
      <TestRefUnmounting />
      <TestSVGStatic />
      <TestSVGStaticComplex />
      <TestSVGStaticCamelCase />
      <TestSVGObservable />
      <TestSVGFunction />
      <TestSVGStyleObject />
      <TestSVGStyleString />
      <TestSVGClassObject />
      <TestSVGClassString />
      <TestSVGClassNameString />
      <TestTemplateExternal />
      <TestTemplateSVG />
      <TestPromise />
      <TestContextComponents />
      <TestContextHook />
      <TestPortalStatic />
      <TestPortalObservable />
      <TestPortalRemoval />
      <TestSuspenseAlways />
      <TestSuspenseNever />
      <TestSuspenseObservable />
      <TestSuspenseWhen />
      <TestSuspenseAlive />
      <TestSuspenseChildrenObservableStatic />
      <TestSuspenseChildrenFunction />
      <TestSuspenseFallbackObservableStatic />
      <TestSuspenseFallbackFunction />
      <TestSuspenseCleanup />
      <TestLazy />
      <hr />
    </>
  );
};

render ( Test, document.getElementById ( 'app' ) );
