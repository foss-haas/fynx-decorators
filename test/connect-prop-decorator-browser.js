'use strict';
var React = require('react/addons');
var expect = require('expect.js');
var Document = require('html-document');
var {describe, it, afterEach, before, after} = require('mocha');
var connectProp = require('../').connectProp;

describe('connectProp (in a browser)', function () {
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
    var type;
    var store = x => x;
    store.unlisten = x => x;
    store.listen = function (fn, ctx) {
      expect(fn).to.be.a('function');
      expect(ctx).to.be.a(type);
      called = true;
    };

    @connectProp('meh', 'foo')
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
    React.render(React.createElement(Component, {meh: store}), global.document.body);
  });
  it('unregisters the listener when the component is unmounted', function (done) {
    var called = false;
    var listener = null;
    var store = x => x;
    var type;
    store.listen = function (fn) {
      listener = fn;
    };
    store.unlisten = function (fn, ctx) {
      expect(listener).not.to.be(null);
      expect(fn).to.equal(listener);
      expect(ctx).to.be.a(type);
      called = true;
    };

    @connectProp('meh', 'meh')
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
    React.render(React.createElement(Component, {meh: store}), global.document.body);
    React.unmountComponentAtNode(global.document.body);
  });
  it('sets the initial state from the store', function () {
    var called = false;
    var value = 'potato';
    var store = () => value;
    store.listen = x => x;
    store.unlisten = x => x;

    @connectProp('meh', 'foo')
    class Component extends React.Component {
      render() {
        called = true;
        expect(this.state).to.have.property('foo', value);
        return React.createElement('div');
      }
    }

    React.render(React.createElement(Component, {meh: store}), global.document.body);
    expect(called).to.be(true);
  });
  it('updates the state when the store emits', function (done) {
    var value = 'potato';
    var newValue = 'tomato';
    var listeners = [];
    var store = () => value;
    store.unlisten = x => x;
    store.listen = (fn, ctx) => listeners.push({fn: fn, ctx: ctx});

    @connectProp('meh', 'foo')
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

    React.render(React.createElement(Component, {meh: store}), global.document.body);
  });
  describe('when the prop changes', function () {
    it('updates the state', function (done) {
      var value = 'potato';
      var newValue = 'tomato';
      var store1 = () => value;
      store1.unlisten = x => x;
      store1.listen = x => x;
      var store2 = () => newValue;
      store2.unlisten = x => x;
      store2.listen = x => x;
      var rerender = function (Component) {
        rerender = x => x;
        React.render(React.createElement(Component, {meh: store2}), global.document.body);
      };

      @connectProp('meh', 'foo')
      class Component extends React.Component {
        componentWillUpdate(props, state) {
          expect(props).to.have.property('meh', store2);
          expect(state).to.have.property('foo', newValue);
          done();
        }
        componentDidMount() {
          rerender(Component);
        }
        render() {
          return React.createElement('div');
        }
      }

      React.render(React.createElement(Component, {meh: store1}), global.document.body);
    });
    it('unregisters the listener', function (done) {
      var called = false;
      var listener = null;
      var store1 = x => x;
      var type;
      store1.listen = function (fn) {
        listener = fn;
      };
      store1.unlisten = function (fn, ctx) {
        expect(listener).not.to.be(null);
        expect(fn).to.equal(listener);
        expect(ctx).to.be.a(type);
        called = true;
      };
      var store2 = x => x;
      store2.unlisten = x => x;
      store2.listen = x => x;
      var rerender = function (Component) {
        rerender = x => x;
        React.render(React.createElement(Component, {meh: store2}), global.document.body);
      };

      @connectProp('meh', 'foo')
      class Component extends React.Component {
        componentWillUpdate() {
          expect(called).to.be(true);
          done();
        }
        componentDidMount() {
          rerender(Component);
        }
        render() {
          return React.createElement('div');
        }
      }

      type = Component.type;
      React.render(React.createElement(Component, {meh: store1}), global.document.body);
    });
    it('registers a new listener', function (done) {
      var called = false;
      var type;
      var store1 = x => x;
      store1.unlisten = x => x;
      store1.listen = x => x;
      var store2 = x => x;
      store2.listen = function (fn, ctx) {
        expect(fn).to.be.a('function');
        expect(ctx).to.be.a(type);
        called = true;
      };
      store2.unlisten = x => x;
      var rerender = function (Component) {
        rerender = x => x;
        React.render(React.createElement(Component, {meh: store2}), global.document.body);
      };

      @connectProp('meh', 'foo')
      class Component extends React.Component {
        componentWillUpdate() {
          expect(called).to.be(true);
          done();
        }
        componentDidMount() {
          rerender(Component);
        }
        render() {
          return React.createElement('div');
        }
      }

      type = Component.type;
      React.render(React.createElement(Component, {meh: store1}), global.document.body);
    });
    describe('when the prop is identical', function () {
      it('does nothing', function (done) {
        var called = false;
        var value = 'potato';
        var store = () => value;
        store.listen = x => x;
        store.unlisten = function () {
          called = true;
        };
        var rerender = function (Component) {
          rerender = x => x;
          React.render(React.createElement(Component, {meh: store, x: 'y'}), global.document.body);
        };

        @connectProp('meh', 'foo')
        class Component extends React.Component {
          componentWillUpdate() {
            expect(called).to.be(false);
            done();
          }
          componentDidMount() {
            rerender(Component);
          }
          render() {
            return React.createElement('div');
          }
        }

        React.render(React.createElement(Component, {meh: store}), global.document.body);
      });
    });
    describe('when the new prop is missing', function () {
      it('clears the state', function (done) {
        var value = 'potato';
        var store = () => value;
        store.unlisten = x => x;
        store.listen = x => x;
        var rerender = function (Component) {
          rerender = x => x;
          React.render(React.createElement(Component), global.document.body);
        };

        @connectProp('meh', 'foo')
        class Component extends React.Component {
          componentWillUpdate(props, state) {
            expect(props.meh).to.be(undefined);
            expect(state.foo).to.be(undefined);
            done();
          }
          componentDidMount() {
            rerender(Component);
          }
          render() {
            return React.createElement('div');
          }
        }

        React.render(React.createElement(Component, {meh: store}), global.document.body);
      });
    });
  });
  describe('if the prop is missing', function () {
    it('does nothing', function (done) {
      var called = false;

      @connectProp('fourOhFour', 'missing')
      class Component extends React.Component {
        componentDidMount() {
          expect(this.state).not.to.have.property('missing');
          called = true;
        }
        componentWillUnmount() {
          expect(called).to.be(true);
          done();
        }
        render() {
          return React.createElement('div');
        }
      }

      React.render(React.createElement(Component), global.document.body);
      React.unmountComponentAtNode(global.document.body);
    });
    describe('when the prop changes', function () {
      it('updates the state', function (done) {
        var value = 'potato';
        var store = () => value;
        store.unlisten = x => x;
        store.listen = x => x;
        var rerender = function (Component) {
          rerender = x => x;
          React.render(React.createElement(Component, {meh: store}), global.document.body);
        };

        @connectProp('meh', 'foo')
        class Component extends React.Component {
          componentWillUpdate(props, state) {
            expect(props).to.have.property('meh', store);
            expect(state).to.have.property('foo', value);
            done();
          }
          componentDidMount() {
            rerender(Component);
          }
          render() {
            return React.createElement('div');
          }
        }

        React.render(React.createElement(Component), global.document.body);
      });
      it('registers a listener', function (done) {
        var called = false;
        var store = x => x;
        var type;
        store.listen = function (fn, ctx) {
          expect(fn).to.be.a('function');
          expect(ctx).to.be.a(type);
          called = true;
        };
        store.unlisten = x => x;
        var rerender = function (Component) {
          rerender = x => x;
          React.render(React.createElement(Component, {meh: store}), global.document.body);
        };

        @connectProp('meh', 'foo')
        class Component extends React.Component {
          componentWillUpdate() {
            expect(called).to.be(true);
            done();
          }
          componentDidMount() {
            rerender(Component);
          }
          render() {
            return React.createElement('div');
          }
        }

        type = Component.type;
        React.render(React.createElement(Component), global.document.body);
      });
      describe('if the prop is still missing', function () {
        it('does nothing', function (done) {
          var rerender = function (Component) {
            rerender = x => x;
            React.render(React.createElement(Component, {x: 'y'}), global.document.body);
          };

          @connectProp('fourOhFour', 'missing')
          class Component extends React.Component {
            componentWillUpdate(props, state) {
              expect(props.meh).to.be(undefined);
              expect(state.foo).to.be(undefined);
              done();
            }
            componentDidMount() {
              rerender(Component);
            }
            render() {
              return React.createElement('div');
            }
          }

          React.render(React.createElement(Component), global.document.body);
        });
      });
    });
  });
});
