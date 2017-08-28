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
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
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

var store = __webpack_require__(42)('wks');
var uid = __webpack_require__(26);
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


var bind = __webpack_require__(75);

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
var IE8_DOM_DEFINE = __webpack_require__(57);
var toPrimitive = __webpack_require__(38);
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
var createDesc = __webpack_require__(24);
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
var IObject = __webpack_require__(39);
var defined = __webpack_require__(35);
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
var $keys = __webpack_require__(59);
var enumBugKeys = __webpack_require__(43);

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
var call = __webpack_require__(104);
var isArrayIter = __webpack_require__(105);
var anObject = __webpack_require__(10);
var toLength = __webpack_require__(40);
var getIterFn = __webpack_require__(106);
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

var _defineProperty = __webpack_require__(131);

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
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(98);
var enumBugKeys = __webpack_require__(43);
var IE_PROTO = __webpack_require__(41)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(37)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(60).appendChild(iframe);
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
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(35);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(126), __esModule: true };

/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
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
//# sourceMappingURL=index.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {



module.exports = __webpack_require__(94);

/***/ }),
/* 32 */
/***/ (function(module, exports) {



/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(96)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(36)(String, 'String', function (iterated) {
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
/* 34 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(23);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(58);
var hide = __webpack_require__(9);
var has = __webpack_require__(12);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(97);
var setToStringTag = __webpack_require__(19);
var getPrototypeOf = __webpack_require__(61);
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(34);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(42)('keys');
var uid = __webpack_require__(26);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(101);
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
/* 45 */
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
/* 46 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(26)('meta');
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
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(22);

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
//# sourceMappingURL=Deferred.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(138);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(140);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(23);
var wksExt = __webpack_require__(54);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var normalizeHeaderName = __webpack_require__(151);

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
    adapter = __webpack_require__(77);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(77);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(37)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(13);
var arrayIndexOf = __webpack_require__(99)(false);
var IE_PROTO = __webpack_require__(41)('IE_PROTO');

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(12);
var toObject = __webpack_require__(27);
var IE_PROTO = __webpack_require__(41)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 63 */
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(107);
var html = __webpack_require__(60);
var cel = __webpack_require__(37);
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
/* 65 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var newPromiseCapability = __webpack_require__(47);

module.exports = function (C, x) {
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 67 */
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(129);
exports.encode = exports.stringify = __webpack_require__(130);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = __webpack_require__(134);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports['default'] = createError;

var _const = __webpack_require__(30);

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ERROR_TYPE = _const2['default'].ERROR_TYPE;

var DEFAULT_ERROR_MSG = 'undefined message';
var DEFAULT_ERROR_TYPE = ERROR_TYPE.BUSINESS;

/* 说明 */
function createError(_ref) {
    var traceid = _ref.traceid,
        code = _ref.code,
        _ref$message = _ref.message,
        message = _ref$message === undefined ? DEFAULT_ERROR_MSG : _ref$message,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? ERROR_TYPE.BUSINESS : _ref$type,
        args = (0, _objectWithoutProperties3['default'])(_ref, ['traceid', 'code', 'message', 'type']);

    // need a real Error 
    var error = new Error(message);
    error.type = type;
    error.code = code;
    error.traceid = traceid;
    (0, _assign2['default'])(error, args);
    return error;
}
//# sourceMappingURL=CreateError.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createComboDefer = exports.createComboPromise = undefined;

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(49);

var _map2 = _interopRequireDefault(_map);

var _Deferred = __webpack_require__(52);

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
//# sourceMappingURL=ComboPromise.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(59);
var hiddenKeys = __webpack_require__(43).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(29);
var createDesc = __webpack_require__(24);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(38);
var has = __webpack_require__(12);
var IE8_DOM_DEFINE = __webpack_require__(57);
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
/* 75 */
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
/* 76 */
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(4);
var settle = __webpack_require__(152);
var buildURL = __webpack_require__(154);
var parseHeaders = __webpack_require__(155);
var isURLSameOrigin = __webpack_require__(156);
var createError = __webpack_require__(78);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(157);

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
      var cookies = __webpack_require__(158);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(76)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(153);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 80 */
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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(181), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_static_styles_demo_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_proxy__ = __webpack_require__(92);







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
        __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default()({
            container: "menu-folded",
            ifFold: true,
            data: data,
            url: '/ios/iphone/8'
        });

        // 展开态
        // $sidebar.className = 'sidebar';
        __WEBPACK_IMPORTED_MODULE_0__src_www_business_apps_navigation_menu___default()({
            container: "menu-unfold",
            ifFold: false,
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(84);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _view2['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewModel = __webpack_require__(85);

var _viewModel2 = _interopRequireDefault(_viewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var container1 = 'menu-folded';
var container2 = 'menu-unfold';

function menuView(options) {
  var ViewModel;

  function renderMenuItem(node) {
    return '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a class="menu-title" href="' + node.url + '">' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + ' ' + '' + node.title + '' + '</a>' + '</li>';
  }

  function renderMenu(node, nodes) {
    return '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') + ' ' + (node.level > 1 ? 'menu-item-vertical' : '') + '">' + '<a href="' + node.url + '" class="menu-title menu-submenu-title ' + (node.isOpen ? 'isOpen' : '') + ' ' + (node.level > 1 ? 'menu-title-vertical' : '') + '" >' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + '' + '' + node.title + '' + '' + (node.level > 1 ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right') + '"></i>') + '' + '</a>' + '<ul class="menu-submenu ' + (node.isOpen ? 'menu-submenu-inline' : 'menu-submenu-hidden') + ' ' + (node.level > 1 ? 'menu-submenu-vertical' : '') + '">' + render(nodes, renderMenu, renderMenuItem) + '</ul>' + '</li>';
  }

  function renderMenuItemFold(node) {
    return '<li  class="menu-item menu-item-l' + node.level + ' ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a class="menu-title" href="' + node.url + '">' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + ' ' + '<span class="menu-title-text menu-title-l' + node.level + '">' + node.title + '</span>' + '</a>' + '</li>';
  }

  function renderMenuFold(node, nodes) {
    return '<li  class="menu-item menu-item-l' + node.level + ' ' + (node.isSelect ? 'menu-item-selected' : '') + ' ' + (node.isOpen ? 'menu-item-active' : '') + ' ">' + '<a href="' + node.url + '" class="menu-title" >' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + '' + '<span class="menu-title-text menu-title-l' + node.level + '">' + node.title + '</span>' + '</a>' + '<ul class="menu-submenu menu-submenu-l' + Number(node.level + 1) + ' ' + (node.isOpen ? '' : 'menu-submenu-hidden') + ' menu-submenu-' + (node.level + 1 >= 1 ? 'vertical' : 'inline') + '">' + render(nodes, renderMenuFold, renderMenuItemFold) + '</ul>' + '</li>';
  }

  function render(nodes, renderMenuFun, renderItemFun) {
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
  }

  function renderInit(statusTree) {
    console.log(statusTree);
    var tpl1 = render(statusTree.children, renderMenuFold, renderMenuItemFold);
    document.getElementById(container1).innerHTML = tpl1;

    var tpl2 = render(statusTree.children, renderMenu, renderMenuItem);
    document.getElementById(container2).innerHTML = tpl2;
  }

  function bindEvents() {

    // 折叠的
    document.getElementById(container1).addEventListener('click', function (e) {
      e.preventDefault();
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var menuTitleStr = 'menu-submenu-title';
      var secondTitleStr = 'menu-title-vertical';
      var targetClass = target.getAttribute('class');
      // 判断是否匹配目标元素
      if (target.nodeName.toLocaleLowerCase() === 'a') {
        var url = target.getAttribute("href");
        ViewModel.selectMenuItem(url);
      }
    });

    document.getElementById(container1).addEventListener('mouseenter', function (e) {
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

    document.getElementById(container1).addEventListener('mouseleave', function (e) {
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
    document.getElementById(container2).addEventListener('click', function (e) {
      e.preventDefault();
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var menuTitleStr = 'menu-submenu-title';
      var secondTitleStr = 'menu-title-vertical';
      var targetClass = target.getAttribute('class');
      // 判断是否匹配目标元素
      if (target.nodeName.toLocaleLowerCase() === 'a') {
        var url = target.getAttribute("href");

        if (targetClass.indexOf(secondTitleStr) > -1) return;
        // 有儿子的菜单，点击打开
        if (targetClass.indexOf(menuTitleStr) > -1) {
          // 已经显示的儿子，点击隐藏
          if (targetClass.indexOf("isOpen") > -1) {
            ViewModel.closeSubMenu(url);
            // 隐藏的儿子，点击出现
          } else {
            ViewModel.openSubMenu(url);
          }
          // 叶子节点，点击选中
        } else {
          ViewModel.selectMenuItem(url);
        }
      }
    });

    document.getElementById(container2).addEventListener('mouseenter', function (e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var secondItemStr = 'menu-item-vertical';
      var targetClass = target.getAttribute("class");
      // console.log(target.getAttribute("class"));

      if (targetClass.indexOf(secondItemStr) > -1) {

        if (targetClass.indexOf("selected") > -1) {
          target.className = '' + targetClass + ' isHover';
        }
      }
    }, true);

    document.getElementById(container2).addEventListener('mouseleave', function (e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var secondItemStr = 'menu-item-vertical';
      var targetClass = target.getAttribute("class");
      // console.log(target.getAttribute("class"));

      if (targetClass.indexOf(secondItemStr) > -1) {
        if (targetClass.indexOf("selected") > -1) {
          target.className = targetClass.replace('isHover', '');
        }
      }
    }, true);
  }
  function init() {
    ViewModel = (0, _viewModel2['default'])({
      menuData: options.data,
      render: renderInit
    });

    ViewModel.selectMenuItem(options.url);

    bindEvents();
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等
  }
  init();
}

exports['default'] = menuView;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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

// 根据条件，遍历树，返回符合条件的最深的节点
function conditionalTraversal(tree, condition) {
    var node = null;
    var children = tree.children;

    if (condition(tree)) {
        while (Array.isArray(children)) {
            var nodes = children.filter(condition);
            if (nodes.length > 0) {
                node = nodes.pop();
                children = node.children;
            } else {
                break;
            }
        }
    }

    return node;
}

function menuViewModel(options) {
    options = options || {};

    if (!options.menuData) {
        console.log('缺少菜单数据！');
        return;
    }

    if (!options.render) {
        console.log('缺少渲染函数！');
        return;
    }

    var render = options.render;

    // 导航栏状态
    var statusTree = {
        title: 'root',
        url: '/',
        isSelect: false,
        isOpen: true,
        level: 0,
        children: options.menuData,
        parent: null
    };

    // 状态节点
    // var node = {
    //     title: '',
    //     url: '',
    //     isSelect: '',
    //     isOpen: '',
    //     children: [],
    //     parent: null
    // };

    // 根据祖先的个数确定层级
    function getNodeLevel(node) {
        var level = 0;
        while (node.parent) {
            level++;
            node = node.parent;
        }

        return level;
    }

    // 生成状态树
    function initStatusTree() {
        // 必须保证父级元素已经遍历
        layerTraversal(statusTree, function (node, parent) {
            node.isOpen = false;
            node.isSelect = false;
            node.parent = parent;
            node.level = getNodeLevel(node);
        });
    };

    function searchNodeByUrl(url) {
        var urls = [];
        // 根据URL生成查找路径
        url.split('/').slice(1).reduce(function (string1, string2) {
            var url = string1 + '/' + string2;
            urls.push(url);
            return url;
        }, '');

        // 根节点默认'/'
        url = '/';

        return conditionalTraversal(statusTree, function (node) {
            if (node.url === url) {
                url = urls.shift();
                return true;
            } else {
                return false;
            }
        });
    }

    function selectNode(node) {
        node.isSelect = true;

        // 选择祖先节点
        while (node.parent) {
            // 选中当前节点的父节点
            var parent = node.parent;
            parent.isSelect = true;

            node = parent;
        }
    }

    // 从根节点开始，依次向下寻找被选中的节点，并将其改为未选中
    function unselectNode(tree) {
        conditionalTraversal(tree, function (node) {
            if (node.isSelect === true) {
                node.isSelect = false;
                return true;
            } else {
                return false;
            }
        });
    }

    function openNode(url) {
        var node = searchNodeByUrl(url);
        if (node != null) {
            node.isOpen = true;
        }
    }

    function closeNode(url) {
        var node = searchNodeByUrl(url);
        if (node != null) {
            node.isOpen = false;
        }
    }

    function selectMenuItem(url) {
        var node = searchNodeByUrl(url);
        if (node) {
            unselectNode(statusTree);
            selectNode(node);
        }
        render(statusTree);
    }

    (function init() {
        initStatusTree();
    })();

    return {
        selectMenuItem: selectMenuItem,
        openSubMenu: function openSubMenu(url) {
            openNode(url);
            render(statusTree);
        },
        closeSubMenu: function closeSubMenu(url) {
            closeNode(url);
            render(statusTree);
        }
    };
}

exports['default'] = menuViewModel;

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var data = [
  {
    "title": "安卓机",
    "icon": "fa-android",
    "url": "/android",
    "children": [
      {
        "title": "华为",
        "url": "/android/huawei",
        "children": [
          {
            "title": "荣耀",
            "url": "/android/huawei/hornour"
          }
        ]
      },
      {
        "title": "小米",
        "url": "/android/mi",
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
    "url": "/ios",
    "icon": "fa-apple",
    "children": [
      {
        "title": "iwatch",
        "url": "/ios/iwatch"
      },
      {
        "title": "iphone",
        "url": "/ios/iphone",
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(90)(content, options);
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(89)(true);
// imports


// module
exports.push([module.i, ".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected.isHover > .menu-title {\n  box-shadow: none;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 36px;\n  text-align: left;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu,\n.sidebar-folded .menu-root .fa-angle-down,\n.sidebar-folded .menu-root .fa-angle-right {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-l1 {\n  width: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-vertical {\n  width: 150px;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l1 {\n  width: 150px;\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l2 {\n  margin-left: 10px;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active.menu-item-selected.menu-item-l3 > .menu-title {\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active .menu-title-l1 {\n  padding-left: 15px;\n  display: inline-block;\n  position: absolute;\n  left: 65px;\n  top: 0;\n  background-color: #1c212d;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-l2 > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 31px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu {\n  display: block;\n  float: right;\n  position: absolute;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-hidden {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l2 {\n  left: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l3 {\n  top: 0;\n  left: 150px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  justify-content: center;\n  align-items: center;\n  background: #fafafc;\n  line-height: 65px;\n  color: #2b3447;\n}\n.sidebar-toggle-btn .lines {\n  position: relative;\n  height: 13px;\n  width: 16px;\n  background: repeating-linear-gradient(to bottom, #709d63 0px, #709d63 2px, transparent 2px, transparent 5px);\n}\n.sidebar-toggle-btn .lines:before {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 13px;\n  background-color: #dfe1e7 ;\n  background: repeating-linear-gradient(to bottom, #dfe1e7 0px, #dfe1e7 2px, transparent 2px, transparent 5px);\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .lines:before {\n  width: 0px;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n", "", {"version":3,"sources":["/Users/weimengxi/github/component-navigation/src/www/static/styles/demo/menu.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo/mixin.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo/menu-folded.less","/Users/weimengxi/github/component-navigation/src/www/static/styles/demo.less"],"names":[],"mappings":"AAKA;EAEI,mBAAA;CCLH;ADGD;EAQY,sBAAA;EACA,sBAAA;CCRX;ADUO;;;;;EAKI,gCAAA;CCRX;ADRD;EAqBQ,mBAAA;CCVP;ADWO;EACI,gCAAA;EACA,0BAAA;EACA,0CAAA;CCTX;ADhBD;EA8BQ,YAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;EACA,oBAAA;CCXP;ADgBO;EACI,gCAAA;EACA,0BAAA;EACA,yEAAA;CCdX;ADiBO;EACI,iBAAA;CCfX;AD/BD;;EAkDY,gCAAA;CCfX;ADnCD;EAwDQ,mBAAA;CClBP;ADoBO;EACI,cAAA;CClBX;ADzCD;EA+DY,0BAAA;CCnBX;AD5CD;EAmEY,mBAAA;CCpBX;AD2BO;EACI,mBAAA;EACA,eAAA;EACA,aAAA;EACA,WAAA;EACA,SAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,wBAAA;CCzBX;AD3DD;EA2FQ,mBAAA;EACA,SAAA;EACA,YAAA;EACA,0BAAA;EACA,eAAA;EACA,WAAA;CC7BP;ADnED;EAmGY,0CAAA;CC7BX;ADtED;EAgHQ,aAAA;EACA,kBAAA;EACA,cAAA;CCvCP;AD3ED;EAqHY,yCAAA;CCvCX;AD9ED;EAyHY,mBAAA;EACA,iBAAA;EACA,gBAAA;CCxCX;ADnFD;EEHE,YAAA;EACA,aAAA;EACA,gCAAA;CDyFD;ADxFD;EAqIQ,mBAAA;CC1CP;AD3FD;EAyIQ,aAAA;EACA,kBAAA;CC3CP;AEjGD;;;EAOE,cAAA;CF+FD;AExFC;EACC,YAAA;CF0FF;AEzGD;EAmBG,aAAA;CFyFF;AE5GD;EAyBG,aAAA;EACA,cAAA;CFsFF;AEhHD;EA8BG,kBAAA;CFqFF;AEhFE;EACC,yEAAA;CFkFH;AEhFE;EACC,gCAAA;EACA,0BAAA;EACA,0CAAA;CFkFH;AEzFC;EAUE,mBAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;EACA,OAAA;EACA,0BAAA;CFkFH;AEnID;EAsDG,sBAAA;CFgFF;AE3EK;EACI,mBAAA;EACA,eAAA;EACA,aAAA;EACA,WAAA;EACA,SAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,wBAAA;CF6ET;AElJD;EA2EG,eAAA;EACA,aAAA;EACA,mBAAA;CF0EF;AEzEE;EACC,cAAA;CF2EH;AEzEE;EACC,WAAA;CF2EH;AEzEE;EACC,OAAA;EACA,YAAA;CF2EH;AG/JD;EACI,uBAAA;EACA,aAAA;EACA,YAAA;CHiKH;AG9JD;;EAEI,iBAAA;CHgKH;AG3JD;EACI,cAAA;EACA,aAAA;EACA,cAAA;CH6JH;AGzJD;EACI,mBAAA;EACA,aAAA;EACA,WAAA;EACA,oBAAA;CH2JH;AG/JD;EAOQ,aAAA;EACA,0BAAA;EACA,kBAAA;EACA,mBAAA;CH2JP;AGrKD;EAeQ,mBAAA;EACA,oBAAA;EACA,YAAA;EACA,oBAAA;CHyJP;AGrJG;EACI,aAAA;EACA,cAAA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;EACA,wBAAA;EACA,oBAAA;EACA,oBAAA;EACA,kBAAA;EACA,eAAA;CHuJP;AGjKG;EAaQ,mBAAA;EACA,aAAA;EACA,YAAA;EACA,6GAAA;CHuJX;AGvKG;EAqBQ,sBAAA;EACA,mBAAA;EACA,aAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,2BAAA;EACA,6GAAA;CHqJX;AG9ID;EAEI,YAAA;CH+IH;AGjJD;EAMY,WAAA;CH8IX;AGvID;EACI,QAAA;EACA,WAAA;EACA,0BAAA;CHyIH;AG5ID;EAMQ,YAAA;EACA,aAAA;EACA,uBAAA;CHyIP;AGjJD;EAWQ,cAAA;CHyIP","file":"demo.less","sourcesContent":["@import './variables';\n@import './mixin';\n\n\n//=============  Menu-Styles Start============= \n.menu-root {\n\n    position: relative;\n\n    .calc-colors(@base-menu-font-color);\n\n    a {\n        & {\n            display: inline-block;\n            text-decoration: none;\n        }\n        &,\n        &:link,\n        &:visited,\n        &:hover,\n        &:active {\n            color: @menu-item-font-color;\n        }\n    }\n\n    .menu-item {\n        position: relative;\n        &:not(.menu-item-selected)>.menu-title:hover {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n    } \n\n    .menu-title {\n        width: 100%;\n        height:  @menu-item-height;\n        line-height: @menu-item-height;\n        padding-left: @menu-padding-left;\n        padding-right: @menu-padding-right;\n    }\n\n    .menu-item-selected {\n        // 选中的节点\n        &>.menu-title {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset @menu-item-selected-border-width 0px 0px 0px @menu-item-selected-color, inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n\n        &.isHover>.menu-title {\n            box-shadow: none;\n        }\n        .menu-icon-title-alt,\n        .menu-icon-angle {\n            color: @menu-item-selected-icon-color;\n        }\n    }\n\n    .menu-submenu {\n\n        position: relative;\n\n        &-hidden {\n            display: none;\n        }\n\n        .menu-item {\n            background-color: @menu-submenu-item-bg-color;\n        } \n\n        .menu-title {\n            padding-left: @menu-submenu-padding-left + @menu-icon-margin-right + @menu-submenu-list-icon-size;\n        }\n\n    }\n\n    .menu-submenu-inline {\n        // 模拟list-style: circle-solid\n        & > .menu-item:before {\n            position: absolute;\n            display: block;\n            content: ' ';\n            left: @menu-submenu-padding-left;\n            top: 50%;\n            margin-top: -@menu-submenu-list-icon-size/2;\n            width: @menu-submenu-list-icon-size;\n            height: @menu-submenu-list-icon-size;\n            border-radius: @menu-submenu-list-icon-size/2;\n            background-color: @base-menu-font-color;\n        }\n\n    }\n\n     // 三级子菜单\n    .menu-submenu .menu-item:hover .menu-submenu-vertical {\n        position: absolute;\n        top: 0px;\n        left: @sidebar-width;\n        background-color: @menu-submenu-item-bg-color;\n        display: block;\n        z-index: @base-zindex + 2;\n\n        .menu-item {\n            box-shadow: inset 1px 0px 0px  0px @menu-item-bg-color;\n        }\n\n    }\n\n    .menu-submenu-vertical {\n\n        @menu-submenu-item-bg-color-red: red(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-green: green(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-blue: blue(@menu-submenu-item-bg-color);\n\n        @menu-submenu-vertical-item-bg-color: rgba(@menu-submenu-item-bg-color-red, @menu-submenu-item-bg-color-green, @menu-submenu-item-bg-color-blue, @menu-submenu-vertical-item-bg-color-alpha);\n\n        width: @menu-submenu-vertical-width;\n        overflow: visible;\n        display: none;\n\n        .menu-item {\n            background-color: @menu-submenu-vertical-item-bg-color;\n        }\n\n        .menu-title {\n            padding-left: @menu-submenu-padding-left - @base-padding;\n            text-align: left;\n            font-size: 12px;\n        }\n    }\n\n    // icon ===== \n    [class|=menu-icon] {\n        .menu-icon( @menu-item-icon-color);        \n    }\n\n    .menu-icon-title-alt {\n        margin-right: @menu-icon-margin-right;\n    }\n\n    .menu-icon-angle {\n        float: right;\n        line-height: @menu-item-height;\n    }\n}\n//=============  Menu-Styles End============= \n",".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected.isHover > .menu-title {\n  box-shadow: none;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 36px;\n  text-align: left;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu,\n.sidebar-folded .menu-root .fa-angle-down,\n.sidebar-folded .menu-root .fa-angle-right {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-l1 {\n  width: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-vertical {\n  width: 150px;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l1 {\n  width: 150px;\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l2 {\n  margin-left: 10px;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active.menu-item-selected.menu-item-l3 > .menu-title {\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.sidebar-folded .menu-root .menu-item.menu-item-active .menu-title-l1 {\n  padding-left: 15px;\n  display: inline-block;\n  position: absolute;\n  left: 65px;\n  top: 0;\n  background-color: #1c212d;\n}\n.sidebar-folded .menu-root .menu-item .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu-l2 > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 31px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu {\n  display: block;\n  float: right;\n  position: absolute;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-hidden {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l2 {\n  left: 65px;\n}\n.sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l3 {\n  top: 0;\n  left: 150px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  justify-content: center;\n  align-items: center;\n  background: #fafafc;\n  line-height: 65px;\n  color: #2b3447;\n}\n.sidebar-toggle-btn .lines {\n  position: relative;\n  height: 13px;\n  width: 16px;\n  background: repeating-linear-gradient(to bottom, #709d63 0px, #709d63 2px, transparent 2px, transparent 5px);\n}\n.sidebar-toggle-btn .lines:before {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 13px;\n  background-color: #dfe1e7 ;\n  background: repeating-linear-gradient(to bottom, #dfe1e7 0px, #dfe1e7 2px, transparent 2px, transparent 5px);\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .lines:before {\n  width: 0px;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n","//=============  Menu-Mixins Start============= \n.menu-icon(@menu-icon-color: @base-menu-font-color) {\n  width: @menu-icon-size;\n  height: @menu-icon-size;\n  color: @menu-icon-color;\n}\n\n.calc-colors(@base-menu-font-color) {\n\n  @menu-font-color-red: red(@base-menu-font-color);\n  @menu-font-color-green: green(@base-menu-font-color);\n  @menu-font-color-blue: blue(@base-menu-font-color);\n\n  @menu-item-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha);\n  @menu-item-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha);\n  @menu-item-selected-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha + 0.2);\n  @menu-item-selected-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha + 0.2);\n\n  @menu-submenu-list-icon-size: 4px;\n\n}\n\n//=============  Menu-Mixins End============= ","@import './variables';\n@import './mixin';\n\n.sidebar-folded .menu-root {\n\n\t.calc-colors(@base-menu-font-color);\n\n\t.menu-submenu,\n\t.fa-angle-down,\n\t.fa-angle-right {\n\t\tdisplay: none;\n\t}\n\n\t.menu-item {\n\n\n\t\t// 一级li宽度调整\n\t\t&.menu-item-l1 {\n\t\t\twidth: @sidebar-folded-width;\n\t\t}\n\n\t\t.menu-submenu-vertical {\n\t\t\twidth: @menu-submenu-vertical-width;\n\n\t\t}\n\t\n\t\t// 一级title特殊处理\n\t\t.menu-title-text.menu-title-l1 {\n\t\t\twidth: @menu-submenu-vertical-width; \n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.menu-title-text.menu-title-l2 {\n\t\t\tmargin-left: @menu-icon-margin-right;\n\n\t\t} \n\n\t\t&.menu-item-active {\n\t\t\t&.menu-item-selected.menu-item-l3 > .menu-title {\n\t\t\t\tbox-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n\t\t\t}\n\t\t\t& > .menu-title {\n\t\t\t\tcolor: rgba(255, 255, 255, 0.8);\n\t\t\t\tbackground-color: #1c212d;\n\t\t\t\tbox-shadow: inset 0px 1px 0px 0px #2b3447;\n\t\t\t}\n\t\t\t.menu-title-l1 {\n\t\t\t\tpadding-left: @base-padding;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: @sidebar-folded-width;\n\t\t\t\ttop: 0;\n\t\t\t\tbackground-color: @menu-item-selected-bg-color;\n\t\t\t}\n\t\t}\n\n\t\t.menu-title-text {\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t.menu-submenu-l2 {\n\t\t    // 模拟list-style: circle-solid\n\t\t    & > .menu-item:before {\n\t\t        position: absolute;\n\t\t        display: block;\n\t\t        content: ' ';\n\t\t        left: @menu-submenu-padding-left - 2*@menu-icon-margin-right;\n\t\t        top: 50%;\n\t\t        margin-top: -@menu-submenu-list-icon-size/2;\n\t\t        width: @menu-submenu-list-icon-size;\n\t\t        height: @menu-submenu-list-icon-size;\n\t\t        border-radius: @menu-submenu-list-icon-size/2;\n\t\t        background-color: @base-menu-font-color;\n\t\t    }\n\n\t\t}\n\n\t\t.menu-submenu {\n\t\t\tdisplay: block;\n\t\t\tfloat: right;\n\t\t\tposition: absolute;\n\t\t\t&.menu-submenu-hidden {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t&.menu-submenu-l2 {\n\t\t\t\tleft: @sidebar-folded-width;\n\t\t\t}\n\t\t\t&.menu-submenu-l3 {\n\t\t\t\ttop: 0;\n\t\t\t\tleft: @menu-submenu-vertical-width;\n\t\t\t}\n\t\t}\t\t\n\t}\n\n\n}","@import './demo/variables';\n@import './demo/menu';\n@import './demo/menu-folded';\n\n// Reset ========\n* {\n    box-sizing: border-box;\n    padding: 0px;\n    margin: 0px;\n}\n\nul,\nli {\n    list-style: none;\n}\n\n\n// Layout ========\nbody {\n    display: flex;\n    width: 100vw;\n    height: 100vh;\n}\n\n// 左侧导航菜单区 - 展开状态\n.sidebar {\n    position: relative;\n    width: @sidebar-width;\n    z-index: @base-zindex + 1;\n    overflow-x: visible;\n\n    .logo {\n        height: @header-height;\n        background-color: lighten(@menu-item-bg-color, 10%);\n        line-height: @header-height;\n        text-align: center;\n    }\n\n\n    .menu-root {\n        position: relative;\n        background: #354059;\n        width: 100%;\n        overflow-x: visible;\n    }\n\n\n    &-toggle-btn {\n        float: right;\n        display: flex;\n        width: @header-height;\n        height: @header-height;\n        margin-right: -@header-height;\n        justify-content: center;\n        align-items: center;\n        background: #fafafc;\n        line-height: @header-height;\n        color: @menu-item-bg-color;\n\n        .lines {\n            position: relative;\n            height: 13px;\n            width: @menu-icon-size;\n            background: repeating-linear-gradient(to bottom, @menu-item-selected-color 0px,  @menu-item-selected-color 2px,transparent 2px,  transparent 5px);\n\n        }\n\n        .lines:before {\n            display: inline-block;\n            position: absolute;\n            content: ' ';\n            top: 0px;\n            right: 0px;\n            width: 12px;\n            height: 13px;\n            background-color:  #dfe1e7 ;\n            background: repeating-linear-gradient(to bottom, #dfe1e7  0px,  #dfe1e7 2px,transparent 2px,  transparent 5px)\n        }\n    }\n\n}\n\n// 左侧导航菜单区 - 折叠状态\n.sidebar-folded {\n\n    width: @sidebar-folded-width;\n\n    .sidebar-toggle-btn {\n        .lines:before {\n            width: 0px;\n        }\n    }\n\n}\n\n// 主功能区域\n.main-container {\n    flex: 1;\n    z-index: @base-zindex;\n    background-color: #ededed;\n\n    .header {\n        width: 100%;\n        height: @header-height;\n        background-color: #ccc;\n    }\n    .main-content {\n        padding: @base-padding;\n    }\n\n}\n\n\n\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 89 */
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
/* 90 */
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

var	fixUrls = __webpack_require__(91);

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
/* 91 */
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
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_data_source_proxy__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_data_source_proxy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_data_source_proxy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interceptors_FixParams__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interceptors_ErrorProcessor__ = __webpack_require__(188);




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
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const config = {
	// api请求的baseURL, 用于DataSourceGateWay
	// BASE_URL: '/web/',
	BASE_URL: 'https://www.easy-mock.com/mock/58ff1ae35e43ae5dbea5ef8c/',
}

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

var _map = __webpack_require__(49);

var _map2 = _interopRequireDefault(_map);

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _querystring = __webpack_require__(70);

var _querystring2 = _interopRequireDefault(_querystring);

var _Deferred = __webpack_require__(52);

var _Deferred2 = _interopRequireDefault(_Deferred);

var _CreateError = __webpack_require__(71);

var _CreateError2 = _interopRequireDefault(_CreateError);

var _ComboPromise = __webpack_require__(72);

var _ComboPromise2 = _interopRequireDefault(_ComboPromise);

var _config = __webpack_require__(135);

var _config2 = _interopRequireDefault(_config);

var _const = __webpack_require__(30);

var _const2 = _interopRequireDefault(_const);

var _Ajax = __webpack_require__(136);

var _Ajax2 = _interopRequireDefault(_Ajax);

var _Http = __webpack_require__(166);

var _Http2 = _interopRequireDefault(_Http);

var _MissionDispatcher = __webpack_require__(182);

var _MissionDispatcher2 = _interopRequireDefault(_MissionDispatcher);

var _CacheData = __webpack_require__(184);

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
//# sourceMappingURL=index.js.map

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(44);
__webpack_require__(103);
__webpack_require__(110);
__webpack_require__(111);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(34);
var defined = __webpack_require__(35);
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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(25);
var descriptor = __webpack_require__(24);
var setToStringTag = __webpack_require__(19);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 98 */
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13);
var toLength = __webpack_require__(40);
var toAbsoluteIndex = __webpack_require__(100);
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(34);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(102);
var step = __webpack_require__(62);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(36)(Array, 'Array', function (iterated, kind) {
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
/* 102 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(23);
var global = __webpack_require__(2);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(45);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(7);
var aFunction = __webpack_require__(15);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(20);
var speciesConstructor = __webpack_require__(63);
var task = __webpack_require__(64).set;
var microtask = __webpack_require__(108)();
var newPromiseCapabilityModule = __webpack_require__(47);
var perform = __webpack_require__(65);
var promiseResolve = __webpack_require__(66);
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
  Internal.prototype = __webpack_require__(48)($Promise.prototype, {
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
__webpack_require__(67)(PROMISE);
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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(109)(function (iter) {
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
/* 104 */
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
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(16);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(45);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(16);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 107 */
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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(64).set;
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
/* 109 */
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
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(63);
var promiseResolve = __webpack_require__(66);

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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(47);
var perform = __webpack_require__(65);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(44);
__webpack_require__(113);
__webpack_require__(119);
__webpack_require__(122);
__webpack_require__(124);
module.exports = __webpack_require__(0).Map;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(114);
var validate = __webpack_require__(68);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(115)(MAP, function (get) {
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
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(5).f;
var create = __webpack_require__(25);
var redefineAll = __webpack_require__(48);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(20);
var $iterDefine = __webpack_require__(36);
var step = __webpack_require__(62);
var setSpecies = __webpack_require__(67);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(50).fastKey;
var validate = __webpack_require__(68);
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(1);
var meta = __webpack_require__(50);
var fails = __webpack_require__(11);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(48);
var forOf = __webpack_require__(20);
var anInstance = __webpack_require__(46);
var isObject = __webpack_require__(7);
var setToStringTag = __webpack_require__(19);
var dP = __webpack_require__(5).f;
var each = __webpack_require__(116)(0);
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
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(39);
var toObject = __webpack_require__(27);
var toLength = __webpack_require__(40);
var asc = __webpack_require__(117);
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
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(118);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var isArray = __webpack_require__(69);
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
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(120)('Map') });


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(45);
var from = __webpack_require__(121);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(20);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(123)('Map');


/***/ }),
/* 123 */
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(125)('Map');


/***/ }),
/* 125 */
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
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(128) });


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(29);
var toObject = __webpack_require__(27);
var IObject = __webpack_require__(39);
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
/* 129 */
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
/* 130 */
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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(132), __esModule: true };

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 134 */
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
/* 135 */
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
//# sourceMappingURL=index.js.map

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(22);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(53);

var _typeof3 = _interopRequireDefault(_typeof2);

var _querystring = __webpack_require__(70);

var _querystring2 = _interopRequireDefault(_querystring);

var _axios = __webpack_require__(148);

var _axios2 = _interopRequireDefault(_axios);

var _const = __webpack_require__(30);

var _const2 = _interopRequireDefault(_const);

var _CreateError = __webpack_require__(71);

var _CreateError2 = _interopRequireDefault(_CreateError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// import 'axios-response-logger';

var ERROR_TYPE = _const2['default'].ERROR_TYPE;

var JSON = (typeof window === 'undefined' ? global : window).JSON || {};

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 * @refer https://github.com/mzabriskie/axios/blob/master/lib/utils.js
 */
function isObject(val) {
    return val !== null && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3['default'])(val)) === 'object';
}

function transformMissionConfig(config) {

    var transformedConfig = (0, _assign2['default'])({}, config);

    if (config.method === 'post' && isObject(transformedConfig.data)) {
        transformedConfig.data = _querystring2['default'].stringify(transformedConfig.data);
    }

    return transformedConfig;
}

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
                        var rawError = data.error || data;
                        var businessError = (0, _CreateError2['default'])(rawError);
                        reject(businessError);
                    } else {
                        resolve(data);
                    }
                }, function (error) {
                    if (_axios2['default'].isCancel(error)) {
                        // abort error
                        console.log('Request canceled', error.message);
                        var abortError = (0, _CreateError2['default'])({ message: error.message, type: ERROR_TYPE.ABORT, code: error.code, subcode: error.subcode });
                        reject(abortError);
                    } else if (error.code === 'ECONNABORTED') {
                        // timeout error
                        var timeoutError = (0, _CreateError2['default'])({ message: error.message, type: ERROR_TYPE.TIMEOUT, code: error.code, subcode: error.subcode });
                        reject(timeoutError);
                    } else if (error.response) {
                        // network error 
                        // The request was made, but the server responded with a status code
                        // that falls out of the range of 2xx
                        var _error$response = error.response,
                            status = _error$response.status,
                            statusText = _error$response.statusText,
                            headers = _error$response.headers,
                            config = _error$response.config;

                        var networkError = (0, _CreateError2['default'])({ message: statusText, type: ERROR_TYPE.NETWORK, code: status, subcode: error.subcode });
                        reject(networkError);
                    } else {
                        console.error("another error: ", error);
                        var networkError1 = (0, _CreateError2['default'])({ message: error.message, type: ERROR_TYPE.NETWORK });
                        reject(networkError1);
                    }
                });
            });
        }
    }]);
    return AjaxWorkerFactory;
}();

exports['default'] = AjaxWorkerFactory;
//# sourceMappingURL=Ajax.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(137)))

/***/ }),
/* 137 */
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
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(44);
module.exports = __webpack_require__(54).f('iterator');


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(141), __esModule: true };

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(142);
__webpack_require__(32);
__webpack_require__(146);
__webpack_require__(147);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(12);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(58);
var META = __webpack_require__(50).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(42);
var setToStringTag = __webpack_require__(19);
var uid = __webpack_require__(26);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(54);
var wksDefine = __webpack_require__(55);
var keyOf = __webpack_require__(143);
var enumKeys = __webpack_require__(144);
var isArray = __webpack_require__(69);
var anObject = __webpack_require__(10);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(38);
var createDesc = __webpack_require__(24);
var _create = __webpack_require__(25);
var gOPNExt = __webpack_require__(145);
var $GOPD = __webpack_require__(74);
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
  __webpack_require__(73).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f = $propertyIsEnumerable;
  __webpack_require__(51).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(23)) {
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
/* 143 */
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(29);
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
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13);
var gOPN = __webpack_require__(73).f;
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
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('asyncIterator');


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55)('observable');


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(149);

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var bind = __webpack_require__(75);
var Axios = __webpack_require__(150);
var defaults = __webpack_require__(56);

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
axios.Cancel = __webpack_require__(80);
axios.CancelToken = __webpack_require__(164);
axios.isCancel = __webpack_require__(79);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(165);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(56);
var utils = __webpack_require__(4);
var InterceptorManager = __webpack_require__(159);
var dispatchRequest = __webpack_require__(160);
var isAbsoluteURL = __webpack_require__(162);
var combineURLs = __webpack_require__(163);

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
/* 151 */
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
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(78);

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
/* 153 */
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
/* 154 */
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
/* 155 */
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
/* 156 */
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
/* 157 */
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
/* 158 */
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
/* 159 */
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
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var transformData = __webpack_require__(161);
var isCancel = __webpack_require__(79);
var defaults = __webpack_require__(56);

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
/* 161 */
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
/* 162 */
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
/* 163 */
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
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(80);

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
/* 165 */
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
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(167);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(171);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(172);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Super = __webpack_require__(180);

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
//# sourceMappingURL=Http.js.map

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(168), __esModule: true };

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(169);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(27);
var $getPrototypeOf = __webpack_require__(61);

