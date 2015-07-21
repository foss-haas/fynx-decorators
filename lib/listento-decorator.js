'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

module.exports = function listenTo(store, fn) {
  return function (Component) {
    return (function (_Component) {
      _inherits(ListeningComponent, _Component);

      function ListeningComponent() {
        _classCallCheck(this, ListeningComponent);

        _get(Object.getPrototypeOf(ListeningComponent.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(ListeningComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _get(Object.getPrototypeOf(ListeningComponent.prototype), 'componentDidMount', this).apply(this, args);
          store.listen(typeof fn === 'function' ? fn : this[fn], this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _get(Object.getPrototypeOf(ListeningComponent.prototype), 'componentWillUnmount', this).apply(this, args);
          store.unlisten(typeof fn === 'function' ? fn : this[fn], this);
        }
      }]);

      return ListeningComponent;
    })(Component);
  };
};