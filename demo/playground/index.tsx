
/* IMPORT */

import * as Voby from 'voby'
import type { JSX, Observable } from 'voby'
import { Dynamic, ErrorBoundary, For, If, Portal, Suspense, Switch, Ternary } from 'voby'
import { useContext, useEffect, useInterval, useMemo, usePromise, useResource, useTimeout } from 'voby'
import { $, batch, createContext, createDirective, html, lazy, render, renderToString, store, template } from 'voby'
import type { Child } from 'voby/types'

globalThis.Voby = Voby

/* TYPE */

type FunctionUnwrap<T> = T extends ({ (): infer U }) ? U : T

/* HELPERS */

const TEST_INTERVAL = 500 // Lowering this makes it easier to spot some memory leaks

const assert = (result: boolean, message?: string): void => {

  console.assert(result, message)

}

const random = (): number => { // It's important for testing that 0, 1 or reused numbers are never returned

  const value = Math.random()

  if (value === 0 || value === 1) return random()

  return value

}

const randomBigInt = (): bigint => {

  return BigInt(Math.floor(random() * 100))

}

const randomColor = (): string => {

  return `#${Math.floor(random() * 0xFFFFFF).toString(16).padStart(6, '0')}`

}

const TestSnapshots = ({ Component, props }: { Component: (JSX.Component /* | Component<any> */) & { test: { static?: boolean, snapshots: string[] }, name: string }, props?: Record<any, any> }): JSX.Element => {
  const ref = $<HTMLDivElement>()
  let index = -1
  let htmlPrev = ''
  let ticks = 0
  const getHTML = (): string => {
    const element = ref()
    if (!element) return ''
    return element.innerHTML
  }
  const getSnapshot = (html: string): string => {
    const htmlWithoutTitle = html.replace(/<h3>[a-zA-Z0-9 -]*<\/h3>/, '')
    const htmlWithRandom = htmlWithoutTitle.replace(/0\.\d+/g, '{random}')
    const htmlWitRandomBigint = htmlWithRandom.replace(/(?<!\d)(0|[1-9][0-9]?|100)n/g, '{random-bigint}n')
    const htmlWithRandomHex = htmlWitRandomBigint.replace(/#[a-fA-F0-9]{6,8}/g, '{random-color}')
    return htmlWithRandomHex
  }
  const tick = (): void => {
    ticks += 1
    index = (index + 1) % Component.test.snapshots.length
    const expectedSnapshot = Component.test.snapshots[index]
    const actualHTML = getHTML()
    const actualSnapshot = getSnapshot(actualHTML)
    assert(actualSnapshot === expectedSnapshot, `[${Component.name}]: Expected '${actualSnapshot}' to be equal to '${expectedSnapshot}'`)
    if (expectedSnapshot.includes('{random}')) {
      assert(actualHTML !== htmlPrev, `[${Component.name}]: Expected to find different {random} values in the HTML`)
    }
    if (expectedSnapshot.includes('{random-bigint}')) {
      assert(actualHTML !== htmlPrev, `[${Component.name}]: Expected to find different {random-bigint} values in the HTML`)
    }
    if (expectedSnapshot.includes('{random-color}')) {
      assert(actualHTML !== htmlPrev, `[${Component.name}]: Expected to find different {random-color} values in the HTML`)
    }
    htmlPrev = actualHTML
  }
  const noUpdate = (): void => {
    assert(false, `[${Component.name}]: Expected no updates to even happen`)
  }
  const yesUpdate = (): void => {
    if (Component.test.static) return
    if (ticks > 1) return
    assert(false, `[${Component.name}]: Expected at least one update`)
  }
  useEffect(() => {
    const root = ref()
    if (!root) return
    tick()
    const timeoutId = setTimeout(yesUpdate, 1500)
    const onMutation = Component.test.static ? noUpdate : tick
    const observer = new MutationObserver(onMutation)
    const options = { attributes: true, childList: true, characterData: true, subtree: true }
    observer.observe(root, options)
    return () => observer.disconnect()
  })
  return (
    <div ref={ref}>
      <Component {...props} />
    </div>
  )
}

/* MAIN */

//TODO: Test that error boundaries wrapped around built-in components work
//TODO: Test template with all sorts of supported props
//TODO: Automate all tests
//TODO: Enable all tests
//TODO: Test ForIndex
//TODO: Test ForValue

const TestNullStatic = (): JSX.Element => {
  return (
    <>
      <h3 style={{ justifyContent: '' }}>Null - Static</h3>
      <p>{null}</p>
    </>
  )
}

TestNullStatic.test = {
  static: true,
  snapshots: [
    '<p></p>'
  ]
}

const TestNullObservable = (): JSX.Element => {
  const o = $<string | null>(null)
  const toggle = () => o(prev => (prev === null) ? '' : null)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Null - Observable</h3>
      <p>{o}</p>
    </>
  )
}

TestNullObservable.test = {
  static: false,
  snapshots: [
    '<p><!----></p>',
    '<p></p>'
  ]
}

const TestNullFunction = (): JSX.Element => {
  const o = $<string | null>(null)
  const toggle = () => o(prev => (prev === null) ? '' : null)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Null - Function</h3>
      <p>{() => o()}</p>
    </>
  )
}

TestNullFunction.test = {
  static: false,
  snapshots: [
    '<p><!----></p>',
    '<p></p>'
  ]
}

const TestNullRemoval = (): JSX.Element => {
  const o = $<string | null>(null)
  const toggle = () => o(prev => (prev === null) ? '' : null)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Null - Removal</h3>
      <p>({o})</p>
    </>
  )
}

TestNullRemoval.test = {
  static: false,
  snapshots: [
    '<p>(<!---->)</p>',
    '<p>()</p>'
  ]
}

const TestUndefinedStatic = (): JSX.Element => {
  return (
    <>
      <h3>Undefined - Static</h3>
      <p>{undefined}</p>
    </>
  )
}

TestUndefinedStatic.test = {
  static: true,
  snapshots: [
    '<p></p>'
  ]
}

const TestUndefinedObservable = (): JSX.Element => {
  const o = $<string>(undefined)
  const toggle = () => o(prev => (prev === undefined) ? '' : undefined)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Undefined - Observable</h3>
      <p>{o}</p>
    </>
  )
}

TestUndefinedObservable.test = {
  static: false,
  snapshots: [
    '<p><!----></p>',
    '<p></p>'
  ]
}

const TestUndefinedFunction = (): JSX.Element => {
  const o = $<string>(undefined)
  const toggle = () => o(prev => (prev === undefined) ? '' : undefined)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Undefined - Function</h3>
      <p>{() => o()}</p>
    </>
  )
}

TestUndefinedFunction.test = {
  static: false,
  snapshots: [
    '<p><!----></p>',
    '<p></p>'
  ]
}

const TestUndefinedRemoval = (): JSX.Element => {
  const o = $<string>(undefined)
  const toggle = () => o(prev => (prev === undefined) ? '' : undefined)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Undefined - Removal</h3>
      <p>({o})</p>
    </>
  )
}

TestUndefinedRemoval.test = {
  static: false,
  snapshots: [
    '<p>(<!---->)</p>',
    '<p>()</p>'
  ]
}

const TestBooleanStatic = (): JSX.Element => {
  return (
    <>
      <h3>Boolean - Static</h3>
      <p>{true}{false}</p>
    </>
  )
}

TestBooleanStatic.test = {
  static: true,
  snapshots: [
    '<p><!----></p>'
  ]
}

const TestBooleanObservable = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Boolean - Observable</h3>
      <p>{o}</p>
    </>
  )
}

TestBooleanObservable.test = {
  static: true,
  snapshots: [
    '<p><!----></p>'
  ]
}

const TestBooleanFunction = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Boolean - Function</h3>
      <p>{() => o()}</p>
    </>
  )
}

TestBooleanFunction.test = {
  static: true,
  snapshots: [
    '<p><!----></p>'
  ]
}

const TestBooleanRemoval = (): JSX.Element => {
  const o = $<boolean | null>(true)
  const toggle = () => o(prev => prev ? null : true)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Boolean - Removal</h3>
      <p>({o})</p>
    </>
  )
}

TestBooleanRemoval.test = {
  static: false,
  snapshots: [
    '<p>(<!---->)</p>',
    '<p>()</p>'
  ]
}

const TestSymbolStatic = (): JSX.Element => {
  return (
    <>
      <h3>Symbol - Static</h3>
      <p>{Symbol()}</p>
    </>
  )
}

TestSymbolStatic.test = {
  static: true,
  snapshots: [
    '<p></p>'
  ]
}

const TestSymbolObservable = (): JSX.Element => {
  const o = $(Symbol())
  const randomize = () => o(Symbol())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Symbol - Observable</h3>
      <p>{o}</p>
    </>
  )
}

TestSymbolObservable.test = {
  static: true,
  snapshots: [
    '<p><!----></p>'
  ]
}

const TestSymbolFunction = (): JSX.Element => {
  const o = $(Symbol())
  const randomize = () => o(Symbol())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Symbol - Function</h3>
      <p>{() => o()}</p>
    </>
  )
}

TestSymbolFunction.test = {
  static: true,
  snapshots: [
    '<p><!----></p>'
  ]
}

const TestSymbolRemoval = (): JSX.Element => {
  const o = $<symbol | null>(Symbol())
  const randomize = () => o(prev => prev ? null : Symbol())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Symbol - Removal</h3>
      <p>({o})</p>
    </>
  )
}

TestSymbolRemoval.test = {
  static: false,
  snapshots: [
    '<p>(<!---->)</p>',
    '<p>()</p>'
  ]
}

const TestNumberStatic = (): JSX.Element => {
  return (
    <>
      <h3>Number - Static</h3>
      <p>{123}</p>
    </>
  )
}

TestNumberStatic.test = {
  static: true,
  snapshots: [
    '<p>123</p>'
  ]
}

const TestNumberObservable = (): JSX.Element => {
  const o = $(random())
  const randomize = () => o(random())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Number - Observable</h3>
      <p>{o}</p>
    </>
  )
}

TestNumberObservable.test = {
  static: false,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestNumberFunction = (): JSX.Element => {
  const o = $(random())
  const randomize = () => o(random())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Number - Function</h3>
      <p>{() => o()}</p>
    </>
  )
}

TestNumberFunction.test = {
  static: false,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestNumberRemoval = (): JSX.Element => {
  const o = $<number | null>(random())
  const randomize = () => o(prev => prev ? null : random())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Number - Removal</h3>
      <p>({o})</p>
    </>
  )
}

TestNumberRemoval.test = {
  static: false,
  snapshots: [
    '<p>(<!---->)</p>',
    '<p>()</p>'
  ]
}

const TestBigIntStatic = (): JSX.Element => {
  return (
    <>
      <h3>BigInt - Static</h3>
      <p>{123n}n</p>
    </>
  )
}

TestBigIntStatic.test = {
  static: true,
  snapshots: [
    '<p>123n</p>'
  ]
}

const TestBigIntObservable = (): JSX.Element => {
  const o = $(randomBigInt())
  const randomize = () => o(randomBigInt())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>BigInt - Observable</h3>
      <p>{o}n</p>
    </>
  )
}

TestBigIntObservable.test = {
  static: false,
  snapshots: [
    '<p>{random-bigint}n</p>'
  ]
}

const TestBigIntFunction = (): JSX.Element => {
  const o = $(randomBigInt())
  const randomize = () => o(randomBigInt())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>BigInt - Function</h3>
      <p>{() => o()}n</p>
    </>
  )
}

TestBigIntFunction.test = {
  static: false,
  snapshots: [
    '<p>{random-bigint}n</p>'
  ]
}

const TestBigIntRemoval = (): JSX.Element => {
  const o = $<bigint | null>(randomBigInt())
  const randomize = () => o(prev => prev ? null : randomBigInt())
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>BigInt - Removal</h3>
      <p>({o}n)</p>
    </>
  )
}

TestBigIntRemoval.test = {
  static: false,
  snapshots: [
    '<p>({random-bigint}n)</p>',
    '<p>(n)</p>'
  ]
}

const TestStringStatic = (): JSX.Element => {
  return (
    <>
      <h3>String - Static</h3>
      <p>{'string'}</p>
    </>
  )
}

TestStringStatic.test = {
  static: true,
  snapshots: [
    '<p>string</p>'
  ]
}

const TestStringObservable = (): JSX.Element => {
  const o = $(String(random()))
  const randomize = () => o(String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>String - Observable</h3>
      <p>{o}</p>
    </>
  )
}

TestStringObservable.test = {
  static: false,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestStringObservableStatic = (): JSX.Element => {
  const o = $(String(random()))
  const randomize = () => o(String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>String - Observable Static</h3>
      <p>{o()}</p>
    </>
  )
}

TestStringObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestStringObservableDeepStatic = (): JSX.Element => {
  return useMemo(() => {
    const Deep = (): JSX.Element => {
      const o = $(String(random()))
      const randomize = () => o(String(random()))
      useInterval(randomize, TEST_INTERVAL)
      return (
        <>
          <h3>String - Observable Deep Static</h3>
          <p>{o()}</p>
        </>
      )
    }
    return <Deep />
  })
}

TestStringObservableDeepStatic.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestStringFunction = (): JSX.Element => {
  const o = $(String(random()))
  const randomize = () => o(String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>String - Function</h3>
      <p>{() => o()}</p>
    </>
  )
}

TestStringFunction.test = {
  static: false,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestStringRemoval = (): JSX.Element => {
  const o = $<string | null>(String(random()))
  const randomize = () => o(prev => prev ? null : String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>String - Removal</h3>
      <p>({o})</p>
    </>
  )
}

TestStringRemoval.test = {
  static: false,
  snapshots: [
    '<p>({random})</p>',
    '<p>()</p>'
  ]
}

const TestAttributeStatic = (): JSX.Element => {
  return (
    <>
      <h3>Attribute - Static</h3>
      <p data-color="red">content</p>
    </>
  )
}

TestAttributeStatic.test = {
  static: true,
  snapshots: [
    '<p data-color="red">content</p>'
  ]
}

const TestAttributeObservable = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => (prev === 'red') ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Attribute - Observable</h3>
      <p data-color={o}>content</p>
    </>
  )
}

TestAttributeObservable.test = {
  static: false,
  snapshots: [
    '<p data-color="red">content</p>',
    '<p data-color="blue">content</p>'
  ]
}

const TestAttributeObservableBoolean = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Attribute - Observable Boolean</h3>
      <p data-red={o}>content</p>
    </>
  )
}

TestAttributeObservableBoolean.test = {
  static: false,
  snapshots: [
    '<p data-red="">content</p>',
    '<p data-red="false">content</p>'
  ]
}

const TestAttributeFunction = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => (prev === 'red') ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Attribute - Function</h3>
      <p data-color={() => `dark${o()}`}>content</p>
    </>
  )
}

TestAttributeFunction.test = {
  static: false,
  snapshots: [
    '<p data-color="darkred">content</p>',
    '<p data-color="darkblue">content</p>'
  ]
}

const TestAttributeFunctionBoolean = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Attribute - Function Boolean</h3>
      <p data-red={() => !o()}>content</p>
    </>
  )
}

TestAttributeFunctionBoolean.test = {
  static: false,
  snapshots: [
    '<p data-red="false">content</p>',
    '<p data-red="">content</p>'
  ]
}

const TestAttributeRemoval = (): JSX.Element => {
  const o = $<string | null>('red')
  const toggle = () => o(prev => (prev === 'red') ? null : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Attribute - Removal</h3>
      <p data-color={o}>content</p>
    </>
  )
}

TestAttributeRemoval.test = {
  static: false,
  snapshots: [
    '<p data-color="red">content</p>',
    '<p>content</p>'
  ]
}

