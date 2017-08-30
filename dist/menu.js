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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(44)('wks');
var uid = __webpack_require__(27);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(83);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(65);
var toPrimitive = __webpack_require__(40);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(15);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(25);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(41);
var defined = __webpack_require__(37);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(67);
var enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(12);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(127);
var isArrayIter = __webpack_require__(128);
var anObject = __webpack_require__(10);
var toLength = __webpack_require__(42);
var getIterFn = __webpack_require__(129);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(154);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(121);
var enumBugKeys = __webpack_require__(45);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(37);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Const = {
    NAMESPACE: 'MX',
    ERROR_TYPE: {
        BUSINESS: "businessError",
        NETWORK: "networkError",
        TIMEOUT: "timeoutError",
        ABORT: "abortError",
        PARSER: "parserError"
    }
};
exports["default"] = Const;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdC9pbmRleC5qcyJdLCJuYW1lcyI6WyJDb25zdCIsIk5BTUVTUEFDRSIsIkVSUk9SX1RZUEUiLCJCVVNJTkVTUyIsIk5FVFdPUksiLCJUSU1FT1VUIiwiQUJPUlQiLCJQQVJTRVIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSUEsUUFBUTtBQUNYQyxlQUFXLElBREE7QUFFUkMsZ0JBQVk7QUFDUkMsa0JBQVUsZUFERjtBQUVSQyxpQkFBUyxjQUZEO0FBR1JDLGlCQUFTLGNBSEQ7QUFJUkMsZUFBTyxZQUpDO0FBS1JDLGdCQUFRO0FBTEE7QUFGSixDQUFaO3FCQVVlUCxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbnN0ID0ge1xuXHROQU1FU1BBQ0U6ICdNWCcsXG4gICAgRVJST1JfVFlQRToge1xuICAgICAgICBCVVNJTkVTUzogXCJidXNpbmVzc0Vycm9yXCIsXG4gICAgICAgIE5FVFdPUks6IFwibmV0d29ya0Vycm9yXCIsXG4gICAgICAgIFRJTUVPVVQ6IFwidGltZW91dEVycm9yXCIsXG4gICAgICAgIEFCT1JUOiBcImFib3J0RXJyb3JcIixcbiAgICAgICAgUEFSU0VSOiBcInBhcnNlckVycm9yXCJcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb25zdDtcbiJdfQ==

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {



module.exports = __webpack_require__(117);

/***/ }),
/* 34 */
/***/ (function(module, exports) {



/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(119)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(38)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(24);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(66);
var hide = __webpack_require__(9);
var has = __webpack_require__(12);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(120);
var setToStringTag = __webpack_require__(19);
var getPrototypeOf = __webpack_require__(69);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(36);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys');
var uid = __webpack_require__(27);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
var global = __webpack_require__(2);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(15);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(27)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(12);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Deferred = function () {
    function Deferred() {
        (0, _classCallCheck3["default"])(this, Deferred);

        this.promise = new _promise2["default"](function (resolve, reject) {
            this._resolve = resolve;
            this._reject = reject;
        }.bind(this));
    }

    (0, _createClass3["default"])(Deferred, [{
        key: "resolve",
        value: function resolve(value) {
            this._resolve.call(this.promise, value);
        }
    }, {
        key: "reject",
        value: function reject(reason) {
            this._reject.call(this.promise, reason);
        }
    }]);
    return Deferred;
}();

exports["default"] = Deferred;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9EZWZlcnJlZC5qcyJdLCJuYW1lcyI6WyJEZWZlcnJlZCIsInByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiX3Jlc29sdmUiLCJfcmVqZWN0IiwiYmluZCIsInZhbHVlIiwiY2FsbCIsInJlYXNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTUEsUTtBQUVGLHdCQUFjO0FBQUE7O0FBQ1YsYUFBS0MsT0FBTCxHQUFlLHlCQUFZLFVBQVNDLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ2pELGlCQUFLQyxRQUFMLEdBQWdCRixPQUFoQjtBQUNBLGlCQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFDSCxTQUgwQixDQUd6QkcsSUFIeUIsQ0FHcEIsSUFIb0IsQ0FBWixDQUFmO0FBSUg7Ozs7Z0NBRU9DLEssRUFBTztBQUNkLGlCQUFLSCxRQUFMLENBQWNJLElBQWQsQ0FBbUIsS0FBS1AsT0FBeEIsRUFBaUNNLEtBQWpDO0FBQ0E7OzsrQkFFTUUsTSxFQUFRO0FBQ2QsaUJBQUtKLE9BQUwsQ0FBYUcsSUFBYixDQUFrQixLQUFLUCxPQUF2QixFQUFnQ1EsTUFBaEM7QUFDQTs7Ozs7cUJBR1VULFEiLCJmaWxlIjoiRGVmZXJyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEZWZlcnJlZCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICByZXNvbHZlKHZhbHVlKSB7XG4gICAgXHR0aGlzLl9yZXNvbHZlLmNhbGwodGhpcy5wcm9taXNlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVqZWN0KHJlYXNvbikge1xuICAgIFx0dGhpcy5fcmVqZWN0LmNhbGwodGhpcy5wcm9taXNlLCByZWFzb24pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGVmZXJyZWQ7XG4iXX0=

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(160);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(162);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(24);
var wksExt = __webpack_require__(56);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var normalizeHeaderName = __webpack_require__(173);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(84);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(84);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(101);
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(100);




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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(94);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 62 */
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
/* 63 */
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
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(13);
var arrayIndexOf = __webpack_require__(122)(false);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(12);
var toObject = __webpack_require__(28);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(10);
var aFunction = __webpack_require__(15);
var SPECIES = __webpack_require__(3)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(130);
var html = __webpack_require__(68);
var cel = __webpack_require__(39);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(18)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var newPromiseCapability = __webpack_require__(49);

module.exports = function (C, x) {
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(152);
exports.encode = exports.stringify = __webpack_require__(153);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(29);

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = __webpack_require__(157);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports['default'] = createError;

var _const = __webpack_require__(31);

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ERROR_TYPE = _const2['default'].ERROR_TYPE;

var DEFAULT_ERROR_MSG = 'undefined message';
var DEFAULT_ERROR_TYPE = ERROR_TYPE.BUSINESS;

/* 说明 */
function createError(_ref) {
    var code = _ref.code,
        _ref$message = _ref.message,
        message = _ref$message === undefined ? DEFAULT_ERROR_MSG : _ref$message,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? ERROR_TYPE.BUSINESS : _ref$type,
        args = (0, _objectWithoutProperties3['default'])(_ref, ['code', 'message', 'type']);

    // need a real Error 
    var error = new Error(message);
    error.type = type;
    error.code = code;
    (0, _assign2['default'])(error, args);
    return error;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9DcmVhdGVFcnJvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFcnJvciIsIkVSUk9SX1RZUEUiLCJERUZBVUxUX0VSUk9SX01TRyIsIkRFRkFVTFRfRVJST1JfVFlQRSIsIkJVU0lORVNTIiwiY29kZSIsIm1lc3NhZ2UiLCJ0eXBlIiwiYXJncyIsImVycm9yIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3FCQVF3QkEsVzs7QUFSeEI7Ozs7OztBQUVBLElBQUlDLGFBQWEsbUJBQU1BLFVBQXZCOztBQUVBLElBQU1DLG9CQUFvQixtQkFBMUI7QUFDQSxJQUFNQyxxQkFBcUJGLFdBQVdHLFFBQXRDOztBQUVBO0FBQ2UsU0FBU0osV0FBVCxPQUFpRztBQUFBLFFBQTFFSyxJQUEwRSxRQUExRUEsSUFBMEU7QUFBQSw0QkFBcEVDLE9BQW9FO0FBQUEsUUFBcEVBLE9BQW9FLGdDQUExREosaUJBQTBEO0FBQUEseUJBQXZDSyxJQUF1QztBQUFBLFFBQXZDQSxJQUF1Qyw2QkFBaENOLFdBQVdHLFFBQXFCO0FBQUEsUUFBUkksSUFBUTs7QUFDNUc7QUFDQSxRQUFJQyxRQUFRLElBQUlDLEtBQUosQ0FBVUosT0FBVixDQUFaO0FBQ0FHLFVBQU1GLElBQU4sR0FBYUEsSUFBYjtBQUNBRSxVQUFNSixJQUFOLEdBQWFBLElBQWI7QUFDQSw2QkFBY0ksS0FBZCxFQUFxQkQsSUFBckI7QUFDQSxXQUFPQyxLQUFQO0FBQ0giLCJmaWxlIjoiQ3JlYXRlRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uc3QgZnJvbSAnLi4vY29uc3QnO1xuXG52YXIgRVJST1JfVFlQRSA9IENvbnN0LkVSUk9SX1RZUEU7XG5cbmNvbnN0IERFRkFVTFRfRVJST1JfTVNHID0gJ3VuZGVmaW5lZCBtZXNzYWdlJztcbmNvbnN0IERFRkFVTFRfRVJST1JfVFlQRSA9IEVSUk9SX1RZUEUuQlVTSU5FU1M7XG5cbi8qIOivtOaYjiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRXJyb3IoeyBjb2RlLCBtZXNzYWdlID0gREVGQVVMVF9FUlJPUl9NU0csIHR5cGUgPSBFUlJPUl9UWVBFLkJVU0lORVNTLCAuLi5hcmdzIH0pIHtcbiAgICAvLyBuZWVkIGEgcmVhbCBFcnJvciBcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgZXJyb3IudHlwZSA9IHR5cGU7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gICAgT2JqZWN0LmFzc2lnbihlcnJvciwgYXJncyk7XG4gICAgcmV0dXJuIGVycm9yO1xufVxuIl19

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createComboDefer = exports.createComboPromise = undefined;

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(51);

var _map2 = _interopRequireDefault(_map);

var _Deferred = __webpack_require__(54);

var _Deferred2 = _interopRequireDefault(_Deferred);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _runnings = {};

var comboDefersMap = new _map2['default']();

var comboPromisesMap = new _map2['default']();

var isFunction = function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
};

// 相同id的resolver, 将已有的promise返回， 不再创建新的promise
function createComboPromise(key, resolver) {

    var promise = comboPromisesMap.get(key);

    if (!(promise instanceof _promise2['default'])) {
        promise = new _promise2['default'](resolver);
        comboPromisesMap.set(key, promise);

        promise.then(function (data) {
            comboPromisesMap['delete'](key);
        }, function (error) {
            comboPromisesMap['delete'](key);
        });
    }

    return promise;
}

function createComboDefer(id) {

    var deferKey = id,
        comboDefer = comboDefersMap.get(deferKey);

    if (typeof comboDefer === 'undefined') {
        comboDefer = new _Deferred2['default']();
        comboDefersMap.set(deferKey, comboDefer);
    }

    // 无论成功及失败， 都要删除对应的comboDefer, 然后再将成功或失败返回 
    comboDefer.promise.then(function (data) {
        comboDefersMap['delete'](deferKey);
    }, function (error) {
        comboDefersMap['delete'](deferKey);
    });

    return comboDefer;
}

exports.createComboPromise = createComboPromise;
exports.createComboDefer = createComboDefer;
exports['default'] = createComboPromise;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Db21ib1Byb21pc2UuanMiXSwibmFtZXMiOlsiX3J1bm5pbmdzIiwiY29tYm9EZWZlcnNNYXAiLCJjb21ib1Byb21pc2VzTWFwIiwiaXNGdW5jdGlvbiIsInZhbHVlIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiY3JlYXRlQ29tYm9Qcm9taXNlIiwia2V5IiwicmVzb2x2ZXIiLCJwcm9taXNlIiwiZ2V0Iiwic2V0IiwidGhlbiIsImNyZWF0ZUNvbWJvRGVmZXIiLCJpZCIsImRlZmVyS2V5IiwiY29tYm9EZWZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBLElBQUlBLFlBQVksRUFBaEI7O0FBRUEsSUFBSUMsaUJBQWlCLHNCQUFyQjs7QUFFQSxJQUFJQyxtQkFBbUIsc0JBQXZCOztBQUVBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxLQUFELEVBQVc7QUFDMUIsV0FBT0MsT0FBT0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCSixLQUEvQixNQUEwQyxtQkFBakQ7QUFDSCxDQUZEOztBQUlBO0FBQ0EsU0FBU0ssa0JBQVQsQ0FBNEJDLEdBQTVCLEVBQWlDQyxRQUFqQyxFQUEyQzs7QUFFdkMsUUFBSUMsVUFBVVYsaUJBQWlCVyxHQUFqQixDQUFxQkgsR0FBckIsQ0FBZDs7QUFFQSxRQUFJLEVBQUVFLHVDQUFGLENBQUosRUFBbUM7QUFDL0JBLGtCQUFVLHlCQUFZRCxRQUFaLENBQVY7QUFDQVQseUJBQWlCWSxHQUFqQixDQUFxQkosR0FBckIsRUFBMEJFLE9BQTFCOztBQUVBQSxnQkFBUUcsSUFBUixDQUFhLGdCQUFRO0FBQ2pCYix1Q0FBd0JRLEdBQXhCO0FBQ0gsU0FGRCxFQUVHLGlCQUFTO0FBQ1JSLHVDQUF3QlEsR0FBeEI7QUFDSCxTQUpEO0FBS0g7O0FBRUQsV0FBT0UsT0FBUDtBQUNIOztBQUdELFNBQVNJLGdCQUFULENBQTBCQyxFQUExQixFQUE4Qjs7QUFFMUIsUUFBSUMsV0FBV0QsRUFBZjtBQUFBLFFBQ0lFLGFBQWFsQixlQUFlWSxHQUFmLENBQW1CSyxRQUFuQixDQURqQjs7QUFHQSxRQUFJLE9BQU9DLFVBQVAsS0FBc0IsV0FBMUIsRUFBdUM7QUFDbkNBLHFCQUFhLDJCQUFiO0FBQ0FsQix1QkFBZWEsR0FBZixDQUFtQkksUUFBbkIsRUFBNkJDLFVBQTdCO0FBQ0g7O0FBRUQ7QUFDQUEsZUFBV1AsT0FBWCxDQUFtQkcsSUFBbkIsQ0FBd0IsZ0JBQVE7QUFDNUJkLGlDQUFzQmlCLFFBQXRCO0FBQ0gsS0FGRCxFQUVHLGlCQUFTO0FBQ1JqQixpQ0FBc0JpQixRQUF0QjtBQUNILEtBSkQ7O0FBTUEsV0FBT0MsVUFBUDtBQUNIOztRQUdRVixrQixHQUFBQSxrQjtRQUFvQk8sZ0IsR0FBQUEsZ0I7cUJBRWRQLGtCIiwiZmlsZSI6IkNvbWJvUHJvbWlzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWZlcnJlZCBmcm9tICcuL0RlZmVycmVkJztcblxubGV0IF9ydW5uaW5ncyA9IHt9O1xuXG5sZXQgY29tYm9EZWZlcnNNYXAgPSBuZXcgTWFwKCk7XG5cbmxldCBjb21ib1Byb21pc2VzTWFwID0gbmV3IE1hcCgpO1xuXG5jb25zdCBpc0Z1bmN0aW9uID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8vIOebuOWQjGlk55qEcmVzb2x2ZXIsIOWwhuW3suacieeahHByb21pc2Xov5Tlm57vvIwg5LiN5YaN5Yib5bu65paw55qEcHJvbWlzZVxuZnVuY3Rpb24gY3JlYXRlQ29tYm9Qcm9taXNlKGtleSwgcmVzb2x2ZXIpIHtcblxuICAgIGxldCBwcm9taXNlID0gY29tYm9Qcm9taXNlc01hcC5nZXQoa2V5KTtcblxuICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZXIpO1xuICAgICAgICBjb21ib1Byb21pc2VzTWFwLnNldChrZXksIHByb21pc2UpO1xuXG4gICAgICAgIHByb21pc2UudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbWJvUHJvbWlzZXNNYXAuZGVsZXRlKGtleSk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbWJvUHJvbWlzZXNNYXAuZGVsZXRlKGtleSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlQ29tYm9EZWZlcihpZCkge1xuXG4gICAgbGV0IGRlZmVyS2V5ID0gaWQsXG4gICAgICAgIGNvbWJvRGVmZXIgPSBjb21ib0RlZmVyc01hcC5nZXQoZGVmZXJLZXkpO1xuXG4gICAgaWYgKHR5cGVvZiBjb21ib0RlZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb21ib0RlZmVyID0gbmV3IERlZmVycmVkKCk7XG4gICAgICAgIGNvbWJvRGVmZXJzTWFwLnNldChkZWZlcktleSwgY29tYm9EZWZlcik7XG4gICAgfVxuXG4gICAgLy8g5peg6K665oiQ5Yqf5Y+K5aSx6LSl77yMIOmDveimgeWIoOmZpOWvueW6lOeahGNvbWJvRGVmZXIsIOeEtuWQjuWGjeWwhuaIkOWKn+aIluWksei0pei/lOWbniBcbiAgICBjb21ib0RlZmVyLnByb21pc2UudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29tYm9EZWZlcnNNYXAuZGVsZXRlKGRlZmVyS2V5KTtcbiAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGNvbWJvRGVmZXJzTWFwLmRlbGV0ZShkZWZlcktleSk7XG4gICAgfSlcblxuICAgIHJldHVybiBjb21ib0RlZmVyO1xufVxuXG5cbmV4cG9ydCB7IGNyZWF0ZUNvbWJvUHJvbWlzZSwgY3JlYXRlQ29tYm9EZWZlciB9O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21ib1Byb21pc2U7XG4iXX0=

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(67);
var hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(30);
var createDesc = __webpack_require__(25);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(40);
var has = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(65);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var settle = __webpack_require__(174);
var buildURL = __webpack_require__(176);
var parseHeaders = __webpack_require__(177);
var isURLSameOrigin = __webpack_require__(178);
var createError = __webpack_require__(85);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(179);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(180);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        if (request.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(175);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(203), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_proxy__ = __webpack_require__(115);







function getMenuData() {
    return __WEBPACK_IMPORTED_MODULE_3__services_proxy__["a" /* default */].get('menu.json')
        .then(data => {
            return data.items || [];
        })
}

getMenuData()
    .then(data => {
        new __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default.a({
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewModel = __webpack_require__(91);

var _view = __webpack_require__(108);

function subscribe() {

  // VM更新,通知view
  _viewModel.Store.subscribe(function () {
    var newStatus = _viewModel.Store.getState(); // VM状态树变化，生成新状态
    _view.Emitter.emit('viewEmitterFromC', newStatus); // 将新状态告诉View
    console.log('控制层里看到生成新的状态树Storestate', _viewModel.Store.getState());
  });

  // View上面传递过来的事件，我们把它dispatch给VM
  _view.Emitter.on('viewEmitterToC', function (data) {
    console.log("监听到view的变化为", data);
    _viewModel.Store.dispatch(data);
  });
}

// 构造一个Menu
function Menu(config) {
  this.config = config;
  this.init();
}

Menu.prototype = {

  init: function init() {
    //在此controller内控制VM&View

    _view.View.init(); //初始化VIEW，绑定事件,内部会监听controller派发出的事件

    subscribe(); // 状态机管理，VM更新,会通知view & 视图上VIEW的动作变化，会通知VM

    // VM 初始，
    //1.在VM内生成store
    //2.VM接收controller传递过来的action，VM状态变化通知Controller
    _viewModel.ViewModel.init({
      modelData: this.config.data,
      url: this.config.url
    });
  }
};

exports['default'] = Menu;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Store = exports.ViewModel = undefined;

var _redux = __webpack_require__(92);

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

// 生成store状态机
var Store = (0, _redux.createStore)(reducer);

function reducer(status, action) {
    switch (action.type) {
        case 'NODE_SELECT':
            return ViewModel.selectNode(action.id);
        case 'NODE_TOGGLE':
            return ViewModel.toggleNode(action.id);
        case 'INIT':
            return ViewModel.selectNode(action.url);
        default:
            return statusTree;
    }
}

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
}

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
    var curNode;
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
function VMSelectNode(newPath) {
    var oldPath = selectStore.oldNode;
    if (oldPath) {
        var oldNode = searchNodeByTwoWays(oldPath);
        selectNodeAttr(oldNode, false);
    }
    var newNode = searchNodeByTwoWays(newPath);
    if (newNode) {
        selectNodeAttr(newNode, true);
    }
}

// 传入节点,toggle其展开（isOpen）属性
function VMToggleNode(key) {
    var node = searchNodeByTwoWays(key);
    if (node != null) {
        node.isOpen = !node.isOpen;
    }
}

var ViewModel = {
    init: function init(params) {
        var defaultUrl = params.url;
        statusTree.children = params.modelData;
        initStatusTree();
        console.log('平铺的', statusTreeMap);

        if (defaultUrl) {
            Store.dispatch({ type: 'INIT', url: defaultUrl });
        } else {
            Store.dispatch({ type: 'DEFAULT' });
        }
    },
    selectNode: function selectNode(key) {

        // 两次Key相同，直接返回状态树
        selectStore.newNode = key;
        if (selectStore.isEqual()) return statusTree;

        VMSelectNode(key);
        selectStore.oldNode = key;
        console.log('VM中选中的路径', key);
        return statusTree;
    },
    toggleNode: function toggleNode(key) {
        console.log('VM中需要toggle的路径', key);
        VMToggleNode(key);
        return statusTree;
    }
};
exports.ViewModel = ViewModel;
exports.Store = Store;

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(62);
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


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(22)))

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(97);




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
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(95);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(32)))

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(61);


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
/* 97 */
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
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(99);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 99 */
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
/* 100 */
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(102);


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(104);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32), __webpack_require__(103)(module)))

