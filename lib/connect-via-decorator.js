'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var extend = function extend(obj, src) {
  if (!obj) return src;
  Object.keys(src).forEach(function (key) {
    obj[key] = src[key];
  });
  return obj;
};

module.exports = function connectVia(stores, fn) {
  return function (Component) {
    if (!Array.isArray(stores)) stores = [stores];
    function getStateFromStores(self) {
      var values = stores.map(function (store) {
        return store();
      });
      var func = typeof fn === 'function' ? fn : self[fn];
      return func.apply(self, values);
    }
    function update() {
      this.setState(getStateFromStores(this));
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
          return extend(state, getStateFromStores(this));
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this = this;

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'componentDidMount', this).apply(this, args);
          stores.map(function (store) {
            return store.listen(update, _this);
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var _this2 = this;

          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'componentWillUnmount', this).apply(this, args);
          stores.map(function (store) {
            return store.unlisten(update, _this2);
          });
        }
      }]);

      return ConnectedComponent;
    })(Component);
  };
};