const TestAttributeBooleanStatic = (): JSX.Element => {
  return (
    <>
      <h3>Attribute Boolan - Static</h3>
      <p disabled={true}>content</p>
      <p disabled={false}>content</p>
    </>
  )
}

TestAttributeBooleanStatic.test = {
  static: true,
  snapshots: [
    '<p disabled="">content</p><p>content</p>'
  ]
}

const TestPropertyCheckedStatic = (): JSX.Element => {
  return (
    <>
      <h3>Property - Checked Static</h3>
      <p><input type="checkbox" checked={true} /></p>
    </>
  )
}

const TestPropertyCheckedObservable = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Property - Checked Observable</h3>
      <p><input type="checkbox" checked={o} /></p>
    </>
  )
}

const TestPropertyCheckedFunction = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Property - Checked Function</h3>
      <p><input type="checkbox" checked={() => o()} /></p>
    </>
  )
}

const TestPropertyCheckedRemoval = (): JSX.Element => {
  const o = $<boolean | null>(true)
  const toggle = () => o(prev => prev ? null : true)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Property - Checked Removal</h3>
      <p><input type="checkbox" checked={o} /></p>
    </>
  )
}

const TestPropertyValueStatic = (): JSX.Element => {
  return (
    <>
      <h3>Property - Value Static</h3>
      <p><input value="value" /></p>
    </>
  )
}

const TestPropertyValueObservable = (): JSX.Element => {
  const o = $(String(random()))
  const randomize = () => o(String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Property - Value Observable</h3>
      <p><input value={o} /></p>
    </>
  )
}

const TestPropertyValueFunction = (): JSX.Element => {
  const o = $(String(random()))
  const randomize = () => o(String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Property - Value Function</h3>
      <p><input value={() => o()} /></p>
    </>
  )
}

const TestPropertyValueRemoval = (): JSX.Element => {
  const o = $<string | null>(String(random()))
  const randomize = () => o(prev => prev ? null : String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Property - Value Removal</h3>
      <p><input value={o} /></p>
    </>
  )
}

const TestInputLabelFor = (): JSX.Element => {
  const o = $<string | null>(String(random()))
  const randomize = () => o(prev => prev ? null : String(random()))
  useInterval(randomize, TEST_INTERVAL)
  return (
    <>
      <h3>Input - Label For</h3>
      <p><label htmlFor="for-target">htmlFor</label></p>
      <p><label for="for-target">for</label></p>
      <p><input id="for-target" /></p>
    </>
  )
}

const TestSelectStaticOption = (): JSX.Element => {
  const ref = $<HTMLSelectElement>()
  const assert = () => console.assert(ref()?.value === 'bar')
  setTimeout(assert, 1)
  return (
    <>
      <h3>Select - Static Option</h3>
      <select ref={ref} name="select-static-option">
        <option value="foo" selected={false}>foo</option>
        <option value="bar" selected={true}>bar</option>
        <option value="baz" selected={false}>baz</option>
        <option value="qux" selected={false}>qux</option>
      </select>
    </>
  )
}

TestSelectStaticOption.test = {
  static: true,
  snapshots: [
    '<select name="select-static-option"><option value="foo">foo</option><option value="bar">bar</option><option value="baz">baz</option><option value="qux">qux</option></select>'
  ]
}

const TestSelectStaticValue = (): JSX.Element => {
  const ref = $<HTMLSelectElement>()
  const assert = () => console.assert(ref()?.value === 'bar')
  setTimeout(assert, 1)
  return (
    <>
      <h3>Select - Static Value</h3>
      <select ref={ref} name="select-static-value" value="bar">
        <option value="foo">foo</option>
        <option value="bar">bar</option>
        <option value="baz">baz</option>
        <option value="qux">qux</option>
      </select>
    </>
  )
}

TestSelectStaticValue.test = {
  static: true,
  snapshots: [
    '<select name="select-static-value"><option value="foo">foo</option><option value="bar">bar</option><option value="baz">baz</option><option value="qux">qux</option></select>'
  ]
}

const TestSelectObservableOption = (): JSX.Element => {
  const ref = $<HTMLSelectElement>()
  const branch = $(true)
  const assert = () => console.assert(ref()?.value === (branch() ? 'bar' : 'qux'))
  const toggle = () => branch(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  useInterval(assert, TEST_INTERVAL)
  setTimeout(assert, 1)
  return (
    <>
      <h3>Select - Observable Option</h3>
      <select ref={ref} name="select-observable-option">
        <option value="foo" selected={false}>foo</option>
        <option value="bar" selected={branch}>bar</option>
        <option value="baz" selected={false}>baz</option>
        <option value="qux" selected={() => !branch()}>qux</option>
      </select>
    </>
  )
}

TestSelectObservableOption.test = {
  static: true,
  snapshots: [
    '<select name="select-observable-option"><option value="foo">foo</option><option value="bar">bar</option><option value="baz">baz</option><option value="qux">qux</option></select>'
  ]
}

const TestSelectObservableValue = (): JSX.Element => {
  const ref = $<HTMLSelectElement>()
  const value = $('bar')
  const assert = () => console.assert(ref()?.value === value())
  const toggle = () => value(prev => prev === 'bar' ? 'qux' : 'bar')
  useInterval(toggle, TEST_INTERVAL)
  useInterval(assert, TEST_INTERVAL)
  setTimeout(assert, 1)
  return (
    <>
      <h3>Select - Observable Value</h3>
      <select ref={ref} name="select-observable-value" value={value}>
        <option value="foo">foo</option>
        <option value="bar">bar</option>
        <option value="baz">baz</option>
        <option value="qux">qux</option>
      </select>
    </>
  )
}

TestSelectObservableValue.test = {
  static: true,
  snapshots: [
    '<select name="select-observable-value"><option value="foo">foo</option><option value="bar">bar</option><option value="baz">baz</option><option value="qux">qux</option></select>'
  ]
}

const TestIdStatic = (): JSX.Element => {
  return (
    <>
      <h3>ID - Static</h3>
      <p id="foo">content</p>
    </>
  )
}

TestIdStatic.test = {
  static: true,
  snapshots: [
    '<p id="foo">content</p>'
  ]
}

const TestIdObservable = (): JSX.Element => {
  const o = $('foo')
  const toggle = () => o(prev => (prev === 'foo') ? 'bar' : 'foo')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>ID - Observable</h3>
      <p id={o}>content</p>
    </>
  )
}

TestIdObservable.test = {
  static: false,
  snapshots: [
    '<p id="foo">content</p>',
    '<p id="bar">content</p>'
  ]
}

const TestIdFunction = (): JSX.Element => {
  const o = $('foo')
  const toggle = () => o(prev => (prev === 'foo') ? 'bar' : 'foo')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>ID - Function</h3>
      <p id={() => o()}>content</p>
    </>
  )
}

TestIdFunction.test = {
  static: false,
  snapshots: [
    '<p id="foo">content</p>',
    '<p id="bar">content</p>'
  ]
}

const TestIdRemoval = (): JSX.Element => {
  const o = $<string | null>('foo')
  const toggle = () => o(prev => prev ? null : 'foo')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>ID - Removal</h3>
      <p id={o}>content</p>
    </>
  )
}

TestIdRemoval.test = {
  static: false,
  snapshots: [
    '<p id="foo">content</p>',
    '<p>content</p>'
  ]
}

const TestClassNameStatic = (): JSX.Element => {
  return (
    <>
      <h3>ClassName - Static</h3>
      <p className="red">content</p>
    </>
  )
}

TestClassNameStatic.test = {
  static: true,
  snapshots: [
    '<p>content</p>'
  ]
}

const TestClassNameObservable = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => (prev === 'red') ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>ClassName - Observable</h3>
      <p className={o}>content</p>
    </>
  )
}

TestClassNameObservable.test = {
  static: true,
  snapshots: [
    '<p>content</p>'
  ]
}

const TestClassNameFunction = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => (prev === 'red') ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>ClassName - Function</h3>
      <p className={() => o()}>content</p>
    </>
  )
}

TestClassNameFunction.test = {
  static: true,
  snapshots: [
    '<p>content</p>'
  ]
}

const TestClassStatic = (): JSX.Element => {
  return (
    <>
      <h3>Class - Static</h3>
      <p class={{ red: true, blue: false }}>content</p>
    </>
  )
}

TestClassStatic.test = {
  static: true,
  snapshots: [
    '<p class="red">content</p>'
  ]
}

const TestClassStaticString = (): JSX.Element => {
  return (
    <>
      <h3>Class - Static String</h3>
      <p class="red">content</p>
    </>
  )
}

TestClassStaticString.test = {
  static: true,
  snapshots: [
    '<p class="red">content</p>'
  ]
}

const TestClassObservable = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Class - Observable</h3>
      <p class={{ red: o }}>content</p>
    </>
  )
}

TestClassObservable.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassObservableString = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => (prev === 'red') ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Class - Observable String</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassObservableString.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassFunction = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Class - Function Boolean</h3>
      <p class={{ red: () => o() }}>content</p>
    </>
  )
}

TestClassFunction.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassFunctionString = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => (prev === 'red') ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Class - Function String</h3>
      <p class={() => o()}>content</p>
    </>
  )
}

TestClassFunctionString.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassRemoval = (): JSX.Element => {
  const o = $<boolean | null>(true)
  const toggle = () => o(prev => prev ? null : true)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Class - Removal</h3>
      <p class={{ red: o }}>content</p>
    </>
  )
}

TestClassRemoval.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassRemovalString = (): JSX.Element => {
  const o = $<string | null>('red')
  const toggle = () => o(prev => prev ? null : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Class - Removal String</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassRemovalString.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassesArrayStatic = (): JSX.Element => {
  return (
    <>
      <h3>Classes - Array Static</h3>
      <p class={['red', false && 'blue', null && 'blue', undefined && 'blue']}>content</p>
    </>
  )
}

TestClassesArrayStatic.test = {
  static: true,
  snapshots: [
    '<p class="red">content</p>'
  ]
}

const TestClassesArrayStaticMultiple = (): JSX.Element => {
  return (
    <>
      <h3>Classes - Array Static Multiple</h3>
      <p class={['red bold']}>content</p>
    </>
  )
}

TestClassesArrayStaticMultiple.test = {
  static: true,
  snapshots: [
    '<p class="red bold">content</p>'
  ]
}

const TestClassesArrayObservable = (): JSX.Element => {
  const o = $(['red', false])
  const toggle = () => o(prev => prev[0] ? [false, 'blue'] : ['red', false])
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Observable</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayObservable.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayObservableMultiple = (): JSX.Element => {
  const o = $(['red bold', false])
  const toggle = () => o(prev => prev[0] ? [false, 'blue'] : ['red bold', false])
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Observable Multiple</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayObservableMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayObservableValue = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => prev === 'red' ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Observable Value</h3>
      <p class={[o]}>content</p>
    </>
  )
}

TestClassesArrayObservableValue.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayFunction = (): JSX.Element => {
  const o = $(['red', false])
  const toggle = () => o(prev => prev[0] ? [false, 'blue'] : ['red', false])
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Function</h3>
      <p class={() => o()}>content</p>
    </>
  )
}

TestClassesArrayFunction.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayFunctionMultiple = (): JSX.Element => {
  const o = $(['red bold', false])
  const toggle = () => o(prev => prev[0] ? [false, 'blue'] : ['red bold', false])
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Function Multiple</h3>
      <p class={() => o()}>content</p>
    </>
  )
}

TestClassesArrayFunctionMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayFunctionValue = (): JSX.Element => {
  const o = $('red')
  const toggle = () => o(prev => prev === 'red' ? 'blue' : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Function Value</h3>
      <p class={[() => o()]}>content</p>
    </>
  )
}

TestClassesArrayFunctionValue.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayStore = (): JSX.Element => {
  const o = store(['red', false])
  const toggle = () => {
    if (o[0]) {
      o[0] = false
      o[1] = 'blue'
    } else {
      o[0] = 'red'
      o[1] = false
    }
  }
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Store</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayStore.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayStoreMultiple = (): JSX.Element => {
  const o = store(['red bold', false])
  const toggle = () => {
    if (o[0]) {
      o[0] = false
      o[1] = 'blue'
    } else {
      o[0] = 'red bold'
      o[1] = false
    }
  }
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Store Multiple</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayStoreMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesArrayNestedStatic = (): JSX.Element => {
  const o = $(['red', ['bold', { 'italic': true }]])
  return (
    <>
      <h3>Classes - Array Nested Static</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayNestedStatic.test = {
  static: true,
  snapshots: [
    '<p class="red bold italic">content</p>'
  ]
}

const TestClassesArrayRemoval = (): JSX.Element => {
  const o = $<FunctionUnwrap<JSX.Class> | null>(['red', false])
  const toggle = () => o(prev => prev ? null : ['red', false])
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Removal</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayRemoval.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassesArrayRemovalMultiple = (): JSX.Element => {
  const o = $<FunctionUnwrap<JSX.Class> | null>(['red bold', false])
  const toggle = () => o(prev => prev ? null : ['red bold', false])
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Removal Multiple</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayRemovalMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassesArrayCleanup = (): JSX.Element => {
  const o = $<string[]>(['red'])
  const toggle = () => o(prev => prev[0] === 'red' ? ['blue'] : ['red'])
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Array Cleanup</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesArrayCleanup.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesObjectStatic = (): JSX.Element => {
  return (
    <>
      <h3>Classes - Object Static</h3>
      <p class={{ red: true, blue: false }}>content</p>
    </>
  )
}

TestClassesObjectStatic.test = {
  static: true,
  snapshots: [
    '<p class="red">content</p>'
  ]
}

const TestClassesObjectStaticMultiple = (): JSX.Element => {
  return (
    <>
      <h3>Classes - Object Static Multiple</h3>
      <p class={{ 'red bold': true }}>content</p>
    </>
  )
}

TestClassesObjectStaticMultiple.test = {
  static: true,
  snapshots: [
    '<p class="red bold">content</p>'
  ]
}

const TestClassesObjectObservable = (): JSX.Element => {
  const o = $({ red: true, blue: false })
  const toggle = () => o(prev => prev.red ? { red: false, blue: true } : { red: true, blue: false })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Observable</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesObjectObservable.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesObjectObservableMultiple = (): JSX.Element => {
  const o = $({ 'red bold': true, blue: false })
  const toggle = () => o(prev => prev['red bold'] ? { 'red bold': false, blue: true } : { 'red bold': true, blue: false })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Observable Multiple</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesObjectObservableMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesObjectFunction = (): JSX.Element => {
  const o = $({ red: true, blue: false })
  const toggle = () => o(prev => prev.red ? { red: false, blue: true } : { red: true, blue: false })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Function</h3>
      <p class={() => o()}>content</p>
    </>
  )
}

TestClassesObjectFunction.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesObjectFunctionMultiple = (): JSX.Element => {
  const o = $({ 'red bold': true, blue: false })
  const toggle = () => o(prev => prev['red bold'] ? { 'red bold': false, blue: true } : { 'red bold': true, blue: false })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Function Multiple</h3>
      <p class={() => o()}>content</p>
    </>
  )
}

TestClassesObjectFunctionMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesObjectStore = (): JSX.Element => {
  const o = store({ red: true, blue: false })
  const toggle = () => {
    if (o.red) {
      o.red = false
      o.blue = true
    } else {
      o.red = true
      o.blue = false
    }
  }
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Store</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesObjectStore.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesObjectStoreMultiple = (): JSX.Element => {
  const o = store({ 'red bold': true, blue: false })
  const toggle = () => {
    if (o['red bold']) {
      o['red bold'] = false
      o.blue = true
    } else {
      o['red bold'] = true
      o.blue = false
    }
  }
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Store Multiple</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesObjectStoreMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestClassesObjectRemoval = (): JSX.Element => {
  const o = $<FunctionUnwrap<JSX.Class> | null>({ red: true, blue: false })
  const toggle = () => o(prev => prev ? null : { red: true, blue: false })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Removal</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesObjectRemoval.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassesObjectRemovalMultiple = (): JSX.Element => {
  const o = $<FunctionUnwrap<JSX.Class> | null>({ 'red bold': true, blue: false })
  const toggle = () => o(prev => prev ? null : { 'red bold': true, blue: false })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Removal Multiple</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesObjectRemovalMultiple.test = {
  static: false,
  snapshots: [
    '<p class="red bold">content</p>',
    '<p class="">content</p>'
  ]
}

const TestClassesObjectCleanup = (): JSX.Element => {
  const o = $<JSX.ClassProperties>({ red: true })
  const toggle = () => o(prev => prev.red ? { blue: true } : { red: true })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Classes - Object Cleanup</h3>
      <p class={o}>content</p>
    </>
  )
}

TestClassesObjectCleanup.test = {
  static: false,
  snapshots: [
    '<p class="red">content</p>',
    '<p class="blue">content</p>'
  ]
}

const TestStyleStatic = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static</h3>
      <p style={{ color: 'green' }}>content</p>
    </>
  )
}

TestStyleStatic.test = {
  static: true,
  snapshots: [
    '<p style="color: green;">content</p>'
  ]
}

const TestStyleStaticNumeric = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static Numeric</h3>
      <p style={{ flexGrow: 1, height: 50 }}>content</p>
    </>
  )
}

TestStyleStaticNumeric.test = {
  static: true,
  snapshots: [
    '<p style="flex-grow: 1; height: 50px;">content</p>'
  ]
}

const TestStyleStaticString = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static String</h3>
      <p style="flex-grow: 1; height: 50px;">content</p>
    </>
  )
}

TestStyleStaticString.test = {
  static: true,
  snapshots: [
    '<p style="flex-grow: 1; height: 50px;">content</p>'
  ]
}

const TestStyleStaticVariable = (): JSX.Element => {
  return (
    <>
      <h3>Style - Static Variable</h3>
      <p style={{ color: 'var(--color)', '--color': 'green', '--foo': undefined, '--bar': null }}>content</p>
    </>
  )
}

TestStyleStaticVariable.test = {
  static: true,
  snapshots: [
    '<p style="color: var(--color); --color:green;">content</p>'
  ]
}

const TestStyleObservable = (): JSX.Element => {
  const o = $('green')
  const toggle = () => o(prev => (prev === 'green') ? 'orange' : 'green')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Observable</h3>
      <p style={{ color: o }}>content</p>
    </>
  )
}

TestStyleObservable.test = {
  static: false,
  snapshots: [
    '<p style="color: green;">content</p>',
    '<p style="color: orange;">content</p>'
  ]
}

const TestStyleObservableNumeric = (): JSX.Element => {
  const o = $({ flexGrow: 1, width: 50 })
  const toggle = () => o(prev => (prev.flexGrow === 1) ? { flexGrow: 2, width: 100 } : { flexGrow: 1, width: 50 })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Observable Numeric</h3>
      <p style={o}>content</p>
    </>
  )
}

TestStyleObservableNumeric.test = {
  static: false,
  snapshots: [
    '<p style="flex-grow: 1; width: 50px;">content</p>',
    '<p style="flex-grow: 2; width: 100px;">content</p>'
  ]
}

const TestStyleObservableString = (): JSX.Element => {
  const o = $('color: green')
  const toggle = () => o(prev => (prev === 'color: green') ? 'color: orange' : 'color: green')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Observable String</h3>
      <p style={o}>content</p>
    </>
  )
}

TestStyleObservableString.test = {
  static: false,
  snapshots: [
    '<p style="color: green">content</p>',
    '<p style="color: orange">content</p>'
  ]
}

const TestStyleObservableVariable = (): JSX.Element => {
  const o = $('green')
  const toggle = () => o(prev => (prev === 'orange') ? 'green' : 'orange')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Observable Variable</h3>
      <p style={{ color: 'var(--color)', '--color': o }}>content</p>
    </>
  )
}

