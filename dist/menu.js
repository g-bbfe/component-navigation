/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(20);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(14);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_proxy__ = __webpack_require__(34);







function getMenuData() {
    return __WEBPACK_IMPORTED_MODULE_3__services_proxy__["a" /* default */].get('menu.json')
        .then(data => {
            return data.items || [];
        })
}

getMenuData()
    .then(data => {
        // 折叠态
        // $sidebar.className = 'sidebar sidebar-folded';
        new __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default.a({
            // container: "menu-folded",
            data: data,
            url: '/ios/iphone/8'
        });

    })
    .catch(err => {
        console.error(err);
        window.alert(`发生异常: ${err.message}`);
    })


let $sidebar = document.getElementById('sidebar');
let $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
let $menu = document.getElementById('menu');


const toggleClass = function toggleClass($el, className) {
    let separator = ' ',
        prevclassNames = $el.getAttribute('class'),
        nextclassNames = '',
        classNamesArr = prevclassNames.split(separator),
        index = classNamesArr.indexOf(className);
    if (index < 0) {
        // addclassName
        nextclassNames = `${prevclassNames}${separator}${className}`;
    } else {
        // removeclassName
        nextclassNames = classNamesArr.reduce(function(accumulator, currValue) { return `${accumulator}${separator}` + (currValue === className ? '' : currValue) });
    }
    $el.setAttribute('class', nextclassNames);

}

