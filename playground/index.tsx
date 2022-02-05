
/** @jsx createElement */
/** @jsxFrag Fragment */

/* IMPORT */

import {Component, ErrorBoundary, For, Fragment, If, Portal} from '../src';
import {useCleanup, useComputed, useDisposed, useEffect, useError, useFrom, useObservable, usePromise} from '../src';
import {$, $$, createElement, render, template} from '../src';
import type {ViewElement} from '../src/types';

/* MAIN */

//TODO: Test all built-in components
//TODO: Test child
//TODO: Test children

const TEST_INTERVAL = 500; // Lowering this makes it easier to spot some memory leaks

const TestNullStatic = (): ViewElement => {
  return [
    <h3>Null - Static</h3>,
    <p>{null}</p>
  ];
};

const TestNullObservable = (): ViewElement => {
  const o = $( null );
  const toggle = () => o.update ( prev => ( prev === null ) ? '' : null );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Null - Observable</h3>,
    <p>{o}</p>
  ];
};

const TestUndefinedStatic = (): ViewElement => {
  return [
    <h3>Undefined - Static</h3>,
    <p>{undefined}</p>
  ];
};

const TestUndefinedObservable = (): ViewElement => {
  const o = $( undefined );
  const toggle = () => o.update ( prev => ( prev === undefined ) ? '' : undefined );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Undefined - Observable</h3>,
    <p>{o}</p>
  ];
};

const TestBooleanStatic = (): ViewElement => {
  return [
    <h3>Boolean - Static</h3>,
    <p>{true}{false}</p>
  ];
};

const TestBooleanObservable = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Boolean - Observable</h3>,
    <p>{o}</p>
  ];
};

const TestBooleanRemoval = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => prev ? null : true );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Boolean - Removal</h3>,
    <p>({o})</p>
  ];
};

const TestNumberStatic = (): ViewElement => {
  return [
    <h3>Number - Static</h3>,
    <p>{123}</p>
  ];
};

const TestNumberObservable = (): ViewElement => {
  const o = $( Math.random () );
  const randomize = () => o ( Math.random () );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>Number - Observable</h3>,
    <p>{o}</p>
  ];
};

const TestNumberRemoval = (): ViewElement => {
  const o = $( Math.random () );
  const randomize = () => o.update ( prev => prev ? null : Math.random () );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>Number - Removal</h3>,
    <p>({o})</p>
  ];
};

const TestBigIntStatic = (): ViewElement => {
  return [
    <h3>BigInt - Static</h3>,
    <p>{123n}</p>
  ];
};

const TestBigIntObservable = (): ViewElement => {
  const o = $( BigInt ( Math.random () * 100 | 0 ) );
  const randomize = () => o ( BigInt ( Math.random () * 100 | 0 ) );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>BigInt - Observable</h3>,
    <p>{o}</p>
  ];
};

const TestBigIntRemoval = (): ViewElement => {
  const o = $( BigInt ( Math.random () * 100 | 0 ) );
  const randomize = () => o.update ( prev => prev ? null : BigInt ( Math.random () * 100 | 0 ) );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>BigInt - Removal</h3>,
    <p>({o})</p>
  ];
};

const TestStringStatic = (): ViewElement => {
  return [
    <h3>String - Static</h3>,
    <p>{'string'}</p>
  ];
};

const TestStringObservable = (): ViewElement => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o ( String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>String - Observable</h3>,
    <p>{o}</p>
  ];
};

const TestStringRemoval = (): ViewElement => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o.update ( prev => prev ? null : String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>String - Removal</h3>,
    <p>({o})</p>
  ];
};

const TestSymbolStatic = (): ViewElement => {
  return [
    <h3>Symbol - Static</h3>,
    <p>{Symbol ()}</p>
  ];
};

const TestSymbolObservable = (): ViewElement => {
  const o = $( Symbol () );
  const randomize = () => o ( Symbol () );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>Symbol - Observable</h3>,
    <p>{o}</p>
  ];
};

const TestSymbolRemoval = (): ViewElement => {
  const o = $( Symbol () );
  const randomize = () => o.update ( prev => prev ? null : Symbol () );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>Symbol - Removal</h3>,
    <p>({o})</p>
  ];
};

const TestAttributeStatic = (): ViewElement => {
  return [
    <h3>Attribute - Static</h3>,
    <p data-color="red">content</p>
  ];
};

