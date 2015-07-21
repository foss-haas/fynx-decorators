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

## connect(store, name):Decorator

Creates a React decorator that updates the component's props by setting the prop identified by `name` to the store's value whenever the store's value changes.

Automatically adds the store's current value to the component's initial props.

Registers the listener on `componentDidMount` and unregisters it on `componentWillUnmount`.

## connectProp(propName, name):Decorator

Creates a React decorator that updates the component's props by setting the prop identified by `name` to the value of the store in the outer prop `propName` whenever the store's value changes.

Automatically adds the store's current value to the component's initial props and reacts to outer prop changes.

Registers the listener on `componentDidMount` and unregisters it on `componentWillUnmount`.

# License

The MIT/Expat license. For more information, see http://foss-haas.mit-license.org/ or the accompanying [LICENSE](https://github.com/foss-haas/fynx-decorators/blob/master/LICENSE) file.