TestStyleObservableVariable.test = {
  static: false,
  snapshots: [
    '<p style="color: var(--color); --color:green;">content</p>',
    '<p style="color: var(--color); --color:orange;">content</p>'
  ]
}

const TestStyleFunction = (): JSX.Element => {
  const o = $('green')
  const toggle = () => o(prev => (prev === 'green') ? 'orange' : 'green')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Function</h3>
      <p style={{ color: () => o() }}>content</p>
    </>
  )
}

TestStyleFunction.test = {
  static: false,
  snapshots: [
    '<p style="color: green;">content</p>',
    '<p style="color: orange;">content</p>'
  ]
}

const TestStyleFunctionNumeric = (): JSX.Element => {
  const o = $({ flexGrow: 1, width: 50 })
  const toggle = () => o(prev => (prev.flexGrow === 1) ? { flexGrow: 2, width: 100 } : { flexGrow: 1, width: 50 })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Function Numeric</h3>
      <p style={() => o()}>content</p>
    </>
  )
}

TestStyleFunctionNumeric.test = {
  static: false,
  snapshots: [
    '<p style="flex-grow: 1; width: 50px;">content</p>',
    '<p style="flex-grow: 2; width: 100px;">content</p>'
  ]
}

const TestStyleFunctionString = (): JSX.Element => {
  const o = $('color: green')
  const toggle = () => o(prev => (prev === 'color: green') ? 'color: orange' : 'color: green')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Function String</h3>
      <p style={() => o()}>content</p>
    </>
  )
}

TestStyleFunctionString.test = {
  static: false,
  snapshots: [
    '<p style="color: green">content</p>',
    '<p style="color: orange">content</p>'
  ]
}

const TestStyleFunctionVariable = (): JSX.Element => {
  const o = $('green')
  const toggle = () => o(prev => (prev === 'orange') ? 'green' : 'orange')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Function Variable</h3>
      <p style={{ color: 'var(--color)', '--color': () => o() }}>content</p>
    </>
  )
}

TestStyleFunctionVariable.test = {
  static: false,
  snapshots: [
    '<p style="color: var(--color); --color:green;">content</p>',
    '<p style="color: var(--color); --color:orange;">content</p>'
  ]
}

const TestStyleRemoval = (): JSX.Element => {
  const o = $<string | null>('green')
  const toggle = () => o(prev => prev ? null : 'green')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Style - Removal</h3>
      <p style={{ color: o }}>content</p>
    </>
  )
}

TestStyleRemoval.test = {
  static: false,
  snapshots: [
    '<p style="color: green;">content</p>',
    '<p style="">content</p>'
  ]
}

const TestStylesStatic = (): JSX.Element => {
  return (
    <>
      <h3>Styles - Static</h3>
      <p style={{ color: 'green' }}>content</p>
    </>
  )
}

TestStylesStatic.test = {
  static: true,
  snapshots: [
    '<p style="color: green;">content</p>'
  ]
}

const TestStylesObservable = (): JSX.Element => {
  const o = $({ color: 'orange', fontWeight: 'normal' })
  const toggle = () => o(prev => (prev.color === 'orange') ? { color: 'green', fontWeight: 'bold' } : { color: 'orange', fontWeight: 'normal' })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Styles - Observable</h3>
      <p style={o}>content</p>
    </>
  )
}

TestStylesObservable.test = {
  static: false,
  snapshots: [
    '<p style="color: orange; font-weight: normal;">content</p>',
    '<p style="color: green; font-weight: bold;">content</p>'
  ]
}

const TestStylesFunction = (): JSX.Element => {
  const o = $({ color: 'orange', fontWeight: 'normal' })
  const toggle = () => o(prev => (prev.color === 'orange') ? { color: 'green', fontWeight: 'bold' } : { color: 'orange', fontWeight: 'normal' })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Styles - Function</h3>
      <p style={() => o()}>content</p>
    </>
  )
}

TestStylesFunction.test = {
  static: false,
  snapshots: [
    '<p style="color: orange; font-weight: normal;">content</p>',
    '<p style="color: green; font-weight: bold;">content</p>'
  ]
}

const TestStylesStore = (): JSX.Element => {
  const o = store({ color: 'orange', fontWeight: 'normal' })
  const toggle = () => {
    if (o.color === 'orange') {
      o.color = 'green'
      o.fontWeight = 'bold'
    } else {
      o.color = 'orange'
      o.fontWeight = 'normal'
    }
  }
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Styles - Store</h3>
      <p style={o}>content</p>
    </>
  )
}

TestStylesStore.test = {
  static: false,
  snapshots: [
    '<p style="color: orange; font-weight: normal;">content</p>',
    '<p style="color: green; font-weight: bold;">content</p>'
  ]
}

const TestStylesRemoval = (): JSX.Element => {
  const o = $<FunctionUnwrap<JSX.Style> | null>({ color: 'orange', fontWeight: 'normal' })
  const toggle = () => o(prev => prev ? null : { color: 'orange', fontWeight: 'normal' })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Styles - Removal</h3>
      <p style={o}>content</p>
    </>
  )
}

TestStylesRemoval.test = {
  static: false,
  snapshots: [
    '<p style="color: orange; font-weight: normal;">content</p>',
    '<p style="">content</p>'
  ]
}

const TestStylesCleanup = (): JSX.Element => {
  const o = $<JSX.StyleProperties>({ color: 'orange', fontWeight: 'bold' })
  const toggle = () => o(prev => (prev.color === 'orange') ? { fontStyle: 'italic', textDecoration: 'line-through' } : { color: 'orange', fontWeight: 'bold' })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Styles - Observable Cleanup</h3>
      <p style={o}>content</p>
    </>
  )
}

TestStylesCleanup.test = {
  static: false,
  snapshots: [
    '<p style="color: orange; font-weight: bold;">content</p>',
    '<p style="font-style: italic; text-decoration: line-through;">content</p>'
  ]
}

const TestHTMLFunctionStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - Function - Static</h3>
      {html`
        <${If} when=${true}>
          <p>${random()}</p>
        </${If}>
      `}
    </>
  )
}

TestHTMLFunctionStatic.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestHTMLFunctionStaticRegistry = (): JSX.Element => {
  const P = (): JSX.Element => {
    return <p>{random()}</p>
  }
  html.register({ If, P })
  return (
    <>
      <h3>HTML - Function - Static Registry</h3>
      {html`
        <If when=${true}>
          <P />
        </If>
      `}
    </>
  )
}

TestHTMLFunctionStaticRegistry.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestHTMLInnerHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - innerHTML - Static</h3>
      <p innerHTML="<b>danger</b>" />
    </>
  )
}

TestHTMLInnerHTMLStatic.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLInnerHTMLObservable = (): JSX.Element => {
  const o = $('<b>danger1</b>')
  const toggle = () => o(prev => (prev === '<b>danger1</b>') ? '<b>danger2</b>' : '<b>danger1</b>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - innerHTML - Observable</h3>
      <p innerHTML={o} />
    </>
  )
}

TestHTMLInnerHTMLObservable.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLInnerHTMLFunction = (): JSX.Element => {
  const o = $('<b>danger1</b>')
  const toggle = () => o(prev => (prev === '<b>danger1</b>') ? '<b>danger2</b>' : '<b>danger1</b>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - innerHTML - Function</h3>
      <p innerHTML={() => o()} />
    </>
  )
}

TestHTMLInnerHTMLFunction.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLOuterHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - outerHTML - Static</h3>
      <p outerHTML="<b>danger</b>" />
    </>
  )
}

TestHTMLOuterHTMLStatic.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLOuterHTMLObservable = (): JSX.Element => {
  const o = $('<b>danger1</b>')
  const toggle = () => o(prev => (prev === '<b>danger1</b>') ? '<b>danger2</b>' : '<b>danger1</b>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - outerHTML - Observable</h3>
      <p outerHTML={o} />
    </>
  )
}

TestHTMLOuterHTMLObservable.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLOuterHTMLFunction = (): JSX.Element => {
  const o = $('<b>danger1</b>')
  const toggle = () => o(prev => (prev === '<b>danger1</b>') ? '<b>danger2</b>' : '<b>danger1</b>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - outerHTML - Function</h3>
      <p outerHTML={() => o()} />
    </>
  )
}

TestHTMLOuterHTMLFunction.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLTextContentStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - textContent - Static</h3>
      <p textContent="<b>danger</b>" />
    </>
  )
}

TestHTMLTextContentStatic.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLTextContentObservable = (): JSX.Element => {
  const o = $('<b>danger1</b>')
  const toggle = () => o(prev => (prev === '<b>danger1</b>') ? '<b>danger2</b>' : '<b>danger1</b>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - textContent - Observable</h3>
      <p textContent={o} />
    </>
  )
}

TestHTMLTextContentObservable.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLTextContentFunction = (): JSX.Element => {
  const o = $('<b>danger1</b>')
  const toggle = () => o(prev => (prev === '<b>danger1</b>') ? '<b>danger2</b>' : '<b>danger1</b>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - textContent - Function</h3>
      <p textContent={() => o()} />
    </>
  )
}

TestHTMLTextContentFunction.test = {
  static: true,
  snapshots: [
    '<p></p>',
  ]
}

const TestHTMLDangerouslySetInnerHTMLStatic = (): JSX.Element => {
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Static</h3>
      <p dangerouslySetInnerHTML={{ __html: '<i>danger</i>' }} />
    </>
  )
}

TestHTMLDangerouslySetInnerHTMLStatic.test = {
  static: true,
  snapshots: [
    '<p><i>danger</i></p>'
  ]
}

const TestHTMLDangerouslySetInnerHTMLObservable = (): JSX.Element => {
  const o = $({ __html: '<i>danger</i>' })
  const toggle = () => o(prev => (prev.__html === '<i>danger</i>') ? { __html: '<b>danger</b>' } : { __html: '<i>danger</i>' })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Observable</h3>
      <p dangerouslySetInnerHTML={o} />
    </>
  )
}

TestHTMLDangerouslySetInnerHTMLObservable.test = {
  static: false,
  snapshots: [
    '<p><i>danger</i></p>',
    '<p><b>danger</b></p>'
  ]
}

const TestHTMLDangerouslySetInnerHTMLObservableString = (): JSX.Element => {
  const o = $('<i>danger</i>')
  const toggle = () => o(prev => (prev === '<i>danger</i>') ? '<b>danger</b>' : '<i>danger</i>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Observable String</h3>
      <p dangerouslySetInnerHTML={{ __html: o }} />
    </>
  )
}

TestHTMLDangerouslySetInnerHTMLObservableString.test = {
  static: false,
  snapshots: [
    '<p><i>danger</i></p>',
    '<p><b>danger</b></p>'
  ]
}

const TestHTMLDangerouslySetInnerHTMLFunction = (): JSX.Element => {
  const o = $({ __html: '<i>danger</i>' })
  const toggle = () => o(prev => (prev.__html === '<i>danger</i>') ? { __html: '<b>danger</b>' } : { __html: '<i>danger</i>' })
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Function</h3>
      <p dangerouslySetInnerHTML={() => o()} />
    </>
  )
}

TestHTMLDangerouslySetInnerHTMLFunction.test = {
  static: false,
  snapshots: [
    '<p><i>danger</i></p>',
    '<p><b>danger</b></p>'
  ]
}

const TestHTMLDangerouslySetInnerHTMLFunctionString = (): JSX.Element => {
  const o = $('<i>danger</i>')
  const toggle = () => o(prev => (prev === '<i>danger</i>') ? '<b>danger</b>' : '<i>danger</i>')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>HTML - dangerouslySetInnerHTML - Function String</h3>
      <p dangerouslySetInnerHTML={{ __html: () => o() }} />
    </>
  )
}

TestHTMLDangerouslySetInnerHTMLFunctionString.test = {
  static: false,
  snapshots: [
    '<p><i>danger</i></p>',
    '<p><b>danger</b></p>'
  ]
}