const TestAttributeStaticFunction = (): ViewElement => {
  return [
    <h3>Attribute - Static Function</h3>,
    <p data-color={() => 'danger'}>content</p>
  ];
};

const TestAttributeObservable = (): ViewElement => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Attribute - Observable</h3>,
    <p data-color={o}>content</p>
  ];
};

const TestAttributeObservableBoolean = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Attribute - Observable Boolean</h3>,
    <p data-red={o}>content</p>
  ];
};

const TestAttributeRemoval = (): ViewElement => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? null : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Attribute - Removal</h3>,
    <p data-color={o}>content</p>
  ];
};

const TestPropertyCheckedStatic = (): ViewElement => {
  return [
    <h3>Property - Checked Static</h3>,
    <p><input type="checkbox" checked={true} /></p>
  ];
};

const TestPropertyCheckedObservable = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Property - Checked Observable</h3>,
    <p><input type="checkbox" checked={o} /></p>
  ];
};

const TestPropertyCheckedRemoval = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => prev ? null : true );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Property - Checked Removal</h3>,
    <p><input type="checkbox" checked={o} /></p>
  ];
};

const TestPropertyValueStatic = (): ViewElement => {
  return [
    <h3>Property - Value Static</h3>,
    <p><input value="value" /></p>
  ];
};

const TestPropertyValueObservable = (): ViewElement => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o ( String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>Property - Value Observable</h3>,
    <p><input value={o} /></p>
  ];
};

const TestPropertyValueRemoval = (): ViewElement => {
  const o = $( String ( Math.random () ) );
  const randomize = () => o.update ( prev => prev ? null : String ( Math.random () ) );
  setInterval ( randomize, TEST_INTERVAL );
  return [
    <h3>Property - Value Removal</h3>,
    <p><input value={o} /></p>
  ];
};

const TestClassNameStatic = (): ViewElement => {
  return [
    <h3>ClassName - Static</h3>,
    <p className="red">content</p>
  ];
};

const TestClassNameObservable = (): ViewElement => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>ClassName - Observable</h3>,
    <p className={o}>content</p>
  ];
};

const TestClassNameRemoval = (): ViewElement => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => prev ? null : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>ClassName - Removal</h3>,
    <p className={o}>content</p>
  ];
};

const TestClassStatic = (): ViewElement => {
  return [
    <h3>Class - Static</h3>,
    <p class={{ red: true, blue: false }}>content</p>
  ];
};

const TestClassStaticString = (): ViewElement => {
  return [
    <h3>Class - Static String</h3>,
    <p class="red">content</p>
  ];
};

const TestClassObservable = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Class - Observable</h3>,
    <p class={{ red: o }}>content</p>
  ];
};

const TestClassObservableString = (): ViewElement => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => ( prev === 'red' ) ? 'blue' : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Class - Observable String</h3>,
    <p class={o}>content</p>
  ];
};

const TestClassRemoval = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => prev ? null : true );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Class - Removal</h3>,
    <p class={{ red: o }}>content</p>
  ];
};

const TestClassRemovalString = (): ViewElement => {
  const o = $( 'red' );
  const toggle = () => o.update ( prev => prev ? null : 'red' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Class - Removal String</h3>,
    <p class={o}>content</p>
  ];
};

const TestClassesStatic = (): ViewElement => {
  return [
    <h3>Classes - Static</h3>,
    <p class={{ red: true, blue: false }}>content</p>
  ];
};

const TestClassesObservable = (): ViewElement => {
  const o = $({ red: true, blue: false });
  const toggle = () => o.update ( prev => prev.red ? { red: false, blue: true } : { red: true, blue: false } );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Classes - Observable</h3>,
    <p class={o}>content</p>
  ];
};

const TestClassesCleanup = (): ViewElement => {
  const o = $({ red: true });
  const toggle = () => o.update ( prev => prev.red ? { blue: true } : { red: true } );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Classes - Cleanup</h3>,
    <p class={o}>content</p>
  ];
};

const TestStyleStatic = (): ViewElement => {
  return [
    <h3>Style - Static</h3>,
    <p style={{ color: 'green' }}>content</p>
  ];
};

