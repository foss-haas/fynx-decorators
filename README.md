[Fynx](http://foss-haas.github.io/fynx) is an architecture library for [React](http://facebook.github.io/react). The **fynx-decorators** module provides store decorators for class-based React components.

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/foss-haas/fynx)

[![license - MIT](https://img.shields.io/npm/l/fynx-decorators.svg)](http://foss-haas.mit-license.org) [![Dependencies](https://img.shields.io/david/foss-haas/fynx-decorators.svg)](https://david-dm.org/foss-haas/fynx-decorators)

[![NPM status](https://nodei.co/npm/fynx-decorators.png?compact=true)](https://www.npmjs.com/package/fynx-decorators)

[![Build status](https://img.shields.io/travis/foss-haas/fynx-decorators.svg)](https://travis-ci.org/foss-haas/fynx-decorators) [![Coverage status](https://img.shields.io/coveralls/foss-haas/fynx-decorators.svg)](https://coveralls.io/r/foss-haas/fynx-decorators?branch=master)

# Install

## With NPM

```sh
npm install fynx-decorators
```

## With Bower

```sh
bower install fynx-decorators
```

## From source

```sh
git clone https://github.com/foss-haas/fynx-decorators.git
cd fynx-decorators
npm install
npm run dist
```

# API

## listenTo(listenable, listener):Decorator

Creates a React decorator that registers the given listener function with the given `listenable` store or action (or anything that has methods `listen(fn, ctx)` and `unlisten(fn, ctx)`). The listener will be invoked with its context set to the React component.

If `listener` is a string, the component's method with the given name will be used.

Registers the listener on `componentDidMount` and unregisters it on `componentWillUnmount`.

## listenToProp(propName, listener):Decorator

Creates a React decorator that registers the given listener function with the store or action (or anything that has methods `listen(fn, ctx)` and `unlisten(fn, ctx)`) in the prop `propName`. The listener will be invoked with its context set to the React component.

Automatically reacts to prop changes.

If `listener` is a string, the component's method with the given name will be used.

Registers the listener on `componentDidMount` and unregisters it on `componentWillUnmount`.

## connect(store, name):Decorator

Creates a React decorator that updates the component's state by setting `name` to the store's value whenever the store's value changes.

Automatically adds the store's current value to the component's initial state.

Registers the listener on `componentDidMount` and unregisters it on `componentWillUnmount`.

## connectProp(propName, name):Decorator

Creates a React decorator that updates the component's state by setting `name` to the value of the store in the prop `propName` whenever the store's value changes.

Automatically adds the store's current value to the component's initial state and reacts to prop changes.

Registers the listener on `componentDidMount` and unregisters it on `componentWillUnmount`.

## connectVia(stores, fn):Decorator

Creates a React decorator that updates the component's state by passing the current value of each store in `stores` to the given function `fn` whenever any of the stores changes. The function will be invoked with its context set to the React component.

Automatically adds the result of invoking the function with the current value of each store to the component's initial state.

If `fn` is a string, the component's method with the given name will be used.

If `stores` is not an array, it will be wrapped in an array automatically.

Registers the listener on `componentDidMount` and unregisters it on `componentWillUnmount`.

**Examples**

```js
@connectVia([aStore, bStore], 'update')
class Foo extends React.Component {
  update: function (aVal, bVal) { // invoked whenever either of the stores changes
    return {
      a: aVal,
      b: bVal.get(this.props.qux), // `this` works as usual
      c: aVal.get(bVal.get('foo')) // this.state.c depends on both stores
    };
  },
  // ...
}
```

# License

The MIT/Expat license. For more information, see http://foss-haas.mit-license.org/ or the accompanying [LICENSE](https://github.com/foss-haas/fynx-decorators/blob/master/LICENSE) file.