const TestDirective = () => {
  const model = (element, arg1, arg2) => {
    useEffect(() => {
      const value = `${arg1} - ${arg2}`
      element.value = value
      element.setAttribute('value', value)
    })
  }
  const Model = createDirective('model', model)
  return (
    <>
      <h3>Directive</h3>
      <Model.Provider>
        <input value="foo" use:model={['bar', 'baz']} />
      </Model.Provider>
    </>
  )
}

TestDirective.test = {
  static: true,
  snapshots: [
    '<input value="bar - baz">'
  ]
}

const TestDirectiveRegisterLocal = () => {
  const model = (element, arg1, arg2) => {
    useEffect(() => {
      const value = `${arg1} - ${arg2}`
      element.value = value
      element.setAttribute('value', value)
    })
  }
  const Model = createDirective('modelLocal', model)
  Model.register()
  return (
    <>
      <h3>Directive</h3>
      <input value="foo" use:modelLocal={['bar', 'baz']} />
    </>
  )
}

TestDirectiveRegisterLocal.test = {
  static: true,
  snapshots: [
    '<input value="bar - baz">'
  ]
}

const TestDirectiveSingleArgument = () => {
  const model = (element, arg1) => {
    useEffect(() => {
      const value = `${arg1}`
      element.value = value
      element.setAttribute('value', value)
    })
  }
  const Model = createDirective('model', model)
  return (
    <>
      <h3>Directive - Single Argument</h3>
      <Model.Provider>
        <input value="foo" use:model="bar" />
      </Model.Provider>
    </>
  )
}

TestDirectiveSingleArgument.test = {
  static: true,
  snapshots: [
    '<input value="bar">'
  ]
}

const TestDirectiveRef = () => {
  const model = (element, arg1) => {
    useEffect(() => {
      const value = `${arg1}`
      element.value = value
      element.setAttribute('value', value)
    })
  }
  const Model = createDirective('model', model)
  return (
    <>
      <h3>Directive - Ref</h3>
      <input ref={Model.ref('bar')} value="foo" />
    </>
  )
}

TestDirectiveRef.test = {
  static: true,
  snapshots: [
    '<input value="bar">'
  ]
}

const TestEventClickStatic = (): JSX.Element => {
  const o = $(0)
  const increment = () => o(prev => prev + 1)
  return (
    <>
      <h3>Event - Click Static</h3>
      <p><button onClick={increment}>{o}</button></p>
    </>
  )
}

const TestEventClickObservable = (): JSX.Element => {
  const o = $(0)
  const onClick = $(() => { })
  const plus2 = () => o(prev => {
    onClick(() => minus1)
    return prev + 2
  })
  const minus1 = () => o(prev => {
    onClick(() => plus2)
    return prev - 1
  })
  onClick(() => plus2)
  return (
    <>
      <h3>Event - Click Observable</h3>
      <p><button onClick={onClick}>{o}</button></p>
    </>
  )
}

const TestEventClickRemoval = (): JSX.Element => {
  const o = $(0)
  const onClick = $(() => { })
  const increment = () => o(prev => {
    onClick(() => null)
    return prev + 1
  })
  onClick(() => increment)
  return (
    <>
      <h3>Event - Click Removal</h3>
      <p><button onClick={onClick}>{o}</button></p>
    </>
  )
}

const TestEventClickCaptureStatic = (): JSX.Element => {
  const o = $(0)
  const increment = () => o(prev => prev + 1)
  return (
    <>
      <h3>Event - Click Capture Static</h3>
      <p><button onClickCapture={increment}>{o}</button></p>
    </>
  )
}

const TestEventClickCaptureObservable = (): JSX.Element => {
  const o = $(0)
  const onClick = $(() => { })
  const plus2 = () => o(prev => {
    onClick(() => minus1)
    return prev + 2
  })
  const minus1 = () => o(prev => {
    onClick(() => plus2)
    return prev - 1
  })
  onClick(() => plus2)
  return (
    <>
      <h3>Event - Click Capture Observable</h3>
      <p><button onClickCapture={onClick}>{o}</button></p>
    </>
  )
}

const TestEventClickCaptureRemoval = (): JSX.Element => {
  const o = $(0)
  const onClick = $(() => { })
  const increment = () => o(prev => {
    onClick(() => null)
    return prev + 1
  })
  onClick(() => increment)
  return (
    <>
      <h3>Event - Click Capture Removal</h3>
      <p><button onClickCapture={onClick}>{o}</button></p>
    </>
  )
}

const TestEventClickAndClickCaptureStatic = (): JSX.Element => {
  const o = $(0)
  const increment = () => o(prev => prev + 1)
  return (
    <>
      <h3>Event - Click & Click Capture Static</h3>
      <p><button onClick={increment} onClickCapture={increment}>{o}</button></p>
    </>
  )
}

const TestEventClickStopPropagation = (): JSX.Element => {
  const outer = $(0)
  const inner = $(0)
  const incrementOuter = () => outer(prev => prev + 1)
  const incrementInner = event => {
    event.stopPropagation()
    inner(prev => prev + 1)
  }
  return (
    <>
      <h3>Event - Click - Stop Propagation</h3>
      <p><button onClick={incrementOuter}>{outer}<button onClick={incrementInner}>{inner}</button></button></p>
    </>
  )
}

const TestEventClickStopImmediatePropagation = (): JSX.Element => {
  const outer = $(0)
  const inner = $(0)
  const incrementOuter = () => outer(prev => prev + 1)
  const incrementInner = event => {
    event.stopImmediatePropagation()
    inner(prev => prev + 1)
  }
  return (
    <>
      <h3>Event - Click - Stop Immediate Propagation</h3>
      <p><button onClick={incrementOuter}>{outer}<button onClick={incrementInner}>{inner}</button></button></p>
    </>
  )
}

const TestEventEnterStopPropagation = (): JSX.Element => {
  const outer = $(0)
  const inner = $(0)
  const incrementOuter = () => outer(prev => prev + 1)
  const incrementInner = event => {
    event.stopPropagation()
    inner(prev => prev + 1)
  }
  return (
    <>
      <h3>Event - Enter - Stop Propagation</h3>
      <p><button onMouseEnter={incrementOuter}>{outer}<button onMouseEnter={incrementInner}>{inner}</button></button></p>
    </>
  )
}

const TestEventEnterStopImmediatePropagation = (): JSX.Element => {
  const outer = $(0)
  const inner = $(0)
  const incrementOuter = () => outer(prev => prev + 1)
  const incrementInner = event => {
    event.stopImmediatePropagation()
    inner(prev => prev + 1)
  }
  return (
    <>
      <h3>Event - Enter - Stop Immediate Propagation</h3>
      <p><button onMouseEnter={incrementOuter}>{outer}<button onMouseEnter={incrementInner}>{inner}</button></button></p>
    </>
  )
}

const TestEventEnterAndEnterCaptureStatic = (): JSX.Element => {
  const o = $(0)
  const increment = () => o(prev => prev + 1)
  return (
    <>
      <h3>Event - Enter & Enter Capture Static</h3>
      <p><button onMouseEnter={increment} onMouseEnterCapture={increment}>{o}</button></p>
    </>
  )
}

const TestABCD = (): JSX.Element => {
  const AB = (): JSX.Element => {
    const a = <i>a</i>
    const b = <u>b</u>
    const component = $(a)
    const toggle = () => component(() => (component() === a) ? b : a)
    useInterval(toggle, TEST_INTERVAL / 2)
    return component
  }
  const CD = (): JSX.Element => {
    const c = <b>c</b>
    const d = <span>d</span>
    const component = $(c)
    const toggle = () => component(() => (component() === c) ? d : c)
    useInterval(toggle, TEST_INTERVAL / 2)
    return component
  }
  const ab = <AB />
  const cd = <CD />
  const component = $(ab)
  const toggle = () => component(() => (component() === ab) ? cd : ab)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Children - ABCD</h3>
      <p>{component}</p>
    </>
  )
}

TestABCD.test = {
  static: false,
  snapshots: [
    '<p><i>a</i></p>',
    '<p><u>b</u></p>',
    '<p><b>c</b></p>',
    '<p><span>d</span></p>'
  ]
}

const TestChildrenBoolean = (): JSX.Element => {
  const Custom = ({ children }: { children?}) => {
    return <p>{Number(children)}</p>
  }
  return (
    <>
      <h3>Children - Boolean</h3>
      <Custom>{true}</Custom>
      <Custom>{false}</Custom>
    </>
  )
}

TestChildrenBoolean.test = {
  static: true,
  snapshots: [
    '<p>1</p><p>0</p>'
  ]
}

const TestChildrenSymbol = (): JSX.Element => {
  const Custom = ({ children }: { children?}) => {
    return <p>{typeof children}</p>
  }
  return (
    <>
      <h3>Children - Boolean</h3>
      <Custom>{Symbol()}</Custom>
    </>
  )
}

TestChildrenSymbol.test = {
  static: true,
  snapshots: [
    '<p>symbol</p>'
  ]
}

const TestCleanupInner = () => {
  const page = $(true)
  const togglePage = () => page(prev => !prev)
  const Page1 = () => {
    setTimeout(togglePage, TEST_INTERVAL)
    return (
      <>
        <p>page1</p>
        <button onClick={togglePage}>Toggle Page</button>
      </>
    )
  }
  const Page2 = () => {
    const bool = $(true)
    const toggle = () => bool(prev => !prev)
    setTimeout(toggle, TEST_INTERVAL)
    setTimeout(togglePage, TEST_INTERVAL * 2)
    return (
      <>
        <If when={bool}>
          <p>page2 - true</p>
        </If>
        <If when={() => !bool()}>
          <p>page2 - false</p>
        </If>
        <button onClick={toggle}>Toggle</button>
        <button onClick={togglePage}>Toggle Page</button>
      </>
    )
  }
  return () => {
    const Page = page() ? Page1 : Page2
    return (
      <>
        <h3>Cleanup - Inner</h3>
        <Page />
      </>
    )
  }
}

TestCleanupInner.test = {
  static: false,
  snapshots: [ //TODO: Double-check that this is correct
    '<p>page1</p><button>Toggle Page</button>',
    '<p>page2 - true</p><!----><button>Toggle</button><button>Toggle Page</button>',
    '<!----><p>page2 - false</p><button>Toggle</button><button>Toggle Page</button>'
  ]
}

const TestCleanupInnerPortal = () => {
  return (
    <Portal>
      <TestCleanupInner />
    </Portal>
  )
}

TestCleanupInnerPortal.test = {
  static: true,
  snapshots: [
    '<!---->'
  ]
}

const TestContextDynamicContext = () => {

  const Context = createContext('default')

  const DynamicFragment = props => {
    const ctx = useContext(Context)
    return (
      <>
        <p>{ctx}</p>
        <p>{props.children}</p>
        <Dynamic component="p">{props.children}</Dynamic>
        <Dynamic component="p" children={props.children} />
      </>
    )
  }

  return (
    <>
      <h3>Dynamic - Context</h3>
      <Context.Provider value="context">
        <DynamicFragment>
          <DynamicFragment />
        </DynamicFragment>
      </Context.Provider>
    </>
  )

}

TestContextDynamicContext.test = {
  static: true,
  snapshots: [
    '<p>context</p><p><p>context</p><p></p><p></p><p></p></p><p><p>context</p><p></p><p></p><p></p></p><p><p>context</p><p></p><p></p><p></p></p>'
  ]
}

const TestDynamicHeading = (): JSX.Element => {
  const level = $<1 | 2 | 3 | 4 | 5 | 6 | number>(1)
  const increment = () => level((level() + 1) % 7 || 1)
  useInterval(increment, TEST_INTERVAL)
  return (
    <>
      <h3>Dynamic - Heading</h3>
      {() => (
        <Dynamic component={`h${level()}`}>
          Level: {level}
        </Dynamic>
      )}
    </>
  )
}

TestDynamicHeading.test = {
  static: false,
  snapshots: [
    '<h1>Level: 1</h1>',
    '<h2>Level: 2</h2>',
    '<h3>Level: 3</h3>',
    '<h4>Level: 4</h4>',
    '<h5>Level: 5</h5>',
    '<h6>Level: 6</h6>'
  ]
}

const TestDynamicObservableComponent = (): JSX.Element => {
  const level = $(1)
  const component = useMemo(() => `h${level()}`)
  const increment = () => level((level() + 1) % 7 || 1)
  useInterval(increment, TEST_INTERVAL)
  return (
    <>
      <h3>Dynamic - Observable Component</h3>
      <Dynamic component={component}>
        Level: {level}
      </Dynamic>
    </>
  )
}

TestDynamicObservableComponent.test = {
  static: false,
  snapshots: [
    '<h1>Level: 1</h1>',
    '<h2>Level: 2</h2>',
    '<h3>Level: 3</h3>',
    '<h4>Level: 4</h4>',
    '<h5>Level: 5</h5>',
    '<h6>Level: 6</h6>'
  ]
}

const TestDynamicFunctionComponent = (): JSX.Element => {
  const level = $(1)
  const component = () => `h${level()}`
  const increment = () => level((level() + 1) % 7 || 1)
  useInterval(increment, TEST_INTERVAL)
  return (
    <>
      <h3>Dynamic - Function Component</h3>
      <Dynamic component={component}>
        Level: {level}
      </Dynamic>
    </>
  )
}

TestDynamicFunctionComponent.test = {
  static: true,
  snapshots: [
    'h1'
  ]
}

const TestDynamicObservableProps = (): JSX.Element => {
  const red = { class: 'red' }
  const blue = { class: 'blue' }
  const props = $(red)
  const toggle = () => props(prev => prev === red ? blue : red)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Dynamic - Observable Props</h3>
      <Dynamic component="h5" props={props}>
        Content
      </Dynamic>
    </>
  )
}

TestDynamicObservableProps.test = {
  static: false,
  snapshots: [
    '<h5 class="red">Content</h5>',
    '<h5 class="blue">Content</h5>'
  ]
}

const TestDynamicFunctionProps = (): JSX.Element => {
  const red = { class: 'red' }
  const blue = { class: 'blue' }
  const props = $(red)
  const toggle = () => props(prev => prev === red ? blue : red)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Dynamic - Function Props</h3>
      <Dynamic component="h5" props={props}>
        Content
      </Dynamic>
    </>
  )
}

TestDynamicFunctionProps.test = {
  static: false,
  snapshots: [
    '<h5 class="red">Content</h5>',
    '<h5 class="blue">Content</h5>'
  ]
}

const TestDynamicObservableChildren = (): JSX.Element => {
  const o = $(random())
  const update = () => o(random())
  useInterval(update, TEST_INTERVAL)
  return (
    <>
      <h3>Dynamic - Observable Children</h3>
      <Dynamic component="h5">
        {o}
      </Dynamic>
    </>
  )
}

TestDynamicObservableChildren.test = {
  static: false,
  snapshots: [
    '<h5>{random}</h5>'
  ]
}

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
  )
}

TestIfStatic.test = {
  static: true,
  snapshots: [
    '<p>true</p>'
  ]
}

const TestIfObservable = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>If - Observable</h3>
      <p>(<If when={o}>content</If>)</p>
    </>
  )
}

TestIfObservable.test = {
  static: false,
  snapshots: [
    '<p>(content)</p>',
    '<p>(<!---->)</p>'
  ]
}

const TestIfFunction = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>If - Function</h3>
      <p>(<If when={() => o()}>content</If>)</p>
    </>
  )
}

TestIfFunction.test = {
  static: false,
  snapshots: [
    '<p>(content)</p>',
    '<p>(<!---->)</p>'
  ]
}

