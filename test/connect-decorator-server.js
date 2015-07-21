'use strict';
var React = require('react');
var expect = require('expect.js');
var {describe, it, before} = require('mocha');
var connect = require('../src/connect-decorator');

describe('connect (on the server)', function () {
  before(function () {
    expect(global.window).to.be(undefined);
    expect(global.document).to.be(undefined);
  });
  it('does not listen to the store', function () {
    var called = false;
    var store = function () {};
    store.listen = () => expect().fail();
    store.unlisten = () => expect().fail();

    @connect(store, 'noop')
    class Component extends React.Component {
      render() {
        called = true;
        return React.createElement('div');
      }
    }

    React.renderToString(React.createElement(Component));
    expect(called).to.be(true);
  });
  it('does not write to the store', function () {
    var called = false;
    var store = (...args) => args.length && expect().fail();

    @connect(store, 'noop')
    class Component extends React.Component {
      render() {
        called = true;
        return React.createElement('div');
      }
    }

    React.renderToString(React.createElement(Component));
    expect(called).to.be(true);
  });
  it('sets the initial state from the store', function () {
    var called = false;
    var value = 'potato';
    var store = () => value;

    @connect(store, 'foo')
    class Component extends React.Component {
      render() {
        called = true;
        expect(this.props).to.have.property('foo', value);
        return React.createElement('div');
      }
    }

    React.renderToString(React.createElement(Component));
    expect(called).to.be(true);
  });
});