/***/ }),
/* 103 */
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
/* 104 */
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
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(62);




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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(22)))

/***/ }),
/* 106 */
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
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(63);
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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var $sidebar = document.getElementById('sidebar');
var $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
var $menuFolded = document.getElementById('menu-folded');
var $menuUnfold = document.getElementById('menu-unfold');

var events = __webpack_require__(64);
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
  return '<li  class="menu-item menu-item-l' + node.level + ' ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a data-id="' + node.id + '" ' + (node.url ? "href=" + node.url + "" : "") + ' class="menu-title" >' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + '' + '<span class="menu-title-text menu-title-l' + node.level + '">' + node.title + '</span>' + '</a>' + '<ul class="menu-submenu menu-submenu-l' + Number(node.level + 1) + ' menu-submenu-hidden menu-submenu-vertical">' + renderTwoWays(nodes, renderMenuFold, renderMenuItemFold) + '</ul>' + '</li>';
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
        emitter.emit('viewEmitterToC', { type: 'NODE_SELECT', id: id, url: url });
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
        emitter.emit('viewEmitterToC', { type: 'NODE_TOGGLE', id: id, url: url });
        // 叶子节点，点击选中
      } else {
        emitter.emit('viewEmitterToC', { type: 'NODE_SELECT', id: id, url: url });
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

function render(statusTree) {
  console.log('view里要render的状态树', statusTree);
  var tplFolded = renderTwoWays(statusTree.children, renderMenuFold, renderMenuItemFold);
  $menuFolded.innerHTML = tplFolded;

  var tplUnfold = renderTwoWays(statusTree.children, renderMenu, renderMenuItem);
  $menuUnfold.innerHTML = tplUnfold;
}

var menuView = {
  init: function init() {
    bindEvents();
    // 触发sayHi事件
    emitter.on('viewEmitterFromC', function (data) {
      render(data);
    });
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等
  }
};

exports.View = menuView;
exports.Emitter = emitter;

/***/ }),
/* 109 */
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
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(113)(content, options);
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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(112)(true);
// imports


// module
exports.push([module.i, ".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n  cursor: pointer;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected.isHover > .menu-title {\n  box-shadow: none;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  box-shadow: inset 1px 0px 0px 0px #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 36px;\n  text-align: left;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu,\n.sidebar-folded .menu-root .fa-angle-down,\n.sidebar-folded .menu-root .fa-angle-right {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-l1 {\n  width: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-vertical {\n  width: 150px;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l1 {\n  width: 150px;\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l2 {\n  margin-left: 10px;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active.menu-item-selected.menu-item-l3 > .menu-title {\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active .menu-title-l1 {\n  padding-left: 15px;\n  display: inline-block;\n  position: absolute;\n  left: 65px;\n  top: 0;\n  background-color: #1c212d;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-l2 > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 31px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu {\n  display: block;\n  float: right;\n  position: absolute;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-hidden {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l2 {\n  left: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l3 {\n  top: 0;\n  left: 150px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  justify-content: center;\n  align-items: center;\n  background: #fafafc;\n  line-height: 65px;\n  color: #2b3447;\n  cursor: pointer;\n}\n.sidebar-toggle-btn .lines {\n  position: relative;\n  height: 13px;\n  width: 16px;\n  background: repeating-linear-gradient(to bottom, #709d63 0px, #709d63 2px, transparent 2px, transparent 5px);\n}\n.sidebar-toggle-btn .lines:before {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 13px;\n  background-color: #dfe1e7 ;\n  background: repeating-linear-gradient(to bottom, #dfe1e7 0px, #dfe1e7 2px, transparent 2px, transparent 5px);\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .lines:before {\n  width: 0px;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n", "", {"version":3,"sources":["/Users/weimengxi/github/component-navigation/src/www/static/styles/demo/menu.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo/mixin.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo/menu-folded.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo.less"],"names":[],"mappings":"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","file":"demo.less","sourcesContent":["@import './variables';\n@import './mixin';\n\n\n//=============  Menu-Styles Start============= \n.menu-root {\n\n    position: relative;\n\n    .calc-colors(@base-menu-font-color);\n\n    a {\n        & {\n            display: inline-block;\n            text-decoration: none;\n        }\n        &,\n        &:link,\n        &:visited,\n        &:hover,\n        &:active {\n            color: @menu-item-font-color;\n        }\n    }\n\n    .menu-item {\n        position: relative;\n        &:not(.menu-item-selected)>.menu-title:hover {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n    } \n\n    .menu-title {\n        width: 100%;\n        height:  @menu-item-height;\n        line-height: @menu-item-height;\n        padding-left: @menu-padding-left;\n        padding-right: @menu-padding-right;\n        cursor: pointer;\n    }\n\n    .menu-item-selected {\n        // 选中的节点\n        &>.menu-title {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset @menu-item-selected-border-width 0px 0px 0px @menu-item-selected-color, inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n\n        &.isHover>.menu-title {\n            box-shadow: none;\n        }\n        .menu-icon-title-alt,\n        .menu-icon-angle {\n            color: @menu-item-selected-icon-color;\n        }\n    }\n\n    .menu-submenu {\n\n        position: relative;\n\n        &-hidden {\n            display: none;\n        }\n\n        .menu-item {\n            background-color: @menu-submenu-item-bg-color;\n            &:not(.menu-item-selected)>.menu-title:hover {\n                box-shadow: inset 1px 0px 0px 0px @menu-submenu-item-bg-color;\n            }\n        } \n\n        .menu-title {\n            padding-left: @menu-submenu-padding-left + @menu-icon-margin-right + @menu-submenu-list-icon-size;\n        }\n\n    }\n\n    .menu-submenu-inline {\n        // 模拟list-style: circle-solid\n        & > .menu-item:before {\n            position: absolute;\n            display: block;\n            content: ' ';\n            left: @menu-submenu-padding-left;\n            top: 50%;\n            margin-top: -@menu-submenu-list-icon-size/2;\n            width: @menu-submenu-list-icon-size;\n            height: @menu-submenu-list-icon-size;\n            border-radius: @menu-submenu-list-icon-size/2;\n            background-color: @base-menu-font-color;\n        }\n\n    }\n\n     // 三级子菜单\n    .menu-submenu .menu-item:hover .menu-submenu-vertical {\n        position: absolute;\n        top: 0px;\n        left: @sidebar-width;\n        background-color: @menu-submenu-item-bg-color;\n        display: block;\n        z-index: @base-zindex + 2;\n\n        .menu-item {\n            box-shadow: inset 1px 0px 0px  0px @menu-item-bg-color;\n        }\n\n    }\n\n    .menu-submenu-vertical {\n\n        @menu-submenu-item-bg-color-red: red(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-green: green(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-blue: blue(@menu-submenu-item-bg-color);\n\n        @menu-submenu-vertical-item-bg-color: rgba(@menu-submenu-item-bg-color-red, @menu-submenu-item-bg-color-green, @menu-submenu-item-bg-color-blue, @menu-submenu-vertical-item-bg-color-alpha);\n\n        width: @menu-submenu-vertical-width;\n        overflow: visible;\n        display: none;\n\n        .menu-item {\n            background-color: @menu-submenu-vertical-item-bg-color;\n        }\n\n        .menu-title {\n            padding-left: @menu-submenu-padding-left - @base-padding;\n            text-align: left;\n            font-size: 12px;\n        }\n    }\n\n    // icon ===== \n    [class|=menu-icon] {\n        .menu-icon( @menu-item-icon-color);        \n    }\n\n    .menu-icon-title-alt {\n        margin-right: @menu-icon-margin-right;\n    }\n\n    .menu-icon-angle {\n        float: right;\n        line-height: @menu-item-height;\n    }\n}\n//=============  Menu-Styles End============= \n",".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n  cursor: pointer;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected.isHover > .menu-title {\n  box-shadow: none;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  box-shadow: inset 1px 0px 0px 0px #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 36px;\n  text-align: left;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu,\n.sidebar-folded .menu-root .fa-angle-down,\n.sidebar-folded .menu-root .fa-angle-right {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-l1 {\n  width: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-vertical {\n  width: 150px;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l1 {\n  width: 150px;\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l2 {\n  margin-left: 10px;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active.menu-item-selected.menu-item-l3 > .menu-title {\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active .menu-title-l1 {\n  padding-left: 15px;\n  display: inline-block;\n  position: absolute;\n  left: 65px;\n  top: 0;\n  background-color: #1c212d;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-l2 > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 31px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu {\n  display: block;\n  float: right;\n  position: absolute;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-hidden {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l2 {\n  left: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l3 {\n  top: 0;\n  left: 150px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  justify-content: center;\n  align-items: center;\n  background: #fafafc;\n  line-height: 65px;\n  color: #2b3447;\n  cursor: pointer;\n}\n.sidebar-toggle-btn .lines {\n  position: relative;\n  height: 13px;\n  width: 16px;\n  background: repeating-linear-gradient(to bottom, #709d63 0px, #709d63 2px, transparent 2px, transparent 5px);\n}\n.sidebar-toggle-btn .lines:before {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 13px;\n  background-color: #dfe1e7 ;\n  background: repeating-linear-gradient(to bottom, #dfe1e7 0px, #dfe1e7 2px, transparent 2px, transparent 5px);\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .lines:before {\n  width: 0px;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n","//=============  Menu-Mixins Start============= \n.menu-icon(@menu-icon-color: @base-menu-font-color) {\n  width: @menu-icon-size;\n  height: @menu-icon-size;\n  color: @menu-icon-color;\n}\n\n.calc-colors(@base-menu-font-color) {\n\n  @menu-font-color-red: red(@base-menu-font-color);\n  @menu-font-color-green: green(@base-menu-font-color);\n  @menu-font-color-blue: blue(@base-menu-font-color);\n\n  @menu-item-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha);\n  @menu-item-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha);\n  @menu-item-selected-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha + 0.2);\n  @menu-item-selected-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha + 0.2);\n\n  @menu-submenu-list-icon-size: 4px;\n\n}\n\n//=============  Menu-Mixins End============= ","@import './variables';\n@import './mixin';\n\n.sidebar-folded .menu-root {\n\n\t.calc-colors(@base-menu-font-color);\n\n\t.menu-submenu,\n\t.fa-angle-down,\n\t.fa-angle-right {\n\t\tdisplay: none;\n\t}\n\n\t.menu-item {\n\n\n\t\t// 一级li宽度调整\n\t\t&.menu-item-l1 {\n\t\t\twidth: @sidebar-folded-width;\n\t\t}\n\n\t\t.menu-submenu-vertical {\n\t\t\twidth: @menu-submenu-vertical-width;\n\n\t\t}\n\t\n\t\t// 一级title特殊处理\n\t\t.menu-title-text.menu-title-l1 {\n\t\t\twidth: @menu-submenu-vertical-width; \n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.menu-title-text.menu-title-l2 {\n\t\t\tmargin-left: @menu-icon-margin-right;\n\n\t\t} \n\n\t\t&.menu-item-active {\n\t\t\t&.menu-item-selected.menu-item-l3 > .menu-title {\n\t\t\t\tbox-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n\t\t\t}\n\t\t\t& > .menu-title {\n\t\t\t\tcolor: rgba(255, 255, 255, 0.8);\n\t\t\t\tbackground-color: #1c212d;\n\t\t\t\tbox-shadow: inset 0px 1px 0px 0px #2b3447;\n\t\t\t}\n\t\t\t.menu-title-l1 {\n\t\t\t\tpadding-left: @base-padding;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: @sidebar-folded-width;\n\t\t\t\ttop: 0;\n\t\t\t\tbackground-color: @menu-item-selected-bg-color;\n\t\t\t}\n\t\t}\n\n\t\t.menu-title-text {\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t.menu-submenu-l2 {\n\t\t    // 模拟list-style: circle-solid\n\t\t    & > .menu-item:before {\n\t\t        position: absolute;\n\t\t        display: block;\n\t\t        content: ' ';\n\t\t        left: @menu-submenu-padding-left - 2*@menu-icon-margin-right;\n\t\t        top: 50%;\n\t\t        margin-top: -@menu-submenu-list-icon-size/2;\n\t\t        width: @menu-submenu-list-icon-size;\n\t\t        height: @menu-submenu-list-icon-size;\n\t\t        border-radius: @menu-submenu-list-icon-size/2;\n\t\t        background-color: @base-menu-font-color;\n\t\t    }\n\n\t\t}\n\n\t\t.menu-submenu {\n\t\t\tdisplay: block;\n\t\t\tfloat: right;\n\t\t\tposition: absolute;\n\t\t\t&.menu-submenu-hidden {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t&.menu-submenu-l2 {\n\t\t\t\tleft: @sidebar-folded-width;\n\t\t\t}\n\t\t\t&.menu-submenu-l3 {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: @menu-submenu-vertical-width;\n\t\t\t}\n\t\t}\t\t\n\t}\n\n\n}","@import './demo/variables';\n@import './demo/menu';\n@import './demo/menu-folded';\n\n// Reset ========\n* {\n    box-sizing: border-box;\n    padding: 0px;\n    margin: 0px;\n}\n\nul,\nli {\n    list-style: none;\n}\n\n\n// Layout ========\nbody {\n    display: flex;\n    width: 100vw;\n    height: 100vh;\n}\n\n// 左侧导航菜单区 - 展开状态\n.sidebar {\n    position: relative;\n    width: @sidebar-width;\n    z-index: @base-zindex + 1;\n    overflow-x: visible;\n\n    .logo {\n        height: @header-height;\n        background-color: lighten(@menu-item-bg-color, 10%);\n        line-height: @header-height;\n        text-align: center;\n    }\n\n\n    .menu-root {\n        position: relative;\n        background: #354059;\n        width: 100%;\n        overflow-x: visible;\n    }\n\n\n    &-toggle-btn {\n        float: right;\n        display: flex;\n        width: @header-height;\n        height: @header-height;\n        margin-right: -@header-height;\n        justify-content: center;\n        align-items: center;\n        background: #fafafc;\n        line-height: @header-height;\n        color: @menu-item-bg-color;\n        cursor: pointer;\n        \n        .lines {\n            position: relative;\n            height: 13px;\n            width: @menu-icon-size;\n            background: repeating-linear-gradient(to bottom, @menu-item-selected-color 0px,  @menu-item-selected-color 2px,transparent 2px,  transparent 5px);\n\n        }\n\n        .lines:before {\n            display: inline-block;\n            position: absolute;\n            content: ' ';\n            top: 0px;\n            right: 0px;\n            width: 12px;\n            height: 13px;\n            background-color:  #dfe1e7 ;\n            background: repeating-linear-gradient(to bottom, #dfe1e7  0px,  #dfe1e7 2px,transparent 2px,  transparent 5px)\n        }\n    }\n\n}\n\n// 左侧导航菜单区 - 折叠状态\n.sidebar-folded {\n\n    width: @sidebar-folded-width;\n\n    .sidebar-toggle-btn {\n        .lines:before {\n            width: 0px;\n        }\n    }\n\n}\n\n// 主功能区域\n.main-container {\n    flex: 1;\n    z-index: @base-zindex;\n    background-color: #ededed;\n\n    .header {\n        width: 100%;\n        height: @header-height;\n        background-color: #ccc;\n    }\n    .main-content {\n        padding: @base-padding;\n    }\n\n}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 112 */
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
/* 113 */
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

var	fixUrls = __webpack_require__(114);

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
/* 114 */
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
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_data_source_agent__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_data_source_agent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_data_source_agent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interceptors_FixParams__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interceptors_ErrorProcessor__ = __webpack_require__(209);




var baseURL = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].BASE_URL;

var dataSource = new __WEBPACK_IMPORTED_MODULE_1_data_source_agent___default.a();

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
DataSourceProxy.ErrorType = __WEBPACK_IMPORTED_MODULE_1_data_source_agent___default.a.ErrorType; //{BUSINESS, NETWORK, TIMEOUT, ABORT, PARSER}
DataSourceProxy.createError = __WEBPACK_IMPORTED_MODULE_1_data_source_agent___default.a.createError; //{BUSINESS, NETWORK, TIMEOUT, ABORT, PARSER}

/* harmony default export */ __webpack_exports__["a"] = (DataSourceProxy);


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const config = {
	// api请求的baseURL, 用于DataSourceGateWay
	// BASE_URL: '/web/',
	BASE_URL: 'https://www.easy-mock.com/mock/59a51e3c7b7ac306cc2f08a8/',
}

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(51);

var _map2 = _interopRequireDefault(_map);

var _assign = __webpack_require__(29);

var _assign2 = _interopRequireDefault(_assign);

var _querystring = __webpack_require__(78);

var _querystring2 = _interopRequireDefault(_querystring);

var _Deferred = __webpack_require__(54);

var _Deferred2 = _interopRequireDefault(_Deferred);

var _CreateError = __webpack_require__(79);

var _CreateError2 = _interopRequireDefault(_CreateError);

var _ComboPromise = __webpack_require__(80);

var _ComboPromise2 = _interopRequireDefault(_ComboPromise);

var _config = __webpack_require__(158);

var _config2 = _interopRequireDefault(_config);

var _const = __webpack_require__(31);

var _const2 = _interopRequireDefault(_const);

var _Ajax = __webpack_require__(159);

var _Ajax2 = _interopRequireDefault(_Ajax);

var _Http = __webpack_require__(188);

var _Http2 = _interopRequireDefault(_Http);

var _MissionDispatcher = __webpack_require__(204);

var _MissionDispatcher2 = _interopRequireDefault(_MissionDispatcher);

var _CacheData = __webpack_require__(205);

var _CacheData2 = _interopRequireDefault(_CacheData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AppCache = new _CacheData2['default']('DATA_SOURCE_PROXY', 'v0.0.1');

function mixConfig(requestConfig) {
    return (0, _assign2['default'])({}, _config2['default'], requestConfig);
}

/* 生成cache key*/
function getCacheKey() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requestConfig,
        url = _ref.url,
        maxAge = _ref.maxAge,
        params = _ref.params;

    var cacheKey = null;
    if (typeof maxAge === 'number') {
        cacheKey = url + '_' + _querystring2['default'].stringify(params);
    }
    return cacheKey;
}

function DataSource() {
    var _this = this;

    var workerCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;


    var interceptors = {
        request: [],
        response: [],
        error: []
    };

    var requestDefers = new _map2['default']();

    var httpMD = new _MissionDispatcher2['default'](_Ajax2['default'], workerCount);
    httpMD.start();

    this.interceptors = {
        request: {
            use: function use() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                Array.prototype.push.apply(interceptors.request, args);
                return _this;
            }
        },
        response: {
            use: function use() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                Array.prototype.push.apply(interceptors.response, args);
                return _this;
            }
        },
        error: {
            use: function use() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                Array.prototype.push.apply(interceptors.error, args);
                return _this;
            }
        }
    };

    this.start = function () {
        httpMD.start();
    };

    this.stop = function () {
        httpMD.stop();
    };

    this.request = function (requestConfig) {

        return new _promise2['default'](function (resolve, reject) {

            var cacheKey = getCacheKey(requestConfig);
            var maxAge = requestConfig.maxAge,
                ignoreExpires = requestConfig.ignoreExpires;

            var cacheItem = void 0,
                data = void 0;

            if (cacheKey === null) {
                // 没有maxAge配置，直接发起serverRequest
                resolve(_this.serverRequest(requestConfig));
            } else {
                // 有maxAge配置，需要先检查cache
                cacheItem = AppCache.item(cacheKey, { maxAge: maxAge, ignoreExpires: ignoreExpires });
                data = cacheItem.get();

                if (data === null) {
                    //  cache中没取到数据 || 数据过期,  发起serverRequest
                    _this.serverRequest(requestConfig).then(function (data) {
                        cacheItem.set(data);
                        resolve(data);
                    })['catch'](function (err) {
                        return reject(err);
                    });
                } else {
                    // 命中缓存
                    resolve(data);
                }
            }
        });
    };

    this.serverRequest = function (requestConfig) {

        var missionConfig = mixConfig(requestConfig || {});
        var requestDefer = new _Deferred2['default']();

        // 1. requestInterceptors
        interceptors.request.reduce(function (configPromise, interceptor) {
            return configPromise.then(interceptor);
        }, _promise2['default'].resolve(missionConfig)).then(function (config) {
            return config;
        }, function (interceptorError) {
            console.log('Request Intercept Fail ... ', interceptorError);
            if (!interceptorError instanceof Error) {
                interceptorError = (0, _CreateError2['default'])({ message: interceptorError });
            }
            throw interceptorError;
        })
        // 2. doRequest
        .then(function (config) {
            var mission = new _Http2['default'](config);
            // 2.1 doRequest
            httpMD.put(mission)
            // 2.2. response or error
            .then(function (result) {
                // 2.2.1 responseInterceptors
                interceptors.response.reduce(function (resultPromise, interceptor) {
                    return resultPromise.then(function (result) {
                        return interceptor(result, requestConfig);
                    });
                }, _promise2['default'].resolve(result)).then(function (result) {
                    requestDefer.resolve(result);
                }, function (error) {
                    /* 
                     * @TODO
                     * error instanceof Error && requestDefer.reject(error); 
                     */
                    console.error('Response Intercept Exception ... ', error);
                    throw error;
                });
            }, function (error) {
                // 洗数据,约定： interceptorError instanceof Error
                var transformedError = void 0;
                if (error instanceof Error) {
                    transformedError = error;
                } else {
                    transformedError = (0, _CreateError2['default'])({ message: error });
                }
                // 2.2.2. errorInterceptors
                interceptors.error.reduce(function (errorPromise, interceptor) {
                    return errorPromise.then(function (error) {
                        return interceptor(error, requestConfig);
                    });
                }, _promise2['default'].resolve(transformedError)).then(function (errorOrData) {
                    /*
                     * 【注意！！！】
                     *　处理过的异常, errorInterceptor可能把error转换为正常的数据(非Error类型)
                     *  error(一定是一个Error类型的实例)
                     */
                    var handler = errorOrData instanceof Error ? 'reject' : 'resolve';
                    requestDefer[handler](errorOrData);
                }, function (exceptionError) {
                    // 未处理异常
                    console.log("Error Intercept Exception ... ", exceptionError);
                    throw exceptionError;
                });
            });
        })['catch'](function (err) {
            requestDefer.reject(err);
        });

        return requestDefer.promise;
    };
}

