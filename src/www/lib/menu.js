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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _view = __webpack_require__(1);

var _view2 = _interopRequireDefault(_view);

var _mock = __webpack_require__(3);

var _mock2 = _interopRequireDefault(_mock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _view2.default)(_mock2.default, '/ios/iphone/8');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewModel = __webpack_require__(2);

var _viewModel2 = _interopRequireDefault(_viewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function menuView(menuData, currentUrl) {
  var ViewModel = (0, _viewModel2.default)({
    menuData: menuData,
    render: renderInit
  });

  ViewModel.selectMenuItem(currentUrl);

  function renderMenuItem(node) {
    return '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a class="menu-title" href="' + node.url + '">' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + ' ' + '<span class="menu-title-text">' + node.title + '</span>' + '</a>' + '</li>';
  }

  function renderMenu(node, nodes) {
    return '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') + ' ' + (node.parent.parent ? 'menu-item-vertical' : '') + '">' + '<a href="' + node.url + '" class="menu-title menu-submenu-title ' + (node.isOpen ? 'isOpen' : '') + ' ' + (node.parent.parent ? 'menu-title-vertical' : '') + '" >' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + '' + '<span class="menu-title-text">' + node.title + '</span>' + '' + (node.parent.parent ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right') + '"></i>') + '' + '</a>' + '<ul class="menu-submenu ' + (node.isOpen ? 'menu-submenu-inline' : 'menu-submenu-hidden') + ' ' + (node.parent.parent ? 'menu-submenu-vertical' : '') + '">' + render(nodes) + '</ul>' + '</li>';
  }

  function render(nodes) {
    // console.log(nodes);
    var tpl = '';
    nodes.forEach(function (node) {
      if (Array.isArray(node.children)) {
        tpl += renderMenu(node, node.children);
      } else {
        tpl += renderMenuItem(node);
      }
    });
    return tpl;
  }

  function renderInit(statusTree) {
    console.log(statusTree);
    var tpl = render(statusTree.children);
    document.getElementById("menu").innerHTML = tpl;
  }

  function init() {
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等

    document.getElementById("menu").addEventListener('click', function (e) {
      e.preventDefault();
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var menuTitleStr = 'menu-submenu-title';
      var targetClass = target.getAttribute('class');
      // 判断是否匹配目标元素
      // if (target.nodeName.toLocaleLowerCase() === 'a') {
      if (target.nodeName.toLocaleLowerCase() === 'a' && targetClass.indexOf("menu-title") > -1) {
        var url = target.getAttribute("href");

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

    document.getElementById("menu").addEventListener('mouseover', function (e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      console.log(target.getAttribute("class"));
      if (target.getAttribute("class").indexOf("menu-item") > -1) {
        console.log(111);
      }
    });
  }
  init();
}

exports.default = menuView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// 树的先序遍历
function postOrderTraversal(parent, callback) {
    var siblings = parent.children;
    if (Array.isArray(siblings)) {
        siblings.forEach(function (node) {
            if (Array.isArray(node.children)) {
                postOrderTraversal(node, callback);
            }
            callback(node, parent);
        });
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
        isOpen: false,
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

    // 生成状态树
    function initStatusTree() {
        postOrderTraversal(statusTree, function (node, parent) {
            node.isOpen = false;
            node.isSelect = false;
            node.parent = parent;
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
        //@FIXME
        if (node) {
            unselectNode(statusTree);
            selectNode(node);
            render(statusTree);
        }
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

exports.default = menuViewModel;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var data = [{
  "title": "安卓机",
  "icon": "fa-android",
  "url": "/android",
  "children": [{
    "title": "华为",
    "url": "/android/huawei",
    "children": [{
      "title": "荣耀",
      "url": "/android/huawei/hornour"
    }]
  }, {
    "title": "小米",
    "url": "/android/mi",
    "children": [{
      "title": "红米",
      "url": "/android/mi/hongmi"
    }]
  }]
}, {
  "title": "IOS",
  "url": "/ios",
  "icon": "fa-apple",
  "children": [{
    "title": "iwatch",
    "url": "/ios/iwatch"
  }, {
    "title": "iphone",
    "url": "/ios/iphone",
    "children": [{
      "title": "iphone6s",
      "url": "/ios/iphone/6s"
    }, {
      "title": "iphone6 plus",
      "url": "/ios/iphone/6plus"
    }, {
      "title": "iphone7 plus",
      "url": "/ios/iphone/7plus"
    }, {
      "title": "iphone8 ",
      "url": "/ios/iphone/8"
    }]
  }]
}, {
  "title": "winPhone",
  "icon": " fa-windows",
  "url": "/windows"
}];

exports.default = data;

/***/ })
/******/ ]);