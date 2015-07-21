'use strict';
var React;
var expect = require('expect.js');
var {describe, it, before, after, afterEach} = require('mocha');
var Document = require('html-document');
var connect = require('../src/connect-decorator');

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
    React = require('react/addons');
  });
  after(function () {
    delete global.window;
    delete global.document;
    delete console.debug;
  });
  it('registers a listener with the given store', function (done) {
    var type;
    var called = false;
    var store = x => x;
    store.unlisten = x => x;
    store.listen = function (fn, ctx) {
      expect(fn).to.be.a('function');
      expect(ctx).to.be.a(type);
      called = true;
    };

    @connect(store, 'foo')
    class Component extends React.Component {
      render() {
        return <div/>;
      }
    }

    class OuterComponent extends React.Component {
      componentDidMount() {
        expect(called).to.equal(true);
        done();
      }
      render() {
        return <Component/>;
      }
    }

    type = Component;
    React.render(React.createElement(OuterComponent), global.document.body);
  });
  it('unregisters the listener when the component is unmounted', function (done) {
    var type;
    var called = false;
    var listener = null;
    var store = x => x;
    store.listen = function (fn) {
      listener = fn;
    };
    store.unlisten = function (fn, ctx) {
      expect(listener).not.to.be(null);
      expect(fn).to.equal(listener);
      expect(ctx).to.be.a(type);
      called = true;
    };

    @connect(store, 'meh')
    class Component extends React.Component {
      componentWillUnmount() {
        expect(called).to.equal(true);
        done();
      }
      render() {
        return <div/>;
      }
    }

    type = Component;
    React.render(React.createElement(Component), global.document.body);
    React.unmountComponentAtNode(global.document.body);
  });
  it('sets the initial props from the store', function () {
    var called = false;
    var value = 'potato';
    var store = () => value;
    store.listen = x => x;
    store.unlisten = x => x;

    @connect(store, 'foo')
    class Component extends React.Component {
      render() {
        called = true;
        expect(this.props).to.have.property('foo', value);
        return null;
      }
    }

    React.render(React.createElement(Component), global.document.body);
    expect(called).to.be(true);
  });
  it('updates the props when the store emits', function (done) {
    var value = 'potato';
    var newValue = 'tomato';
    var listeners = [];
    var store = () => value;
    store.unlisten = x => x;
    store.listen = (fn, ctx) => listeners.push({fn: fn, ctx: ctx});

    @connect(store, 'foo')
    class Component extends React.Component {
      componentWillUpdate(props) {
        expect(props).to.have.property('foo', newValue);
        done();
      }
      render() {
        return <div/>;
      }
    }

    class OuterComponent extends React.Component {
      componentDidMount() {
        expect(listeners.length).to.equal(1);
        value = newValue;
        listeners.forEach(function (listener) {
          listener.fn.call(listener.ctx, newValue);
        });
      }
      render() {
        return <Component/>;
      }
    }

    React.render(React.createElement(OuterComponent), global.document.body);
  });
});