DataSource.ErrorType = _const2['default'].ERROR_TYPE;
DataSource.Deferred = _Deferred2['default'];
DataSource.createError = _CreateError2['default'];
DataSource.createComboPromise = _ComboPromise2['default'];

exports['default'] = DataSource;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBcHBDYWNoZSIsIm1peENvbmZpZyIsInJlcXVlc3RDb25maWciLCJnZXRDYWNoZUtleSIsInVybCIsIm1heEFnZSIsInBhcmFtcyIsImNhY2hlS2V5Iiwic3RyaW5naWZ5IiwiRGF0YVNvdXJjZSIsIndvcmtlckNvdW50IiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiZXJyb3IiLCJyZXF1ZXN0RGVmZXJzIiwiaHR0cE1EIiwic3RhcnQiLCJ1c2UiLCJhcmdzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJwdXNoIiwiYXBwbHkiLCJzdG9wIiwicmVzb2x2ZSIsInJlamVjdCIsImlnbm9yZUV4cGlyZXMiLCJjYWNoZUl0ZW0iLCJkYXRhIiwic2VydmVyUmVxdWVzdCIsIml0ZW0iLCJnZXQiLCJ0aGVuIiwic2V0IiwiZXJyIiwibWlzc2lvbkNvbmZpZyIsInJlcXVlc3REZWZlciIsInJlZHVjZSIsImNvbmZpZ1Byb21pc2UiLCJpbnRlcmNlcHRvciIsImNvbmZpZyIsImludGVyY2VwdG9yRXJyb3IiLCJjb25zb2xlIiwibG9nIiwiRXJyb3IiLCJtZXNzYWdlIiwibWlzc2lvbiIsInB1dCIsInJlc3VsdCIsInJlc3VsdFByb21pc2UiLCJ0cmFuc2Zvcm1lZEVycm9yIiwiZXJyb3JQcm9taXNlIiwiZXJyb3JPckRhdGEiLCJoYW5kbGVyIiwiZXhjZXB0aW9uRXJyb3IiLCJwcm9taXNlIiwiRXJyb3JUeXBlIiwiRVJST1JfVFlQRSIsIkRlZmVycmVkIiwiY3JlYXRlRXJyb3IiLCJjcmVhdGVDb21ib1Byb21pc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXLDJCQUFjLG1CQUFkLEVBQW1DLFFBQW5DLENBQWpC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O0FBQ0FaLDRCQUFRQyxHQUFSLENBQVksZ0NBQVosRUFBOENXLGNBQTlDO0FBQ0EsMEJBQU1BLGNBQU47QUFDSCxpQkFsQkw7QUFtQkgsYUEvQ0w7QUFnREgsU0FoRUwsV0FpRVcsZUFBTztBQUNWbEIseUJBQWFYLE1BQWIsQ0FBb0JTLEdBQXBCO0FBQ0gsU0FuRUw7O0FBcUVBLGVBQU9FLGFBQWFtQixPQUFwQjtBQUNILEtBNUVEO0FBNkVIOztBQUVEL0MsV0FBV2dELFNBQVgsR0FBdUIsbUJBQU1DLFVBQTdCO0FBQ0FqRCxXQUFXa0QsUUFBWDtBQUNBbEQsV0FBV21ELFdBQVg7QUFDQW5ELFdBQVdvRCxrQkFBWDs7cUJBRWVwRCxVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcblxuaW1wb3J0IERlZmVycmVkIGZyb20gJy4vdXRpbHMvRGVmZXJyZWQnO1xuaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gJy4vdXRpbHMvQ3JlYXRlRXJyb3InO1xuaW1wb3J0IGNyZWF0ZUNvbWJvUHJvbWlzZSBmcm9tICcuL3V0aWxzL0NvbWJvUHJvbWlzZSc7XG5cbmltcG9ydCBEZWZhdWx0Q29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBDb25zdCBmcm9tICcuL2NvbnN0JztcblxuaW1wb3J0IEh0dHBXb3JrZXJGYWN0b3J5IGZyb20gJy4vd29ya2Vycy9BamF4JztcbmltcG9ydCBIdHRwTWlzc2lvbiBmcm9tICcuL21pc3Npb25zL0h0dHAnO1xuXG5pbXBvcnQgTWlzc2lvbkRpc3BhdGNoZXIgZnJvbSAnLi9NaXNzaW9uRGlzcGF0Y2hlcic7XG5cbmltcG9ydCBDYWNoZURhdGEgZnJvbSAnLi9DYWNoZURhdGEnO1xuXG5jb25zdCBBcHBDYWNoZSA9IG5ldyBDYWNoZURhdGEoJ0RBVEFfU09VUkNFX1BST1hZJywgJ3YwLjAuMScpO1xuXG5mdW5jdGlvbiBtaXhDb25maWcocmVxdWVzdENvbmZpZykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0Q29uZmlnLCByZXF1ZXN0Q29uZmlnKTtcbn1cblxuLyog55Sf5oiQY2FjaGUga2V5Ki9cbmZ1bmN0aW9uIGdldENhY2hlS2V5KHsgdXJsLCBtYXhBZ2UsIHBhcmFtcyB9ID0gcmVxdWVzdENvbmZpZykge1xuXG4gICAgbGV0IGNhY2hlS2V5ID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIG1heEFnZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY2FjaGVLZXkgPSB1cmwgKyAnXycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkocGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlS2V5O1xufVxuXG5mdW5jdGlvbiBEYXRhU291cmNlKHdvcmtlckNvdW50ID0gMTApIHtcblxuICAgIHZhciBpbnRlcmNlcHRvcnMgPSB7XG4gICAgICAgIHJlcXVlc3Q6IFtdLFxuICAgICAgICByZXNwb25zZTogW10sXG4gICAgICAgIGVycm9yOiBbXVxuICAgIH07XG5cbiAgICB2YXIgcmVxdWVzdERlZmVycyA9IG5ldyBNYXAoKTtcblxuICAgIHZhciBodHRwTUQgPSBuZXcgTWlzc2lvbkRpc3BhdGNoZXIoSHR0cFdvcmtlckZhY3RvcnksIHdvcmtlckNvdW50KTtcbiAgICBodHRwTUQuc3RhcnQoKTtcblxuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgICByZXF1ZXN0OiB7XG4gICAgICAgICAgICB1c2U6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoaW50ZXJjZXB0b3JzLnJlcXVlc3QsIGFyZ3MpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICB1c2U6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoaW50ZXJjZXB0b3JzLnJlc3BvbnNlLCBhcmdzKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgdXNlOiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGludGVyY2VwdG9ycy5lcnJvciwgYXJncylcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICAgICAgaHR0cE1ELnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdG9wID0gKCkgPT4ge1xuICAgICAgICBodHRwTUQuc3RvcCgpO1xuICAgIH1cblxuICAgIHRoaXMucmVxdWVzdCA9IChyZXF1ZXN0Q29uZmlnKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgbGV0IGNhY2hlS2V5ID0gZ2V0Q2FjaGVLZXkocmVxdWVzdENvbmZpZyk7XG4gICAgICAgICAgICBsZXQgeyBtYXhBZ2UsIGlnbm9yZUV4cGlyZXMgfSA9IHJlcXVlc3RDb25maWc7XG4gICAgICAgICAgICBsZXQgY2FjaGVJdGVtLCBkYXRhO1xuXG4gICAgICAgICAgICBpZiAoY2FjaGVLZXkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyDmsqHmnIltYXhBZ2XphY3nva7vvIznm7TmjqXlj5HotbdzZXJ2ZXJSZXF1ZXN0XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnNlcnZlclJlcXVlc3QocmVxdWVzdENvbmZpZykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDmnIltYXhBZ2XphY3nva7vvIzpnIDopoHlhYjmo4Dmn6VjYWNoZVxuICAgICAgICAgICAgICAgIGNhY2hlSXRlbSA9IEFwcENhY2hlLml0ZW0oY2FjaGVLZXksIHsgbWF4QWdlLCBpZ25vcmVFeHBpcmVzIH0pO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBjYWNoZUl0ZW0uZ2V0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgY2FjaGXkuK3msqHlj5bliLDmlbDmja4gfHwg5pWw5o2u6L+H5pyfLCAg5Y+R6LW3c2VydmVyUmVxdWVzdFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZlclJlcXVlc3QocmVxdWVzdENvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlSXRlbS5zZXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHJlamVjdChlcnIpKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOWRveS4ree8k+WtmFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICB0aGlzLnNlcnZlclJlcXVlc3QgPSAocmVxdWVzdENvbmZpZykgPT4ge1xuXG4gICAgICAgIGxldCBtaXNzaW9uQ29uZmlnID0gbWl4Q29uZmlnKHJlcXVlc3RDb25maWcgfHwge30pO1xuICAgICAgICBsZXQgcmVxdWVzdERlZmVyID0gbmV3IERlZmVycmVkKCk7XG5cbiAgICAgICAgLy8gMS4gcmVxdWVzdEludGVyY2VwdG9yc1xuICAgICAgICBpbnRlcmNlcHRvcnMucmVxdWVzdC5yZWR1Y2UoKGNvbmZpZ1Byb21pc2UsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ1Byb21pc2UudGhlbihpbnRlcmNlcHRvcik7XG4gICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUobWlzc2lvbkNvbmZpZykpXG4gICAgICAgICAgICAudGhlbigoY29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgICAgIH0sIChpbnRlcmNlcHRvckVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlcXVlc3QgSW50ZXJjZXB0IEZhaWwgLi4uICcsIGludGVyY2VwdG9yRXJyb3IpO1xuICAgICAgICAgICAgICAgIGlmICghaW50ZXJjZXB0b3JFcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyY2VwdG9yRXJyb3IgPSBjcmVhdGVFcnJvcih7IG1lc3NhZ2U6IGludGVyY2VwdG9yRXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGludGVyY2VwdG9yRXJyb3I7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gMi4gZG9SZXF1ZXN0XG4gICAgICAgICAgICAudGhlbigoY29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIG1pc3Npb24gPSBuZXcgSHR0cE1pc3Npb24oY29uZmlnKTtcbiAgICAgICAgICAgICAgICAvLyAyLjEgZG9SZXF1ZXN0XG4gICAgICAgICAgICAgICAgaHR0cE1ELnB1dChtaXNzaW9uKVxuICAgICAgICAgICAgICAgICAgICAvLyAyLjIuIHJlc3BvbnNlIG9yIGVycm9yXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDIuMi4xIHJlc3BvbnNlSW50ZXJjZXB0b3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHRvcnMucmVzcG9uc2UucmVkdWNlKChyZXN1bHRQcm9taXNlLCBpbnRlcmNlcHRvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0UHJvbWlzZS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcmNlcHRvcihyZXN1bHQsIHJlcXVlc3RDb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdERlZmVyLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIEBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgcmVxdWVzdERlZmVyLnJlamVjdChlcnJvcik7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignUmVzcG9uc2UgSW50ZXJjZXB0IEV4Y2VwdGlvbiAuLi4gJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa0l+aVsOaNriznuqblrprvvJogaW50ZXJjZXB0b3JFcnJvciBpbnN0YW5jZW9mIEVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJhbnNmb3JtZWRFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtZWRFcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1lZEVycm9yID0gY3JlYXRlRXJyb3IoeyBtZXNzYWdlOiBlcnJvciB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDIuMi4yLiBlcnJvckludGVyY2VwdG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJjZXB0b3JzLmVycm9yLnJlZHVjZSgoZXJyb3JQcm9taXNlLCBpbnRlcmNlcHRvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JQcm9taXNlLnRoZW4oKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJjZXB0b3IoZXJyb3IsIHJlcXVlc3RDb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZSh0cmFuc2Zvcm1lZEVycm9yKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZXJyb3JPckRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICog44CQ5rOo5oSP77yB77yB77yB44CRXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAq44CA5aSE55CG6L+H55qE5byC5bi4LCBlcnJvckludGVyY2VwdG9y5Y+v6IO95oqKZXJyb3LovazmjaLkuLrmraPluLjnmoTmlbDmja4o6Z2eRXJyb3LnsbvlnospXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICBlcnJvcijkuIDlrprmmK/kuIDkuKpFcnJvcuexu+Wei+eahOWunuS+iylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gZXJyb3JPckRhdGEgaW5zdGFuY2VvZiBFcnJvciA/ICdyZWplY3QnIDogJ3Jlc29sdmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0RGVmZXJbaGFuZGxlcl0oZXJyb3JPckRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGV4Y2VwdGlvbkVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOacquWkhOeQhuW8guW4uFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIEludGVyY2VwdCBFeGNlcHRpb24gLi4uIFwiLCBleGNlcHRpb25FcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGV4Y2VwdGlvbkVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdERlZmVyLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVxdWVzdERlZmVyLnByb21pc2U7XG4gICAgfVxufVxuXG5EYXRhU291cmNlLkVycm9yVHlwZSA9IENvbnN0LkVSUk9SX1RZUEU7XG5EYXRhU291cmNlLkRlZmVycmVkID0gRGVmZXJyZWQ7XG5EYXRhU291cmNlLmNyZWF0ZUVycm9yID0gY3JlYXRlRXJyb3I7XG5EYXRhU291cmNlLmNyZWF0ZUNvbWJvUHJvbWlzZSA9IGNyZWF0ZUNvbWJvUHJvbWlzZTtcblxuZXhwb3J0IGRlZmF1bHQgRGF0YVNvdXJjZTtcbiJdfQ==

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(46);
__webpack_require__(126);
__webpack_require__(133);
__webpack_require__(134);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(36);
var defined = __webpack_require__(37);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(26);
var descriptor = __webpack_require__(25);
var setToStringTag = __webpack_require__(19);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(17);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13);
var toLength = __webpack_require__(42);
var toAbsoluteIndex = __webpack_require__(123);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(36);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(125);
var step = __webpack_require__(70);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(38)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(24);
var global = __webpack_require__(2);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(47);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(7);
var aFunction = __webpack_require__(15);
var anInstance = __webpack_require__(48);
var forOf = __webpack_require__(20);
var speciesConstructor = __webpack_require__(71);
var task = __webpack_require__(72).set;
var microtask = __webpack_require__(131)();
var newPromiseCapabilityModule = __webpack_require__(49);
var perform = __webpack_require__(73);
var promiseResolve = __webpack_require__(74);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var sameConstructor = LIBRARY ? function (a, b) {
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
} : function (a, b) {
  return a === b;
};
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(50)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return sameConstructor($Promise, C)
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(19)($Promise, PROMISE);
__webpack_require__(75)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if (x instanceof $Promise && sameConstructor(x.constructor, this)) return x;
    return promiseResolve(this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(132)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(47);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(72).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(18)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(71);
var promiseResolve = __webpack_require__(74);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(49);
var perform = __webpack_require__(73);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(46);
__webpack_require__(136);
__webpack_require__(142);
__webpack_require__(145);
__webpack_require__(147);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(137);
var validate = __webpack_require__(76);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(138)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(5).f;
var create = __webpack_require__(26);
var redefineAll = __webpack_require__(50);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(48);
var forOf = __webpack_require__(20);
var $iterDefine = __webpack_require__(38);
var step = __webpack_require__(70);
var setSpecies = __webpack_require__(75);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(52).fastKey;
var validate = __webpack_require__(76);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(1);
var meta = __webpack_require__(52);
var fails = __webpack_require__(11);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(50);
var forOf = __webpack_require__(20);
var anInstance = __webpack_require__(48);
var isObject = __webpack_require__(7);
var setToStringTag = __webpack_require__(19);
var dP = __webpack_require__(5).f;
var each = __webpack_require__(139)(0);
var DESCRIPTORS = __webpack_require__(6);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(41);
var toObject = __webpack_require__(28);
var toLength = __webpack_require__(42);
var asc = __webpack_require__(140);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(141);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var isArray = __webpack_require__(77);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(143)('Map') });


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(47);
var from = __webpack_require__(144);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(20);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(146)('Map');


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(148)('Map');


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(15);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(20);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(150);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(151) });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(30);
var toObject = __webpack_require__(28);
var IObject = __webpack_require__(41);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var DefaultConfig = {
    // `url` is the server URL that will be used for the request
    url: '',

    // `method` is the request method to be used when making the request
    method: 'get', // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: '',

    // `headers` are custom headers to be sent
    headers: { 'X-Requested-With': 'XMLHttpRequest' },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {},

    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream
    data: {},

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'text',

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 5000, // default: 1000

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false, // default: false


    // 请求可合并
    comboRequestEnabled: false

};

