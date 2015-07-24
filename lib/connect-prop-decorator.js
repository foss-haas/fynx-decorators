'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
module.exports = function connectProp(prop, name) {
  return function (DecoratedComponent) {
    function update(value) {
      this.setState(_defineProperty({}, name, value));
    }
    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
    return (function (_React$Component) {
      _inherits(Component, _React$Component);

      function Component() {
        _classCallCheck(this, Component);

        _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, arguments);

        this.state = this.props[prop] ? _defineProperty({}, name, this.props[prop]()) : {};
      }

      _createClass(Component, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (nextProps[prop]) {
            if (nextProps[prop] === this.props[prop]) return;
            nextProps[prop].listen(update, this);
            update.call(this, nextProps[prop]());
            if (this.props[prop]) {
              this.props[prop].unlisten(update, this);
            }
          } else {
            if (!this.props[prop]) return;
            update.call(this, undefined);
            this.props[prop].unlisten(update, this);
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (!this.props[prop]) return;
          this.props[prop].listen(update, this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (!this.props[prop]) return;
          this.props[prop].unlisten(update, this);
        }
      }, {
        key: 'render',
        value: function render() {
          return React.createElement(DecoratedComponent, _extends({}, this.props, this.state));
        }
      }], [{
        key: 'DecoratedComponent',
        value: DecoratedComponent,
        enumerable: true
      }, {
        key: 'displayName',
        value: 'Connected(' + displayName + ')',
        enumerable: true
      }]);

      return Component;
    })(React.Component);
  };
};