'use strict';
var React = require('react');
var expect = require('expect.js');
var {describe, it, before} = require('mocha');
var listenTo = require('../').listenTo;
var fail = () => expect().fail();

describe('listenTo (on the server)', function () {
  before(function () {
    expect(global.window).to.be(undefined);
    expect(global.document).to.be(undefined);
  });
  it('has no effect', function () {
    var called = false;
    var listenable = {
      listen: fail,
      unlisten: fail
    };

    @listenTo(listenable, fail)
    class Component extends React.Component {
      render() {
        called = true;
        return React.createElement('div');
      }
    }

    React.renderToString(React.createElement(Component));
    expect(called).to.be(true);
  });
});