const TestStyleStaticNumeric = (): ViewElement => {
  return [
    <h3>Style - Static Numeric</h3>,
    <p style={{ flexGrow: 1, height: 50 }}>content</p>
  ];
};

const TestStyleStaticString = (): ViewElement => {
  return [
    <h3>Style - Static String</h3>,
    <p style="flex-grow: 1; height: 50px;">content</p>
  ];
};

const TestStyleStaticVariable = (): ViewElement => {
  return [
    <h3>Style - Static Variable</h3>,
    <p style={{ color: 'var(--color)', '--color': 'green' }}>content</p>
  ];
};

const TestStyleObservable = (): ViewElement => {
  const o = $( 'green' );
  const toggle = () => o.update ( prev => ( prev === 'green' ) ? 'orange' : 'green' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Style - Observable</h3>,
    <p style={{ color: o }}>content</p>
  ];
};

const TestStyleObservableNumeric = (): ViewElement => {
  const o = $( { flexGrow: 1, width: 50 } );
  const toggle = () => o.update ( prev => ( prev.flexGrow === 1 ) ? { flexGrow: 2, width: 100 } : { flexGrow: 1, width: 50 } );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Style - Static Numeric</h3>,
    <p style={o}>content</p>
  ];
};

const TestStyleObservableString = (): ViewElement => {
  const o = $( 'color: green' );
  const toggle = () => o.update ( prev => ( prev === 'color: green' ) ? 'color: orange' : 'color: green' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Style - Observable String</h3>,
    <p style={o}>content</p>
  ];
};

const TestStyleObservableVariable = (): ViewElement => {
  const o = $( 'green' );
  const toggle = () => o.update ( prev => ( prev === 'orange' ) ? 'green' : 'orange' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Style - Observable Variable</h3>,
    <p style={{ color: 'var(--color)', '--color': o }}>content</p>
  ];
};

const TestStyleRemoval = (): ViewElement => {
  const o = $( 'green' );
  const toggle = () => o.update ( prev => prev ? null : 'green' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Style - Removal</h3>,
    <p style={{ color: o }}>content</p>
  ];
};

const TestStylesStatic = (): ViewElement => {
  return [
    <h3>Styles - Static</h3>,
    <p style={{ color: 'green' }}>content</p>
  ];
};

const TestStylesObservable = (): ViewElement => {
  const o = $({ color: 'orange', fontWeight: 'normal' });
  const toggle = () => o.update ( prev => ( prev.color === 'orange' ) ? { color: 'green', fontWeight: 'bold' } : { color: 'orange', fontWeight: 'normal' } );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Styles - Observable</h3>,
    <p style={o}>content</p>
  ];
};

const TestStylesObservableCleanup = (): ViewElement => {
  const o = $({ color: 'orange', fontWeight: 'bold' });
  const toggle = () => o.update ( prev => ( prev.color === 'orange' ) ? { fontStyle: 'italic', textDecoration: 'line-through' } : { color: 'orange', fontWeight: 'bold' } );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Styles - Observable Cleanup</h3>,
    <p style={o}>content</p>
  ];
};

const TestHTMLInnerHTMLStatic = (): ViewElement => {
  return [
    <h3>HTML - innerHTML - Static</h3>,
    <p innerHTML="<b>danger</b>" />
  ];
};

const TestHTMLInnerHTMLObservable = (): ViewElement => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o.update ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>HTML - innerHTML - Observable</h3>,
    <p innerHTML={o} />
  ];
};

const TestHTMLOuterHTMLStatic = (): ViewElement => {
  return [
    <h3>HTML - outerHTML - Static</h3>,
    <p outerHTML="<b>danger</b>" />
  ];
};

const TestHTMLOuterHTMLObservable = (): ViewElement => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o.update ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>HTML - outerHTML - Observable</h3>,
    <p outerHTML={o} />
  ];
};

const TestHTMLTextContentStatic = (): ViewElement => {
  return [
    <h3>HTML - textContent - Static</h3>,
    <p textContent="<b>danger</b>" />
  ];
};

const TestHTMLTextContentObservable = (): ViewElement => {
  const o = $( '<b>danger1</b>' );
  const toggle = () => o.update ( prev => ( prev === '<b>danger1</b>' ) ? '<b>danger2</b>' : '<b>danger1</b>' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>HTML - textContent - Observable</h3>,
    <p textContent={o} />
  ];
};