exports['default'] = DefaultConfig;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvaW5kZXguanMiXSwibmFtZXMiOlsiRGVmYXVsdENvbmZpZyIsInVybCIsIm1ldGhvZCIsImJhc2VVUkwiLCJoZWFkZXJzIiwicGFyYW1zIiwiZGF0YSIsInJlc3BvbnNlVHlwZSIsInRpbWVvdXQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb21ib1JlcXVlc3RFbmFibGVkIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQU1BLGdCQUFnQjtBQUNsQjtBQUNBQyxTQUFLLEVBRmE7O0FBSWxCO0FBQ0FDLFlBQVEsS0FMVSxFQUtIOztBQUVmO0FBQ0E7QUFDQTtBQUNBQyxhQUFTLEVBVlM7O0FBWWxCO0FBQ0FDLGFBQVMsRUFBRSxvQkFBb0IsZ0JBQXRCLEVBYlM7O0FBZWxCO0FBQ0E7QUFDQUMsWUFBUSxFQWpCVTs7QUFtQmxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxVQUFNLEVBekJZOztBQTJCbEI7QUFDQTtBQUNBQyxrQkFBYyxNQTdCSTs7QUFnQ2xCO0FBQ0E7QUFDQUMsYUFBUyxJQWxDUyxFQWtDSDs7QUFFZjtBQUNBO0FBQ0FDLHFCQUFpQixLQXRDQyxFQXNDTTs7O0FBR3hCO0FBQ0FDLHlCQUFxQjs7QUExQ0gsQ0FBdEI7O3FCQThDZVYsYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERlZmF1bHRDb25maWcgPSB7XG4gICAgLy8gYHVybGAgaXMgdGhlIHNlcnZlciBVUkwgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gICAgdXJsOiAnJyxcblxuICAgIC8vIGBtZXRob2RgIGlzIHRoZSByZXF1ZXN0IG1ldGhvZCB0byBiZSB1c2VkIHdoZW4gbWFraW5nIHRoZSByZXF1ZXN0XG4gICAgbWV0aG9kOiAnZ2V0JywgLy8gZGVmYXVsdFxuXG4gICAgLy8gYGJhc2VVUkxgIHdpbGwgYmUgcHJlcGVuZGVkIHRvIGB1cmxgIHVubGVzcyBgdXJsYCBpcyBhYnNvbHV0ZS5cbiAgICAvLyBJdCBjYW4gYmUgY29udmVuaWVudCB0byBzZXQgYGJhc2VVUkxgIGZvciBhbiBpbnN0YW5jZSBvZiBheGlvcyB0byBwYXNzIHJlbGF0aXZlIFVSTHNcbiAgICAvLyB0byBtZXRob2RzIG9mIHRoYXQgaW5zdGFuY2UuXG4gICAgYmFzZVVSTDogJycsXG5cbiAgICAvLyBgaGVhZGVyc2AgYXJlIGN1c3RvbSBoZWFkZXJzIHRvIGJlIHNlbnRcbiAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxuXG4gICAgLy8gYHBhcmFtc2AgYXJlIHRoZSBVUkwgcGFyYW1ldGVycyB0byBiZSBzZW50IHdpdGggdGhlIHJlcXVlc3RcbiAgICAvLyBNdXN0IGJlIGEgcGxhaW4gb2JqZWN0IG9yIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICAgIHBhcmFtczoge30sXG5cbiAgICAvLyBgZGF0YWAgaXMgdGhlIGRhdGEgdG8gYmUgc2VudCBhcyB0aGUgcmVxdWVzdCBib2R5XG4gICAgLy8gT25seSBhcHBsaWNhYmxlIGZvciByZXF1ZXN0IG1ldGhvZHMgJ1BVVCcsICdQT1NUJywgYW5kICdQQVRDSCdcbiAgICAvLyBXaGVuIG5vIGB0cmFuc2Zvcm1SZXF1ZXN0YCBpcyBzZXQsIG11c3QgYmUgb2Ygb25lIG9mIHRoZSBmb2xsb3dpbmcgdHlwZXM6XG4gICAgLy8gLSBzdHJpbmcsIHBsYWluIG9iamVjdCwgQXJyYXlCdWZmZXIsIEFycmF5QnVmZmVyVmlldywgVVJMU2VhcmNoUGFyYW1zXG4gICAgLy8gLSBCcm93c2VyIG9ubHk6IEZvcm1EYXRhLCBGaWxlLCBCbG9iXG4gICAgLy8gLSBOb2RlIG9ubHk6IFN0cmVhbVxuICAgIGRhdGE6IHt9LFxuXG4gICAgLy8gYHJlc3BvbnNlVHlwZWAgaW5kaWNhdGVzIHRoZSB0eXBlIG9mIGRhdGEgdGhhdCB0aGUgc2VydmVyIHdpbGwgcmVzcG9uZCB3aXRoXG4gICAgLy8gb3B0aW9ucyBhcmUgJ2FycmF5YnVmZmVyJywgJ2Jsb2InLCAnZG9jdW1lbnQnLCAnanNvbicsICd0ZXh0JywgJ3N0cmVhbSdcbiAgICByZXNwb25zZVR5cGU6ICd0ZXh0JyxcblxuXG4gICAgLy8gYHRpbWVvdXRgIHNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHJlcXVlc3QgdGltZXMgb3V0LlxuICAgIC8vIElmIHRoZSByZXF1ZXN0IHRha2VzIGxvbmdlciB0aGFuIGB0aW1lb3V0YCwgdGhlIHJlcXVlc3Qgd2lsbCBiZSBhYm9ydGVkLlxuICAgIHRpbWVvdXQ6IDUwMDAsIC8vIGRlZmF1bHQ6IDEwMDBcblxuICAgIC8vIGB3aXRoQ3JlZGVudGlhbHNgIGluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBjcm9zcy1zaXRlIEFjY2Vzcy1Db250cm9sIHJlcXVlc3RzXG4gICAgLy8gc2hvdWxkIGJlIG1hZGUgdXNpbmcgY3JlZGVudGlhbHNcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLCAvLyBkZWZhdWx0OiBmYWxzZVxuXG5cbiAgICAvLyDor7fmsYLlj6/lkIjlubZcbiAgICBjb21ib1JlcXVlc3RFbmFibGVkOiBmYWxzZVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRDb25maWc7XG4iXX0=

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(23);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _assign = __webpack_require__(29);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

var _querystring = __webpack_require__(78);

var _querystring2 = _interopRequireDefault(_querystring);

var _axios = __webpack_require__(170);

var _axios2 = _interopRequireDefault(_axios);

var _const = __webpack_require__(31);

var _const2 = _interopRequireDefault(_const);

var _CreateError = __webpack_require__(79);

var _CreateError2 = _interopRequireDefault(_CreateError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import 'axios-response-logger';

var ERROR_TYPE = _const2['default'].ERROR_TYPE;

var JSON = (typeof window === 'undefined' ? global : window).JSON || {};

// 异常数据结构
var errorResponseStruct = { httpStatusCode: NaN, code: NaN, message: '' };

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 * @refer https://github.com/mzabriskie/axios/blob/master/lib/utils.js
 */
var isObject = function isObject(val) {
    return val !== null && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3['default'])(val)) === 'object';
};

var transformMissionConfig = function transformMissionConfig(config) {

    var transformedConfig = (0, _assign2['default'])({}, config);

    if (config.method === 'post' && isObject(transformedConfig.data)) {
        transformedConfig.data = _querystring2['default'].stringify(transformedConfig.data);
    }

    return transformedConfig;
};

var AjaxWorkerFactory = function () {
    function AjaxWorkerFactory() {
        (0, _classCallCheck3['default'])(this, AjaxWorkerFactory);
    }

    (0, _createClass3['default'])(AjaxWorkerFactory, [{
        key: 'do',
        value: function _do(mission) {
            return new _promise2['default'](function (resolve, reject) {
                // axiosSchema: https://github.com/mzabriskie/axios
                var transformedConfig = transformMissionConfig(mission.config);

                _axios2['default'].request(transformedConfig).then(function (_ref) {
                    var data = _ref.data,
                        status = _ref.status,
                        statusText = _ref.statusText,
                        headers = _ref.headers,
                        config = _ref.config,
                        response = _ref.response;

                    if (Object.prototype.toString.call(data) !== "[object Object]") {
                        try {
                            data = JSON.parse(data);
                        } catch (e) {
                            var message = "response is not a instance of JSON ";
                            console.error("response of '%s' is not JSON ", config.url);
                            var parserError = (0, _CreateError2['default'])({ message: message, type: ERROR_TYPE.PARSER });
                            reject(parserError);
                        }
                    }

                    // reslove 
                    // [!important] 新增的 (data.code) 逻辑判断是为了兼容服务端api error返回结构争议
                    if (data.error || data.code) {
                        // 2. bizError
                        var httpStatusCode = status;
                        var rawError = (0, _assign2['default'])({}, data.error || data, { httpStatusCode: httpStatusCode });
                        var businessError = (0, _CreateError2['default'])(rawError);
                        reject(businessError);
                    } else {
                        resolve(data);
                    }
                }, function (error) {
                    if (_axios2['default'].isCancel(error)) {
                        // abort error
                        // console.log('Request canceled', error.message);
                        var abortError = (0, _CreateError2['default'])({ message: error.message, type: ERROR_TYPE.ABORT, code: error.code });
                        reject(abortError);
                    } else if (error.code === 'ECONNABORTED') {
                        // timeout error
                        var timeoutError = (0, _CreateError2['default'])({ message: error.message, type: ERROR_TYPE.TIMEOUT, code: error.code });
                        reject(timeoutError);
                    } else if (error.response) {
                        // network error 
                        // The request was made, but the server responded with a status code
                        // that falls out of the range of 2xx
                        var networkError = void 0;
                        var _error$response = error.response,
                            status = _error$response.status,
                            statusText = _error$response.statusText,
                            headers = _error$response.headers,
                            config = _error$response.config,
                            _error$response$data = _error$response.data,
                            data = _error$response$data === undefined ? {} : _error$response$data;
                        var code = data.code,
                            message = data.message;

                        var responseDataError = data.error || {};
                        var type = ERROR_TYPE.NETWORK,
                            httpStatusCode = status;

                        // 兼容data.code 和 data.error这两种标志异常的方式， 优先选用code
                        code = code || responseDataError.code;
                        message = message || responseDataError.message || statusText;

                        networkError = (0, _CreateError2['default'])({ type: type, httpStatusCode: httpStatusCode, code: code, message: message });
                        reject(networkError);
                    } else {

                        // console.error("unknown axios request error: ", error);
                        var requestError = (0, _CreateError2['default'])({ message: error.message, type: ERROR_TYPE.NETWORK });
                        reject(requestError);
                    }
                });
            });
        }
    }]);
    return AjaxWorkerFactory;
}();

