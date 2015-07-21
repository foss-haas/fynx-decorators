'use strict';
var React = require('react');
var expect = require('expect.js');
var {describe, it, before} = require('mocha');
var connectProp = require('../src/connect-prop-decorator');

describe('connectProp (on the server)', function () {
  before(function () {
    expect(global.window).to.be(undefined);
    expect(global.document).to.be(undefined);
  });
  it('does not listen to the store', function () {
    var called = false;
    var store = x => x;
    store.listen = () => expect().fail();
    store.unlisten = () => expect().fail();

    @connectProp('meh', 'noop')
    class Component extends React.Component {
      render() {
        called = true;
        return React.createElement('div');
      }
    }

    React.renderToString(React.createElement(Component, {meh: store}));
    expect(called).to.be(true);
  });
  it('does not write to the store', function () {
    var called = false;
    var store = (...args) => args.length && expect().fail();

    @connectProp('meh', 'noop')
    class Component extends React.Component {
      render() {
        called = true;
        return React.createElement('div');
      }
    }

    React.renderToString(React.createElement(Component, {meh: store}));
    expect(called).to.be(true);
  });
  it('sets the initial state from the store', function () {
    var called = false;
    var value = 'potato';
    var store = () => value;

    @connectProp('qux', 'foo')
    class Component extends React.Component {
      render() {
        called = true;
        expect(this.props).to.have.property('foo', value);
        return React.createElement('div');
      }
    }

    React.renderToString(React.createElement(Component, {qux: store}));
    expect(called).to.be(true);
  });
});