const TestHTMLDangerouslySetInnerHTMLStatic = (): ViewElement => {
  return [
    <h3>HTML - dangerouslySetInnerHTML - Static</h3>,
    <p dangerouslySetInnerHTML={{ __html: '<i>danger</i>' }} />
  ];
};

const TestHTMLDangerouslySetInnerHTMLObservable = (): ViewElement => {
  const o = $( { __html: '<i>danger</i>' } );
  const toggle = () => o.update ( prev => ( prev.__html === '<i>danger</i>' ) ? { __html: '<b>danger</b>' } : { __html: '<i>danger</i>' } );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>HTML - dangerouslySetInnerHTML - Observable</h3>,
    <p dangerouslySetInnerHTML={o} />
  ];
};

const TestHTMLDangerouslySetInnerHTMLObservableString = (): ViewElement => {
  const o = $( '<i>danger</i>' );
  const toggle = () => o.update ( prev => ( prev === '<i>danger</i>' ) ? '<b>danger</b>' : '<i>danger</i>' );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>HTML - dangerouslySetInnerHTML - Observable String</h3>,
    <p dangerouslySetInnerHTML={{ __html: o }} />
  ];
};

const TestEventClickStatic = (): ViewElement => {
  const o = $( 0 );
  const increment = () => o.update ( prev => prev + 1 );
  return [
    <h3>Event - Click Static</h3>,
    <p><button onClick={increment}>{o}</button></p>
  ];
};

const TestEventClickObservable = (): ViewElement => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const plus2 = () => o.update ( prev => {
    onClick.set ( minus1 );
    return prev + 2;
  });
  const minus1 = () => o.update ( prev => {
    onClick.set ( plus2 );
    return prev - 1;
  });
  onClick.set ( plus2 );
  return [
    <h3>Event - Click Observable</h3>,
    <p><button onClick={onClick}>{o}</button></p>
  ];
};

const TestEventClickRemoval = (): ViewElement => {
  const o = $( 0 );
  const onClick = $( () => {} );
  const increment = () => o.update ( prev => {
    onClick.set ( null );
    return prev + 1;
  });
  onClick.set ( increment );
  return [
    <h3>Event - Click Removal</h3>,
    <p><button onClick={onClick}>{o}</button></p>
  ];
};

const TestABCD = () => {
  const AB = (): ViewElement => {
    const a = <i>a</i>;
    const b = <u>b</u>;
    const component = $( a );
    const toggle = () => component ( ( component () === a ) ? b : a );
    setInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const CD = (): ViewElement => {
    const c = <b>c</b>;
    const d = <span>d</span>;
    const component = $( c );
    const toggle = () => component ( ( component () === c ) ? d : c );
    setInterval ( toggle, TEST_INTERVAL / 2 );
    return component;
  };
  const ab = <AB />;
  const cd = <CD />;
  const component = $( ab );
  const toggle = () => component ( ( component () === ab ) ? cd : ab );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>Children - ABCD</h3>,
    <p>{component}</p>
  ];
};

const TestIfStatic = (): ViewElement => {
  return [
    <h3>If - Static</h3>,
    <If when={true}>
      <p>true</p>
    </If>,
    <If when={false}>
      <p>false</p>
    </If>
  ];
};

const TestIfRemoval = (): ViewElement => {
  const o = $( true );
  const toggle = () => o.update ( prev => !prev );
  setInterval ( toggle, TEST_INTERVAL );
  return [
    <h3>If - Removal</h3>,
    <p>(<If when={o}>content</If>)</p>
  ];
};

class TestComponentStatic extends Component<{}> {
  render (): ViewElement {
    return [
      <h3>Component - Static</h3>,
      <p>content</p>
    ];
  }
}

class TestComponentObservable extends Component<{}> {
  getRandom (): number {
    return Math.random ();
  }
  render (): ViewElement {
    const o = $( this.getRandom () );
    const randomize = () => o ( this.getRandom () );
    setInterval ( randomize, TEST_INTERVAL );
    return [
      <h3>Component - Observable</h3>,
      <p>{o}</p>
    ];
  }
}

const TestFragmentStatic = (): ViewElement => {
  return (
    <>
      <h3>Fragment - Static</h3>
      <p>content</p>
    </>
  );
};