exports['default'] = AjaxWorkerFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3JrZXJzL0FqYXguanMiXSwibmFtZXMiOlsiRVJST1JfVFlQRSIsIkpTT04iLCJ3aW5kb3ciLCJnbG9iYWwiLCJlcnJvclJlc3BvbnNlU3RydWN0IiwiaHR0cFN0YXR1c0NvZGUiLCJOYU4iLCJjb2RlIiwibWVzc2FnZSIsImlzT2JqZWN0IiwidmFsIiwidHJhbnNmb3JtTWlzc2lvbkNvbmZpZyIsImNvbmZpZyIsInRyYW5zZm9ybWVkQ29uZmlnIiwibWV0aG9kIiwiZGF0YSIsInN0cmluZ2lmeSIsIkFqYXhXb3JrZXJGYWN0b3J5IiwibWlzc2lvbiIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0IiwidGhlbiIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJoZWFkZXJzIiwicmVzcG9uc2UiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJwYXJzZSIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJ1cmwiLCJwYXJzZXJFcnJvciIsInR5cGUiLCJQQVJTRVIiLCJyYXdFcnJvciIsImJ1c2luZXNzRXJyb3IiLCJpc0NhbmNlbCIsImFib3J0RXJyb3IiLCJBQk9SVCIsInRpbWVvdXRFcnJvciIsIlRJTUVPVVQiLCJuZXR3b3JrRXJyb3IiLCJyZXNwb25zZURhdGFFcnJvciIsIk5FVFdPUksiLCJyZXF1ZXN0RXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUdBOzs7O0FBRUE7Ozs7OztBQUpBOztBQU1BLElBQU1BLGFBQWEsbUJBQU1BLFVBQXpCOztBQUVBLElBQU1DLE9BQU8sQ0FBQyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBMUMsRUFBa0RELElBQWxELElBQTBELEVBQXZFOztBQUVBO0FBQ0EsSUFBTUcsc0JBQXNCLEVBQUVDLGdCQUFnQkMsR0FBbEIsRUFBdUJDLE1BQU1ELEdBQTdCLEVBQWtDRSxTQUFTLEVB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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuLy8gaW1wb3J0ICdheGlvcy1yZXNwb25zZS1sb2dnZXInO1xuXG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vY29uc3QnO1xuXG5pbXBvcnQgY3JlYXRlRXJyb3IgZnJvbSAnLi4vdXRpbHMvQ3JlYXRlRXJyb3InO1xuXG5jb25zdCBFUlJPUl9UWVBFID0gQ29uc3QuRVJST1JfVFlQRTtcblxuY29uc3QgSlNPTiA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdykuSlNPTiB8fCB7fTtcblxuLy8g5byC5bi45pWw5o2u57uT5p6EXG5jb25zdCBlcnJvclJlc3BvbnNlU3RydWN0ID0geyBodHRwU3RhdHVzQ29kZTogTmFOLCBjb2RlOiBOYU4sIG1lc3NhZ2U6ICcnIH07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqIEByZWZlciBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcy9ibG9iL21hc3Rlci9saWIvdXRpbHMuanNcbiAqL1xuY29uc3QgaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG5jb25zdCB0cmFuc2Zvcm1NaXNzaW9uQ29uZmlnID0gZnVuY3Rpb24gdHJhbnNmb3JtTWlzc2lvbkNvbmZpZyhjb25maWcpIHtcblxuICAgIGxldCB0cmFuc2Zvcm1lZENvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZylcblxuICAgIGlmIChjb25maWcubWV0aG9kID09PSAncG9zdCcgJiYgaXNPYmplY3QodHJhbnNmb3JtZWRDb25maWcuZGF0YSkpIHtcbiAgICAgICAgdHJhbnNmb3JtZWRDb25maWcuZGF0YSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh0cmFuc2Zvcm1lZENvbmZpZy5kYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhbnNmb3JtZWRDb25maWc7XG59XG5cbmNsYXNzIEFqYXhXb3JrZXJGYWN0b3J5IHtcblxuICAgIGRvKG1pc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIC8vIGF4aW9zU2NoZW1hOiBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvc1xuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybWVkQ29uZmlnID0gdHJhbnNmb3JtTWlzc2lvbkNvbmZpZyhtaXNzaW9uLmNvbmZpZyk7XG5cbiAgICAgICAgICAgIGF4aW9zLnJlcXVlc3QodHJhbnNmb3JtZWRDb25maWcpLnRoZW4oKHsgZGF0YSwgc3RhdHVzLCBzdGF0dXNUZXh0LCBoZWFkZXJzLCBjb25maWcsIHJlc3BvbnNlIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGEpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBcInJlc3BvbnNlIGlzIG5vdCBhIGluc3RhbmNlIG9mIEpTT04gXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwicmVzcG9uc2Ugb2YgJyVzJyBpcyBub3QgSlNPTiBcIiwgY29uZmlnLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VyRXJyb3IgPSBjcmVhdGVFcnJvcih7IG1lc3NhZ2U6IG1lc3NhZ2UsIHR5cGU6IEVSUk9SX1RZUEUuUEFSU0VSIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHBhcnNlckVycm9yKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gcmVzbG92ZSBcbiAgICAgICAgICAgICAgICAvLyBbIWltcG9ydGFudF0g5paw5aKe55qEIChkYXRhLmNvZGUpIOmAu+i+keWIpOaWreaYr+S4uuS6huWFvOWuueacjeWKoeerr2FwaSBlcnJvcui/lOWbnue7k+aehOS6ieiurlxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmVycm9yIHx8IGRhdGEuY29kZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAyLiBiaXpFcnJvclxuICAgICAgICAgICAgICAgICAgICBsZXQgaHR0cFN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgIGxldCByYXdFcnJvciA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEuZXJyb3IgfHwgZGF0YSwgeyBodHRwU3RhdHVzQ29kZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1c2luZXNzRXJyb3IgPSBjcmVhdGVFcnJvcihyYXdFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChidXNpbmVzc0Vycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGF4aW9zLmlzQ2FuY2VsKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhYm9ydCBlcnJvclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnUmVxdWVzdCBjYW5jZWxlZCcsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYWJvcnRFcnJvciA9IGNyZWF0ZUVycm9yKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSwgdHlwZTogRVJST1JfVFlQRS5BQk9SVCwgY29kZTogZXJyb3IuY29kZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGFib3J0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OQUJPUlRFRCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGltZW91dCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZW91dEVycm9yID0gY3JlYXRlRXJyb3IoeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCB0eXBlOiBFUlJPUl9UWVBFLlRJTUVPVVQsIGNvZGU6IGVycm9yLmNvZGUgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IucmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV0d29yayBlcnJvciBcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHJlcXVlc3Qgd2FzIG1hZGUsIGJ1dCB0aGUgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGEgc3RhdHVzIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCBmYWxscyBvdXQgb2YgdGhlIHJhbmdlIG9mIDJ4eFxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV0d29ya0Vycm9yO1xuICAgICAgICAgICAgICAgICAgICBsZXQgeyBzdGF0dXMsIHN0YXR1c1RleHQsIGhlYWRlcnMsIGNvbmZpZywgZGF0YSA9IHt9IH0gPSBlcnJvci5yZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHsgY29kZSwgbWVzc2FnZSB9ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlRGF0YUVycm9yID0gZGF0YS5lcnJvciB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBFUlJPUl9UWVBFLk5FVFdPUkssXG4gICAgICAgICAgICAgICAgICAgICAgICBodHRwU3RhdHVzQ29kZSA9IHN0YXR1cztcblxuICAgICAgICAgICAgICAgICAgICAvLyDlhbzlrrlkYXRhLmNvZGUg5ZKMIGRhdGEuZXJyb3Lov5nkuKTnp43moIflv5flvILluLjnmoTmlrnlvI/vvIwg5LyY5YWI6YCJ55SoY29kZVxuICAgICAgICAgICAgICAgICAgICBjb2RlID0gY29kZSB8fCByZXNwb25zZURhdGFFcnJvci5jb2RlO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCByZXNwb25zZURhdGFFcnJvci5tZXNzYWdlIHx8IHN0YXR1c1RleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Vycm9yID0gY3JlYXRlRXJyb3IoeyB0eXBlLCBodHRwU3RhdHVzQ29kZSwgY29kZSwgbWVzc2FnZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldHdvcmtFcnJvcik7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJ1bmtub3duIGF4aW9zIHJlcXVlc3QgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0RXJyb3IgPSBjcmVhdGVFcnJvcih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIHR5cGU6IEVSUk9SX1RZUEUuTkVUV09SSyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcXVlc3RFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBamF4V29ya2VyRmFjdG9yeTsiXX0=
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)))

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(161), __esModule: true };

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(46);
module.exports = __webpack_require__(56).f('iterator');


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(163), __esModule: true };

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(164);
__webpack_require__(34);
__webpack_require__(168);
__webpack_require__(169);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(12);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(66);
var META = __webpack_require__(52).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(44);
var setToStringTag = __webpack_require__(19);
var uid = __webpack_require__(27);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(56);
var wksDefine = __webpack_require__(57);
var keyOf = __webpack_require__(165);
var enumKeys = __webpack_require__(166);
var isArray = __webpack_require__(77);
var anObject = __webpack_require__(10);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(40);
var createDesc = __webpack_require__(25);
var _create = __webpack_require__(26);
var gOPNExt = __webpack_require__(167);
var $GOPD = __webpack_require__(82);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(17);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(81).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(30).f = $propertyIsEnumerable;
  __webpack_require__(53).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(24)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(17);
var toIObject = __webpack_require__(13);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(53);
var pIE = __webpack_require__(30);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13);
var gOPN = __webpack_require__(81).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57)('asyncIterator');


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57)('observable');


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(171);

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var bind = __webpack_require__(83);
var Axios = __webpack_require__(172);
var defaults = __webpack_require__(58);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(87);
axios.CancelToken = __webpack_require__(186);
axios.isCancel = __webpack_require__(86);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(187);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(58);
var utils = __webpack_require__(4);
var InterceptorManager = __webpack_require__(181);
var dispatchRequest = __webpack_require__(182);
var isAbsoluteURL = __webpack_require__(184);
var combineURLs = __webpack_require__(185);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(85);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response
    ));
  }
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var transformData = __webpack_require__(183);
var isCancel = __webpack_require__(86);
var defaults = __webpack_require__(58);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(87);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(189);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(193);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(194);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Super = __webpack_require__(202);

var _Super2 = _interopRequireDefault(_Super);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HttpMission = function (_Mission) {
    (0, _inherits3['default'])(HttpMission, _Mission);

    function HttpMission(config) {
        (0, _classCallCheck3['default'])(this, HttpMission);
        return (0, _possibleConstructorReturn3['default'])(this, (HttpMission.__proto__ || (0, _getPrototypeOf2['default'])(HttpMission)).call(this, 'http', config));
    }

    return HttpMission;
}(_Super2['default']);

exports['default'] = HttpMission;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXNzaW9ucy9IdHRwLmpzIl0sIm5hbWVzIjpbIkh0dHBNaXNzaW9uIiwiY29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVNQSxXOzs7QUFFRix5QkFBWUMsTUFBWixFQUFvQjtBQUFBO0FBQUEscUpBQ1YsTUFEVSxFQUNGQSxNQURFO0FBRW5COzs7OztxQkFHVUQsVyIsImZpbGUiOiJIdHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1pc3Npb24gZnJvbSAnLi9TdXBlcic7XG5cbmNsYXNzIEh0dHBNaXNzaW9uIGV4dGVuZHMgTWlzc2lvbiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoJ2h0dHAnLCBjb25maWcpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHR0cE1pc3Npb247XG4iXX0=

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(190), __esModule: true };

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(191);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(28);
var $getPrototypeOf = __webpack_require__(69);

__webpack_require__(192)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(195);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(199);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(55);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(196), __esModule: true };

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(197);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(198).set });


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(10);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(8)(Function.call, __webpack_require__(82).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(200), __esModule: true };

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(201);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(26) });


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(88);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Mission = function Mission(type, config) {
    (0, _classCallCheck3["default"])(this, Mission);

    this.type = type;
    this.config = config;
    //假设JSON.stringify序列化结果是稳定得
    this.signature = (0, _stringify2["default"])({ type: type, config: config });
    this.createTime = Date.now();
};

exports["default"] = Mission;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taXNzaW9ucy9TdXBlci5qcyJdLCJuYW1lcyI6WyJNaXNzaW9uIiwidHlwZSIsImNvbmZpZyIsInNpZ25hdHVyZSIsImNyZWF0ZVRpbWUiLCJEYXRlIiwibm93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLE8sR0FFRixpQkFBWUMsSUFBWixFQUFrQkMsTUFBbEIsRUFBMEI7QUFBQTs7QUFDdEIsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0E7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLDRCQUFlLEVBQUVGLE1BQU1BLElBQVIsRUFBY0MsUUFBUUEsTUFBdEIsRUFBZixDQUFqQjtBQUNBLFNBQUtFLFVBQUwsR0FBa0JDLEtBQUtDLEdBQUwsRUFBbEI7QUFDSCxDOztxQkFHVU4sTyIsImZpbGUiOiJTdXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE1pc3Npb24ge1xuXG4gICAgY29uc3RydWN0b3IodHlwZSwgY29uZmlnKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICAvL+WBh+iuvkpTT04uc3RyaW5naWZ55bqP5YiX5YyW57uT5p6c5piv56iz5a6a5b6XXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlID0gSlNPTi5zdHJpbmdpZnkoeyB0eXBlOiB0eXBlLCBjb25maWc6IGNvbmZpZyB9KTtcbiAgICAgICAgdGhpcy5jcmVhdGVUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1pc3Npb247XG4iXX0=

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(29);

var _assign2 = _interopRequireDefault(_assign);

var _map = __webpack_require__(51);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Deferred = __webpack_require__(54);

var _Deferred2 = _interopRequireDefault(_Deferred);

var _ComboPromise = __webpack_require__(80);