__webpack_require__(170)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 170 */
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
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(53);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(173);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(177);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(53);

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
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(174), __esModule: true };

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(175);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(176).set });


/***/ }),
/* 176 */
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
        set = __webpack_require__(8)(Function.call, __webpack_require__(74).f(Object.prototype, '__proto__').set, 2);
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
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(178), __esModule: true };

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(179);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(25) });


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(81);

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
//# sourceMappingURL=Super.js.map

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _map = __webpack_require__(49);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Deferred = __webpack_require__(52);

var _Deferred2 = _interopRequireDefault(_Deferred);

var _ComboPromise = __webpack_require__(72);

var _events = __webpack_require__(183);

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
//# sourceMappingURL=MissionDispatcher.js.map

/***/ }),
/* 183 */
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
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Storage = __webpack_require__(185);

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
//# sourceMappingURL=CacheData.js.map

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(81);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Solution = __webpack_require__(186);

var _Solution2 = _interopRequireDefault(_Solution);

var _const = __webpack_require__(30);

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
//# sourceMappingURL=Storage.js.map

/***/ }),
/* 186 */
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
//# sourceMappingURL=Solution.js.map

/***/ }),
/* 187 */
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
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_proxy__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_proxy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_data_source_proxy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__locale__ = __webpack_require__(189);




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
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_proxy__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_data_source_proxy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_data_source_proxy__);
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