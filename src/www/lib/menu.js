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


__webpack_require__(1);
__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

// 搜索节点，从根节点按层次向下搜索
function searchNode(tree, callback) {
    var children = tree.children;
    var node = null;
    while (Array.isArray(children)) {
        var nodes = children.filter(callback);
        if (nodes.length > 0) {
            node = nodes.pop();
            children = node.children;
        } else {
            break;
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

    if (!options.currentUrl) {
        console.log('缺少当前URL！');
        return;
    }

    if (!options.render) {
        console.log('缺少渲染函数！');
        return;
    }

    var currentUrl = options.currentUrl;
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

    // 查找符合当前路径的节点
    function searchNodeByUrl(url) {
        var urls = [];
        // 根据URL生成查找路径
        url.split('/').slice(1).reduce(function (string1, string2) {
            var url = string1 + '/' + string2;
            urls.push(url);
            return url;
        }, '');

        url = urls.shift();

        return searchNode(statusTree, function (node) {
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

        // 更新祖先状态
        while (node.parent) {
            // 更新当前节点的父节点的状态
            var parent = node.parent;
            parent.isSelect = true;

            node = parent;
        }
        console.log(statusTree);
    }

    function unselectNode(tree) {
        var parent = tree;
        var children = parent.children;

        while (parent.isSelect) {
            parent.isSelect = false;

            if (Array.isArray(children)) {
                children.some(function (node) {
                    if (node.isSelect === true) {
                        parent = node;
                        return true;
                    } else {
                        return false;
                    }
                });
            }

            children = parent.children;
        }
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
            render(statusTree);
        }
    }

    (function init() {
        initStatusTree();
        selectMenuItem(currentUrl);
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function viewInit() {
  var ViewModel;
  $.getJSON("./mock.js", function (data) {
    console.log(data);
    var navData = {
      menuData: data,
      currentUrl: '/a/a-1/a-1-1',
      render: renderInit
    };
    ViewModel = menuViewModel(navData);
  });

  function renderMenuItem(node) {
    return '<li class="bb-menu-item ' + (node.isSelect ? 'isSelect' : '') + '">' + '<a href="' + node.url + '">' + node.title + '</a>' + '</li>';
  }

  function renderMenu(node, nodes) {
    return '<li class="bb-menu-submenu">' + '<div class="bb-menu-submenu-title ' + (node.isOpen ? 'isOpen' : '') + '"  data-index="' + node.url + '">' + '' + (node.icon ? '<i class="' + node.icon + '"></i>' : '') + '' + node.title + '' + '</div>' + '<ul class="bb-menu ' + (node.isOpen ? 'isOpen' : '') + '">' + render(nodes) + '</ul>' + '</li>';
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
    $("#menu").html(tpl);
  }

  function init() {
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等

    $("#menu").on('click', '.bb-menu-submenu-title.isOpen', function () {
      var url = $(this).data('index');
      ViewModel.closeSubMenu(url);
    });

    $("#menu").on('click', '.bb-menu-submenu-title:not(.isOpen)', function () {
      var url = $(this).data('index');
      ViewModel.openSubMenu(url);
    });

    $("#menu").on('click', 'a', function () {
      event.preventDefault();
      var url = $(this).attr('href');
      ViewModel.selectMenuItem(url);
    });
  }
  init();
})();

/***/ })
/******/ ]);