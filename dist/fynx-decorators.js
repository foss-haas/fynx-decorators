var FynxMixins =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = {
	  listenTo: __webpack_require__(1),
	  listenToProp: __webpack_require__(2),
	  connect: __webpack_require__(3),
	  connectProp: __webpack_require__(4),
	  connectVia: __webpack_require__(5)
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	module.exports = function listenToProp(prop, fn) {
	  return function (Component) {
	    return (function (_Component) {
	      _inherits(ListeningComponent, _Component);

	      function ListeningComponent() {
	        _classCallCheck(this, ListeningComponent);

	        _get(Object.getPrototypeOf(ListeningComponent.prototype), 'constructor', this).apply(this, arguments);
	      }

	      _createClass(ListeningComponent, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	          var _get2;

	          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	          }

	          (_get2 = _get(Object.getPrototypeOf(ListeningComponent.prototype), 'componentWillReceiveProps', this)).call.apply(_get2, [this, nextProps].concat(args));
	          var func = typeof fn === 'function' ? fn : this[fn];
	          if (nextProps[prop]) {
	            if (nextProps[prop] === this.props[prop]) return;
	            nextProps[prop].listen(func, this);
	            if (this.props[prop]) {
	              this.props[prop].unlisten(func, this);
	            }
	          } else {
	            if (!this.props[prop]) return;
	            this.props[prop].unlisten(func, this);
	          }
	        }
	      }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }

	          _get(Object.getPrototypeOf(ListeningComponent.prototype), 'componentDidMount', this).apply(this, args);
	          if (!this.props[prop]) return;
	          var func = typeof fn === 'function' ? fn : this[fn];
	          this.props[prop].listen(func, this);
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	          }

	          _get(Object.getPrototypeOf(ListeningComponent.prototype), 'componentWillUnmount', this).apply(this, args);
	          if (!this.props[prop]) return;
	          var func = typeof fn === 'function' ? fn : this[fn];
	          this.props[prop].unlisten(func, this);
	        }
	      }]);

	      return ListeningComponent;
	    })(Component);
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	module.exports = function connect(store, name) {
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
	          state[name] = store();
	          return state;
	        }
	      }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }

	          _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'componentDidMount', this).apply(this, args);
	          store.listen(update, this);
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	          }

	          _get(Object.getPrototypeOf(ConnectedComponent.prototype), 'componentWillUnmount', this).apply(this, args);
	          store.unlisten(update, this);
	        }
	      }]);

	      return ConnectedComponent;
	    })(Component);
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);