var _events = __webpack_require__(64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// 会不会溢出？
var serialNumber = 0;

function makeMissionKey(mission) {
    var missionKey = mission.config.comboRequestEnabled ? mission.signature : serialNumber++;
    return missionKey;
}

/*
 * @param {WorkerFactory|Function} 生成worker的工厂
 * @param {count|countber} 生成worker的数量 
 */

var MissionDispatcher = function () {
    function MissionDispatcher(WorkerFactory, count) {
        (0, _classCallCheck3['default'])(this, MissionDispatcher);
        this._context = {
            workers: [], // worker队列
            missionQueue: [], // 任务队列 
            // 持有相同defer的mission, 结构类似{missionDefer: mission} 
            missionDefers: new _map2['default'](),
            isRunning: false, // controller的运行状态 
            emitter: new _events.EventEmitter()
        };

        for (var i = 0; i < count; i++) {
            var worker = new WorkerFactory();
            worker.id = i;
            this._context.workers.push(worker);
        }

        this._context.emitter.on('mission:put', run.bind(this._context));
        this._context.emitter.on('worker:add', run.bind(this._context));
    }

    // 【!!!约定】 以下划线开头的是私有变量，请不要调用 


    (0, _createClass3['default'])(MissionDispatcher, [{
        key: 'put',
        value: function put(mission) {

            var missionKey = makeMissionKey(mission),
                missionDefer = (0, _ComboPromise.createComboDefer)(missionKey),
                missionInQueue = (0, _assign2['default'])({}, mission, { defer: missionDefer });

            if (this._context.missionDefers.has(missionDefer) === false) {
                this._context.missionDefers.set(missionDefer, missionInQueue);
                this._context.missionQueue.push(missionInQueue);
                this._context.emitter.emit('mission:put', run);
            }

            return missionDefer.promise;
        }
    }, {
        key: 'start',
        value: function start() {
            if (this._context.isRunning === false) {
                this._context.isRunning = true;
                run.bind(this._context)();
            } else {
                console.log(' MissionDispatcher is already Running ... ');
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._context.isRunning = false;
        }
    }]);
    return MissionDispatcher;
}();

function run() {

    var threadsCount = void 0,
        context = this;

    if (context.isRunning === false) {
        console.warn(' MissionDispatcher is stopped ... ');
        return;
    }

    if (context.missionQueue.length === 0) {
        console.log(' No Mission ...  ');
        return;
    }

    if (context.workers.length === 0) {
        console.log(' No Avaliable workers ...  ');
        return;
    }

    // realDo Mission ====
    threadsCount = Math.min(context.workers.length, context.missionQueue.length);

    while (threadsCount > 0) {
        // 从map里出第一个
        dispatch(context.workers.shift(), context.missionQueue.shift()); // FIFO
        threadsCount--;
    }

    // 给worker分配任务, 合并请求
    function dispatch(worker, mission) {

        //console.log("%cSTART: workerId: %s, missionSignature: %s", "color:green", worker.id, mission.signature);

        var finishHandler = function finishHandler() {
            // 归还worker
            context.workers.push(worker);
            context.emitter.emit("worker:add");
            // 删除 执行过的 missionDefer
            context.missionDefers['delete'](mission.defer);
        };

        worker['do'](mission).then(function (data) {
            mission.defer.resolve(data);
            // console.log("%cResolve: m %s, w %s ", "color:blue", mission, worker.id);
            finishHandler();
        }, function (reason) {
            mission.defer.reject(reason);
            // console.log("%cReject: m %s, w %s ", "color:red", mission, worker.id);
            finishHandler();
        });
    }
}

exports['default'] = MissionDispatcher;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NaXNzaW9uRGlzcGF0Y2hlci5qcyJdLCJuYW1lcyI6WyJzZXJpYWxOdW1iZXIiLCJtYWtlTWlzc2lvbktleSIsIm1pc3Npb24iLCJtaXNzaW9uS2V5IiwiY29uZmlnIiwiY29tYm9SZXF1ZXN0RW5hYmxlZCIsInNpZ25hdHVyZSIsIk1pc3Npb25EaXNwYXRjaGVyIiwiV29ya2VyRmFjdG9yeSIsImNvdW50IiwiX2NvbnRleHQiLCJ3b3JrZXJzIiwibWlzc2lvblF1ZXVlIiwibWlzc2lvbkRlZmVycyIsImlzUnVubmluZyIsImVtaXR0ZXIiLCJpIiwid29ya2VyIiwiaWQiLCJwdXNoIiwib24iLCJydW4iLCJiaW5kIiwibWlzc2lvbkRlZmVyIiwibWlzc2lvbkluUXVldWUiLCJkZWZlciIsImhhcyIsInNldCIsImVtaXQiLCJwcm9taXNlIiwiY29uc29sZSIsImxvZyIsInRocmVhZHNDb3VudCIsImNvbnRleHQiLCJ3YXJuIiwibGVuZ3RoIiwiTWF0aCIsIm1pbiIsImRpc3BhdGNoIiwic2hpZnQiLCJmaW5pc2hIYW5kbGVyIiwidGhlbiIsImRhdGEiLCJyZXNvbHZlIiwicmVhc29uIiwicmVqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUVBO0FBQ0EsSUFBSUEsZUFBZSxDQUFuQjs7QUFFQSxTQUFTQyxjQUFULENBQXdCQyxPQUF4QixFQUFpQztBQUM3QixRQUFJQyxhQUFhRCxRQUFRRSxNQUFSLENBQWVDLG1CQUFmLEdBQXFDSCxRQUFRSSxTQUE3QyxHQUF5RE4sY0FBMUU7QUFDQSxXQUFPRyxVQUFQO0FBQ0g7O0FBRUQ7Ozs7O0lBSU1JLGlCO0FBWUYsK0JBQVlDLGFBQVosRUFBMkJDLEtBQTNCLEVBQWtDO0FBQUE7QUFBQSxhQVRsQ0MsUUFTa0MsR0FUdkI7QUFDUEMscUJBQVMsRUFERixFQUNNO0FBQ2JDLDBCQUFjLEVBRlAsRUFFVztBQUNsQjtBQUNBQywyQkFBZSxz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QUFFQSxZQUFJc0MsZ0JBQWdCLFNBQWhCQSxhQUFnQixHQUFXO0FBQzNCO0FBQ0FQLG9CQUFRdEIsT0FBUixDQUFnQlEsSUFBaEIsQ0FBcUJGLE1BQXJCO0FBQ0FnQixvQkFBUWxCLE9BQVIsQ0FBZ0JhLElBQWhCLENBQXFCLFlBQXJCO0FBQ0E7QUFDQUssb0JBQVFwQixhQUFSLFdBQTZCWCxRQUFRdUIsS0FBckM7QUFDSCxTQU5EOztBQVFBUixxQkFBVWYsT0FBVixFQUNLdUMsSUFETCxDQUNVLFVBQVNDLElBQVQsRUFBZTtBQUNqQnhDLG9CQUFRdUIsS0FBUixDQUFja0IsT0FBZCxDQUFzQkQsSUFBdEI7QUFDQTtBQUNBRjtBQUNILFNBTEwsRUFLTyxVQUFTSSxNQUFULEVBQWlCO0FBQ2hCMUMsb0JBQVF1QixLQUFSLENBQWNvQixNQUFkLENBQXFCRCxNQUFyQjtBQUNBO0FBQ0FKO0FBQ0gsU0FUTDtBQVdIO0FBRUo7O3FCQUVjakMsaUIiLCJmaWxlIjoiTWlzc2lvbkRpc3BhdGNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVmZXJyZWQgZnJvbSAnLi91dGlscy9EZWZlcnJlZCc7XG5pbXBvcnQgeyBjcmVhdGVDb21ib0RlZmVyIH0gZnJvbSAnLi91dGlscy9Db21ib1Byb21pc2UnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcblxuLy8g5Lya5LiN5Lya5rqi5Ye677yfXG5sZXQgc2VyaWFsTnVtYmVyID0gMDtcblxuZnVuY3Rpb24gbWFrZU1pc3Npb25LZXkobWlzc2lvbikge1xuICAgIGxldCBtaXNzaW9uS2V5ID0gbWlzc2lvbi5jb25maWcuY29tYm9SZXF1ZXN0RW5hYmxlZCA/IG1pc3Npb24uc2lnbmF0dXJlIDogc2VyaWFsTnVtYmVyKys7XG4gICAgcmV0dXJuIG1pc3Npb25LZXk7XG59XG5cbi8qXG4gKiBAcGFyYW0ge1dvcmtlckZhY3Rvcnl8RnVuY3Rpb259IOeUn+aIkHdvcmtlcueahOW3peWOglxuICogQHBhcmFtIHtjb3VudHxjb3VudGJlcn0g55Sf5oiQd29ya2Vy55qE5pWw6YePIFxuICovXG5jbGFzcyBNaXNzaW9uRGlzcGF0Y2hlciB7XG5cbiAgICAvLyDjgJAhISHnuqblrprjgJEg5Lul5LiL5YiS57q/5byA5aS055qE5piv56eB5pyJ5Y+Y6YeP77yM6K+35LiN6KaB6LCD55SoIFxuICAgIF9jb250ZXh0ID0ge1xuICAgICAgICB3b3JrZXJzOiBbXSwgLy8gd29ya2Vy6Zif5YiXXG4gICAgICAgIG1pc3Npb25RdWV1ZTogW10sIC8vIOS7u+WKoemYn+WIlyBcbiAgICAgICAgLy8g5oyB5pyJ55u45ZCMZGVmZXLnmoRtaXNzaW9uLCDnu5PmnoTnsbvkvLx7bWlzc2lvbkRlZmVyOiBtaXNzaW9ufSBcbiAgICAgICAgbWlzc2lvbkRlZmVyczogbmV3IE1hcCgpLFxuICAgICAgICBpc1J1bm5pbmc6IGZhbHNlLCAvLyBjb250cm9sbGVy55qE6L+Q6KGM54q25oCBIFxuICAgICAgICBlbWl0dGVyOiBuZXcgRXZlbnRFbWl0dGVyKClcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoV29ya2VyRmFjdG9yeSwgY291bnQpIHvCoFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3b3JrZXIgPSBuZXcgV29ya2VyRmFjdG9yeSgpO1xuICAgICAgICAgICAgd29ya2VyLmlkID0gaTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQud29ya2Vycy5wdXNoKHdvcmtlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb250ZXh0LmVtaXR0ZXIub24oJ21pc3Npb246cHV0JywgcnVuLmJpbmQodGhpcy5fY29udGV4dCkpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LmVtaXR0ZXIub24oJ3dvcmtlcjphZGQnLCBydW4uYmluZCh0aGlzLl9jb250ZXh0KSk7XG5cbiAgICB9XG5cbiAgICBwdXQobWlzc2lvbikge1xuXG4gICAgICAgIGxldCBtaXNzaW9uS2V5ID0gbWFrZU1pc3Npb25LZXkobWlzc2lvbiksXG4gICAgICAgICAgICBtaXNzaW9uRGVmZXIgPSBjcmVhdGVDb21ib0RlZmVyKG1pc3Npb25LZXkpLFxuICAgICAgICAgICAgbWlzc2lvbkluUXVldWUgPSBPYmplY3QuYXNzaWduKHt9LCBtaXNzaW9uLCB7IGRlZmVyOiBtaXNzaW9uRGVmZXIgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NvbnRleHQubWlzc2lvbkRlZmVycy5oYXMobWlzc2lvbkRlZmVyKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQubWlzc2lvbkRlZmVycy5zZXQobWlzc2lvbkRlZmVyLCBtaXNzaW9uSW5RdWV1ZSk7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0Lm1pc3Npb25RdWV1ZS5wdXNoKG1pc3Npb25JblF1ZXVlKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZW1pdHRlci5lbWl0KCdtaXNzaW9uOnB1dCcsIHJ1bik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWlzc2lvbkRlZmVyLnByb21pc2U7XG5cbiAgICB9O1xuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb250ZXh0LmlzUnVubmluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuaXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJ1bi5iaW5kKHRoaXMuX2NvbnRleHQpKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIE1pc3Npb25EaXNwYXRjaGVyIGlzIGFscmVhZHkgUnVubmluZyAuLi4gJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gcnVuKCkge1xuXG4gICAgbGV0IHRocmVhZHNDb3VudCxcbiAgICAgICAgY29udGV4dCA9IHRoaXM7XG5cbiAgICBpZiAoY29udGV4dC5pc1J1bm5pbmcgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignIE1pc3Npb25EaXNwYXRjaGVyIGlzIHN0b3BwZWQgLi4uICcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQubWlzc2lvblF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnIE5vIE1pc3Npb24gLi4uICAnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0LndvcmtlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgTm8gQXZhbGlhYmxlIHdvcmtlcnMgLi4uICAnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHJlYWxEbyBNaXNzaW9uID09PT1cbiAgICB0aHJlYWRzQ291bnQgPSBNYXRoLm1pbihjb250ZXh0LndvcmtlcnMubGVuZ3RoLCBjb250ZXh0Lm1pc3Npb25RdWV1ZS5sZW5ndGgpO1xuXG4gICAgd2hpbGUgKHRocmVhZHNDb3VudCA+IDApIHtcbiAgICAgICAgLy8g5LuObWFw6YeM5Ye656ys5LiA5LiqXG4gICAgICAgIGRpc3BhdGNoKGNvbnRleHQud29ya2Vycy5zaGlmdCgpLCBjb250ZXh0Lm1pc3Npb25RdWV1ZS5zaGlmdCgpKTsgLy8gRklGT1xuICAgICAgICB0aHJlYWRzQ291bnQtLTtcbiAgICB9XG5cbiAgICAvLyDnu5l3b3JrZXLliIbphY3ku7vliqEsIOWQiOW5tuivt+axglxuICAgIGZ1bmN0aW9uIGRpc3BhdGNoKHdvcmtlciwgbWlzc2lvbikge1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCIlY1NUQVJUOiB3b3JrZXJJZDogJXMsIG1pc3Npb25TaWduYXR1cmU6ICVzXCIsIFwiY29sb3I6Z3JlZW5cIiwgd29ya2VyLmlkLCBtaXNzaW9uLnNpZ25hdHVyZSk7XG5cbiAgICAgICAgdmFyIGZpbmlzaEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIOW9kui/mHdvcmtlclxuICAgICAgICAgICAgY29udGV4dC53b3JrZXJzLnB1c2god29ya2VyKTtcbiAgICAgICAgICAgIGNvbnRleHQuZW1pdHRlci5lbWl0KFwid29ya2VyOmFkZFwiKTtcbiAgICAgICAgICAgIC8vIOWIoOmZpCDmiafooYzov4fnmoQgbWlzc2lvbkRlZmVyXG4gICAgICAgICAgICBjb250ZXh0Lm1pc3Npb25EZWZlcnMuZGVsZXRlKG1pc3Npb24uZGVmZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgd29ya2VyLmRvKG1pc3Npb24pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgbWlzc2lvbi5kZWZlci5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiJWNSZXNvbHZlOiBtICVzLCB3ICVzIFwiLCBcImNvbG9yOmJsdWVcIiwgbWlzc2lvbiwgd29ya2VyLmlkKTtcbiAgICAgICAgICAgICAgICBmaW5pc2hIYW5kbGVyKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBtaXNzaW9uLmRlZmVyLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiJWNSZWplY3Q6IG0gJXMsIHcgJXMgXCIsIFwiY29sb3I6cmVkXCIsIG1pc3Npb24sIHdvcmtlci5pZCk7XG4gICAgICAgICAgICAgICAgZmluaXNoSGFuZGxlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWlzc2lvbkRpc3BhdGNoZXI7XG4iXX0=

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Storage = __webpack_require__(206);

var _Storage2 = _interopRequireDefault(_Storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ins = {};

var CacheData = function () {
    function CacheData(ns) {
        var signature = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var isMemory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        (0, _classCallCheck3['default'])(this, CacheData);


        var id = ns + "_" + signature;
        // Singleton Pattern
        if (!(_ins[id] instanceof CacheData)) {
            _ins[id] = this;
        } else {
            return _ins[id];
        }

        this.id = id;
        this.signature = signature;
        //CacheData中只采取持久存储方案
        this.storage = new _Storage2['default'](ns, isMemory);
    }

    (0, _createClass3['default'])(CacheData, [{
        key: 'clear',
        value: function clear() {
            this.storage.clear();
        }
    }, {
        key: 'item',
        value: function item(key, opts) {
            opts = opts || {};
            return new CacheDataItem(this.storage, this.signature, key, opts);
        }
    }]);
    return CacheData;
}();

var CacheDataItem = function () {
    function CacheDataItem(storage, signature, key, opts) {
        (0, _classCallCheck3['default'])(this, CacheDataItem);


        // eg: url+参数序列化
        this.key = key;
        // 就是具体的存储方案， 调用它来clear, get , set
        this.storage = storage;
        // eg, v2.0
        this.signature = signature;

        this.maxAge = opts.maxAge || opts.maxage || null;

        this.ignoreExpires = opts.ignoreExpires;

        this.dataFormatter = {
            getter: null,
            setter: null
        };
    }

    (0, _createClass3['default'])(CacheDataItem, [{
        key: 'setFormatter',
        value: function setFormatter(setter, getter) {
            this.dataFormatter = {
                setter: setter || null,
                getter: getter || null
            };
        }
    }, {
        key: 'set',
        value: function set(data) {
            if (this.dataFormatter && this.dataFormatter.setter) {
                data = this.dataFormatter.setter(data);
            }
            var value = {
                data: data,
                time: new Date().getTime(),
                signature: this.signature
            };
            if (this.maxAge) {
                value.expires = new Date().getTime() + this.maxAge;
            }
            if (value.data) {
                this.storage.set(this.key, value);
            }
        }
    }, {
        key: 'get',
        value: function get() {
            var data = this.storage.get(this.key);
            if (data && data.signature === this.signature && (this.ignoreExpires || !data.expires || new Date().getTime() < data.expires)) {
                data = data.data;

                if (this.dataFormatter && this.dataFormatter.getter) {
                    data = this.dataFormatter.getter(data);
                }
                return data;
            }
            return null;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.storage.remove(this.key);
        }
    }, {
        key: 'isExpired',
        value: function isExpired() {
            var data = this.storage.get(this.key);
            return !!data && !!data.expires && new Date().getTime() >= data.expires;
        }
    }, {
        key: 'getUpdatedTime',
        value: function getUpdatedTime() {
            var data = this.storage.get(this.key);
            return data && data.time - 0;
        }
    }, {
        key: 'getExpires',
        value: function getExpires() {
            var data = this.storage.get(this.key);
            return data && data.expires;
        }
    }]);
    return CacheDataItem;
}();

exports['default'] = CacheData;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DYWNoZURhdGEuanMiXSwibmFtZXMiOlsiX2lucyIsIkNhY2hlRGF0YSIsIm5zIiwic2lnbmF0dXJlIiwiaXNNZW1vcnkiLCJpZCIsInN0b3JhZ2UiLCJjbGVhciIsImtleSIsIm9wdHMiLCJDYWNoZURhdGFJdGVtIiwibWF4QWdlIiwibWF4YWdlIiwiaWdub3JlRXhwaXJlcyIsImRhdGFGb3JtYXR0ZXIiLCJnZXR0ZXIiLCJzZXR0ZXIiLCJkYXRhIiwidmFsdWUiLCJ0aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJleHBpcmVzIiwic2V0IiwiZ2V0IiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFJQSxPQUFPLEVBQVg7O0lBR01DLFM7QUFFRix1QkFBWUMsRUFBWixFQUFrRDtBQUFBLFlBQWxDQyxTQUFrQyx1RUFBdEIsRUFBc0I7QUFBQSxZQUFsQkMsUUFBa0IsdUVBQVAsS0FBTztBQUFBOzs7QUFFOUMsWUFBSUMsS0FBS0gsS0FBSyxHQUFMLEdBQVdDLFNBQXBCO0FBQ0E7QUFDQSxZQUFJLEVBQUVILEtBQUtLLEVBQUwsYUFBb0JKLFNBQXRCLENBQUosRUFBc0M7QUFDbENELGlCQUFLSyxFQUFMLElBQVcsSUFBWDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPTCxLQUFLSyxFQUFMLENBQVA7QUFDSDs7QUFFRCxhQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxhQUFLRixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBO0FBQ0EsYUFBS0csT0FBTCxHQUFlLHlCQUFZSixFQUFaLEVBQWdCRSxRQUFoQixDQUFmO0FBQ0g7Ozs7Z0NBRU87QUFDSixpQkFBS0UsT0FBTCxDQUFhQyxLQUFiO0FBQ0g7Ozs2QkFFSUMsRyxFQUFLQyxJLEVBQU07QUFDWkEsbUJBQU9BLFFBQVEsRUFBZjtBQUNBLG1CQUFPLElBQUlDLGFBQUosQ0FBa0IsS0FBS0osT0FBdkIsRUFBZ0MsS0FBS0gsU0FBckMsRUFBZ0RLLEdBQWhELEVBQXFEQyxJQUFyRCxDQUFQO0FBQ0g7Ozs7O0lBSUNDLGE7QUFFRiwyQkFBWUosT0FBWixFQUFxQkgsU0FBckIsRUFBZ0NLLEdBQWhDLEVBQXFDQyxJQUFyQyxFQUEyQztBQUFBOzs7QUFFdkM7QUFDQSxhQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDQTtBQUNBLGFBQUtGLE9BQUwsR0FBZUEsT0FBZjtBQUNBO0FBQ0EsYUFBS0gsU0FBTCxHQUFpQkEsU0FBakI7O0FBRUEsYUFBS1EsTUFBTCxHQUFjRixLQUFLRSxNQUFMLElBQWVGLEtBQUtHLE1BQXBCLElBQThCLElBQTVDOztBQUVBLGFBQUtDLGFBQUwsR0FBcUJKLEtBQUtJLGFBQTFCOztBQUVBLGFBQUtDLGFBQUwsR0FBcUI7QUFDakJDLG9CQUFRLElBRFM7QUFFakJDLG9CQUFRO0FBRlMsU0FBckI7QUFLSDs7OztxQ0FFWUEsTSxFQUFRRCxNLEVBQVE7QUFDekIsaUJBQUtELGFBQUwsR0FBcUI7QUFDakJFLHdCQUFRQSxVQUFVLElBREQ7QUFFakJELHdCQUFRQSxVQUFVO0FBRkQsYUFBckI7QUFJSDs7OzRCQUVHRSxJLEVBQU07QUFDTixnQkFBSSxLQUFLSCxhQUFMLElBQXNCLEtBQUtBLGFBQUwsQ0FBbUJFLE1BQTdDLEVBQXFEO0FBQ2pEQyx1QkFBTyxLQUFLSCxhQUFMLENBQW1CRSxNQUFuQixDQUEwQkMsSUFBMUIsQ0FBUDtBQUNIO0FBQ0QsZ0JBQUlDLFFBQVE7QUFDUkQsc0JBQU1BLElBREU7QUFFUkUsc0JBQU8sSUFBSUMsSUFBSixFQUFELENBQWFDLE9BQWIsRUFGRTtBQUdSbEIsMkJBQVcsS0FBS0E7QUFIUixhQUFaO0FBS0EsZ0JBQUksS0FBS1EsTUFBVCxFQUFpQjtBQUNiTyxzQkFBTUksT0FBTixHQUFpQixJQUFJRixJQUFKLEVBQUQsQ0FBYUMsT0FBYixLQUF5QixLQUFLVixNQUE5QztBQUNIO0FBQ0QsZ0JBQUlPLE1BQU1ELElBQVYsRUFBZ0I7QUFDWixxQkFBS1gsT0FBTCxDQUFhaUIsR0FBYixDQUFpQixLQUFLZixHQUF0QixFQUEyQlUsS0FBM0I7QUFDSDtBQUNKOzs7OEJBRUs7QUFDRixnQkFBSUQsT0FBTyxLQUFLWCxPQUFMLENBQWFrQixHQUFiLENBQWlCLEtBQUtoQixHQUF0QixDQUFYO0FBQ0EsZ0JBQUlTLFFBQVFBLEtBQUtkLFNBQUwsS0FBbUIsS0FBS0EsU0FBaEMsS0FBOEMsS0FBS1UsYUFBTCxJQUFzQixDQUFDSSxLQUFLSyxPQUE1QixJQUF3QyxJQUFJRixJQUFKLEVBQUQsQ0FBYUMsT0FBYixLQUF5QkosS0FBS0ssT0FBbkgsQ0FBSixFQUFpSTtBQUM3SEwsdUJBQU9BLEtBQUtBLElBQVo7O0FBRUEsb0JBQUksS0FBS0gsYUFBTCxJQUFzQixLQUFLQSxhQUFMLENBQW1CQyxNQUE3QyxFQUFxRDtBQUNqREUsMkJBQU8sS0FBS0gsYUFBTCxDQUFtQkMsTUFBbkIsQ0FBMEJFLElBQTFCLENBQVA7QUFDSDtBQUNELHVCQUFPQSxJQUFQO0FBQ0g7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FFUTtBQUNMLGlCQUFLWCxPQUFMLENBQWFtQixNQUFiLENBQW9CLEtBQUtqQixHQUF6QjtBQUNIOzs7b0NBRVc7QUFDUixnQkFBSVMsT0FBTyxLQUFLWCxPQUFMLENBQWFrQixHQUFiLENBQWlCLEtBQUtoQixHQUF0QixDQUFYO0FBQ0EsbUJBQU8sQ0FBQyxDQUFDUyxJQUFGLElBQVUsQ0FBQyxDQUFDQSxLQUFLSyxPQUFqQixJQUE2QixJQUFJRixJQUFKLEVBQUQsQ0FBYUMsT0FBYixNQUEwQkosS0FBS0ssT0FBbEU7QUFDSDs7O3lDQUVnQjtBQUNiLGdCQUFJTCxPQUFPLEtBQUtYLE9BQUwsQ0FBYWtCLEdBQWIsQ0FBaUIsS0FBS2hCLEdBQXRCLENBQVg7QUFDQSxtQkFBT1MsUUFBU0EsS0FBS0UsSUFBTCxHQUFZLENBQTVCO0FBQ0g7OztxQ0FFWTtBQUNULGdCQUFJRixPQUFPLEtBQUtYLE9BQUwsQ0FBYWtCLEdBQWIsQ0FBaUIsS0FBS2hCLEdBQXRCLENBQVg7QUFDQSxtQkFBT1MsUUFBUUEsS0FBS0ssT0FBcEI7QUFDSDs7Ozs7cUJBSVVyQixTIiwiZmlsZSI6IkNhY2hlRGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yYWdlIGZyb20gICcuL3N0b3JhZ2UvU3RvcmFnZScgO1xudmFyIF9pbnMgPSB7fTtcblxuXG5jbGFzcyBDYWNoZURhdGEge1xuXG4gICAgY29uc3RydWN0b3IobnMsIHNpZ25hdHVyZSA9ICcnLCBpc01lbW9yeSA9IGZhbHNlKSB7XG5cbiAgICAgICAgbGV0IGlkID0gbnMgKyBcIl9cIiArIHNpZ25hdHVyZTtcbiAgICAgICAgLy8gU2luZ2xldG9uIFBhdHRlcm5cbiAgICAgICAgaWYgKCEoX2luc1tpZF0gaW5zdGFuY2VvZiBDYWNoZURhdGEpKSB7XG4gICAgICAgICAgICBfaW5zW2lkXSA9IHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX2luc1tpZF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuc2lnbmF0dXJlID0gc2lnbmF0dXJlO1xuICAgICAgICAvL0NhY2hlRGF0YeS4reWPqumHh+WPluaMgeS5heWtmOWCqOaWueahiFxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZShucywgaXNNZW1vcnkpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9O1xuXG4gICAgaXRlbShrZXksIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIHJldHVybiBuZXcgQ2FjaGVEYXRhSXRlbSh0aGlzLnN0b3JhZ2UsIHRoaXMuc2lnbmF0dXJlLCBrZXksIG9wdHMpO1xuICAgIH07XG5cbn1cblxuY2xhc3MgQ2FjaGVEYXRhSXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBzaWduYXR1cmUsIGtleSwgb3B0cykge1xuXG4gICAgICAgIC8vIGVnOiB1cmwr5Y+C5pWw5bqP5YiX5YyWXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICAvLyDlsLHmmK/lhbfkvZPnmoTlrZjlgqjmlrnmoYjvvIwg6LCD55So5a6D5p2lY2xlYXIsIGdldCAsIHNldFxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgICAgICAvLyBlZywgdjIuMFxuICAgICAgICB0aGlzLnNpZ25hdHVyZSA9IHNpZ25hdHVyZTtcblxuICAgICAgICB0aGlzLm1heEFnZSA9IG9wdHMubWF4QWdlIHx8IG9wdHMubWF4YWdlIHx8IG51bGw7XG5cbiAgICAgICAgdGhpcy5pZ25vcmVFeHBpcmVzID0gb3B0cy5pZ25vcmVFeHBpcmVzO1xuXG4gICAgICAgIHRoaXMuZGF0YUZvcm1hdHRlciA9IHtcbiAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgIHNldHRlcjogbnVsbFxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRGb3JtYXR0ZXIoc2V0dGVyLCBnZXR0ZXIpIHtcbiAgICAgICAgdGhpcy5kYXRhRm9ybWF0dGVyID0ge1xuICAgICAgICAgICAgc2V0dGVyOiBzZXR0ZXIgfHwgbnVsbCxcbiAgICAgICAgICAgIGdldHRlcjogZ2V0dGVyIHx8IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFGb3JtYXR0ZXIgJiYgdGhpcy5kYXRhRm9ybWF0dGVyLnNldHRlcikge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YUZvcm1hdHRlci5zZXR0ZXIoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbHVlID0ge1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHRpbWU6IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBzaWduYXR1cmU6IHRoaXMuc2lnbmF0dXJlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWF4QWdlKSB7XG4gICAgICAgICAgICB2YWx1ZS5leHBpcmVzID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSArIHRoaXMubWF4QWdlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMua2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQoKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdG9yYWdlLmdldCh0aGlzLmtleSk7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuc2lnbmF0dXJlID09PSB0aGlzLnNpZ25hdHVyZSAmJiAodGhpcy5pZ25vcmVFeHBpcmVzIHx8ICFkYXRhLmV4cGlyZXMgfHwgKG5ldyBEYXRlKCkpLmdldFRpbWUoKSA8IGRhdGEuZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmRhdGE7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFGb3JtYXR0ZXIgJiYgdGhpcy5kYXRhRm9ybWF0dGVyLmdldHRlcikge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGFGb3JtYXR0ZXIuZ2V0dGVyKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMua2V5KTtcbiAgICB9XG5cbiAgICBpc0V4cGlyZWQoKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdG9yYWdlLmdldCh0aGlzLmtleSk7XG4gICAgICAgIHJldHVybiAhIWRhdGEgJiYgISFkYXRhLmV4cGlyZXMgJiYgKG5ldyBEYXRlKCkpLmdldFRpbWUoKSA+PSBkYXRhLmV4cGlyZXM7XG4gICAgfVxuXG4gICAgZ2V0VXBkYXRlZFRpbWUoKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5zdG9yYWdlLmdldCh0aGlzLmtleSk7XG4gICAgICAgIHJldHVybiBkYXRhICYmIChkYXRhLnRpbWUgLSAwKTtcbiAgICB9XG5cbiAgICBnZXRFeHBpcmVzKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuc3RvcmFnZS5nZXQodGhpcy5rZXkpO1xuICAgICAgICByZXR1cm4gZGF0YSAmJiBkYXRhLmV4cGlyZXM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhY2hlRGF0YTtcbiJdfQ==

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(88);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Solution = __webpack_require__(207);

var _Solution2 = _interopRequireDefault(_Solution);

var _const = __webpack_require__(31);

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * [Storage description]
 * @param {[string]}  id       [惟一标识]
 * @param {Boolean} isMemory [是否使用内存级存储，默认为flase 即持久存储]
 */
var _ins = {};
var prefix = _const2['default'].NAMESPACE;

var Storage = function () {
    function Storage(id) {
        var isMemory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        (0, _classCallCheck3['default'])(this, Storage);

        // Singleton pattern
        if (!(_ins[id] instanceof Storage)) {
            _ins[id] = this;
        } else {
            return _ins[id];
        }

        this.id = id;
        this.ns = prefix + "_" + id + "_";

        this._methods = isMemory ? _Solution2['default'].memory.methods : function () {
            if (_Solution2['default'].localStorage.test()) {
                return _Solution2['default'].localStorage.methods;
            }
            if (_Solution2['default'].userData.test()) {
                return _Solution2['default'].userData.methods;
            }
            return {
                init: function init() {},
                get: function get() {},
                set: function set() {},
                remove: function remove() {},
                clear: function clear() {}
            };
        }();

        if (this._methods) {
            this._methods.init(this.ns);
        }
    }

    (0, _createClass3['default'])(Storage, [{
        key: 'encode',
        value: function encode(data) {
            return window.JSON ? (0, _stringify2['default'])(data) : data;
        }
    }, {
        key: 'decode',
        value: function decode(data) {
            return window.JSON ? JSON.parse(data) : data;
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            try {
                this._methods.set(this.ns, key, this.encode(value));
                return true;
            } catch (e) {
                return false;
            }
        }
    }, {
        key: 'get',
        value: function get(key) {
            try {
                return this.decode(this._methods.get(this.ns, key));
            } catch (e) {}
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            try {
                this._methods.remove(this.ns, key);
            } catch (e) {}
        }
    }, {
        key: 'clear',
        value: function clear() {
            try {
                this._methods.clear(this.ns);
            } catch (e) {}
        }
    }]);
    return Storage;
}();

exports['default'] = Storage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yYWdlL1N0b3JhZ2UuanMiXSwibmFtZXMiOlsiX2lucyIsInByZWZpeCIsIk5BTUVTUEFDRSIsIlN0b3JhZ2UiLCJpZCIsImlzTWVtb3J5IiwibnMiLCJfbWV0aG9kcyIsIm1lbW9yeSIsIm1ldGhvZHMiLCJsb2NhbFN0b3JhZ2UiLCJ0ZXN0IiwidXNlckRhdGEiLCJpbml0IiwiZ2V0Iiwic2V0IiwicmVtb3ZlIiwiY2xlYXIiLCJkYXRhIiwid2luZG93IiwiSlNPTiIsInBhcnNlIiwia2V5IiwidmFsdWUiLCJlbmNvZGUiLCJlIiwiZGVjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFHQTs7Ozs7QUFLQSxJQUFJQSxPQUFPLEVBQVg7QUFDQSxJQUFJQyxTQUFTLG1CQUFNQyxTQUFuQjs7SUFFTUMsTztBQUVGLHFCQUFZQyxFQUFaLEVBQWtDO0FBQUEsWUFBbEJDLFFBQWtCLHVFQUFQLEtBQU87QUFBQTs7QUFDOUI7QUFDQSxZQUFJLEVBQUVMLEtBQUtJLEVBQUwsYUFBb0JELE9BQXRCLENBQUosRUFBb0M7QUFDaENILGlCQUFLSSxFQUFMLElBQVcsSUFBWDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPSixLQUFLSSxFQUFMLENBQVA7QUFDSDs7QUFFRCxhQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxhQUFLRSxFQUFMLEdBQVVMLFNBQVMsR0FBVCxHQUFlRyxFQUFmLEdBQW9CLEdBQTlCOztBQUVBLGFBQUtHLFFBQUwsR0FBZ0JGLFdBQVcsc0JBQVNHLE1BQVQsQ0FBZ0JDLE9BQTNCLEdBQXNDLFlBQVc7QUFDN0QsZ0JBQUksc0JBQVNDLFlBQVQsQ0FBc0JDLElBQXRCLEVBQUosRUFBa0M7QUFDOUIsdUJBQU8sc0JBQVNELFlBQVQsQ0FBc0JELE9BQTdCO0FBQ0g7QUFDRCxnQkFBSSxzQkFBU0csUUFBVCxDQUFrQkQsSUFBbEIsRUFBSixFQUE4QjtBQUMxQix1QkFBTyxzQkFBU0MsUUFBVCxDQUFrQkgsT0FBekI7QUFDSDtBQUNELG1CQUFPO0FBQ0hJLHNCQUFNLGdCQUFXLENBQUUsQ0FEaEI7QUFFSEMscUJBQUssZUFBVyxDQUFFLENBRmY7QUFHSEMscUJBQUssZUFBVyxDQUFFLENBSGY7QUFJSEMsd0JBQVEsa0JBQVcsQ0FBRSxDQUpsQjtBQUtIQyx1QkFBTyxpQkFBVyxDQUFFO0FBTGpCLGFBQVA7QUFPSCxTQWRvRCxFQUFyRDs7QUFnQkEsWUFBSSxLQUFLVixRQUFULEVBQW1CO0FBQ2YsaUJBQUtBLFFBQUwsQ0FBY00sSUFBZCxDQUFtQixLQUFLUCxFQUF4QjtBQUNIO0FBRUo7Ozs7K0JBRU1ZLEksRUFBTTtBQUNULG1CQUFPQyxPQUFPQyxJQUFQLEdBQWMsNEJBQWVGLElBQWYsQ0FBZCxHQUFxQ0EsSUFBNUM7QUFDSDs7OytCQUVNQSxJLEVBQU07QUFDVCxtQkFBT0MsT0FBT0MsSUFBUCxHQUFjQSxLQUFLQyxLQUFMLENBQVdILElBQVgsQ0FBZCxHQUFpQ0EsSUFBeEM7QUFDSDs7OzRCQUVHSSxHLEVBQUtDLEssRUFBTztBQUNaLGdCQUFJO0FBQ0EscUJBQUtoQixRQUFMLENBQWNRLEdBQWQsQ0FBa0IsS0FBS1QsRUFBdkIsRUFBMkJnQixHQUEzQixFQUFnQyxLQUFLRSxNQUFMLENBQVlELEtBQVosQ0FBaEM7QUFDQSx1QkFBTyxJQUFQO0FBQ0gsYUFIRCxDQUdFLE9BQU9FLENBQVAsRUFBVTtBQUNSLHVCQUFPLEtBQVA7QUFDSDtBQUNKOzs7NEJBRUdILEcsRUFBSztBQUNMLGdCQUFJO0FBQ0EsdUJBQU8sS0FBS0ksTUFBTCxDQUFZLEtBQUtuQixRQUFMLENBQWNPLEdBQWQsQ0FBa0IsS0FBS1IsRUFBdkIsRUFBMkJnQixHQUEzQixDQUFaLENBQVA7QUFDSCxhQUZELENBRUUsT0FBT0csQ0FBUCxFQUFVLENBQUU7QUFDakI7OzsrQkFFTUgsRyxFQUFLO0FBQ1IsZ0JBQUk7QUFDQSxxQkFBS2YsUUFBTCxDQUFjUyxNQUFkLENBQXFCLEtBQUtWLEVBQTFCLEVBQThCZ0IsR0FBOUI7QUFDSCxhQUZELENBRUUsT0FBT0csQ0FBUCxFQUFVLENBQUU7QUFDakI7OztnQ0FFTztBQUNKLGdCQUFJO0FBQ0EscUJBQUtsQixRQUFMLENBQWNVLEtBQWQsQ0FBb0IsS0FBS1gsRUFBekI7QUFDSCxhQUZELENBRUUsT0FBT21CLENBQVAsRUFBVSxDQUVYO0FBQ0o7Ozs7O3FCQUlVdEIsTyIsImZpbGUiOiJTdG9yYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNvbHV0aW9uIGZyb20gJy4vU29sdXRpb24nO1xuaW1wb3J0IENvbnN0IGZyb20gJy4uL2NvbnN0JztcblxuXG4vKipcbiAqIFtTdG9yYWdlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtbc3RyaW5nXX0gIGlkICAgICAgIFvmg5/kuIDmoIfor4ZdXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzTWVtb3J5IFvmmK/lkKbkvb/nlKjlhoXlrZjnuqflrZjlgqjvvIzpu5jorqTkuLpmbGFzZSDljbPmjIHkuYXlrZjlgqhdXG4gKi9cbnZhciBfaW5zID0ge307XG52YXIgcHJlZml4ID0gQ29uc3QuTkFNRVNQQUNFO1xuXG5jbGFzcyBTdG9yYWdlIHtcblxuICAgIGNvbnN0cnVjdG9yKGlkLCBpc01lbW9yeSA9IGZhbHNlKSB7XG4gICAgICAgIC8vIFNpbmdsZXRvbiBwYXR0ZXJuXG4gICAgICAgIGlmICghKF9pbnNbaWRdIGluc3RhbmNlb2YgU3RvcmFnZSkpIHtcbiAgICAgICAgICAgIF9pbnNbaWRdID0gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfaW5zW2lkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5ucyA9IHByZWZpeCArIFwiX1wiICsgaWQgKyBcIl9cIjtcblxuICAgICAgICB0aGlzLl9tZXRob2RzID0gaXNNZW1vcnkgPyBTb2x1dGlvbi5tZW1vcnkubWV0aG9kcyA6IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChTb2x1dGlvbi5sb2NhbFN0b3JhZ2UudGVzdCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNvbHV0aW9uLmxvY2FsU3RvcmFnZS5tZXRob2RzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFNvbHV0aW9uLnVzZXJEYXRhLnRlc3QoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBTb2x1dGlvbi51c2VyRGF0YS5tZXRob2RzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7fSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKCkge30sXG4gICAgICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHt9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9tZXRob2RzKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzLmluaXQodGhpcy5ucyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGVuY29kZShkYXRhKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuSlNPTiA/IEpTT04uc3RyaW5naWZ5KGRhdGEpIDogZGF0YTtcbiAgICB9XG5cbiAgICBkZWNvZGUoZGF0YSkge1xuICAgICAgICByZXR1cm4gd2luZG93LkpTT04gPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YTtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fbWV0aG9kcy5zZXQodGhpcy5ucywga2V5LCB0aGlzLmVuY29kZSh2YWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZSh0aGlzLl9tZXRob2RzLmdldCh0aGlzLm5zLCBrZXkpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICByZW1vdmUoa2V5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9tZXRob2RzLnJlbW92ZSh0aGlzLm5zLCBrZXkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5fbWV0aG9kcy5jbGVhcih0aGlzLm5zKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTtcbiJdfQ==

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//存储服务
var Solution = {};
var _memoryStorage = {};

Solution["localStorage"] = {
    test: function test() {
        try {
            return window.localStorage ? true : false;
        } catch (e) {
            return false;
        }
    },
    methods: {
        init: function init(ns) {},
        set: function set(ns, key, value) {
            try {
                localStorage.setItem(ns + key, value);
            } catch (e) {
                throw e;
            }
        }, //throw
        get: function get(ns, key) {
            return localStorage.getItem(ns + key);
        },
        remove: function remove(ns, key) {
            localStorage.removeItem(ns + key);
        },
        clear: function clear(ns) {
            if (!ns) {
                localStorage.clear();
            } else {
                for (var i = localStorage.length - 1, key; key = localStorage.key(i--);) {
                    if (key && key.indexOf(ns) === 0) {
                        localStorage.removeItem(key);
                    }
                }
            }
        }
    }
};
Solution["userData"] = {
    test: function test() {
        try {
            return window.ActiveXObject && document.documentElement.addBehavior ? true : false;
        } catch (e) {
            return false;
        }
    },
    methods: {
        _owners: {},
        init: function init(ns) {
            if (!this._owners[ns]) {
                if (document.getElementById(ns)) {
                    this._owners[ns] = document.getElementById(ns);
                } else {
                    var el = document.createElement('script'),
                        head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                    el.id = ns;
                    el.style.display = 'none';
                    el.addBehavior('#default#userdata');
                    head.insertBefore(el, head.firstChild);
                    this._owners[ns] = el;
                }
                try {
                    this._owners[ns].load(ns);
                } catch (e) {}
                var _self = this;
                window.attachEvent("onunload", function () {
                    _self._owners[ns] = null;
                });
            }
        },
        set: function set(ns, key, value) {
            if (this._owners[ns]) {
                try {
                    this._owners[ns].setAttribute(key, value);
                    this._owners[ns].save(ns);
                } catch (e) {
                    throw e;
                }
            }
        },
        get: function get(ns, key) {
            if (this._owners[ns]) {
                this._owners[ns].load(ns);
                return this._owners[ns].getAttribute(key) || null;
            }
            return null;
        },
        remove: function remove(ns, key) {
            if (this._owners[ns]) {
                this._owners[ns].removeAttribute(key);
                this._owners[ns].save(ns);
            }
        },
        clear: function clear(ns) {
            if (this._owners[ns]) {
                var attributes = this._owners[ns].XMLDocument.documentElement.attributes;
                this._owners[ns].load(ns);
                for (var i = 0, attr; attr = attributes[i]; i++) {
                    this._owners[ns].removeAttribute(attr.name);
                }
                this._owners[ns].save(ns);
            }
        }
    }
};

Solution["memory"] = {
    test: function test() {
        return true;
    },
    methods: {
        init: function init(ns) {
            _memoryStorage[ns] = {};
        },
        get: function get(ns, key) {
            return _memoryStorage[ns][key];
        },
        set: function set(ns, key, value) {
            _memoryStorage[ns][key] = value;
        },
        remove: function remove(ns, key) {
            delete _memoryStorage[ns][key];
        },
        clear: function clear(ns) {
            delete _memoryStorage[ns];
        }
    }
};

exports["default"] = Solution;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yYWdlL1NvbHV0aW9uLmpzIl0sIm5hbWVzIjpbIlNvbHV0aW9uIiwiX21lbW9yeVN0b3JhZ2UiLCJ0ZXN0Iiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZSIsIm1ldGhvZHMiLCJpbml0IiwibnMiLCJzZXQiLCJrZXkiLCJ2YWx1ZSIsInNldEl0ZW0iLCJnZXQiLCJnZXRJdGVtIiwicmVtb3ZlIiwicmVtb3ZlSXRlbSIsImNsZWFyIiwiaSIsImxlbmd0aCIsImluZGV4T2YiLCJBY3RpdmVYT2JqZWN0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRCZWhhdmlvciIsIl9vd25lcnMiLCJnZXRFbGVtZW50QnlJZCIsImVsIiwiY3JlYXRlRWxlbWVudCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlkIiwic3R5bGUiLCJkaXNwbGF5IiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsImxvYWQiLCJfc2VsZiIsImF0dGFjaEV2ZW50Iiwic2V0QXR0cmlidXRlIiwic2F2ZSIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJpYnV0ZXMiLCJYTUxEb2N1bWVudCIsImF0dHIiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsSUFBSUEsV0FBVyxFQUFmO0FBQ0EsSUFBSUMsaUJBQWlCLEVBQXJCOztBQUVBRCxTQUFTLGNBQVQsSUFBMkI7QUFDdkJFLFVBQU0sZ0JBQVc7QUFDYixZQUFJO0FBQ0EsbUJBQU9DLE9BQU9DLFlBQVAsR0FBc0IsSUFBdEIsR0FBNkIsS0FBcEM7QUFDSCxTQUZELENBRUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1IsbUJBQU8sS0FBUDtBQUNIO0FBQ0osS0FQc0I7QUFRdkJDLGFBQVM7QUFDTEMsY0FBTSxjQUFTQyxFQUFULEVBQWEsQ0FBRSxDQURoQjtBQUVMQyxhQUFLLGFBQVNELEVBQVQsRUFBYUUsR0FBYixFQUFrQkMsS0FBbEIsRUFBeUI7QUFDMUIs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LE9BQU9GLFdBQVd6QixDQUFYLENBQTdCLEVBQTRDQSxHQUE1QyxFQUFpRDtBQUM3Qyx5QkFBS08sT0FBTCxDQUFhakIsRUFBYixFQUFpQmtDLGVBQWpCLENBQWlDRyxLQUFLQyxJQUF0QztBQUNIO0FBQ0QscUJBQUtyQixPQUFMLENBQWFqQixFQUFiLEVBQWlCZ0MsSUFBakIsQ0FBc0JoQyxFQUF0QjtBQUNIO0FBQ0o7QUF4REk7QUFSVSxDQUF2Qjs7QUFvRUFSLFNBQVMsUUFBVCxJQUFxQjtBQUNqQkUsVUFBTSxnQkFBVztBQUNiLGVBQU8sSUFBUDtBQUNILEtBSGdCO0FBSWpCSSxhQUFTO0FBQ0xDLGNBQU0sY0FBU0MsRUFBVCxFQUFhO0FBQ2ZQLDJCQUFlTyxFQUFmLElBQXFCLEVBQXJCO0FBQ0gsU0FISTtBQUlMSyxhQUFLLGFBQVNMLEVBQVQsRUFBYUUsR0FBYixFQUFrQjtBQUNuQixtQkFBT1QsZUFBZU8sRUFBZixFQUFtQkUsR0FBbkIsQ0FBUDtBQUNILFNBTkk7QUFPTEQsYUFBSyxhQUFTRCxFQUFULEVBQWFFLEdBQWIsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQzFCViwyQkFBZU8sRUFBZixFQUFtQkUsR0FBbkIsSUFBMEJDLEtBQTFCO0FBQ0gsU0FUSTtBQVVMSSxnQkFBUSxnQkFBU1AsRUFBVCxFQUFhRSxHQUFiLEVBQWtCO0FBQ3RCLG1CQUFPVCxlQUFlTyxFQUFmLEVBQW1CRSxHQUFuQixDQUFQO0FBQ0gsU0FaSTtBQWFMTyxlQUFPLGVBQVNULEVBQVQsRUFBYTtBQUNoQixtQkFBT1AsZUFBZU8sRUFBZixDQUFQO0FBQ0g7QUFmSTtBQUpRLENBQXJCOztxQkF1QmVSLFEiLCJmaWxlIjoiU29sdXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL+WtmOWCqOacjeWKoVxudmFyIFNvbHV0aW9uID0ge307XG52YXIgX21lbW9yeVN0b3JhZ2UgPSB7fTtcblxuU29sdXRpb25bXCJsb2NhbFN0b3JhZ2VcIl0gPSB7XG4gICAgdGVzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKG5zKSB7fSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihucywga2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShucyArIGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIC8vdGhyb3dcbiAgICAgICAgZ2V0OiBmdW5jdGlvbihucywga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0obnMgKyBrZXkpO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKG5zLCBrZXkpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG5zICsga2V5KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKG5zKSB7XG4gICAgICAgICAgICBpZiAoIW5zKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoIC0gMSwga2V5OyBrZXkgPSBsb2NhbFN0b3JhZ2Uua2V5KGktLSk7KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgJiYga2V5LmluZGV4T2YobnMpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblNvbHV0aW9uW1widXNlckRhdGFcIl0gPSB7XG4gICAgdGVzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LkFjdGl2ZVhPYmplY3QgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEJlaGF2aW9yID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgICBfb3duZXJzOiB7fSxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24obnMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fb3duZXJzW25zXSkge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChucykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3duZXJzW25zXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGVsLmlkID0gbnM7XG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGVsLmFkZEJlaGF2aW9yKCcjZGVmYXVsdCN1c2VyZGF0YScpO1xuICAgICAgICAgICAgICAgICAgICBoZWFkLmluc2VydEJlZm9yZShlbCwgaGVhZC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3duZXJzW25zXSA9IGVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vd25lcnNbbnNdLmxvYWQobnMpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnVubG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX293bmVyc1tuc10gPSBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKG5zLCBrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3duZXJzW25zXSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX293bmVyc1tuc10uc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vd25lcnNbbnNdLnNhdmUobnMpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24obnMsIGtleSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX293bmVyc1tuc10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lcnNbbnNdLmxvYWQobnMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vd25lcnNbbnNdLmdldEF0dHJpYnV0ZShrZXkpIHx8IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihucywga2V5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3duZXJzW25zXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX293bmVyc1tuc10ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXJzW25zXS5zYXZlKG5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKG5zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3duZXJzW25zXSkge1xuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5fb3duZXJzW25zXS5YTUxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICB0aGlzLl9vd25lcnNbbnNdLmxvYWQobnMpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBhdHRyOyBhdHRyID0gYXR0cmlidXRlc1tpXTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX293bmVyc1tuc10ucmVtb3ZlQXR0cmlidXRlKGF0dHIubmFtZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXJzW25zXS5zYXZlKG5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cblNvbHV0aW9uW1wibWVtb3J5XCJdID0ge1xuICAgIHRlc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24obnMpIHtcbiAgICAgICAgICAgIF9tZW1vcnlTdG9yYWdlW25zXSA9IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24obnMsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIF9tZW1vcnlTdG9yYWdlW25zXVtrZXldXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24obnMsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIF9tZW1vcnlTdG9yYWdlW25zXVtrZXldID0gdmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbihucywga2V5KSB7XG4gICAgICAgICAgICBkZWxldGUgX21lbW9yeVN0b3JhZ2VbbnNdW2tleV1cbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKG5zKSB7XG4gICAgICAgICAgICBkZWxldGUgX21lbW9yeVN0b3JhZ2VbbnNdXG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTb2x1dGlvbjtcbiJdfQ==

/***/ }),
/* 208 */
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
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_agent__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_agent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_data_source_agent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__locale__ = __webpack_require__(210);




const ErrorLocales = __WEBPACK_IMPORTED_MODULE_1__locale__["a" /* default */].Errors;
const {ErrorType, Deferred, createComboPromise } = __WEBPACK_IMPORTED_MODULE_0_data_source_agent___default.a;
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
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_agent__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_agent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_data_source_agent__);
//本地化文案


const {ErrorType, Deferred, createComboPromise } = __WEBPACK_IMPORTED_MODULE_0_data_source_agent___default.a;

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