'use strict';
var React = require('react/addons');
var expect = require('expect.js');
var Document = require('html-document');
var {describe, it, afterEach, before, after} = require('mocha');
var listenTo = require('../').listenTo;
var inception = () => inception;

describe('listenTo (in a browser)', function () {
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
  describe('when used with a function', function () {
    it('registers it as listener with the given listenable', function (done) {
      var listener = x => x;
      var called = false;
      var type;
      var listenable = {
        unlisten: x => x,
        listen(fn, ctx) {
          expect(fn).to.equal(listener);
          expect(ctx).to.be.a(type);
          called = true;
        }
      };

      @listenTo(listenable, listener)
      class Component extends React.Component {
        componentDidMount() {
          expect(called).to.equal(true);
          done();
        }
        render() {
          return null;
        }
      }

      type = Component.type;
      React.render(React.createElement(Component), global.document.body);
    });
    it('unregisters it when the component is unmounted', function (done) {
      var listener = x => x;
      var called = false;
      var type;
      var listenable = {
        listen: x => x,
        unlisten(fn, ctx) {
          expect(fn).to.equal(listener);
          expect(ctx).to.be.a(type);
          called = true;
        }
      };

      @listenTo(listenable, listener)
      class Component extends React.Component {
        componentWillUnmount() {
          expect(called).to.equal(true);
          done();
        }
        render() {
          return React.createElement('div');
        }
      }

      type = Component.type;
      React.render(React.createElement(Component), global.document.body);
      React.unmountComponentAtNode(global.document.body);
    });
  });
  describe('when used with a method name', function () {
    it('registers the matching method as listener with the given listenable', function (done) {
      var called = false;
      var type;
      var listenable = {
        unlisten: x => x,
        listen(fn, ctx) {
          expect(fn()).to.equal(inception);
          expect(ctx).to.be.a(type);
          called = true;
        }
      };

      @listenTo(listenable, 'weMustGo')
      class Component extends React.Component {
        weMustGo = inception;
        componentDidMount() {
          expect(called).to.equal(true);
          done();
        }
        render() {
          return null;
        }
      }

      type = Component.type;
      React.render(React.createElement(Component), global.document.body);
    });
    it('unregisters the matching method when the component is unmounted', function (done) {
      var called = false;
      var type;
      var listenable = {
        listen: x => x,
        unlisten(fn, ctx) {
          expect(fn()).to.equal(inception);
          expect(ctx).to.be.a(type);
          called = true;
        }
      };

      @listenTo(listenable, 'weMustGo')
      class Component extends React.Component {
        weMustGo = inception;
        componentWillUnmount() {
          expect(called).to.equal(true);
          done();
        }
        render() {
          return React.createElement('div');
        }
      }

      type = Component.type;
      React.render(React.createElement(Component), global.document.body);
      React.unmountComponentAtNode(global.document.body);
    });
  });
});