$sidebarToggleBtn.onclick = function() {
    if ($sidebar) {
        toggleClass($sidebar, 'sidebar-folded');
        var ifFold = document.getElementById("sidebar-toggle-btn").className.indexOf("fold") > -1 ? true : false;
        __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default()({
            container: "menu",
            ifFold: ifFold,
            data: __WEBPACK_IMPORTED_MODULE_1__mock__["a" /* default */],
            url: '/ios/iphone/8'
        });
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewModel = __webpack_require__(9);

var _viewModel2 = _interopRequireDefault(_viewModel);

var _view = __webpack_require__(10);

var _redux = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function reducer(status, action) {
  switch (action.type) {
    case 'NODE_SELECT':
      return _viewModel2['default'].selectNode(action.key);
    case 'NODE_TOGGLE':
      return _viewModel2['default'].toggleNode(action.key);
    default:
      return initStatus;
  };
};

var store = (0, _redux.createStore)(reducer),
    initStatus;

function viewOnchange(params) {
  _view.Emitter.on('change', function (data) {
    console.log("监听到view的变化为", data);
    store.dispatch(data);
  });
}
function subscribe() {

  // 可以手动订阅更新，将事件绑定到视图层。
  store.subscribe(function () {

    var newStatus = store.getState();
    _view.View.render(newStatus);
    console.log('控制层里看到生成新的状态树storestate', store.getState());
  });
}

function Menu(config) {
  this.config = config;
  this.init();
};

Menu.prototype = {

  init: function init() {

    // VM 初始，
    //1.在VM内生成初始状态给状态机
    //2.状态机接收变化告知View渲染
    //在此controller内控制VM/M
    //VM只需关心接收action时，操作返回新的状态树
    //View只需关心处理自己的render以及bindEvent
    initStatus = _viewModel2['default'].init({
      modelData: this.config.data
    });

    if (this.config.url) {
      _viewModel2['default'].selectNode(this.config.url);
    }
    subscribe(); // 订阅store状态机

    viewOnchange(); // 监听View上动作

    _view.View.init(); //初始化VIEW，绑定事件
  }

};

exports['default'] = Menu;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// 状态树
var statusTree = {
    title: 'root',
    url: '/',
    isSelect: false,
    isOpen: true,
    level: 0,
    children: null,
    parent: null
}; //给一个初始值

//把状态树平铺
var statusTreeMap = [];

// 储存选择节点的状态
var selectStore = {
    oldNode: null,
    newNode: null,
    isEqual: function isEqual() {
        return this.newNode === this.oldNode;
    }
};

// 树的层次遍历
function layerTraversal(tree, callback) {
    var queue = [];
    queue.push(tree);
    while (queue.length > 0) {
        var parent = queue.pop();
        if (Array.isArray(parent.children)) {
            parent.children.forEach(function (node) {
                queue.unshift(node);
                callback(node, parent);
            });
        }
    }
}

// 生成状态树
function initStatusTree() {
    var id = 1;
    // 必须保证父级元素已经遍历
    layerTraversal(statusTree, function (node, parent) {
        node.id = id++;
        node.isOpen = false;
        node.isSelect = false;
        node.parent = parent;
        node.level = getNodeLevel(node);
        statusTreeMap.push(node);
    });
};

// 根据祖先的个数确定层级
function getNodeLevel(node) {
    var level = 0;
    while (node.parent) {
        level++;
        node = node.parent;
    }

    return level;
}

// 通过传入ID或url查找节点
function searchNodeByTwoWays(param) {
    // var mapTree = mapStatusTree();
    var curNode;
    // mapTree.some(function(element) {
    statusTreeMap.some(function (element) {
        if (element.id == param || element.url == param) {

            return curNode = element;
        }
    });
    return curNode;
}

// 操作选择节点的属性
function selectNodeAttr(node, ifSelected) {
    node.isSelect = ifSelected;

    // 选择祖先节点
    while (node.parent) {
        // 选中当前节点的父节点
        var parent = node.parent;
        parent.isSelect = ifSelected;

        node = parent;
    }
}

// 选择节点
function _selectNode(newPath) {
    var oldPath = selectStore.oldNode;
    if (oldPath) {
        var oldNode = searchNodeByTwoWays(oldPath);
        // var oldNode = searchNodeByUrl(oldPath);
        selectNodeAttr(oldNode, false);
    }
    var newNode = searchNodeByTwoWays(newPath);
    // var newNode = searchNodeByUrl(newPath);
    if (newNode) {
        selectNodeAttr(newNode, true);
    }
}

// 传入节点,toggle其展开（isOpen）属性
function _toggleNode(url) {
    var node = searchNodeByTwoWays(url);
    // var node = searchNodeByUrl(url);
    if (node != null) {
        node.isOpen = !node.isOpen;
    }
}

var ViewModel = {
    init: function init(params) {
        statusTree.children = params.modelData;
        initStatusTree();
        console.log('平铺的', statusTreeMap);

        return statusTree;
    },
    selectNode: function selectNode(url) {
        selectStore.newNode = url;
        if (selectStore.isEqual()) return statusTree;

        _selectNode(url);
        selectStore.oldNode = url;
        console.log('VM中选中的路径', url);
        return statusTree;
    },
    toggleNode: function toggleNode(url) {
        console.log('VM中需要toggle的路径', url);
        _toggleNode(url);
        return statusTree;
    }
};
exports['default'] = ViewModel;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var $sidebar = document.getElementById('sidebar');
var $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
var $menuFolded = document.getElementById('menu-folded');
var $menuUnfold = document.getElementById('menu-unfold');

var events = __webpack_require__(11);
// 实例化EventEmitter
var emitter = new events.EventEmitter();

function hasClass($el, className) {
  var classNamesArr = $el.className.split(' ');
  return classNamesArr.indexOf(className) > -1;
}

function toggleClass($el, className) {
  var separator = ' ',
      prevclassNames = $el.getAttribute('class'),
      nextclassNames = '',
      classNamesArr = prevclassNames.split(separator),
      index = classNamesArr.indexOf(className);
  if (index < 0) {
    // addclassName
    nextclassNames = '' + prevclassNames + separator + className;
  } else {
    // removeclassName
    nextclassNames = classNamesArr.reduce(function (accumulator, currValue) {
      return '' + accumulator + separator + (currValue === className ? '' : currValue);
    });
  }
  $el.setAttribute('class', nextclassNames);
}

function toggleShowHide($elFolded, $elUnfold) {
  var $elFoldedShow = $elFolded.style.display || 'block';
  var $elUnfoldShow = $elUnfold.style.display || 'block';
  $elFolded.style.display = $elFoldedShow == 'block' ? 'none' : 'block';
  $elUnfold.style.display = $elUnfoldShow == 'block' ? 'none' : 'block';
}

function renderMenuItem(node) {
  return '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a class="menu-title" data-id="' + node.id + '" ' + (node.url ? "href=" + node.url + "" : "") + '>' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + ' ' + '' + node.title + '' + '</a>' + '</li>';
};

function renderMenu(node, nodes) {
  return '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') + ' ' + (node.level > 1 ? 'menu-item-vertical' : '') + '">' + '<a data-id="' + node.id + '" ' + (node.url ? "href=" + node.url + "" : "") + ' class="menu-title menu-submenu-title ' + (node.level > 1 ? 'menu-title-vertical' : '') + '" >' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + '' + '' + node.title + '' + '' + (node.level > 1 ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right') + '"></i>') + '' + '</a>' + '<ul class="menu-submenu ' + (node.isOpen ? 'menu-submenu-inline' : 'menu-submenu-hidden') + ' ' + (node.level > 1 ? 'menu-submenu-vertical' : '') + '">' + renderTwoWays(nodes, renderMenu, renderMenuItem) + '</ul>' + '</li>';
};

function renderMenuItemFold(node) {
  return '<li  class="menu-item menu-item-l' + node.level + ' ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a class="menu-title" data-id="' + node.id + '" ' + (node.url ? "href=" + node.url + "" : "") + '>' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + ' ' + '<span class="menu-title-text menu-title-l' + node.level + '">' + node.title + '</span>' + '</a>' + '</li>';
};

function renderMenuFold(node, nodes) {
  return '<li  class="menu-item menu-item-l' + node.level + ' ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a data-id="' + node.id + '" ' + (node.url ? "href=" + node.url + "" : "") + ' class="menu-title" >' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + '' + '<span class="menu-title-text menu-title-l' + node.level + '">' + node.title + '</span>' + '</a>' + '<ul class="menu-submenu menu-submenu-l' + Number(node.level + 1) + ' menu-submenu-hidden menu-submenu-' + (node.level === 1 ? 'inline' : 'vertical') + '">' + renderTwoWays(nodes, renderMenuFold, renderMenuItemFold) + '</ul>' + '</li>';
};

function renderTwoWays(nodes, renderMenuFun, renderItemFun) {
  // console.log(nodes);
  var tpl = '';

  nodes.forEach(function (node) {

    if (Array.isArray(node.children)) {
      tpl += renderMenuFun(node, node.children);
    } else {
      tpl += renderItemFun(node);
    }
  });
  return tpl;
};

function bindEvents() {

  // 折叠的
  $menuFolded.addEventListener('click', function (e) {
    e.preventDefault();
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var targetClass = target.getAttribute('class');
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase() === 'a') {
      var url = target.getAttribute("href");
      var id = target.getAttribute("data-id");
      if (url) {
        emitter.emit('change', { type: 'NODE_SELECT', key: id, url: url });
      }
    }
  });

  $menuFolded.addEventListener('mouseenter', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;

    var targetClass = target.getAttribute("class");

    if (targetClass.indexOf("menu-item") > -1) {
      target.className = '' + targetClass + ' menu-item-active';

      var firstUl = target.getElementsByTagName('ul')[0];
      if (!firstUl) return;
      var firstUlClass = firstUl.getAttribute("class");

      firstUl.className = firstUlClass.replace('menu-submenu-hidden', '');
    }
  }, true);

  $menuFolded.addEventListener('mouseleave', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;

    var targetClass = target.getAttribute("class");

    if (targetClass.indexOf("menu-item") > -1) {
      target.className = targetClass.replace('menu-item-active', '');

      var firstUl = target.getElementsByTagName('ul')[0];
      if (!firstUl) return;
      var firstUlClass = firstUl.getAttribute("class");

      firstUl.className = '' + firstUlClass + ' menu-submenu-hidden';
    }
  }, true);

  // 展开的菜单
  $menuUnfold.addEventListener('click', function (e) {
    e.preventDefault();
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var menuTitleStr = 'menu-submenu-title';
    var secondTitleStr = 'menu-title-vertical';
    var targetClass = target.getAttribute('class');
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase() === 'a') {
      var url = target.getAttribute("href");
      var id = target.getAttribute("data-id");
      if (targetClass.indexOf(secondTitleStr) > -1) return;
      // 有儿子的菜单，点击打开
      if (targetClass.indexOf(menuTitleStr) > -1) {
        emitter.emit('change', { type: 'NODE_TOGGLE', key: id, url: url });
        // 叶子节点，点击选中
      } else {
        emitter.emit('change', { type: 'NODE_SELECT', key: id, url: url });
      }
    }
  });

  $menuUnfold.addEventListener('mouseenter', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var secondItemStr = 'menu-item-vertical';
    var targetClass = target.getAttribute("class");

    if (targetClass.indexOf(secondItemStr) > -1) {

      if (targetClass.indexOf("selected") > -1) {
        target.className = '' + targetClass + ' isHover';
      }
    }
  }, true);

  $menuUnfold.addEventListener('mouseleave', function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var secondItemStr = 'menu-item-vertical';
    var targetClass = target.getAttribute("class");

    if (targetClass.indexOf(secondItemStr) > -1) {
      if (targetClass.indexOf("selected") > -1) {
        target.className = targetClass.replace('isHover', '');
      }
    }
  }, true);

  // toggle按钮
  $sidebarToggleBtn.onclick = function () {
    if ($sidebar) {
      toggleClass($sidebar, 'sidebar-folded');
      toggleShowHide($menuFolded, $menuUnfold);
    }
  };
}

