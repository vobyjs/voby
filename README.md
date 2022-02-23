# Voby

A high-performance framework with fine-grained observable-based reactivity for building rich applications.

## Features

This works similarly to [Solid](https://www.solidjs.com), but without the need for the Babel transform and with a different API.

- **No VDOM**: there's no VDOM overhead, the framework deals with raw DOM nodes directly.
- **No stale closures**: components are executed once, so you don't need to worry about stale closures.
- **No dependencies arrays**: the framework is able to detect what depends on what else automatically, no need to specify dependencies manually.
- **No diffing**: updates are fine grained, there's no reconciliation overhead, no props diffing, whenever an attribute/property/class/handler/etc. should be updated it's updated directly and immediately.
- **No Babel**: there's no need to use Babel with this framework, it works with plain old JS (plus JSX if you are into that). As a consequence we have 0 transform function bugs, because we don't have a transform function.
- **No server support**: for the time being this framework is focused on local-first rich applications, ~no server-related features are implemented: no hydration, no server components, no SSR, no suspense etc.
- **Observable-based**: observables are at the core of our reactivity system. The way it works is very different from a React-like system, it may be more challenging to learn, but the effort is well worth it.
- **Work in progress**: this is at best alpha software, I'm working on it because I need something with great performance for [Notable](https://github.com/notable/notable), I'm allergic to third-party dependencies, I'd like something with an API that resonates with me, and I wanted to deeply understand how the more solid [Solid](https://www.solidjs.com), which you should probably use instead, works.

## Demo

You can find some CodeSandbox demos below, more demos are contained inside the repository.

- Playground: https://codesandbox.io/s/voby-playground-7w2pxg
- Counter: https://codesandbox.io/s/voby-demo-counter-23fv5
- Benchmark: https://codesandbox.io/s/voby-demo-benchmark-x0nr40

## APIs

- [**Observable**](#observable)
  - [`$, $$`](#observable)
- [**Methods**](#methods)
  - [`createElement`](#createelement)
  - [`isObservable`](#isobservable)
  - [`render`](#render)
  - [`renderToString`](#rendertostring)
  - [`styled`](#styled)
  - [`svg`](#svg)
  - [`template`](#template)
- [**Components**](#components)
  - [`Component`](#component)
  - [`ErrorBoundary`](#errorboundary)
  - [`Fragment`](#fragment)
  - [`For`](#for)
  - [`If`](#if)
  - [`Portal`](#portal)
  - [`Switch`](#switch)
  - [`Ternary`](#ternary)
- [**Hooks**](#hooks)
  - [`useCleanup`](#usecleanup)
  - [`useComputed`](#usecomputed)
  - [`useDisposed`](#usedisposed)
  - [`useEffect`](#useeffect)
  - [`useError`](#useerror)
  - [`useFrom`](#usefrom)
  - [`useInterval`](#useinterval)
  - [`usePromise`](#usepromise)
  - [`useRoot`](#useroot)
  - [`useTimeout`](#usetimeout)
- [**Extras**](#extras)
  - [`vite`](#vite)

## Usage

The following is going to be a very shallow documentation of the API. As I mentioned this isn't production-grade software, it may become that in the future though, are you interested?

### Observable

First of all this framework is just a UI layer built on top of the Observable library [oby](https://github.com/fabiospampinato/oby), knowing how that works is necessary to understand how this works.

Everything that `oby` provides is used internally and it's simply re-exported by `voby`.

Generally whenever you can use a raw value you can also use an observable, for example if you pass a plain string as the value of an attribute it will never change, it you use an observable instead it will change whenever the value inside the observable changes, automatically.

[Read upstream documentation](https://github.com/fabiospampinato/oby#usage).

```tsx
import {$, $$} from 'voby';

$ // => Same as require ( 'oby' )
$$ // => Same as require ( 'oby' ).get
```

### Methods

The following top-level methods are provided.

#### `createElement`

This is the function that will make DOM nodes and call/instantiate components, it will be called for you automatically via JSX.

```tsx
import {createElement} from 'voby';

const element = createElement ( 'div', { class: 'foo' }, 'child' ); // => () => HTMLDivElement
```

### `isObservable`

This function tells you if a variable is an observable or not.

```tsx
import {$, isObservable} from 'voby';

isObservable ( 123 ); // => false
isObservable ( $(123) ); // => false
```

#### `render`

This function mounts a component inside a provided DOM element and returns a disposer function.

```tsx
import {render} from 'voby';

const App = () => <p>Hello, World!</p>;

const dispose = render ( <App />, document.body );

dispose (); // Unmounted and all reactivity inside it stopped
```

#### `renderToString`

This works just like `render`, but it returns an HTML representation of the rendered component.

This is currently implemented in a way that works only inside a browser environement, so you'll need to use [JSDOM](https://github.com/jsdom/jsdom) or similar for this to work server-side.

```tsx
import {renderToString} from 'voby';

const App = () => <p>Hello, World!</p>;

const html = await renderToString ( <App /> );
```

#### `styled`

This is an object providing styled-components-like API, it's based on the awesome [goober](https://github.com/cristianbote/goober) and it largely just re-exports some of its methods.

```tsx
import {styled} from 'voby';

const GlobalStyle = styled.global`
  :root {
    --color-bg: tomato;
    --color-fg: white;
  }
`;

const rotate = styled.keyframes`
  from, to {
    width: 50px;
  }
  50% {
    width: 150px;
  }
`;

const disabled = styled.class ( 'disabled' );

const P = styled.p`
  background-color: var(--color-bg);
  color: var(--color-fg);
  animation: ${rotate} 1s ease-in-out infinite;

  &${disabled} {
    opacity: .5;
    pointer-events: none;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <P class={{ [disabled.raw]: true }}>content</P>
    </>
  );
};
```

#### `svg`

This function enables you to embed an SVG relatively cleanly in your page.

_This function internally uses `innerHTML` and must therefor only be used with trusted input_.

```tsx
const App = () => {
  const hex = `#${Math.floor ( Math.random () * 0xFFFFFF ).toString ( 16 ).padStart ( 6, '0' )}`;
  return (
    <div class="something">
      {svg`
        <svg viewBox="0 0 50 50" width="50px" xmlns="http://www.w3.org/2000/svg" stroke="${color}" stroke-width="3" fill="white">
          <circle cx="25" cy="25" r="20" />
        </svg>
      `}
    </div>
  );
};
```

#### `template`

This function enables constructing elements with [Solid](https://www.solidjs.com)-level performance without using the Babel transform, but also without the convenience of that.

It basically works like [sinuous](https://github.com/luwes/sinuous/tree/master)'s template function, but with a slightly cleaner API, since you don't have to access your props any differently inside the template here.

```tsx
import {template} from 'voby';

const Row = template ( ({ id, cls, label, onSelect, onRemove }) => {
  return (
    <tr class={cls}>
      <td class="col-md-1">{id}</td>
      <td class="col-md-4">
        <a onClick={onSelect}>{label}</a>
      </td>
      <td class="col-md-1">
        <a onClick={onRemove}>
          <span class="glyphicon glyphicon-remove" ariaHidden={true}></span>
        </a>
      </td>
      <td class="col-md-6"></td>
    </tr>
  );
});

const Table = () => {
  const rows = [ /* props for all your rows here */ ];
  return rows.map ( row => <Row {...row}> );
};
```

### Components

The following components are provided.

Crucially some components are provided for control flow, since regular control flow primitives wouldn't be reactive.

#### `Component`

This is the base class for your class-based components, if you are into that.

The nice thing about class-based components is that you get ref forwarding for free, the eventual ref passed to a class component will automatically receive the class instance corresponding to the component.

```tsx
import {Component} from 'voby';

class App extends Component<{ value: number }> {
  render ( ({ value }) ): JSX.Element {
    return <p>Value: {value}</p>;
  }
}
```

#### `ErrorBoundary`

The error boundary catches errors happening while synchronously mounting its children, and renders a fallback compontent when that happens.

```tsx
import {ErrorBoundary} from 'voby';

const Fallback = ({ reset, error }: { reset: () => void, error: Error }) => {
  return (
    <>
      <p>Error: {error.message}</p>
      <button onClick={error}>Recover</button>
    </>
  );
};

const SomeComponentThatThrows = () => {
  throw 'whatever';
};

const App = () => {
  return (
    <ErrorBoundary fallback={Fallback}>
      <SomeComponentThatThrows />
    </ErrorBoundary>
  )
};
```

#### `Fragment`

This is just the internal component used for rendering fragments: `<></>`, you probably would never use this directly even if you are not using JSX, since you can return plain arrays from your components anyway.

```tsx
import {Fragment} from 'voby';

const App = () => {
  return (
    <Fragment>
      <p>child 1</p>
      <p>child 2</p>
    </Fragment>
  )
}
```

#### `For`

This component is the reactive alternative to natively mapping over an array.

```tsx
import {For} from 'voby';

const App = () => {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <For values={numbers}>
      {( value, index, values ) => {
        return <p>Value: {value} - Index: {index}</p>
      }}
    </For>
  )
};
```

#### `If`

This component is the reactive alternative to the native `if`.

```tsx
import {If} from 'voby';

const App = () => {
  const visible = $(false);
  const toggle = () => visible ( !visible () );
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <If when={visible}>
        <p>Hello!</p>
      </If>
    </>
  )
};
```

#### `Portal`

This component mounts its children inside a provided DOM element, or inside `document.body` otherwise.

Events will propagate natively according to the resulting DOM hierarchy, not the components hierarchy.

```tsx
import Portal from 'voby';

const Modal = () => {
  // Some modal component maybe...
};

const App = () => {
  return (
    <Portal mount={document.body}>
      <Modal />
    </Portal>
  );
};
```

#### `Switch`

This component is the reactive alternative to the native `switch`.

```tsx
import {Switch} from 'voby';

const App = () => {
  const value = $(0);
  const increment = () => value ( value () + 1 );
  const decrement = () => value ( value () - 1 );
  return (
    <>
      <Switch when={value}>
        <Switch.Case when={0}>
          <p>0, the boundary between positives and negatives! (?)</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1, the multiplicative identity!</p>
        </Switch.Case>
        <Switch.Default>
          <p>{value}, I don't have anything interesting to say about that :(</p>
        </Switch.Default>
      </Switch>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  )
};
```

#### `Ternary`

This component is the reactive alternative to the native ternary operator.

The first child will be rendered when the condition is `true`, otherwise the second child will be rendered.

```tsx
import {Ternary} from 'voby';

const App = () => {
  const visible = $(false);
  const toggle = () => visible ( !visible () );
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <Ternary when={visible}>
        <p>Visible :)</p>
        <p>Invisible :(</p>
      </Ternary>
    </>
  )
};
```

### Hooks

The following hooks are provided.

Many of these are just functions that `oby` provides, re-exported as `use*` functions.

Hooks are just regular functions, if their name starts with `use` then we call them hooks.

#### `useCleanup`

This hook registers a function to be called when the parent computation is disposed.

[Read upstream documentation](https://github.com/fabiospampinato/oby#cleanup).

```tsx
import {useCleanup} from 'voby';

useCleanup // => Same as require ( 'oby' ).cleanup
```

#### `useComputed`

This hook is the crucial other ingredients that we need, other than observables themselves, to have a powerful reactive system that can track dependencies and re-execute computations when needed.

This hook registers a function to be called when any of its dependencies change, and the return of that function is wrapped in a read-only observable and returned.

[Read upstream documentation](https://github.com/fabiospampinato/oby#computed).

```tsx
import {useComputed} from 'voby';

useComputed // => Same as require ( 'oby' ).computed
```

#### `useDisposed`

This hook returns a boolean read-only observable that is set to `true` when the parent computation gets disposed of.

[Read upstream documentation](https://github.com/fabiospampinato/oby#disposed).

```tsx
import {useDisposed} from 'voby';

useDisposed // => Same as require ( 'oby' ).disposed
```

#### `useEffect`

This hook registers a function to be called when any of its dependencies change. If a function is returned it's automatically registered as a cleanup function.

[Read upstream documentation](https://github.com/fabiospampinato/oby#effect).

```tsx
import {useEffect} from 'voby';

useEffect // => Same as require ( 'oby' ).effect
```

#### `useError`

This hook registers a function to be called when the parent computation throws.

[Read upstream documentation](https://github.com/fabiospampinato/oby#error).

```tsx
import {useError} from 'voby';

useError // => Same as require ( 'oby' ).error
```

#### `useFrom`

This hook is useful for encapsulating values that may change over time into an observable.

[Read upstream documentation](https://github.com/fabiospampinato/oby#from).

```tsx
import {useFrom} from 'voby';

useFrom // => Same as require ( 'oby' ).from
```

#### `useInterval`

This hook is just an alternative to `setInterval` that automatically clears itself when the parent computation is disposed.

```tsx
import {useInterval} from 'voby';

useInterval ( () => console.log ( 'called' ), 1000 );
```

#### `usePromise`

This hook wraps a promise in an observable, so that you can be notified when it resolves or rejects.

```tsx
import {usePromise} from 'voby';

const App = () => {
  const request = fetch ( 'https://my.api' ).then ( res => res.json ( 0 ) );
  const promise = usePromise ( request );
  return resolved.on ( state => {
    if ( state.loading ) return <p>loading...</p>;
    if ( state.error ) return <p>{state.error.message}</p>;
    return <p>{JSON.stringify ( state.value )}</p>
  });
};
```

### `useRoot`

This hook creates a new computation root, detached from any parent computation.

[Read upstream documentation](https://github.com/fabiospampinato/oby#root).

```tsx
import {useRoot} from 'voby';

useRoot // => Same as require ( 'oby' ).root
```

#### `useTimeout`

This hook is just an alternative to `setTimeout` that automatically clears itself when the parent computation is disposed.

```tsx
import {useTimeout} from 'voby';

useTimeout ( () => console.log ( 'called' ), 1000 );
```

## Extras

The following extra functionalities are provided via submodules.

### `vite`

A basic [Vite](https://github.com/vitejs/vite) plugin is provided.

```js
// vite.js

const voby = require ( 'voby/vite-plugin' );

module.exports = defineConfig ({
  plugins: [
    voby ()
  ]
});
```

## Thanks

- **[S](https://github.com/adamhaile/S)**: for paving the way to this awesome reactive way of writing software.
- **[sinuous/observable](https://github.com/luwes/sinuous/tree/master/packages/sinuous/observable)**: for making me fall in love with Observables.
- **[Solid](https://www.solidjs.com)**: for being a great sort of reference implementation, popularizing Observable-based reactivity, and having built a great community.

## License

MIT © Fabio Spampinato