const TestFragmentStaticDeep = (): ViewElement => {
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

const TestErrorBundary = (): ViewElement => {
  const Erroring = (): ViewElement => {
    const o = $( true );
    const toggle = () => o.update ( prev => !prev );
    setTimeout ( toggle, TEST_INTERVAL );
    return o.on ( value => {
       if ( value ) return <p>content</p>;
       throw new Error ( 'Custom error' );
    });
  };
  const Fallback = ({ error, reset }): ViewElement => {
    setTimeout ( reset, TEST_INTERVAL );
    return <p>Error caught: {error.message}</p>;
  };
  return [
    <h3>Error Boundary</h3>,
    <ErrorBoundary fallback={Fallback}>
      <Erroring />
    </ErrorBoundary>
  ];
};

const TestChildren = (): ViewElement => {
  const A = ({ children }): ViewElement => {
    return <div class="A">{children}</div>;
  };
  const B = ({ children }): ViewElement => {
    return <div class="B">{children}</div>;
  };
  const C = ({ children }): ViewElement => {
    return <div class="C">{children}</div>;
  };
  return [
    <h3>Children</h3>,
    <A>
      <B>
        <C>
          <p>content</p>
        </C>
      </B>
    </A>
  ]
};

const TestPortalStatic = (): ViewElement => {
  return [
    <h3>Portal - Static</h3>,
    <Portal>
      <p>content</p>
    </Portal>
  ];

};

const Test = (): ViewElement => {
  return [
    <TestNullStatic />,
    <TestNullObservable />,
    <TestUndefinedStatic />,
    <TestUndefinedObservable />,
    <TestBooleanStatic />,
    <TestBooleanObservable />,
    <TestBooleanRemoval />,
    <TestNumberStatic />,
    <TestNumberObservable />,
    <TestNumberRemoval />,
    <TestBigIntStatic />,
    <TestBigIntObservable />,
    <TestBigIntRemoval />,
    <TestStringStatic />,
    <TestStringObservable />,
    <TestStringRemoval />,
    <TestSymbolStatic />,
    <TestSymbolObservable />,
    <TestSymbolRemoval />,
    <TestAttributeStatic />,
    <TestAttributeStaticFunction />,
    <TestAttributeObservable />,
    <TestAttributeObservableBoolean />,
    <TestAttributeRemoval />,
    <TestPropertyCheckedStatic />,
    <TestPropertyCheckedObservable />,
    <TestPropertyCheckedRemoval />,
    <TestPropertyValueStatic />,
    <TestPropertyValueObservable />,
    <TestPropertyValueRemoval />,
    <TestClassNameStatic />,
    <TestClassNameObservable />,
    <TestClassNameRemoval />,
    <TestClassStatic />,
    <TestClassStaticString />,
    <TestClassObservable />,
    <TestClassObservableString />,
    <TestClassRemoval />,
    <TestClassRemovalString />,
    <TestClassesStatic />,
    <TestClassesObservable />,
    <TestClassesCleanup />,
    <TestStyleStatic />,
    <TestStyleStaticNumeric />,
    <TestStyleStaticString />,
    <TestStyleStaticVariable />,
    <TestStyleObservable />,
    <TestStyleObservableNumeric />,
    <TestStyleObservableString />,
    <TestStyleObservableVariable />,
    <TestStyleRemoval />,
    <TestStylesStatic />,
    <TestStylesObservable />,
    <TestStylesObservableCleanup />,
    <TestHTMLInnerHTMLStatic />,
    <TestHTMLInnerHTMLObservable />,
    <TestHTMLOuterHTMLStatic />,
    <TestHTMLOuterHTMLObservable />,
    <TestHTMLTextContentStatic />,
    <TestHTMLTextContentObservable />,
    <TestHTMLDangerouslySetInnerHTMLStatic />,
    <TestHTMLDangerouslySetInnerHTMLObservable />,
    <TestHTMLDangerouslySetInnerHTMLObservableString />,
    <TestEventClickStatic />,
    <TestEventClickObservable />,
    <TestEventClickRemoval />,
    <TestABCD />,
    <TestIfStatic />,
    <TestIfRemoval />,
    <TestComponentStatic />,
    <TestComponentObservable />,
    <TestFragmentStatic />,
    <TestFragmentStaticDeep />,
    <TestErrorBundary />,
    <TestChildren />,
    // <TestPortalStatic />
  ];
};

render ( Test, document.body );