var menuView = {
  render: function render(statusTree) {
    console.log('view里要render的状态树', statusTree);
    var tplFolded = renderTwoWays(statusTree.children, renderMenuFold, renderMenuItemFold);
    $menuFolded.innerHTML = tplFolded;

    var tplUnfold = renderTwoWays(statusTree.children, renderMenu, renderMenuItem);
    $menuUnfold.innerHTML = tplUnfold;
  },

  init: function init() {
    bindEvents();
    // 触发sayHi事件
    emitter.emit('change', { type: 'init' });
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等
  }
};

exports.View = menuView;
exports.Emitter = emitter;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(17);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(15);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(3);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(19);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(22);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(24);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(23)(module)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(5);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var data = [
  {
    "title": "安卓机",
    "icon": "fa-android",
    "children": [
      {
        "title": "华为",
        "children": [
          {
            "title": "荣耀",
            "url": "/android/huawei/hornour"
          }
        ]
      },
      {
        "title": "小米",
        "children": [
          {
            "title": "红米",
            "url": "/android/mi/hongmi"
          }
        ]
      }
    ]
  },
  {
    "title": "IOS",
    "icon": "fa-apple",
    "children": [
      {
        "title": "iwatch",
        "url": "/ios/iwatch"
      },
      {
        "title": "iphone",
        "children": [
          {
            "title": "iphone6s",
            "url": "/ios/iphone/6s"
          },
          {
            "title": "iphone6 plus",
            "url": "/ios/iphone/6plus"
          },
          {
            "title": "iphone7 plus",
            "url": "/ios/iphone/7plus"
          },
          {
            "title": "iphone8 ",
            "url": "/ios/iphone/8"
          }
        ]
      }
    ]
  },
  {
    "title": "winPhone",
    "icon": " fa-windows",
    "url": "/windows"
  }
];

/* harmony default export */ __webpack_exports__["a"] = (data);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(32)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./demo.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/less-loader/dist/cjs.js??ref--1-2!./demo.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)(true);
// imports


