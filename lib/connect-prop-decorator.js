'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

module.exports = function connectProp(prop, name) {
  return function (Component) {
    function update(value) {
      var state = {};
      state[name] = value;
      this.setState(state);
    }
    return (function (_Component) {
      _inherits(ConnectedComponent, _Component);

      function ConnectedComponent() {
        _classCallCheck(this, ConnectedComponent);

        _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(ConnectedComponent, [{
        key: 'getInitialState',
        value: function getInitialState() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var state = _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'getInitialState', this).apply(this, args);
          if (this.props[prop]) {
            state[name] = this.props[prop]();
          }
          return state;
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var _get2;

          for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          (_get2 = _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'componentWillReceiveProps', this)).call.apply(_get2, [this, nextProps].concat(args));
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
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'componentDidMount', this).apply(this, args);
          if (!this.props[prop]) return;
          this.props[prop].listen(update, this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'componentWillUnmount', this).apply(this, args);
          if (!this.props[prop]) return;
          this.props[prop].unlisten(update, this);
        }
      }]);

      return ConnectedComponent;
    })(Component);
  };
};