const TestIfFunctionUntracked = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <If when={true}>
      Noop
      <If when={o} fallback="fallback">
        {() => (
          <button onClick={() => o(false)}>
            Close {o()}
          </button>
        )}
      </If>
    </If>
  )
}

TestIfFunctionUntracked.test = {
  static: false,
  snapshots: [
    'Noop<button>Close </button>',
    'Noopfallback'
  ]
}

const TestIfFunctionUntrackedUnnarrowed = (): JSX.Element => {
  const o = $(true)
  const content = $(0)
  const increment = () => content(prev => (prev + 1) % 3)
  useInterval(increment, TEST_INTERVAL)
  return (
    <>
      <h3>If - Function Untracked Unnarrowed</h3>
      <p>(<If when={o}>{() => content()}</If>)</p>
    </>
  )
}

TestIfFunctionUntrackedUnnarrowed.test = {
  static: true,
  snapshots: [
    '<p>(0)</p>'
  ]
}

const TestIfFunctionUntrackedNarrowed = (): JSX.Element => {
  const o = $(true)
  const content = $(0)
  const increment = () => content(prev => (prev + 1) % 3)
  useInterval(increment, TEST_INTERVAL)
  return (
    <>
      <h3>If - Function Untracked Narrowed</h3>
      <p>(<If when={o}>{value => content()}</If>)</p>
    </>
  )
}

TestIfFunctionUntrackedNarrowed.test = {
  static: true,
  snapshots: [
    '<p>(0)</p>'
  ]
}

const TestIfNestedFunctionUnnarrowed = (): JSX.Element => {
  const o = $(true)
  const content = $(0)
  const increment = () => content(prev => (prev + 1) % 3)
  useInterval(increment, TEST_INTERVAL)
  return (
    <>
      <h3>If - Nested Function Unnarrowed</h3>
      <p>(<If when={o}>{() => () => content()}</If>)</p>
    </>
  )
}

TestIfNestedFunctionUnnarrowed.test = {
  static: false,
  snapshots: [
    '<p>(0)</p>',
    '<p>(1)</p>',
    '<p>(2)</p>'
  ]
}

const TestIfNestedFunctionNarrowed = (): JSX.Element => {
  const o = $(true)
  const content = $(0)
  const increment = () => content(prev => (prev + 1) % 3)
  useInterval(increment, TEST_INTERVAL)
  return (
    <>
      <h3>If - Nested Function Narrowed</h3>
      <p>(<If when={o}>{value => () => content()}</If>)</p>
    </>
  )
}

TestIfNestedFunctionNarrowed.test = {
  static: false,
  snapshots: [
    '<p>(0)</p>',
    '<p>(1)</p>',
    '<p>(2)</p>'
  ]
}

const TestIfChildrenObservableStatic = (): JSX.Element => {
  const Content = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>{o()}</p>
  }
  return (
    <>
      <h3>If - Children Observable Static</h3>
      <If when={true}><Content /></If>
    </>
  )
}

TestIfChildrenObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestIfChildrenFunction = (): JSX.Element => {
  const Content = value => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>{o()}</p>
  }
  return (
    <>
      <h3>If - Children Function</h3>
      <If when={true}>{Content}</If>
    </>
  )
}

TestIfChildrenFunction.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestIfChildrenFunctionObservable = (): JSX.Element => {
  const o = $<number | false>(Math.random())
  const toggle = () => o(prev => prev ? false : Math.random())
  useInterval(toggle, TEST_INTERVAL)
  const Content = ({ value }): JSX.Element => {
    return <p>Value: {value}</p>
  }
  return (
    <>
      <h3>If - Children Function Observable</h3>
      <If when={o}>
        {value => <Content value={value} />}
      </If>
    </>
  )
}

TestIfChildrenFunctionObservable.test = {
  static: false,
  snapshots: [
    '<p>Value: {random}</p>',
    '<!---->'
  ]
}

const TestIfFallbackStatic = (): JSX.Element => {
  return (
    <>
      <h3>If - Fallback Static</h3>
      <If when={false} fallback={<p>Fallback!</p>}>Children</If>
    </>
  )
}

TestIfFallbackStatic.test = {
  static: true,
  snapshots: [
    '<p>Fallback!</p>'
  ]
}

const TestIfFallbackObservable = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    return <p>Fallback: {o}</p>
  }
  return (
    <>
      <h3>If - Fallback Observable</h3>
      <If when={false} fallback={<Fallback />}>Children</If>
    </>
  )
}

TestIfFallbackObservable.test = {
  static: false,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestIfFallbackObservableStatic = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>If - Fallback Observable Static</h3>
      <If when={false} fallback={<Fallback />}>Children</If>
    </>
  )
}

TestIfFallbackObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestIfFallbackFunction = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>If - Fallback Function</h3>
      <If when={false} fallback={Fallback}>Children</If>
    </>
  )
}

TestIfFallbackFunction.test = {
  static: false,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestIfRace = () => {
  const data = $<{ deep: string } | null>({ deep: 'hi' })
  const visible = $(true)
  setTimeout(() => {
    batch(() => {
      data(null)
      visible(false)
    })
  })
  return (
    <>
      <h3>If - Race</h3>
      <If when={visible}>
        <div>{() => data()!.deep}</div>
      </If>
    </>
  )
}

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
  )
}

TestTernaryStatic.test = {
  static: true,
  snapshots: [
    '<p>true (1)</p><p>false (2)</p>'
  ]
}

const TestTernaryStaticInline = (): JSX.Element => {
  return (
    <>
      <h3>Ternary - Static Inline</h3>
      <Ternary when={true}><p>true (1)</p><p>false (1)</p></Ternary>
      <Ternary when={false}><p>true (2)</p><p>false (2)</p></Ternary>
    </>
  )
}

TestTernaryStaticInline.test = {
  static: true,
  snapshots: [
    '<p>true (1)</p><p>false (2)</p>'
  ]
}

const TestTernaryObservable = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Ternary - Observable</h3>
      <Ternary when={o}>
        <p>true</p>
        <p>false</p>
      </Ternary>
    </>
  )
}

TestTernaryObservable.test = {
  static: false,
  snapshots: [
    '<p>true</p>',
    '<p>false</p>'
  ]
}

const TestTernaryObservableChildren = (): JSX.Element => {
  const AB = (): JSX.Element => {
    const a = <i>a</i>
    const b = <u>b</u>
    const component = $(a)
    const toggle = () => component(() => (component() === a) ? b : a)
    useInterval(toggle, TEST_INTERVAL / 2)
    return component
  }
  const CD = (): JSX.Element => {
    const c = <b>c</b>
    const d = <span>d</span>
    const component = $(c)
    const toggle = () => component(() => (component() === c) ? d : c)
    useInterval(toggle, TEST_INTERVAL / 2)
    return component
  }
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Ternary - Observable Children</h3>
      <Ternary when={o}>
        <AB />
        <CD />
      </Ternary>
    </>
  )
}

TestTernaryObservableChildren.test = {
  static: false,
  snapshots: [
    '<i>a</i>',
    '<u>b</u>',
    '<b>c</b>',
    '<span>d</span>'
  ]
}

const TestTernaryFunction = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Ternary - Function</h3>
      <Ternary when={() => !o()}>
        <p>true</p>
        <p>false</p>
      </Ternary>
    </>
  )
}

TestTernaryFunction.test = {
  static: false,
  snapshots: [
    '<p>false</p>',
    '<p>true</p>'
  ]
}

const TestTernaryChildrenObservableStatic = (): JSX.Element => {
  const True = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>True: {o()}</p>
  }
  const False = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>False: {o()}</p>
  }
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
  )
}

TestTernaryChildrenObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>True: {random}</p><p>False: {random}</p>'
  ]
}

const TestTernaryChildrenFunction = (): JSX.Element => {
  const True = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>True: {o()}</p>
  }
  const False = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>False: {o()}</p>
  }
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
  )
}

TestTernaryChildrenFunction.test = {
  static: false,
  snapshots: [
    '<p>True: {random}</p><p>False: {random}</p>'
  ]
}

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
  )
}

TestSwitchStatic.test = {
  static: true,
  snapshots: [
    '<p>2</p>'
  ]
}

const TestSwitchObservable = (): JSX.Element => {
  const o = $(0)
  const toggle = () => o(prev => (prev + 1) % 4)
  useInterval(toggle, TEST_INTERVAL)
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
  )
}

TestSwitchObservable.test = {
  static: false,
  snapshots: [
    '<p>0</p>',
    '<p>1</p>',
    '<p>2</p>',
    '<p>default</p>'
  ]
}

const TestSwitchObservableComplex = (): JSX.Element => {
  const o = $(0)
  const toggle = () => o(prev => (prev + 1) % 4)
  const o2 = $(2)
  const toggle2 = () => o2(prev => (prev + 1) % 5)
  const o3 = $(4)
  const toggle3 = () => o3(prev => (prev + 1) % 4)
  useInterval(toggle, TEST_INTERVAL)
  useInterval(toggle2, TEST_INTERVAL)
  useInterval(toggle3, TEST_INTERVAL)
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
  )
}

const TestSwitchFunction = (): JSX.Element => {
  const o = $(0)
  const toggle = () => o(prev => (prev + 1) % 4)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Switch - Function</h3>
      <Switch when={() => o()}>
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
  )
}

TestSwitchFunction.test = {
  static: false,
  snapshots: [
    '<p>0</p>',
    '<p>1</p>',
    '<p>2</p>',
    '<p>default</p>'
  ]
}

const TestSwitchCaseObservableStatic = (): JSX.Element => {
  const Case = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Case: {o()}</p>
  }
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
  )
}

TestSwitchCaseObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Case: {random}</p>'
  ]
}

const TestSwitchCaseFunction = (): JSX.Element => {
  const Case = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Case: {o()}</p>
  }
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
  )
}

TestSwitchCaseFunction.test = {
  static: false,
  snapshots: [
    '<p>Case: {random}</p>'
  ]
}

const TestSwitchDefaultObservableStatic = (): JSX.Element => {
  const Default = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Default: {o()}</p>
  }
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
  )
}

TestSwitchDefaultObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Default: {random}</p>'
  ]
}

const TestSwitchDefaultFunction = (): JSX.Element => {
  const Default = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Default: {o()}</p>
  }
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
  )
}

TestSwitchDefaultFunction.test = {
  static: false,
  snapshots: [
    '<p>Default: {random}</p>'
  ]
}

const TestSwitchFallbackObservableStatic = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>Switch - Fallback Observable Static</h3>
      <Switch when={-1} fallback={<Fallback />}>
        <Switch.Case when={0}>
          <p>case</p>
        </Switch.Case>
      </Switch>
    </>
  )
}

TestSwitchFallbackObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestSwitchFallbackFunction = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>Switch - Fallback Function</h3>
      <Switch when={-1} fallback={Fallback}>
        <Switch.Case when={0}>
          <p>case</p>
        </Switch.Case>
      </Switch>
    </>
  )
}

TestSwitchFallbackFunction.test = {
  static: false,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

class Component<P = {}> {
  props: P
  state: {}
  constructor(props: P) {
    this.props = props
    this.state = {}
  }
  render(props: P): Child {
    throw new Error('Missing render function')
  }
  //@ts-ignore
  static call(thiz: Component, props: P) {
    //@ts-ignore
    const instance = new thiz(props)
    return instance.render(instance.props, instance.state)
  }
}

class TestableComponent<P> extends Component<P> {
  static test = {
    static: true,
    snapshots: ['']
  };
}

class TestComponentStatic extends TestableComponent<{}> {
  render(): JSX.Element {
    return (
      <>
        <h3>Component - Static</h3>
        <p>content</p>
      </>
    )
  }
}

TestComponentStatic.test = {
  static: true,
  snapshots: [
    '<p>content</p>'
  ]
}

class TestComponentStaticProps extends TestableComponent<{ value: number }> {
  render(): JSX.Element {
    return (
      <>
        <h3>Component - Static Props</h3>
        <p>{this.props.value}</p>
      </>
    )
  }
}

TestComponentStaticProps.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

class TestComponentStaticRenderProps extends TestableComponent<{ value: number }> {
  render(props): JSX.Element {
    return (
      <>
        <h3>Component - Static Render Props</h3>
        <p>{props.value}</p>
      </>
    )
  }
}

TestComponentStaticRenderProps.test = {
  static: true,
  snapshots: [
    '<p>{random}</p>'
  ]
}

class TestComponentStaticRenderState extends TestableComponent<{ value: number }> {
  state: { multiplier: number }
  constructor(props) {
    super(props)
    this.state.multiplier = 0
  }
  //@ts-ignore
  render(props, state): JSX.Element {
    return (
      <>
        <h3>Component - Static Render State</h3>
        <p>{props.value * state.multiplier}</p>
      </>
    )
  }
}

TestComponentStaticRenderState.test = {
  static: true,
  snapshots: [
    '<p>0</p>'
  ]
}

class TestComponentObservable extends TestableComponent<{}> {
  getRandom(): number {
    return random()
  }
  render(): JSX.Element {
    const o = $(this.getRandom())
    const randomize = () => o(this.getRandom())
    useInterval(randomize, TEST_INTERVAL)
    return (
      <>
        <h3>Component - Observable</h3>
        <p>{o}</p>
      </>
    )
  }
}

TestComponentObservable.test = {
  static: false,
  snapshots: [
    '<p>{random}</p>'
  ]
}

class TestComponentFunction extends TestableComponent<{}> {
  getRandom(): number {
    return random()
  }
  render(): JSX.Element {
    const o = $(this.getRandom())
    const randomize = () => o(this.getRandom())
    useInterval(randomize, TEST_INTERVAL)
    return (
      <>
        <h3>Component - Function</h3>
        <p>{() => o()}</p>
      </>
    )
  }
}

TestComponentFunction.test = {
  static: false,
  snapshots: [
    '<p>{random}</p>'
  ]
}

const TestTabIndexBooleanStatic = (): JSX.Element => {
  return (
    <>
      <h3>TabIndex - Boolean - Static</h3>
      <p tabIndex={true}>true</p>
      <p tabIndex={false}>false</p>
    </>
  )
}

TestTabIndexBooleanStatic.test = {
  static: true,
  snapshots: [
    '<p tabindex="0">true</p><p>false</p>'
  ]
}

const TestTabIndexBooleanObservable = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>TabIndex - Boolean - Observable</h3>
      <p tabIndex={o}>content</p>
    </>
  )
}

TestTabIndexBooleanObservable.test = {
  static: false,
  snapshots: [
    '<p tabindex="0">content</p>',
    '<p>content</p>'
  ]
}

const TestTabIndexBooleanFunction = (): JSX.Element => {
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>TabIndex - Boolean - Function</h3>
      <p tabIndex={() => o()}>content</p>
    </>
  )
}

TestTabIndexBooleanFunction.test = {
  static: false,
  snapshots: [
    '<p tabindex="0">content</p>',
    '<p>content</p>'
  ]
}