// module
exports.push([module.i, ".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n  cursor: pointer;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected.isHover > .menu-title {\n  box-shadow: none;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  box-shadow: inset 1px 0px 0px 0px #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 36px;\n  text-align: left;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu,\n.sidebar-folded .menu-root .fa-angle-down,\n.sidebar-folded .menu-root .fa-angle-right {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-l1 {\n  width: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-vertical {\n  width: 150px;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l1 {\n  width: 150px;\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l2 {\n  margin-left: 10px;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active.menu-item-selected.menu-item-l3 > .menu-title {\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active .menu-title-l1 {\n  padding-left: 15px;\n  display: inline-block;\n  position: absolute;\n  left: 65px;\n  top: 0;\n  background-color: #1c212d;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-l2 > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 31px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu {\n  display: block;\n  float: right;\n  position: absolute;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-hidden {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l2 {\n  left: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l3 {\n  top: 0;\n  left: 150px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  justify-content: center;\n  align-items: center;\n  background: #fafafc;\n  line-height: 65px;\n  color: #2b3447;\n}\n.sidebar-toggle-btn .lines {\n  position: relative;\n  height: 13px;\n  width: 16px;\n  background: repeating-linear-gradient(to bottom, #709d63 0px, #709d63 2px, transparent 2px, transparent 5px);\n}\n.sidebar-toggle-btn .lines:before {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 13px;\n  background-color: #dfe1e7 ;\n  background: repeating-linear-gradient(to bottom, #dfe1e7 0px, #dfe1e7 2px, transparent 2px, transparent 5px);\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .lines:before {\n  width: 0px;\n}\n.sidebar-toggle-btn {\n  cursor: pointer;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n", "", {"version":3,"sources":["E:/local/nav-bbfe/src/www/static/styles/E:/local/nav-bbfe/src/www/static/styles/demo/menu.less","E:/local/nav-bbfe/src/www/static/styles/demo.less","E:/local/nav-bbfe/src/www/static/styles/E:/local/nav-bbfe/src/www/static/styles/demo/mixin.less","E:/local/nav-bbfe/src/www/static/styles/E:/local/nav-bbfe/src/www/static/styles/demo/menu-folded.less","E:/local/nav-bbfe/src/www/static/styles/E:/local/nav-bbfe/src/www/static/styles/demo.less"],"names":[],"mappings":"AAKA;EAEI,mBAAA;CCLH;ADGD;EAQY,sBAAA;EACA,sBAAA;EASJ,gBAAA;CChBP;ADSO;;;;;EAKI,gCAAA;CCPX;ADTD;EAsBQ,mBAAA;CCVP;ADWO;EACI,gCAAA;EACA,0BAAA;EACA,0CAAA;CCTX;ADjBD;EA+BQ,YAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;EACA,oBAAA;CCXP;ADgBO;EACI,gCAAA;EACA,0BAAA;EACA,yEAAA;CCdX;ADiBO;EACI,iBAAA;CCfX;ADhCD;;EAmDY,gCAAA;CCfX;ADpCD;EAyDQ,mBAAA;CClBP;ADoBO;EACI,cAAA;CClBX;AD1CD;EAgEY,0BAAA;CCnBX;ADoBW;EACI,0CAAA;CClBf;ADhDD;EAuEY,mBAAA;CCpBX;AD2BO;EACI,mBAAA;EACA,eAAA;EACA,aAAA;EACA,WAAA;EACA,SAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,wBAAA;CCzBX;AD/DD;EA+FQ,mBAAA;EACA,SAAA;EACA,YAAA;EACA,0BAAA;EACA,eAAA;EACA,WAAA;CC7BP;ADvED;EAuGY,0CAAA;CC7BX;AD1ED;EAoHQ,aAAA;EACA,kBAAA;EACA,cAAA;CCvCP;AD/ED;EAyHY,yCAAA;CCvCX;ADlFD;EA6HY,mBAAA;EACA,iBAAA;EACA,gBAAA;CCxCX;ADvFD;EEHE,YAAA;EACA,aAAA;EACA,gCAAA;CD6FD;AD5FD;EAyIQ,mBAAA;CC1CP;AD/FD;EA6IQ,aAAA;EACA,kBAAA;CC3CP;AErGD;;;EAOE,cAAA;CFmGD;AE5FC;EACC,YAAA;CF8FF;AE7GD;EAmBG,aAAA;CF6FF;AEhHD;EAyBG,aAAA;EACA,cAAA;CF0FF;AEpHD;EA8BG,kBAAA;CFyFF;AEpFE;EACC,yEAAA;CFsFH;AEpFE;EACC,gCAAA;EACA,0BAAA;EACA,0CAAA;CFsFH;AE7FC;EAUE,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;EACA,OAAA;EACA,0BAAA;CFsFH;AEvID;EAsDG,sBAAA;CFoFF;AE/EK;EACI,mBAAA;EACA,eAAA;EACA,aAAA;EACA,WAAA;EACA,SAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,wBAAA;CFiFT;AEtJD;EA2EG,eAAA;EACA,aAAA;EACA,mBAAA;CF8EF;AE7EE;EACC,cAAA;CF+EH;AE7EE;EACC,WAAA;CF+EH;AE7EE;EACC,OAAA;EACA,YAAA;CF+EH;AGnKD;EACI,uBAAA;EACA,aAAA;EACA,YAAA;CHqKH;AGlKD;;EAEI,iBAAA;CHoKH;AG/JD;EACI,cAAA;EACA,aAAA;EACA,cAAA;CHiKH;AG7JD;EACI,mBAAA;EACA,aAAA;EACA,WAAA;EACA,oBAAA;CH+JH;AGnKD;EAOQ,aAAA;EACA,0BAAA;EACA,kBAAA;EACA,mBAAA;CH+JP;AGzKD;EAeQ,mBAAA;EACA,oBAAA;EACA,YAAA;EACA,oBAAA;CH6JP;AGzJG;EACI,aAAA;EACA,cAAA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;EACA,wBAAA;EACA,oBAAA;EACA,oBAAA;EACA,kBAAA;EACA,eAAA;CH2JP;AGrKG;EAaQ,mBAAA;EACA,aAAA;EACA,YAAA;EACA,6GAAA;CH2JX;AG3KG;EAqBQ,sBAAA;EACA,mBAAA;EACA,aAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,2BAAA;EACA,6GAAA;CHyJX;AGlJD;EAEI,YAAA;CHmJH;AGrJD;EAMY,WAAA;CHkJX;AG9ID;EACI,gBAAA;CHgJH;AG5ID;EACI,QAAA;EACA,WAAA;EACA,0BAAA;CH8IH;AGjJD;EAMQ,YAAA;EACA,aAAA;EACA,uBAAA;CH8IP;AGtJD;EAWQ,cAAA;CH8IP","file":"demo.less","sourcesContent":["@import './variables';\n@import './mixin';\n\n\n//=============  Menu-Styles Start============= \n.menu-root {\n\n    position: relative;\n\n    .calc-colors(@base-menu-font-color);\n\n    a {\n        & {\n            display: inline-block;\n            text-decoration: none;\n        }\n        &,\n        &:link,\n        &:visited,\n        &:hover,\n        &:active {\n            color: @menu-item-font-color;\n        }\n        cursor: pointer;\n    }\n\n    .menu-item {\n        position: relative;\n        &:not(.menu-item-selected)>.menu-title:hover {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n    } \n\n    .menu-title {\n        width: 100%;\n        height:  @menu-item-height;\n        line-height: @menu-item-height;\n        padding-left: @menu-padding-left;\n        padding-right: @menu-padding-right;\n    }\n\n    .menu-item-selected {\n        // 选中的节点\n        &>.menu-title {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset @menu-item-selected-border-width 0px 0px 0px @menu-item-selected-color, inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n\n        &.isHover>.menu-title {\n            box-shadow: none;\n        }\n        .menu-icon-title-alt,\n        .menu-icon-angle {\n            color: @menu-item-selected-icon-color;\n        }\n    }\n\n    .menu-submenu {\n\n        position: relative;\n\n        &-hidden {\n            display: none;\n        }\n\n        .menu-item {\n            background-color: @menu-submenu-item-bg-color;\n            &:not(.menu-item-selected)>.menu-title:hover {\n                box-shadow: inset 1px 0px 0px 0px @menu-submenu-item-bg-color;\n            }\n        } \n\n        .menu-title {\n            padding-left: @menu-submenu-padding-left + @menu-icon-margin-right + @menu-submenu-list-icon-size;\n        }\n\n    }\n\n    .menu-submenu-inline {\n        // 模拟list-style: circle-solid\n        & > .menu-item:before {\n            position: absolute;\n            display: block;\n            content: ' ';\n            left: @menu-submenu-padding-left;\n            top: 50%;\n            margin-top: -@menu-submenu-list-icon-size/2;\n            width: @menu-submenu-list-icon-size;\n            height: @menu-submenu-list-icon-size;\n            border-radius: @menu-submenu-list-icon-size/2;\n            background-color: @base-menu-font-color;\n        }\n\n    }\n\n     // 三级子菜单\n    .menu-submenu .menu-item:hover .menu-submenu-vertical {\n        position: absolute;\n        top: 0px;\n        left: @sidebar-width;\n        background-color: @menu-submenu-item-bg-color;\n        display: block;\n        z-index: @base-zindex + 2;\n\n        .menu-item {\n            box-shadow: inset 1px 0px 0px  0px @menu-item-bg-color;\n        }\n\n    }\n\n    .menu-submenu-vertical {\n\n        @menu-submenu-item-bg-color-red: red(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-green: green(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-blue: blue(@menu-submenu-item-bg-color);\n\n        @menu-submenu-vertical-item-bg-color: rgba(@menu-submenu-item-bg-color-red, @menu-submenu-item-bg-color-green, @menu-submenu-item-bg-color-blue, @menu-submenu-vertical-item-bg-color-alpha);\n\n        width: @menu-submenu-vertical-width;\n        overflow: visible;\n        display: none;\n\n        .menu-item {\n            background-color: @menu-submenu-vertical-item-bg-color;\n        }\n\n        .menu-title {\n            padding-left: @menu-submenu-padding-left - @base-padding;\n            text-align: left;\n            font-size: 12px;\n        }\n    }\n\n    // icon ===== \n    [class|=menu-icon] {\n        .menu-icon( @menu-item-icon-color);        \n    }\n\n    .menu-icon-title-alt {\n        margin-right: @menu-icon-margin-right;\n    }\n\n    .menu-icon-angle {\n        float: right;\n        line-height: @menu-item-height;\n    }\n}\n//=============  Menu-Styles End============= \n",".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n  cursor: pointer;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected.isHover > .menu-title {\n  box-shadow: none;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  box-shadow: inset 1px 0px 0px 0px #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 36px;\n  text-align: left;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu,\n.sidebar-folded .menu-root .fa-angle-down,\n.sidebar-folded .menu-root .fa-angle-right {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-l1 {\n  width: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-vertical {\n  width: 150px;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l1 {\n  width: 150px;\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l2 {\n  margin-left: 10px;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active.menu-item-selected.menu-item-l3 > .menu-title {\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active .menu-title-l1 {\n  padding-left: 15px;\n  display: inline-block;\n  position: absolute;\n  left: 65px;\n  top: 0;\n  background-color: #1c212d;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-l2 > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 31px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu {\n  display: block;\n  float: right;\n  position: absolute;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-hidden {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l2 {\n  left: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l3 {\n  top: 0;\n  left: 150px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  justify-content: center;\n  align-items: center;\n  background: #fafafc;\n  line-height: 65px;\n  color: #2b3447;\n}\n.sidebar-toggle-btn .lines {\n  position: relative;\n  height: 13px;\n  width: 16px;\n  background: repeating-linear-gradient(to bottom, #709d63 0px, #709d63 2px, transparent 2px, transparent 5px);\n}\n.sidebar-toggle-btn .lines:before {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 13px;\n  background-color: #dfe1e7 ;\n  background: repeating-linear-gradient(to bottom, #dfe1e7 0px, #dfe1e7 2px, transparent 2px, transparent 5px);\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .lines:before {\n  width: 0px;\n}\n.sidebar-toggle-btn {\n  cursor: pointer;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n","//=============  Menu-Mixins Start============= \n.menu-icon(@menu-icon-color: @base-menu-font-color) {\n  width: @menu-icon-size;\n  height: @menu-icon-size;\n  color: @menu-icon-color;\n}\n\n.calc-colors(@base-menu-font-color) {\n\n  @menu-font-color-red: red(@base-menu-font-color);\n  @menu-font-color-green: green(@base-menu-font-color);\n  @menu-font-color-blue: blue(@base-menu-font-color);\n\n  @menu-item-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha);\n  @menu-item-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha);\n  @menu-item-selected-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha + 0.2);\n  @menu-item-selected-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha + 0.2);\n\n  @menu-submenu-list-icon-size: 4px;\n\n}\n\n//=============  Menu-Mixins End============= ","@import './variables';\n@import './mixin';\n\n.sidebar-folded .menu-root {\n\n\t.calc-colors(@base-menu-font-color);\n\n\t.menu-submenu,\n\t.fa-angle-down,\n\t.fa-angle-right {\n\t\tdisplay: none;\n\t}\n\n\t.menu-item {\n\n\n\t\t// 一级li宽度调整\n\t\t&.menu-item-l1 {\n\t\t\twidth: @sidebar-folded-width;\n\t\t}\n\n\t\t.menu-submenu-vertical {\n\t\t\twidth: @menu-submenu-vertical-width;\n\n\t\t}\n\t\n\t\t// 一级title特殊处理\n\t\t.menu-title-text.menu-title-l1 {\n\t\t\twidth: @menu-submenu-vertical-width; \n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.menu-title-text.menu-title-l2 {\n\t\t\tmargin-left: @menu-icon-margin-right;\n\n\t\t} \n\n\t\t&.menu-item-active {\n\t\t\t&.menu-item-selected.menu-item-l3 > .menu-title {\n\t\t\t\tbox-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n\t\t\t}\n\t\t\t& > .menu-title {\n\t\t\t\tcolor: rgba(255, 255, 255, 0.8);\n\t\t\t\tbackground-color: #1c212d;\n\t\t\t\tbox-shadow: inset 0px 1px 0px 0px #2b3447;\n\t\t\t}\n\t\t\t.menu-title-l1 {\n\t\t\t\tpadding-left: @base-padding;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: @sidebar-folded-width;\n\t\t\t\ttop: 0;\n\t\t\t\tbackground-color: @menu-item-selected-bg-color;\n\t\t\t}\n\t\t}\n\n\t\t.menu-title-text {\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t.menu-submenu-l2 {\n\t\t    // 模拟list-style: circle-solid\n\t\t    & > .menu-item:before {\n\t\t        position: absolute;\n\t\t        display: block;\n\t\t        content: ' ';\n\t\t        left: @menu-submenu-padding-left - 2*@menu-icon-margin-right;\n\t\t        top: 50%;\n\t\t        margin-top: -@menu-submenu-list-icon-size/2;\n\t\t        width: @menu-submenu-list-icon-size;\n\t\t        height: @menu-submenu-list-icon-size;\n\t\t        border-radius: @menu-submenu-list-icon-size/2;\n\t\t        background-color: @base-menu-font-color;\n\t\t    }\n\n\t\t}\n\n\t\t.menu-submenu {\n\t\t\tdisplay: block;\n\t\t\tfloat: right;\n\t\t\tposition: absolute;\n\t\t\t&.menu-submenu-hidden {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t&.menu-submenu-l2 {\n\t\t\t\tleft: @sidebar-folded-width;\n\t\t\t}\n\t\t\t&.menu-submenu-l3 {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: @menu-submenu-vertical-width;\n\t\t\t}\n\t\t}\t\t\n\t}\n\n\n}","@import './demo/variables';\n@import './demo/menu';\n@import './demo/menu-folded';\n\n// Reset ========\n* {\n    box-sizing: border-box;\n    padding: 0px;\n    margin: 0px;\n}\n\nul,\nli {\n    list-style: none;\n}\n\n\n// Layout ========\nbody {\n    display: flex;\n    width: 100vw;\n    height: 100vh;\n}\n\n// 左侧导航菜单区 - 展开状态\n.sidebar {\n    position: relative;\n    width: @sidebar-width;\n    z-index: @base-zindex + 1;\n    overflow-x: visible;\n\n    .logo {\n        height: @header-height;\n        background-color: lighten(@menu-item-bg-color, 10%);\n        line-height: @header-height;\n        text-align: center;\n    }\n\n\n    .menu-root {\n        position: relative;\n        background: #354059;\n        width: 100%;\n        overflow-x: visible;\n    }\n\n\n    &-toggle-btn {\n        float: right;\n        display: flex;\n        width: @header-height;\n        height: @header-height;\n        margin-right: -@header-height;\n        justify-content: center;\n        align-items: center;\n        background: #fafafc;\n        line-height: @header-height;\n        color: @menu-item-bg-color;\n\n        .lines {\n            position: relative;\n            height: 13px;\n            width: @menu-icon-size;\n            background: repeating-linear-gradient(to bottom, @menu-item-selected-color 0px,  @menu-item-selected-color 2px,transparent 2px,  transparent 5px);\n\n        }\n\n        .lines:before {\n            display: inline-block;\n            position: absolute;\n            content: ' ';\n            top: 0px;\n            right: 0px;\n            width: 12px;\n            height: 13px;\n            background-color:  #dfe1e7 ;\n            background: repeating-linear-gradient(to bottom, #dfe1e7  0px,  #dfe1e7 2px,transparent 2px,  transparent 5px)\n        }\n    }\n\n}\n\n// 左侧导航菜单区 - 折叠状态\n.sidebar-folded {\n\n    width: @sidebar-folded-width;\n\n    .sidebar-toggle-btn {\n        .lines:before {\n            width: 0px;\n        }\n    }\n}\n.sidebar-toggle-btn {\n    cursor: pointer;\n}\n\n// 主功能区域\n.main-container {\n    flex: 1;\n    z-index: @base-zindex;\n    background-color: #ededed;\n\n    .header {\n        width: 100%;\n        height: @header-height;\n        background-color: #ccc;\n    }\n    .main-content {\n        padding: @base-padding;\n    }\n\n}\n\n\n\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(33);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 33 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(35);
throw new Error("Cannot find module \"data-source-proxy\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interceptors_FixParams__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interceptors_ErrorProcessor__ = __webpack_require__(37);




var baseURL = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].BASE_URL;

var dataSource = new __WEBPACK_IMPORTED_MODULE_1_data_source_proxy___default.a();

// 面向切面: 按顺序组装拦截器



dataSource
    .interceptors.request.use(__WEBPACK_IMPORTED_MODULE_2__interceptors_FixParams__["a" /* default */].request)
    .interceptors.error.use(__WEBPACK_IMPORTED_MODULE_3__interceptors_ErrorProcessor__["a" /* default */].error)

var DataSourceProxy = {

    post: function(uri, data) {
        var config = {
            url: uri,
            method: 'post',
            // to methods of that instance.
            baseURL: baseURL,
            // data仅用于post请求， 放在http请求体中
            data: data
        };

        return DataSourceProxy.request(config);

    },

    get: function(uri, params) {

        var config = {
            url: uri,
            // to methods of that instance.
            baseURL: baseURL,
            method: 'get',
            // params仅用于get请求， 会拼接在url后面
            params: params,
            // 默认get请求可合并
            comboRequestEnabled: true
        };

        return DataSourceProxy.request(config);
    },

    cacheFirstGet: function(uri, params, { maxAge, ignoreExpires } = { maxAge: 60 * 60 * 1000, ignoreExpires: false }) {
        var config = {
            url: uri,
            // to methods of that instance.
            baseURL: baseURL,
            method: 'get',
            // params仅用于get请求， 会拼接在url后面
            params: params,
            // 默认get请求可合并
            comboRequestEnabled: true,
            // ============= 新增缓存数据参数  ============
            // [Number|null] 缓存时间， 单位ms. 如果需要缓存 ，请给maxAge 赋一个数值
            maxAge: maxAge,
            // [Boolean] 是否忽略缓存过期
            ignoreExpires: ignoreExpires
        };

        return DataSourceProxy.request(config);
    },

    // let {url, baseURL, method, params, comboRequestEnabled, maxAge, ignoreExpires} = config
    request: function(config) {
        return new Promise((resolve, reject) => {
            dataSource.request(config)
                .then(data => { resolve(data) }, err => { reject(err); })
        });            

    },
    start: () => {
        dataSource.start();
    },
    stop: () => {
        dataSource.stop();
    }

}


// 错误类型的定义
DataSourceProxy.ErrorType = __WEBPACK_IMPORTED_MODULE_1_data_source_proxy___default.a.ErrorType; //{BUSINESS, NETWORK, TIMEOUT, ABORT, PARSER}
DataSourceProxy.createError = __WEBPACK_IMPORTED_MODULE_1_data_source_proxy___default.a.createError; //{BUSINESS, NETWORK, TIMEOUT, ABORT, PARSER}

/* harmony default export */ __webpack_exports__["a"] = (DataSourceProxy);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const config = {
	// api请求的baseURL, 用于DataSourceGateWay
	// BASE_URL: '/web/',
	BASE_URL: 'https://www.easy-mock.com/mock/58ff1ae35e43ae5dbea5ef8c/',
}

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
    request: async (config) => {
        // 给所有的get请求添加一个_t参数 
        let baseParams = {
        	_t:  +new Date()//1314
        };

        return new Promise((resolve, reject) => {
            let assignTarget = config.method === 'get' ? 'params' : 'data';
            config[assignTarget] = config[assignTarget] || {};
            Object.assign(config[assignTarget], baseParams);
            resolve(config);
        })

    }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
throw new Error("Cannot find module \"data-source-proxy\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__locale__ = __webpack_require__(38);




const ErrorLocales = __WEBPACK_IMPORTED_MODULE_1__locale__["a" /* default */].Errors;
const {ErrorType, Deferred, createComboPromise } = __WEBPACK_IMPORTED_MODULE_0_data_source_proxy___default.a;
const BizCommonErrorLocales = ErrorLocales[ErrorType.BUSINESS]['COMMON'];
const BizModulesErrorLocales = ErrorLocales[ErrorType.BUSINESS]['MODULES'];

/* 给error 增加一个locale字段 */
/* harmony default export */ __webpack_exports__["a"] = ({
    request: (config) => {
        return Promise.resolve(config);
    },
    response: (result, config) => {

    },
    error: (error, config) => {

        let defer = new Deferred();
        let resolveDefer = () => {
            defer.resolve(error);
        };

        if (error.type === ErrorType.NETWORK) {
            error.locale = ErrorLocales[error.type]['default'];

        } else if (error.type === ErrorType.TIMEOUT) {

            error.locale = ErrorLocales[error.type]['default'];

        } else if (error.type === ErrorType.ABORT) {
            error.locale = ErrorLocales[error.type]['default'];

        } else if (error.type === ErrorType.PARSER) {

            error.locale = ErrorLocales[error.type]['default'];

        } else {
            // business Error
            let locale;

            if (error.code && error.subcode) {
                // biz-modules 模块操作错误
                let module = config.url.split('/')[0],
                    moduleErrorLocales = BizModulesErrorLocales[module.toUpperCase()] || {};
                locale = moduleErrorLocales[error.subcode] || moduleErrorLocales['default'];

            } else if (error.code) {
                // biz-common错误
                locale = BizCommonErrorLocales[error.code];
            } else {
                // 兜底文案
                locale = error.submessage || error.message || BizCommonErrorLocales['default'];
            }

            error.locale = locale;

        }
        resolveDefer(error)

        return defer.promise;

    }
});


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
throw new Error("Cannot find module \"data-source-proxy\"");
//本地化文案


const {ErrorType, Deferred, createComboPromise } = __WEBPACK_IMPORTED_MODULE_0_data_source_proxy___default.a;

/* 业务-[通用|模块}'错误提示信息 */
const Errors = {
    // 网络异常
    [ErrorType.NETWORK]: {
        // 'default': '亲爱的用户现在网络异常，请检查网络连接或稍后重试!' 
        'default': '亲爱的用户现在网络异常，请稍后重试!' 
    },
    // 取消
    [ErrorType.ABORT]: {
        'default': '请求取消' 
    },
    // 前端址时
    [ErrorType.TIMEOUT]: {
        'default': '请求超时，请稍后重试'
    },
    // 解析错误， 返回数据结构异常
    [ErrorType.PARSER]: {
        'default': '数据解析失败，请稍后重试',
    },
    [ErrorType.BUSINESS]: {
        // 通用错误, code, 首字符代表错误级别：4代表请求端错误，5带面server段发生错误）
        COMMON: {
            400: '参数内容错误', // 参数内容错误
            401: '缺少必要参数', // 缺少必要参数
            402: '未登录，请先登录', // 未登录
            403: '表单重复提交', // 表单重复提交
            404: '请求资源不存在', // 请求资源不存在
            405: '无权操作', // 无权操作，受限
            406: '', // 资源不满足请求条件
            408: '请求超时，请稍后重试', // 请求超时
            409: '', // 操作不满足超限(limit)
            410: '请求的资源不可用', // 请求的资源不可用
            502: '系统发生异常，请稍后重试', // 依赖的服务报错
            503: '系统发生异常，请稍后重试', // 系统发生临时错误
            504: '系统发生异常，请稍后重试',//系统发生致命错误
            'default': '操作失败，请稍后重试' // 兜底文案
        },
        // 模块级错误， subcode
        MODULES: {
            // 商品
            GOODS: {
                1901: '商品不存在', // 商品不存在
            }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = ({
    Errors
});


/***/ })
/******/ ]);
//# sourceMappingURL=menu.js.map