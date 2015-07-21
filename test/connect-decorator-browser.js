'use strict';
var React = require('react/addons');
var expect = require('expect.js');
var {describe, it, before, after, afterEach} = require('mocha');
var Document = require('html-document');
var connect = require('../').connect;

describe('connect (in a browser)', function () {
  afterEach(function () {
    React.unmountComponentAtNode(global.document.body);
  });
  before(function () {
    // Prepare the globals React expects in a browser
    global.window = {
      location: {},
      navigator: {userAgent: 'Chrome'},
      document: new Document()
    };
    global.window.window = global.window;
    global.document = global.window.document;
    console.debug = console.log;
  });
  after(function () {
    delete global.window;
    delete global.document;
    delete console.debug;
  });
  it('registers a listener with the given store', function (done) {
    var called = false;
    var store = x => x;

    @connect(store, 'foo')
    class Component extends React.Component {
      componentDidMount() {
        expect(called).to.equal(true);
        done();
      }
      render() {
        return null;
      }
    }

    store.unlisten = x => x;
    store.listen = function (fn, ctx) {
      expect(fn).to.be.a('function');
      expect(ctx).to.be.a(Component.type);
      called = true;
    };

    React.render(React.createElement(Component), global.document.body);
  });
  it('unregisters the listener when the component is unmounted', function (done) {
    var called = false;
    var listener = null;
    var store = x => x;

    @connect(store, 'meh')
    class Component extends React.Component {
      componentWillUnmount() {
        expect(called).to.equal(true);
        done();
      }
      render() {
        return React.createElement('div');
      }
    }

    store.listen = function (fn) {
      listener = fn;
    };
    store.unlisten = function (fn, ctx) {
      expect(listener).not.to.be(null);
      expect(fn).to.equal(listener);
      expect(ctx).to.be.a(Component.type);
      called = true;
    };
    React.render(React.createElement(Component), global.document.body);
    React.unmountComponentAtNode(global.document.body);
  });
  it('sets the initial state from the store', function () {
    var called = false;
    var value = 'potato';
    var store = x => x;
    store.listen = x => x;
    store.unlisten = x => x;

    @connect(store, 'foo')
    class Component extends React.Component {
      render() {
        called = true;
        expect(this.state).to.have.property('foo', value);
        return React.createElement('div');
      }
    }

    React.render(React.createElement(Component), global.document.body);
    expect(called).to.be(true);
  });
  it('updates the state when the store emits', function (done) {
    var value = 'potato';
    var newValue = 'tomato';
    var listeners = [];
    var store = () => value;
    store.unlisten = x => x;
    store.listen = (fn, ctx) => listeners.push({fn: fn, ctx: ctx});

    @connect(store, 'foo')
    class Component extends React.Component {
      componentWillUpdate(props, state) {
        expect(state).to.have.property('foo', newValue);
        done();
      }
      componentDidMount() {
        expect(listeners.length).to.equal(1);
        value = newValue;
        listeners.forEach(function (listener) {
          listener.fn.call(listener.ctx, newValue);
        });
      }
      render() {
        return React.createElement('div');
      }
    }

    React.render(React.createElement(Component), global.document.body);
  });
});