const TestForStatic = (): JSX.Element => {
  const values = [1, 2, 3]
  return (
    <>
      <h3>For - Static</h3>
      <For values={values}>
        {(value: number) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForStatic.test = {
  static: true,
  snapshots: [
    '<p>Value: 1</p><p>Value: 2</p><p>Value: 3</p>'
  ]
}

const TestForObservables = (): JSX.Element => {
  const v1 = $(1)
  const v2 = $(2)
  const v3 = $(3)
  const values = [v1, v2, v3]
  useInterval(() => {
    batch(() => {
      v1((v1() + 1) % 5)
      v2((v2() + 1) % 5)
      v3((v3() + 1) % 5)
    })
  }, TEST_INTERVAL)
  return (
    <>
      <h3>For - Observables</h3>
      <For values={values}>
        {(value: Observable<number>) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForObservables.test = {
  static: false,
  snapshots: [
    '<p>Value: 1</p><p>Value: 2</p><p>Value: 3</p>',
    '<p>Value: 2</p><p>Value: 3</p><p>Value: 4</p>',
    '<p>Value: 3</p><p>Value: 4</p><p>Value: 0</p>',
    '<p>Value: 4</p><p>Value: 0</p><p>Value: 1</p>',
    '<p>Value: 0</p><p>Value: 1</p><p>Value: 2</p>'
  ]
}

const TestForObservablesStatic = (): JSX.Element => {
  const v1 = $(1)
  const v2 = $(2)
  const v3 = $(3)
  const values = [v1, v2, v3]
  useInterval(() => {
    batch(() => {
      v1((v1() + 1) % 5)
      v2((v2() + 1) % 5)
      v3((v3() + 1) % 5)
    })
  }, TEST_INTERVAL)
  return (
    <>
      <h3>For - Observables Static</h3>
      <For values={values}>
        {(value: Observable<number>) => {
          value()
          return <p>Value: {value()}</p>
        }}
      </For>
    </>
  )
}

TestForObservablesStatic.test = {
  static: true,
  snapshots: [
    '<p>Value: 1</p><p>Value: 2</p><p>Value: 3</p>'
  ]
}

const TestForObservableObservables = (): JSX.Element => {
  const v1 = $(1)
  const v2 = $(2)
  const v3 = $(3)
  const v4 = $(4)
  const v5 = $(5)
  const values = $([v1, v2, v3, v4, v5])
  useInterval(() => {
    batch(() => {
      v1(v1() + 1)
      v2(v2() + 1)
      v3(v3() + 1)
      v4(v4() + 1)
      v5(v5() + 1)
      values(values().slice().sort(() => .5 - random()))
    })
  }, TEST_INTERVAL)
  return (
    <>
      <h3>For - Observable Observables</h3>
      <For values={values}>
        {(value: Observable<number>) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

const TestForFunctionObservables = (): JSX.Element => {
  const v1 = $(1)
  const v2 = $(2)
  const v3 = $(3)
  const values = [v1, v2, v3]
  useInterval(() => {
    batch(() => {
      v1((v1() + 1) % 5)
      v2((v2() + 1) % 5)
      v3((v3() + 1) % 5)
    })
  }, TEST_INTERVAL)
  return (
    <>
      <h3>For - Function Observables</h3>
      <For values={() => values}>
        {(value: Observable<number>) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForFunctionObservables.test = {
  static: false,
  snapshots: [
    '<p>Value: 1</p><p>Value: 2</p><p>Value: 3</p>',
    '<p>Value: 2</p><p>Value: 3</p><p>Value: 4</p>',
    '<p>Value: 3</p><p>Value: 4</p><p>Value: 0</p>',
    '<p>Value: 4</p><p>Value: 0</p><p>Value: 1</p>',
    '<p>Value: 0</p><p>Value: 1</p><p>Value: 2</p>'
  ]
}

const TestForRandom = (): JSX.Element => {
  const values = $([random(), random(), random()])
  const update = () => values([random(), random(), random()])
  useInterval(update, TEST_INTERVAL)
  return (
    <>
      <h3>For - Random</h3>
      <For values={values}>
        {(value: number) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForRandom.test = {
  static: false,
  snapshots: [
    '<p>Value: {random}</p><p>Value: {random}</p><p>Value: {random}</p>'
  ]
}

const TestForFallbackStatic = (): JSX.Element => {
  return (
    <>
      <h3>For - Fallback Static</h3>
      <For values={[]} fallback={<div>Fallback!</div>}>
        {(value: number) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForFallbackStatic.test = {
  static: true,
  snapshots: [
    '<div>Fallback!</div>'
  ]
}

const TestForFallbackObservable = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    return (
      <>
        <p>Fallback: {o}</p>
      </>
    )
  }
  return (
    <>
      <h3>For - Fallback Observable</h3>
      <For values={[]} fallback={<Fallback />}>
        {(value: number) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForFallbackObservable.test = {
  static: false,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestForFallbackObservableStatic = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return (
      <>
        <p>Fallback: {o()}</p>
      </>
    )
  }
  return (
    <>
      <h3>For - Fallback Observable Static</h3>
      <For values={[]} fallback={<Fallback />}>
        {(value: number) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForFallbackObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestForFallbackFunction = (): JSX.Element => {
  const Fallback = () => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return (
      <>
        <p>Fallback: {o()}</p>
      </>
    )
  }
  return (
    <>
      <h3>For - Fallback Function</h3>
      <For values={[]} fallback={Fallback}>
        {(value: number) => {
          return <p>Value: {value}</p>
        }}
      </For>
    </>
  )
}

TestForFallbackFunction.test = {
  static: false,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestFragmentStatic = (): JSX.Element => {
  return (
    <>
      <h3>Fragment - Static</h3>
      <p>content</p>
    </>
  )
}

TestFragmentStatic.test = {
  static: true,
  snapshots: [
    '<p>content</p>'
  ]
}

const TestFragmentStaticComponent = (): JSX.Element => {
  return (
    <Voby.Fragment>
      <h3>Fragment - Static Component</h3>
      <p>content</p>
    </Voby.Fragment>
  )
}

TestFragmentStaticComponent.test = {
  static: true,
  snapshots: [
    '<p>content</p>'
  ]
}

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
  )
}

TestFragmentStaticDeep.test = {
  static: true,
  snapshots: [
    '<p>first</p><p>second</p><p>deep</p>'
  ]
}

const TestErrorBoundary = (): JSX.Element => {
  const Erroring = (): JSX.Element => {
    const o = $(true)
    const toggle = () => o(prev => !prev)
    useTimeout(toggle, TEST_INTERVAL)
    return useMemo(() => {
      if (o()) return <p>content</p>
      throw new Error('Custom error')
    })
  }
  const Fallback = ({ error, reset }): JSX.Element => {
    useTimeout(reset, TEST_INTERVAL)
    return <p>Error caught: {error.message}</p>
  }
  return (
    <>
      <h3>Error Boundary</h3>
      <ErrorBoundary fallback={Fallback}>
        <Erroring />
      </ErrorBoundary>
    </>
  )
}

TestErrorBoundary.test = {
  static: false,
  snapshots: [
    '<p>content</p>',
    '<p>Error caught: Custom error</p>'
  ]
}

const TestErrorBoundaryChildrenObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Children: {o()}</p>
  }
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>
  }
  return (
    <>
      <h3>Error Boundary - Children Observable Static</h3>
      <ErrorBoundary fallback={<Fallback />}>
        <Children />
      </ErrorBoundary>
    </>
  )
}

TestErrorBoundaryChildrenObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Children: {random}</p>'
  ]
}

const TestErrorBoundaryChildrenFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Children: {o()}</p>
  }
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>
  }
  return (
    <>
      <h3>Error Boundary - Children Function</h3>
      <ErrorBoundary fallback={<Fallback />}>
        {Children}
      </ErrorBoundary>
    </>
  )
}

TestErrorBoundaryChildrenFunction.test = {
  static: false,
  snapshots: [
    '<p>Children: {random}</p>'
  ]
}

const TestErrorBoundaryFallbackObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    throw new Error()
  }
  const Fallback = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>Error Boundary - Fallback Observable Static</h3>
      <ErrorBoundary fallback={<Fallback />}>
        <Children />
      </ErrorBoundary>
    </>
  )
}

TestErrorBoundaryFallbackObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestErrorBoundaryFallbackFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    throw new Error()
  }
  const Fallback = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>Error Boundary - Fallback Function</h3>
      <ErrorBoundary fallback={Fallback}>
        <Children />
      </ErrorBoundary>
    </>
  )
}

TestErrorBoundaryFallbackFunction.test = {
  static: true,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestChildren = (): JSX.Element => {
  const A = ({ children }: { children?}): JSX.Element => {
    return <div class="A">{children}</div>
  }
  const B = ({ children }: { children?}): JSX.Element => {
    return <div class="B">{children}</div>
  }
  const C = ({ children }: { children?}): JSX.Element => {
    return <div class="C">{children}</div>
  }
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
  )
}

TestChildren.test = {
  static: true,
  snapshots: [
    '<div class="A"><div class="B"><div class="C"><p>content</p></div></div></div>',
  ]
}

const TestRef = (): JSX.Element => {
  const ref = $<HTMLElement>()
  useEffect(() => {
    const element = ref()
    if (!element) return
    element.textContent = `Got ref - Has parent: ${!!ref()?.parentElement} - Is connected: ${!!ref()?.isConnected}`
  })
  return (
    <>
      <h3>Ref</h3>
      <p ref={ref}>content</p>
    </>
  )
}

TestRef.test = {
  static: true,
  snapshots: [
    '<p>Got ref - Has parent: true - Is connected: true</p>',
  ]
}

const TestRefs = (): JSX.Element => {
  const ref1 = $<HTMLElement>()
  const ref2 = $<HTMLElement>()
  useEffect(() => {
    const element1 = ref1()
    const element2 = ref2()
    if (!element1) return
    if (!element2) return
    const content1 = `Got ref1 - Has parent: ${!!element1.parentElement} - Is connected: ${!!element1.isConnected}`
    const content2 = `Got ref2 - Has parent: ${!!element2.parentElement} - Is connected: ${!!element2.isConnected}`
    element1.textContent = `${content1} / ${content2}`
  })
  return (
    <>
      <h3>Refs</h3>
      <p ref={[ref1, ref2, null, undefined]}>content</p>
    </>
  )
}

TestRefs.test = {
  static: true,
  snapshots: [
    '<p>Got ref1 - Has parent: true - Is connected: true / Got ref2 - Has parent: true - Is connected: true</p>',
  ]
}

const TestRefsNested = (): JSX.Element => {
  const ref1 = $<HTMLElement>()
  const ref2 = $<HTMLElement>()
  useEffect(() => {
    const element1 = ref1()
    const element2 = ref2()
    if (!element1) return
    if (!element2) return
    const content1 = `Got ref1 - Has parent: ${!!element1.parentElement} - Is connected: ${!!element1.isConnected}`
    const content2 = `Got ref2 - Has parent: ${!!element2.parentElement} - Is connected: ${!!element2.isConnected}`
    element1.textContent = `${content1} / ${content2}`
  })
  return (
    <>
      <h3>Refs - Nested</h3>
      <p ref={[ref1, [null, [undefined, ref2]]]}>content</p>
    </>
  )
}

TestRefsNested.test = {
  static: true,
  snapshots: [
    '<p>Got ref1 - Has parent: true - Is connected: true / Got ref2 - Has parent: true - Is connected: true</p>',
  ]
}

const TestRefUnmounting = (): JSX.Element => {
  const message = $('')
  const mounted = $(true)
  const ref = $<HTMLElement>()
  const toggle = () => mounted(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  useEffect(() => {
    const element = ref()
    if (element) {
      message(`Got ref - Has parent: ${!!element.parentElement} - Is connected: ${element.isConnected}`)
    } else {
      message(`No ref`)
    }
  })
  return (
    <>
      <h3>Ref - Unmounting</h3>
      <p>{message}</p>
      <If when={mounted}>
        <p ref={ref}>content</p>
      </If>
    </>
  )
}

TestRefUnmounting.test = {
  static: false,
  snapshots: [
    '<p>Got ref - Has parent: true - Is connected: true</p><p>content</p>',
    '<p>Got ref - Has parent: true - Is connected: true</p><!---->',
    // '<p>No ref</p><!---->' //TODO: Maybe enable this back?
  ]
}

const TestRefContext = (): JSX.Element => {
  const message = $('')
  const Context = createContext(123)
  const Reffed = (): JSX.Element => {
    const ref = element => message(`Got ref - Has parent: ${!!element.parentElement} - Is connected: ${element.isConnected} - Context: ${useContext(Context)}`)
    return <p ref={ref}>{message}</p>
  }
  return (
    <>
      <h3>Ref - Context</h3>
      <Context.Provider value={321}>
        <Reffed />
      </Context.Provider>
    </>
  )
}

TestRefContext.test = {
  static: true,
  snapshots: [
    '<p>Got ref - Has parent: true - Is connected: true - Context: 321</p>'
  ]
}

const TestPromiseResolved = (): JSX.Element => {
  const resolved = usePromise<string>(new Promise(resolve => setTimeout(() => resolve('Loaded!'), TEST_INTERVAL)))
  return (
    <>
      <h3>Promise - Resolved</h3>
      {() => {
        if (resolved().pending) return <p>Pending...</p>
        if (resolved().error) return <p>{resolved().error!.message}</p>
        return <p>{resolved().value}</p>
      }}
    </>
  )
}

TestPromiseResolved.test = {
  static: false,
  snapshots: [
    '<p>Pending...</p>',
    '<p>Loaded!</p>'
  ]
}

const TestPromiseRejected = (): JSX.Element => {
  const rejected = usePromise<number>(new Promise((_, reject) => setTimeout(() => reject('Custom Error'), TEST_INTERVAL)))
  return (
    <>
      <h3>Promise - Rejected</h3>
      {() => {
        if (rejected().pending) return <p>Pending...</p>
        if (rejected().error) return <p>{rejected().error!.message}</p>
        return <p>{rejected().value}</p>
      }}
    </>
  )
}

TestPromiseRejected.test = {
  static: false,
  snapshots: [
    '<p>Pending...</p>',
    '<p>Custom Error</p>'
  ]
}

const TestSVGStatic = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Static</h3>
      <svg viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke={randomColor()} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGStatic.test = {
  static: true,
  snapshots: [
    '<svg viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke="{random-color}" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

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
  )
}

const TestSVGStaticCamelCase = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Static CamelCase</h3>
      <svg viewBox="0 0 50 50" width="50px" stroke={randomColor()} strokeWidth="3" edgeMode="foo" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGStaticCamelCase.test = {
  static: true,
  snapshots: [
    '<svg viewBox="0 0 50 50" width="50px" stroke="{random-color}" stroke-width="3" edgeMode="foo" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestSVGObservable = (): JSX.Element => {
  const color = $(randomColor())
  const update = () => color(randomColor())
  useInterval(update, TEST_INTERVAL / 2)
  return (
    <>
      <h3>SVG - Observable</h3>
      <svg viewBox="0 0 50 50" width="50px" stroke={color} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGObservable.test = {
  static: false,
  snapshots: [
    '<svg viewBox="0 0 50 50" width="50px" stroke="{random-color}" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestSVGFunction = (): JSX.Element => {
  const color = $(randomColor())
  const update = () => color(randomColor())
  useInterval(update, TEST_INTERVAL / 2)
  return (
    <>
      <h3>SVG - Function</h3>
      <svg viewBox="0 0 50 50" width="50px" stroke={() => color()} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGFunction.test = {
  static: false,
  snapshots: [
    '<svg viewBox="0 0 50 50" width="50px" stroke="{random-color}" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestSVGStyleObject = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Style Object</h3>
      <svg style={{ stroke: 'red', fill: 'pink' }} viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGStyleObject.test = {
  static: true,
  snapshots: [
    '<svg viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white" style="stroke: red; fill: pink;"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestSVGStyleString = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Style String</h3>
      <svg style="stroke: red; fill: pink;" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGStyleString.test = {
  static: true,
  snapshots: [
    '<svg style="stroke: red; fill: pink;" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestSVGClassObject = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Class Object</h3>
      <svg class={{ red: true }} viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGClassObject.test = {
  static: true,
  snapshots: [
    '<svg class="red" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestSVGClassString = (): JSX.Element => {
  return (
    <>
      <h3>SVG - Class String</h3>
      <svg class="red" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </>
  )
}

TestSVGClassString.test = {
  static: true,
  snapshots: [
    '<svg class="red" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestSVGAttributeRemoval = (): JSX.Element => {
  const o = $<string | null>('red')
  const toggle = () => o(prev => (prev === 'red') ? null : 'red')
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>SVG - Attribute Removal</h3>
      <svg class="red" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" r2={o} />
      </svg>
    </>
  )
}

TestSVGAttributeRemoval.test = {
  static: false,
  snapshots: [
    '<svg class="red" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20" r2="red"></circle></svg>',
    '<svg class="red" viewBox="0 0 50 50" width="50px" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestTemplateExternal = (): JSX.Element => {
  const Templated = template<{ class: string, color: string }>(props => {
    return (
      <div class={props.class}>
        <span>outer <span data-color={props.color}>inner</span></span>
      </div>
    )
  })
  return (
    <>
      <h3>Template - External</h3>
      <Templated class="red" color="blue" />
      <Templated class="blue" color="red" />
    </>
  )
}

TestTemplateExternal.test = {
  static: true,
  snapshots: [
    '<div class="red"><span>outer <span data-color="blue">inner</span></span></div><div class="blue"><span>outer <span data-color="red">inner</span></span></div>'
  ]
}

const TestTemplateSVG = (): JSX.Element => {
  const color = $(randomColor())
  const update = () => color(randomColor())
  useInterval(update, TEST_INTERVAL / 2)
  const Templated = template<{ color }>(props => {
    return (
      <svg viewBox="0 0 50 50" width="50px" stroke={props.color} stroke-width="3" fill="white">
        <circle cx="25" cy="25" r="20" />
      </svg>
    )
  })
  return (
    <>
      <h3>Template - SVG</h3>
      <Templated color={color} />
    </>
  )
}

TestTemplateSVG.test = {
  static: false,
  snapshots: [
    '<svg viewBox="0 0 50 50" width="50px" stroke="{random-color}" stroke-width="3" fill="white"><circle cx="25" cy="25" r="20"></circle></svg>'
  ]
}

const TestContextComponents = (): JSX.Element => {
  const Context = createContext('')
  return (
    <>
      <h3>Context - Components</h3>
      <Context.Provider value="outer">
        {() => {
          const value = useContext(Context)
          return <p>{value}</p>
        }}
        <Context.Provider value="inner">
          {() => {
            const value = useContext(Context)
            return <p>{value}</p>
          }}
        </Context.Provider>
        {() => {
          const value = useContext(Context)
          return <p>{value}</p>
        }}
      </Context.Provider>
    </>
  )
}

TestContextComponents.test = {
  static: true,
  snapshots: [
    '<p>outer</p><p>inner</p><p>outer</p>'
  ]
}

const TestContextHook = (): JSX.Element => {
  const Context = createContext('')
  const Reader = (): JSX.Element => {
    const value = useContext(Context)
    return <p>{value}</p>
  }
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
  )
}

TestContextHook.test = {
  static: true,
  snapshots: [
    '<p>outer</p><p>inner</p><p>outer</p>'
  ]
}

const TestRenderToString = async (): Promise<void> => {
  const App = (): JSX.Element => {
    const o = $(123)
    return (
      <div>
        <h3>renderToString</h3>
        <p>{o}</p>
      </div>
    )
  }
  const expected = '<div><h3>renderToString</h3><p>123</p></div>'
  const actual = await renderToString(<App />)
  assert(actual === expected, `[TestRenderToString]: Expected '${actual}' to be equal to '${expected}'`)
}

const TestRenderToStringSuspense = async (): Promise<void> => {
  const App = (): JSX.Element => {
    const o = $(0)
    const Content = () => {
      useResource(() => {
        return new Promise<number>(resolve => {
          setTimeout(() => {
            resolve(o(123))
          }, TEST_INTERVAL)
        })
      })
      return <p>{o}</p>
    }
    return (
      <div>
        <h3>renderToString - Suspense</h3>
        <Content />
      </div>
    )
  }
  const expected = '<div><h3>renderToString - Suspense</h3><p>123</p></div>'
  const actual = await renderToString(<App />)
  assert(actual === expected, `[TestRenderToStringSuspense]: Expected '${actual}' to be equal to '${expected}'`)
}

const TestPortalStatic = (): JSX.Element => {
  return (
    <>
      <h3>Portal - Static</h3>
      <Portal>
        <p>content</p>
      </Portal>
    </>
  )
}

TestPortalStatic.test = {
  static: true,
  snapshots: [
    '<!---->'
  ]
}

const TestPortalObservable = (): JSX.Element => {
  const AB = (): JSX.Element => {
    const a = <i>a</i>
    const b = <u>b</u>
    const component = $(a)
    const toggle = () => component(() => (component() === a) ? b : a)
    useInterval(toggle, TEST_INTERVAL / 2)
    return component
  }
  const CD = (): JSX.Element => {
    const c = <b>c</b>
    const d = <span>d</span>
    const component = $(c)
    const toggle = () => component(() => (component() === c) ? d : c)
    useInterval(toggle, TEST_INTERVAL / 2)
    return component
  }
  const ab = <AB />
  const cd = <CD />
  const component = $(ab)
  const toggle = () => component(() => (component() === ab) ? cd : ab)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Portal - Observable</h3>
      <Portal>
        {component}
      </Portal>
    </>
  )
}

TestPortalObservable.test = {
  static: true,
  snapshots: [
    '<!---->'
  ]
}

const TestPortalRemoval = (): JSX.Element => {
  const Inner = () => {
    const log = () => console.count('portal.inner')
    useInterval(log, TEST_INTERVAL / 4)
    return <p>content</p>
  }
  const Portalized = () => {
    const log = () => console.count('portal')
    useInterval(log, TEST_INTERVAL / 4)
    return (
      <Portal>
        <Inner />
      </Portal>
    )
  }
  const o = $<boolean | null>(true)
  const toggle = () => o(prev => prev ? null : true)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Portal - Removal</h3>
      <If when={o}>
        <Portalized />
      </If>
    </>
  )
}

TestPortalRemoval.test = {
  static: true,
  snapshots: [
    '<!---->'
  ]
}

const TestPortalMountObservable = (): JSX.Element => {
  const div1 = document.createElement('div')
  const div2 = document.createElement('div')
  const mount = $(div1)
  const toggle = () => mount(prev => prev === div1 ? div2 : div1)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Portal - Mount Observable</h3>
      {div1}
      {div2}
      <Portal mount={mount}>
        <p>content</p>
      </Portal>
    </>
  )
}

TestPortalMountObservable.test = {
  static: false,
  snapshots: [
    '<div><div><p>content</p></div></div><div></div><!---->',
    '<div></div><div><div><p>content</p></div></div><!---->'
  ]
}

const TestPortalWhenObservable = (): JSX.Element => {
  const when = $(false)
  const toggle = () => when(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Portal - When Observable</h3>
      <Portal when={when}>
        <p>content</p>
      </Portal>
    </>
  )
}

TestPortalWhenObservable.test = {
  static: false,
  snapshots: [
    '<p>content</p>',
    '<!---->'
  ]
}

const TestPortalWrapperStatic = (): JSX.Element => {
  return (
    <>
      <h3>Portal - Wrapper Static</h3>
      <Portal wrapper={<div class="custom-wrapper" />}>
        <p>content</p>
      </Portal>
    </>
  )
}

TestPortalWrapperStatic.test = {
  static: true,
  snapshots: [
    '<!---->'
  ]
}

const TestResourceFallbackValue = (): JSX.Element => {
  const resource = useResource(() => { throw new Error('Some error') })
  return (
    <>
      <h3>Resource - Fallback Value</h3>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <If when={() => resource().value} fallback={<p>Loading!</p>}>
          <p>Loaded!</p>
        </If>
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <If when={resource.value} fallback={<p>Loading!</p>}>
          <p>Loaded!</p>
        </If>
      </ErrorBoundary>
    </>
  )
}

TestResourceFallbackValue.test = {
  static: true,
  snapshots: [
    '<p>Error!</p><p>Error!</p>'
  ]
}

const TestResourceFallbackLatest = (): JSX.Element => {
  const resource = useResource(() => { throw new Error('Some error') })
  return (
    <>
      <h3>Resource - Fallback Latest</h3>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <If when={() => resource().latest} fallback={<p>Loading!</p>}>
          <p>Loaded!</p>
        </If>
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <If when={resource.latest} fallback={<p>Loading!</p>}>
          <p>Loaded!</p>
        </If>
      </ErrorBoundary>
    </>
  )
}

TestResourceFallbackLatest.test = {
  static: true,
  snapshots: [
    '<p>Error!</p><p>Error!</p>'
  ]
}

const TestSuspenseAlways = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>
  }
  const Content = () => {
    useResource(() => {
      return new Promise(() => { })
    })
    return <p>Content!</p>
  }
  return (
    <>
      <h3>Suspense - Always</h3>
      <Suspense fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  )
}

TestSuspenseAlways.test = {
  static: true,
  snapshots: [
    '<p>Loading...</p>'
  ]
}

const TestSuspenseNever = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>
  }
  const Content = () => {
    return <p>Content!</p>
  }
  return (
    <>
      <h3>Suspense - Never</h3>
      <Suspense fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  )
}

TestSuspenseNever.test = {
  static: true,
  snapshots: [
    '<p>Content!</p>'
  ]
}

const TestSuspenseObservable = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>
  }
  const Content = () => {
    const o = $(0)
    useResource(() => {
      o()
      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, TEST_INTERVAL / 2)
      })
    })
    const refetch = () => o(prev => prev + 1)
    useInterval(refetch, TEST_INTERVAL)
    return <p>Content!</p>
  }
  return (
    <>
      <h3>Suspense - Observable</h3>
      <Suspense fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  )
}

TestSuspenseObservable.test = {
  static: false,
  snapshots: [
    '<p>Loading...</p>',
    '<p>Content!</p>'
  ]
}

const TestSuspenseWhen = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading...</p>
  }
  const Content = () => {
    return <p>Content!</p>
  }
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Suspense - When</h3>
      <Suspense when={o} fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  )
}

TestSuspenseWhen.test = {
  static: false,
  snapshots: [
    '<p>Loading...</p>',
    '<p>Content!</p>'
  ]
}

const TestSuspenseAlive = (): JSX.Element => {
  const Fallback = () => {
    return <p>Loading ({random()})...</p>
  }
  const Content = () => {
    return <p>Content ({random()})!</p>
  }
  const o = $(true)
  const toggle = () => o(prev => !prev)
  useInterval(toggle, TEST_INTERVAL)
  return (
    <>
      <h3>Suspense - Alive</h3>
      <Suspense when={o} fallback={<Fallback />}>
        <Content />
      </Suspense>
    </>
  )
}

TestSuspenseAlive.test = {
  static: false,
  snapshots: [ //TODO: Test this properly, content is static but loading should be dynamic
    '<p>Loading ({random})...</p>',
    '<p>Content ({random})!</p>'
  ]
}

const TestSuspenseChildrenObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Children: {o()}</p>
  }
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>
  }
  return (
    <>
      <h3>Suspense - Children Observable Static</h3>
      <Suspense fallback={<Fallback />}>
        <Children />
      </Suspense>
    </>
  )
}

TestSuspenseChildrenObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Children: {random}</p>'
  ]
}

const TestSuspenseChildrenFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Children: {o()}</p>
  }
  const Fallback = (): JSX.Element => {
    return <p>Fallback!</p>
  }
  return (
    <>
      <h3>Suspense - Children Function</h3>
      <Suspense fallback={<Fallback />}>
        {Children}
      </Suspense>
    </>
  )
}

TestSuspenseChildrenFunction.test = {
  static: false,
  snapshots: [
    '<p>Children: {random}</p>'
  ]
}

const TestSuspenseFallbackObservableStatic = (): JSX.Element => {
  const Children = (): JSX.Element => {
    useResource(() => {
      return new Promise(() => { })
    })
    return <p>children</p>
  }
  const Fallback = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>Suspense - Fallback Observable Static</h3>
      <Suspense fallback={<Fallback />}>
        <Children />
      </Suspense>
    </>
  )
}

TestSuspenseFallbackObservableStatic.test = {
  static: true,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestSuspenseFallbackFunction = (): JSX.Element => {
  const Children = (): JSX.Element => {
    useResource(() => {
      return new Promise(() => { })
    })
    return <p>children</p>
  }
  const Fallback = (): JSX.Element => {
    const o = $(String(random()))
    const randomize = () => o(String(random()))
    useInterval(randomize, TEST_INTERVAL)
    o()
    return <p>Fallback: {o()}</p>
  }
  return (
    <>
      <h3>Suspense - Fallback Function</h3>
      <Suspense fallback={Fallback}>
        <Children />
      </Suspense>
    </>
  )
}

TestSuspenseFallbackFunction.test = {
  static: false,
  snapshots: [
    '<p>Fallback: {random}</p>'
  ]
}

const TestSuspenseCleanup = (): JSX.Element => {
  const ChildrenLoop = () => {
    useResource(() => {
      return new Promise(() => { })
    })
    return <p>Loop!</p>
  }
  const ChildrenPlain = () => {
    return <p>Loaded!</p>
  }
  const Children = (): JSX.Element => {
    const o = $(true)
    const toggle = () => o(prev => !prev)
    setTimeout(toggle, TEST_INTERVAL)
    return (
      <Ternary when={o}>
        <ChildrenLoop />
        <ChildrenPlain />
      </Ternary>
    )
  }
  const Fallback = (): JSX.Element => {
    return <p>Loading...</p>
  }
  return (
    <>
      <h3>Suspense - Cleanup</h3>
      <Suspense fallback={<Fallback />}>
        <Children />
      </Suspense>
    </>
  )
}

TestSuspenseCleanup.test = {
  static: false,
  snapshots: [
    '<p>Loading...</p>',
    '<p>Loaded!</p>'
  ]
}

const TestLazy = (): JSX.Element => {
  const Component = (): JSX.Element => {
    return <p>Loaded!</p>
  }
  const Fallback = (): JSX.Element => {
    return <p>Loading...</p>
  }
  const lazyFetcher = () => new Promise<{ default: JSX.Component }>(resolve => setTimeout(() => resolve({ default: Component }), TEST_INTERVAL))
  const LazyComponent = lazy(lazyFetcher)
  return (
    <>
      <h3>Lazy</h3>
      <Suspense fallback={<Fallback />}>
        <LazyComponent />
      </Suspense>
    </>
  )
}

TestLazy.test = {
  static: false,
  snapshots: [
    '<p>Loading...</p>',
    '<p>Loaded!</p>'
  ]
}

const TestNestedArrays = (): JSX.Element => {
  const items = $([0, 1, 2])
  const activeItem = $(1)

  const incrementItems = () => {
    items(items => [...items, items.length])
    activeItem(item => item + 1)
  }

  setTimeout(incrementItems, TEST_INTERVAL)
  setTimeout(incrementItems, TEST_INTERVAL * 2)

  return (
    <>
      <h3>Nested Arrays</h3>
      <button onClick={incrementItems}>Increment</button>
      <ul>
        <For values={items}>
          {item => {
            return (
              <>
                <If when={() => activeItem() === item}>
                  <li>test</li>
                </If>
                <li>
                  {item}
                </li>
              </>
            )
          }}
        </For>
      </ul>
    </>
  )
}

TestNestedArrays.test = {
  static: false,
  snapshots: [
    '<button>Increment</button><ul><li>0</li><li>test</li><li>1</li><li>2</li></ul>',
    '<button>Increment</button><ul><li>0</li><li>1</li><li>test</li><li>2</li><li>3</li></ul>',
    '<button>Increment</button><ul><li>0</li><li>1</li><li>2</li><li>test</li><li>3</li><li>4</li></ul>'
  ]
}

const TestNestedIfs = (): JSX.Element => {
  return (
    <>
      <If when={true}>
        <If when={true}>
          <div>1</div>
          <div>2</div>
        </If>
        <div>Footer</div>
      </If>
    </>
  )
}

TestNestedIfs.test = {
  static: true,
  snapshots: [
    '<div>1</div><div>2</div><div>Footer</div>'
  ]
}

const Test = (): JSX.Element => {
  TestRenderToString()
  TestRenderToStringSuspense()
  return (
    <>
      <TestSnapshots Component={TestNullStatic} />
      <TestSnapshots Component={TestNullObservable} />
      <TestSnapshots Component={TestNullFunction} />
      {/* <TestSnapshots Component={TestNullRemoval} /> */}
      <TestSnapshots Component={TestUndefinedStatic} />
      <TestSnapshots Component={TestUndefinedObservable} />
      <TestSnapshots Component={TestUndefinedFunction} />
      {/* <TestSnapshots Component={TestUndefinedRemoval} /> */}
      <TestSnapshots Component={TestBooleanStatic} />
      <TestSnapshots Component={TestBooleanObservable} />
      <TestSnapshots Component={TestBooleanFunction} />
      {/* <TestSnapshots Component={TestBooleanRemoval} /> */}
      <TestSnapshots Component={TestSymbolStatic} />
      <TestSnapshots Component={TestSymbolObservable} />
      <TestSnapshots Component={TestSymbolFunction} />
      {/* <TestSnapshots Component={TestSymbolRemoval} /> */}
      <TestSnapshots Component={TestNumberStatic} />
      <TestSnapshots Component={TestNumberObservable} />
      <TestSnapshots Component={TestNumberFunction} />
      {/* <TestSnapshots Component={TestNumberRemoval} /> */}
      <TestSnapshots Component={TestBigIntStatic} />
      <TestSnapshots Component={TestBigIntObservable} />
      <TestSnapshots Component={TestBigIntFunction} />
      {/* <TestSnapshots Component={TestBigIntRemoval} /> */}
      <TestSnapshots Component={TestStringStatic} />
      <TestSnapshots Component={TestStringObservable} />
      <TestSnapshots Component={TestStringObservableStatic} />
      <TestSnapshots Component={TestStringObservableDeepStatic} />
      <TestSnapshots Component={TestStringFunction} />
      <TestSnapshots Component={TestStringRemoval} />
      <TestSnapshots Component={TestAttributeStatic} />
      <TestSnapshots Component={TestAttributeObservable} />
      <TestSnapshots Component={TestAttributeObservableBoolean} />
      <TestSnapshots Component={TestAttributeFunction} />
      <TestSnapshots Component={TestAttributeFunctionBoolean} />
      <TestSnapshots Component={TestAttributeRemoval} />
      <TestSnapshots Component={TestAttributeBooleanStatic} />
      <TestPropertyCheckedStatic />
      <TestPropertyCheckedObservable />
      <TestPropertyCheckedFunction />
      <TestPropertyCheckedRemoval />
      <TestPropertyValueStatic />
      <TestPropertyValueObservable />
      <TestPropertyValueFunction />
      <TestPropertyValueRemoval />
      <TestInputLabelFor />
      <TestSnapshots Component={TestSelectStaticOption} />
      <TestSnapshots Component={TestSelectStaticValue} />
      <TestSnapshots Component={TestSelectObservableOption} />
      <TestSnapshots Component={TestSelectObservableValue} />
      <TestSnapshots Component={TestIdStatic} />
      <TestSnapshots Component={TestIdObservable} />
      <TestSnapshots Component={TestIdFunction} />
      <TestSnapshots Component={TestIdRemoval} />
      <TestSnapshots Component={TestClassNameStatic} />
      <TestSnapshots Component={TestClassNameObservable} />
      <TestSnapshots Component={TestClassNameFunction} />
      <TestSnapshots Component={TestClassStatic} />
      <TestSnapshots Component={TestClassStaticString} />
      <TestSnapshots Component={TestClassObservable} />
      <TestSnapshots Component={TestClassObservableString} />
      <TestSnapshots Component={TestClassFunction} />
      <TestSnapshots Component={TestClassFunctionString} />
      <TestSnapshots Component={TestClassRemoval} />
      <TestSnapshots Component={TestClassRemovalString} />
      <TestSnapshots Component={TestClassesArrayStatic} />
      <TestSnapshots Component={TestClassesArrayStaticMultiple} />
      <TestSnapshots Component={TestClassesArrayObservable} />
      <TestSnapshots Component={TestClassesArrayObservableMultiple} />
      <TestSnapshots Component={TestClassesArrayObservableValue} />
      <TestSnapshots Component={TestClassesArrayFunction} />
      <TestSnapshots Component={TestClassesArrayFunctionMultiple} />
      <TestSnapshots Component={TestClassesArrayFunctionValue} />
      <TestSnapshots Component={TestClassesArrayStore} />
      <TestSnapshots Component={TestClassesArrayStoreMultiple} />
      <TestSnapshots Component={TestClassesArrayNestedStatic} />
      <TestSnapshots Component={TestClassesArrayRemoval} />
      <TestSnapshots Component={TestClassesArrayRemovalMultiple} />
      <TestSnapshots Component={TestClassesArrayCleanup} />
      <TestSnapshots Component={TestClassesObjectStatic} />
      <TestSnapshots Component={TestClassesObjectStaticMultiple} />
      <TestSnapshots Component={TestClassesObjectObservable} />
      <TestSnapshots Component={TestClassesObjectObservableMultiple} />
      <TestSnapshots Component={TestClassesObjectFunction} />
      <TestSnapshots Component={TestClassesObjectFunctionMultiple} />
      <TestSnapshots Component={TestClassesObjectStore} />
      <TestSnapshots Component={TestClassesObjectStoreMultiple} />
      <TestSnapshots Component={TestClassesObjectRemoval} />
      <TestSnapshots Component={TestClassesObjectRemovalMultiple} />
      <TestSnapshots Component={TestClassesObjectCleanup} />
      <TestSnapshots Component={TestStyleStatic} />
      <TestSnapshots Component={TestStyleStaticNumeric} />
      <TestSnapshots Component={TestStyleStaticString} />
      <TestSnapshots Component={TestStyleStaticVariable} />
      <TestSnapshots Component={TestStyleObservable} />
      <TestSnapshots Component={TestStyleObservableNumeric} />
      <TestSnapshots Component={TestStyleObservableString} />
      <TestSnapshots Component={TestStyleObservableVariable} />
      <TestSnapshots Component={TestStyleFunction} />
      <TestSnapshots Component={TestStyleFunctionNumeric} />
      <TestSnapshots Component={TestStyleFunctionString} />
      <TestSnapshots Component={TestStyleFunctionVariable} />
      <TestSnapshots Component={TestStyleRemoval} />
      <TestSnapshots Component={TestStylesStatic} />
      <TestSnapshots Component={TestStylesObservable} />
      <TestSnapshots Component={TestStylesFunction} />
      <TestSnapshots Component={TestStylesStore} />
      <TestSnapshots Component={TestStylesRemoval} />
      <TestSnapshots Component={TestStylesCleanup} />
      <TestSnapshots Component={TestHTMLFunctionStatic} />
      <TestSnapshots Component={TestHTMLFunctionStaticRegistry} />
      <TestSnapshots Component={TestHTMLInnerHTMLStatic} />
      <TestSnapshots Component={TestHTMLInnerHTMLObservable} />
      <TestSnapshots Component={TestHTMLInnerHTMLFunction} />
      <TestSnapshots Component={TestHTMLOuterHTMLStatic} />
      <TestSnapshots Component={TestHTMLOuterHTMLObservable} />
      <TestSnapshots Component={TestHTMLOuterHTMLFunction} />
      <TestSnapshots Component={TestHTMLTextContentStatic} />
      <TestSnapshots Component={TestHTMLTextContentObservable} />
      <TestSnapshots Component={TestHTMLTextContentFunction} />
      <TestSnapshots Component={TestHTMLDangerouslySetInnerHTMLStatic} />
      <TestSnapshots Component={TestHTMLDangerouslySetInnerHTMLObservable} />
      <TestSnapshots Component={TestHTMLDangerouslySetInnerHTMLObservableString} />
      <TestSnapshots Component={TestHTMLDangerouslySetInnerHTMLFunction} />
      <TestSnapshots Component={TestHTMLDangerouslySetInnerHTMLFunctionString} />
      <TestSnapshots Component={TestDirective} />
      <TestSnapshots Component={TestDirectiveRegisterLocal} />
      <TestSnapshots Component={TestDirectiveSingleArgument} />
      <TestSnapshots Component={TestDirectiveRef} />
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
      <TestSnapshots Component={TestABCD} />
      <TestSnapshots Component={TestChildrenBoolean} />
      <TestSnapshots Component={TestChildrenSymbol} />
      <TestSnapshots Component={TestCleanupInner} />
      <TestSnapshots Component={TestCleanupInnerPortal} />
      <TestSnapshots Component={TestContextDynamicContext} />
      <TestSnapshots Component={TestDynamicHeading} />
      <TestSnapshots Component={TestDynamicObservableComponent} />
      <TestSnapshots Component={TestDynamicFunctionComponent} />
      <TestSnapshots Component={TestDynamicObservableProps} />
      <TestSnapshots Component={TestDynamicFunctionProps} />
      <TestSnapshots Component={TestDynamicObservableChildren} />
      <TestSnapshots Component={TestIfStatic} />
      <TestSnapshots Component={TestIfObservable} />
      <TestSnapshots Component={TestIfFunction} />
      <TestSnapshots Component={TestIfFunctionUntracked} />
      <TestSnapshots Component={TestIfFunctionUntrackedUnnarrowed} />
      <TestSnapshots Component={TestIfFunctionUntrackedNarrowed} />
      <TestSnapshots Component={TestIfNestedFunctionUnnarrowed} />
      <TestSnapshots Component={TestIfNestedFunctionNarrowed} />
      <TestSnapshots Component={TestIfChildrenObservableStatic} />
      <TestSnapshots Component={TestIfChildrenFunction} />
      <TestSnapshots Component={TestIfChildrenFunctionObservable} />
      <TestSnapshots Component={TestIfFallbackStatic} />
      <TestSnapshots Component={TestIfFallbackObservable} />
      <TestSnapshots Component={TestIfFallbackObservableStatic} />
      <TestSnapshots Component={TestIfFallbackFunction} />
      {/* <TestSnapshots Component={TestIfRace} /> */}
      <TestSnapshots Component={TestTernaryStatic} />
      <TestSnapshots Component={TestTernaryStaticInline} />
      <TestSnapshots Component={TestTernaryObservable} />
      <TestSnapshots Component={TestTernaryObservableChildren} />
      <TestSnapshots Component={TestTernaryFunction} />
      <TestSnapshots Component={TestTernaryChildrenObservableStatic} />
      <TestSnapshots Component={TestTernaryChildrenFunction} />
      <TestSnapshots Component={TestSwitchStatic} />
      <TestSnapshots Component={TestSwitchObservable} />
      <TestSwitchObservableComplex />
      <TestSnapshots Component={TestSwitchFunction} />
      <TestSnapshots Component={TestSwitchCaseObservableStatic} />
      <TestSnapshots Component={TestSwitchCaseFunction} />
      <TestSnapshots Component={TestSwitchDefaultObservableStatic} />
      <TestSnapshots Component={TestSwitchDefaultFunction} />
      <TestSnapshots Component={TestSwitchFallbackObservableStatic} />
      <TestSnapshots Component={TestSwitchFallbackFunction} />
      <TestSnapshots Component={TestComponentStatic as any} />
      <TestSnapshots Component={TestComponentStaticProps as any} props={{ value: random() }} />
      <TestSnapshots Component={TestComponentStaticRenderProps as any} props={{ value: random() }} />
      <TestSnapshots Component={TestComponentStaticRenderState as any} props={{ value: random() }} />
      <TestSnapshots Component={TestComponentObservable as any} />
      <TestSnapshots Component={TestComponentFunction as any} />
      <TestSnapshots Component={TestTabIndexBooleanStatic} />
      <TestSnapshots Component={TestTabIndexBooleanObservable} />
      <TestSnapshots Component={TestTabIndexBooleanFunction} />
      <TestSnapshots Component={TestForStatic} />
      <TestSnapshots Component={TestForObservables} />
      <TestSnapshots Component={TestForObservablesStatic} />
      <TestForObservableObservables />
      <TestSnapshots Component={TestForFunctionObservables} />
      <TestSnapshots Component={TestForRandom} />
      <TestSnapshots Component={TestForFallbackStatic} />
      <TestSnapshots Component={TestForFallbackObservable} />
      <TestSnapshots Component={TestForFallbackObservableStatic} />
      <TestSnapshots Component={TestForFallbackFunction} />
      <TestSnapshots Component={TestFragmentStatic} />
      <TestSnapshots Component={TestFragmentStaticComponent} />
      <TestSnapshots Component={TestFragmentStaticDeep} />
      <TestSnapshots Component={TestErrorBoundary} />
      <TestSnapshots Component={TestErrorBoundaryChildrenObservableStatic} />
      <TestSnapshots Component={TestErrorBoundaryChildrenFunction} />
      <TestSnapshots Component={TestErrorBoundaryFallbackObservableStatic} />
      <TestSnapshots Component={TestErrorBoundaryFallbackFunction} />
      <TestSnapshots Component={TestChildren} />
      <TestSnapshots Component={TestRef} />
      <TestSnapshots Component={TestRefs} />
      <TestSnapshots Component={TestRefsNested} />
      <TestSnapshots Component={TestRefUnmounting} />
      <TestSnapshots Component={TestRefContext} />
      <TestSnapshots Component={TestPromiseResolved} />
      <TestSnapshots Component={TestPromiseRejected} />
      <TestSnapshots Component={TestSVGStatic} />
      <TestSVGStaticComplex />
      <TestSnapshots Component={TestSVGStaticCamelCase} />
      <TestSnapshots Component={TestSVGObservable} />
      <TestSnapshots Component={TestSVGFunction} />
      <TestSnapshots Component={TestSVGStyleObject} />
      <TestSnapshots Component={TestSVGStyleString} />
      <TestSnapshots Component={TestSVGClassObject} />
      <TestSnapshots Component={TestSVGClassString} />
      <TestSnapshots Component={TestSVGAttributeRemoval} />
      <TestSnapshots Component={TestTemplateExternal} />
      <TestSnapshots Component={TestTemplateSVG} />
      <TestSnapshots Component={TestContextComponents} />
      <TestSnapshots Component={TestContextHook} />
      <TestSnapshots Component={TestPortalStatic} />
      <TestSnapshots Component={TestPortalObservable} />
      <TestSnapshots Component={TestPortalRemoval} />
      <TestSnapshots Component={TestPortalMountObservable} />
      <TestSnapshots Component={TestPortalWhenObservable} />
      <TestSnapshots Component={TestPortalWrapperStatic} />
      <TestSnapshots Component={TestResourceFallbackValue} />
      <TestSnapshots Component={TestResourceFallbackLatest} />
      <TestSnapshots Component={TestSuspenseAlways} />
      <TestSnapshots Component={TestSuspenseNever} />
      <TestSnapshots Component={TestSuspenseObservable} />
      <TestSnapshots Component={TestSuspenseWhen} />
      <TestSnapshots Component={TestSuspenseAlive} />
      <TestSnapshots Component={TestSuspenseChildrenObservableStatic} />
      <TestSnapshots Component={TestSuspenseChildrenFunction} />
      <TestSnapshots Component={TestSuspenseFallbackObservableStatic} />
      <TestSnapshots Component={TestSuspenseFallbackFunction} />
      <TestSnapshots Component={TestSuspenseCleanup} />
      <TestSnapshots Component={TestLazy} />
      <TestSnapshots Component={TestNestedArrays} />
      <TestSnapshots Component={TestNestedIfs} />
      <hr />
    </>
  )
}

render(Test, document.getElementById('app'))
