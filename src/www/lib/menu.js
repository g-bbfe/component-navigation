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

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _view2.default)({ container: "menu",
    data: _mock2.default,
    url: '/ios/iphone/8' });

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

function menuView(options) {
  var ViewModel;

  function renderMenuItem(node) {
    return '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') + '">' + '<a class="menu-title" href="' + node.url + '">' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + ' ' + '' + node.title + '' + '</a>' + '</li>';
  }

  function renderMenu(node, nodes) {
    return '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') + ' ' + (node.parent.parent ? 'menu-item-vertical' : '') + '">' + '<a href="' + node.url + '" class="menu-title menu-submenu-title ' + (node.isOpen ? 'isOpen' : '') + ' ' + (node.parent.parent ? 'menu-title-vertical' : '') + '" >' + '' + (node.icon ? '<i class="menu-icon-title-alt fa ' + node.icon + '"></i>' : '') + '' + '' + node.title + '' + '' + (node.parent.parent ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right') + '"></i>') + '' + '</a>' + '<ul class="menu-submenu ' + (node.isOpen ? 'menu-submenu-inline' : 'menu-submenu-hidden') + ' ' + (node.parent.parent ? 'menu-submenu-vertical' : '') + '">' + render(nodes) + '</ul>' + '</li>';
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
    document.getElementById(options.container).innerHTML = tpl;
  }

  function bindEvents() {
    document.getElementById(options.container).addEventListener('click', function (e) {
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

    document.getElementById(options.container).addEventListener('mouseenter', function (e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var secondItemStr = 'menu-item-vertical';

      if (target.getAttribute("class").indexOf(secondItemStr) > -1) {

        var targetClass = target.getAttribute("class");

        if (targetClass.indexOf("selected") > -1) {
          target.className = '' + targetClass + ' isHover';
        }
      }
    }, true);

    document.getElementById(options.container).addEventListener('mouseleave', function (e) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var secondItemStr = 'menu-item-vertical';
      // console.log(target.getAttribute("class"));
      if (target.getAttribute("class").indexOf(secondItemStr) > -1) {
        var targetClass = target.getAttribute("class");

        if (targetClass.indexOf("selected") > -1) {
          target.className = targetClass.replace('isHover', '');
        }
      }
    }, true);
  }
  function init() {
    ViewModel = (0, _viewModel2.default)({
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

exports.default = menuView;

/***/ }),
/* 2 */
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(true);
// imports


// module
exports.push([module.i, ".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 0px;\n  text-align: center;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-title-text {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item:hover {\n  width: 265px;\n}\n.sidebar-folded .menu-root .menu-item:hover .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item:hover > .menu-submenu {\n  display: block;\n  float: right;\n  width: 200px;\n}\n.sidebar-folded .menu-root > .menu-item:hover .menu-title-text {\n  position: absolute;\n  left: 80px;\n}\n.sidebar-folded .menu-root .menu-submenu .menu-item:hover {\n  width: 200px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  background: #fafafc;\n  line-height: 65px;\n  text-align: center;\n  color: #2b3447;\n  padding: 24.5px;\n}\n.sidebar-toggle-btn .line {\n  position: relative;\n  height: 3px;\n  background-color: #709d63;\n  width: 16px;\n}\n.sidebar-toggle-btn .line:after {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 3px;\n  background-color: #dfe1e7 ;\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .line:after {\n  background-color: #709d63;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n", "", {"version":3,"sources":["D:/code/component-navigation/src/www/static/styles/D:/code/component-navigation/src/www/static/styles/demo/menu.less","D:/code/component-navigation/src/www/static/styles/demo.less","D:/code/component-navigation/src/www/static/styles/D:/code/component-navigation/src/www/static/styles/demo/menu-folded.less","D:/code/component-navigation/src/www/static/styles/D:/code/component-navigation/src/www/static/styles/demo.less"],"names":[],"mappings":"AA4BA;EAEI,mBAAA;CC5BH;AD0BD;EAQY,sBAAA;EACA,sBAAA;CC/BX;ADiCO;;;;;EAKI,gCAAA;CC/BX;ADeD;EAqBQ,mBAAA;CCjCP;ADkCO;EACI,gCAAA;EACA,0BAAA;EACA,0CAAA;CChCX;ADOD;EA8BQ,YAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAAA;EACA,oBAAA;CClCP;ADuCO;EACI,gCAAA;EACA,0BAAA;EACA,yEAAA;CCrCX;ADLD;;EA+CY,gCAAA;CCtCX;ADTD;EAqDQ,mBAAA;CCzCP;AD2CO;EACI,cAAA;CCzCX;ADfD;EA4DY,0BAAA;CC1CX;ADlBD;EAgEY,mBAAA;CC3CX;ADkDO;EACI,mBAAA;EACA,eAAA;EACA,aAAA;EACA,WAAA;EACA,SAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,wBAAA;CChDX;ADjCD;EAwFQ,mBAAA;EACA,SAAA;EACA,YAAA;EACA,0BAAA;EACA,eAAA;EACA,WAAA;CCpDP;ADzCD;EAgGY,0CAAA;CCpDX;AD5CD;EA4GQ,aAAA;EACA,kBAAA;EACA,cAAA;CC7DP;ADjDD;EAiHY,yCAAA;CC7DX;ADpDD;EAqHY,kBAAA;EACA,mBAAA;EACA,gBAAA;CC9DX;ADzDD;EAxBI,YAAA;EACA,aAAA;EACA,gCAAA;CCoFH;AD9DD;EAiIQ,mBAAA;CChEP;ADjED;EAqIQ,aAAA;EACA,kBAAA;CCjEP;ACjGD;EAGE,cAAA;CDiGD;ACpGD;EAOE,cAAA;CDgGD;ACvGD;EAYE,aAAA;CD8FD;AC1GD;EAeG,sBAAA;CD8FF;AC3FC;EACC,eAAA;EACA,aAAA;EACA,aAAA;CD6FF;ACxFA;EAGE,mBAAA;EACA,WAAA;CDwFF;ACtHD;EAoCE,aAAA;CDqFD;AEpHD;EACI,uBAAA;EACA,aAAA;EACA,YAAA;CFsHH;AEnHD;;EAEI,iBAAA;CFqHH;AEhHD;EACI,cAAA;EACA,aAAA;EACA,cAAA;CFkHH;AE9GD;EACI,mBAAA;EACA,aAAA;EACA,WAAA;EACA,oBAAA;CFgHH;AEpHD;EAOQ,aAAA;EACA,0BAAA;EACA,kBAAA;EACA,mBAAA;CFgHP;AE1HD;EAeQ,mBAAA;EACA,oBAAA;EACA,YAAA;EACA,oBAAA;CF8GP;AE1GG;EACI,aAAA;EACA,cAAA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;EACA,uBAAA;EACA,wBAAA;EACA,oBAAA;EACA,gBAAA;EACA,+BAAA;EACA,oBAAA;EACA,kBAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;CF4GP;AE3HG;EAkBQ,mBAAA;EACA,YAAA;EACA,0BAAA;EACA,YAAA;CF4GX;AEjIG;EAyBQ,sBAAA;EACA,mBAAA;EACA,aAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,2BAAA;CF2GX;AEpGD;EAEI,YAAA;CFqGH;AEvGD;EAMY,0BAAA;CFoGX;AE7FD;EACI,QAAA;EACA,WAAA;EACA,0BAAA;CF+FH;AElGD;EAMQ,YAAA;EACA,aAAA;EACA,uBAAA;CF+FP;AEvGD;EAWQ,cAAA;CF+FP","file":"demo.less","sourcesContent":["@import './variables';\n\n//=============  Menu-Mixins Start============= \n.menu-icon(@menu-icon-color: @base-menu-font-color) {\n    width: @menu-icon-size;\n    height: @menu-icon-size;\n    color: @menu-icon-color;\n}\n\n.calc-colors(@base-menu-font-color) {\n\n    @menu-font-color-red: red(@base-menu-font-color);\n    @menu-font-color-green: green(@base-menu-font-color);\n    @menu-font-color-blue: blue(@base-menu-font-color);\n\n    @menu-item-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha);\n    @menu-item-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha);\n    @menu-item-selected-font-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-font-alpha + 0.2);\n    @menu-item-selected-icon-color: rgba(@menu-font-color-red, @menu-font-color-green, @menu-font-color-blue, @base-menu-icon-alpha + 0.2);\n\n    @menu-submenu-list-icon-size: 4px;\n\n}\n\n//=============  Menu-Mixins End============= \n\n\n//=============  Menu-Styles Start============= \n.menu-root {\n\n    position: relative;\n\n    .calc-colors(@base-menu-font-color);\n\n    a {\n        & {\n            display: inline-block;\n            text-decoration: none;\n        }\n        &,\n        &:link,\n        &:visited,\n        &:hover,\n        &:active {\n            color: @menu-item-font-color;\n        }\n    }\n\n    .menu-item {\n        position: relative;\n        &:not(.menu-item-selected)>.menu-title:hover {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n    } \n\n    .menu-title {\n        width: 100%;\n        height:  @menu-item-height;\n        line-height: @menu-item-height;\n        padding-left: @menu-padding-left;\n        padding-right: @menu-padding-right;\n    }\n\n    .menu-item-selected {\n        // 选中的节点\n        &>.menu-title {\n            color: @menu-item-selected-font-color;\n            background-color: @menu-item-selected-bg-color;\n            box-shadow: inset @menu-item-selected-border-width 0px 0px 0px @menu-item-selected-color, inset 0px 1px 0px 0px @menu-item-bg-color;\n        }\n\n        .menu-icon-title-alt,\n        .menu-icon-angle {\n            color: @menu-item-selected-icon-color;\n        }\n    }\n\n    .menu-submenu {\n\n        position: relative;\n\n        &-hidden {\n            display: none;\n        }\n\n        .menu-item {\n            background-color: @menu-submenu-item-bg-color;\n        } \n\n        .menu-title {\n            padding-left: @menu-submenu-padding-left + @menu-icon-margin-right + @menu-submenu-list-icon-size;\n        }\n\n    }\n\n    .menu-submenu-inline {\n        // 模拟list-style: circle-solid\n        & > .menu-item:before {\n            position: absolute;\n            display: block;\n            content: ' ';\n            left: @menu-submenu-padding-left;\n            top: 50%;\n            margin-top: -@menu-submenu-list-icon-size/2;\n            width: @menu-submenu-list-icon-size;\n            height: @menu-submenu-list-icon-size;\n            border-radius: @menu-submenu-list-icon-size/2;\n            background-color: @base-menu-font-color;\n        }\n\n    }\n\n     // 三级子菜单\n    .menu-submenu .menu-item:hover .menu-submenu-vertical {\n        position: absolute;\n        top: 0px;\n        left: @sidebar-width;\n        background-color: @menu-submenu-item-bg-color;\n        display: block;\n        z-index: @base-zindex + 2;\n\n        .menu-item {\n            box-shadow: inset 1px 0px 0px  0px @menu-item-bg-color;\n        }\n    }\n\n    .menu-submenu-vertical {\n\n        @menu-submenu-item-bg-color-red: red(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-green: green(@menu-submenu-item-bg-color);\n        @menu-submenu-item-bg-color-blue: blue(@menu-submenu-item-bg-color);\n\n        @menu-submenu-vertical-item-bg-color: rgba(@menu-submenu-item-bg-color-red, @menu-submenu-item-bg-color-green, @menu-submenu-item-bg-color-blue, @menu-submenu-vertical-item-bg-color-alpha);\n\n        width: @menu-submenu-vertical-width;\n        overflow: visible;\n        display: none;\n\n        .menu-item {\n            background-color: @menu-submenu-vertical-item-bg-color;\n        }\n\n        .menu-title {\n            padding-left: 0px;\n            text-align: center;\n            font-size: 12px;\n        }\n    }\n\n    // icon ===== \n    [class|=menu-icon] {\n        .menu-icon( @menu-item-icon-color);        \n    }\n\n    .menu-icon-title-alt {\n        margin-right: @menu-icon-margin-right;\n    }\n\n    .menu-icon-angle {\n        float: right;\n        line-height: @menu-item-height;\n    }\n}\n//=============  Menu-Styles End============= \n",".menu-root {\n  position: relative;\n}\n.menu-root a {\n  display: inline-block;\n  text-decoration: none;\n}\n.menu-root a,\n.menu-root a:link,\n.menu-root a:visited,\n.menu-root a:hover,\n.menu-root a:active {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-item {\n  position: relative;\n}\n.menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-title {\n  width: 100%;\n  height: 50px;\n  line-height: 50px;\n  padding-left: 25px;\n  padding-right: 20px;\n}\n.menu-root .menu-item-selected > .menu-title {\n  color: rgba(255, 255, 255, 0.8);\n  background-color: #1c212d;\n  box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;\n}\n.menu-root .menu-item-selected .menu-icon-title-alt,\n.menu-root .menu-item-selected .menu-icon-angle {\n  color: rgba(255, 255, 255, 0.6);\n}\n.menu-root .menu-submenu {\n  position: relative;\n}\n.menu-root .menu-submenu-hidden {\n  display: none;\n}\n.menu-root .menu-submenu .menu-item {\n  background-color: #262c3c;\n}\n.menu-root .menu-submenu .menu-title {\n  padding-left: 65px;\n}\n.menu-root .menu-submenu-inline > .menu-item:before {\n  position: absolute;\n  display: block;\n  content: ' ';\n  left: 51px;\n  top: 50%;\n  margin-top: -2px;\n  width: 4px;\n  height: 4px;\n  border-radius: 2px;\n  background-color: white;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {\n  position: absolute;\n  top: 0px;\n  left: 200px;\n  background-color: #262c3c;\n  display: block;\n  z-index: 2;\n}\n.menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {\n  box-shadow: inset 1px 0px 0px 0px #2b3447;\n}\n.menu-root .menu-submenu-vertical {\n  width: 150px;\n  overflow: visible;\n  display: none;\n}\n.menu-root .menu-submenu-vertical .menu-item {\n  background-color: rgba(38, 44, 60, 0.98);\n}\n.menu-root .menu-submenu-vertical .menu-title {\n  padding-left: 0px;\n  text-align: center;\n  font-size: 12px;\n}\n.menu-root [class|=menu-icon] {\n  width: 16px;\n  height: 16px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.menu-root .menu-icon-title-alt {\n  margin-right: 10px;\n}\n.menu-root .menu-icon-angle {\n  float: right;\n  line-height: 50px;\n}\n.sidebar-folded .menu-root .menu-submenu {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-title-text {\n  display: none;\n}\n.sidebar-folded .menu-root .menu-item:hover {\n  width: 265px;\n}\n.sidebar-folded .menu-root .menu-item:hover .menu-title-text {\n  display: inline-block;\n}\n.sidebar-folded .menu-root .menu-item:hover > .menu-submenu {\n  display: block;\n  float: right;\n  width: 200px;\n}\n.sidebar-folded .menu-root > .menu-item:hover .menu-title-text {\n  position: absolute;\n  left: 80px;\n}\n.sidebar-folded .menu-root .menu-submenu .menu-item:hover {\n  width: 200px;\n}\n* {\n  box-sizing: border-box;\n  padding: 0px;\n  margin: 0px;\n}\nul,\nli {\n  list-style: none;\n}\nbody {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n}\n.sidebar {\n  position: relative;\n  width: 200px;\n  z-index: 1;\n  overflow-x: visible;\n}\n.sidebar .logo {\n  height: 65px;\n  background-color: #3e4b67;\n  line-height: 65px;\n  text-align: center;\n}\n.sidebar .menu-root {\n  position: relative;\n  background: #354059;\n  width: 100%;\n  overflow-x: visible;\n}\n.sidebar-toggle-btn {\n  float: right;\n  display: flex;\n  width: 65px;\n  height: 65px;\n  margin-right: -65px;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  background: #fafafc;\n  line-height: 65px;\n  text-align: center;\n  color: #2b3447;\n  padding: 24.5px;\n}\n.sidebar-toggle-btn .line {\n  position: relative;\n  height: 3px;\n  background-color: #709d63;\n  width: 16px;\n}\n.sidebar-toggle-btn .line:after {\n  display: inline-block;\n  position: absolute;\n  content: ' ';\n  top: 0px;\n  right: 0px;\n  width: 12px;\n  height: 3px;\n  background-color: #dfe1e7 ;\n}\n.sidebar-folded {\n  width: 65px;\n}\n.sidebar-folded .sidebar-toggle-btn .line:after {\n  background-color: #709d63;\n}\n.main-container {\n  flex: 1;\n  z-index: 0;\n  background-color: #ededed;\n}\n.main-container .header {\n  width: 100%;\n  height: 65px;\n  background-color: #ccc;\n}\n.main-container .main-content {\n  padding: 15px;\n}\n",".sidebar-folded .menu-root {\n\n\t.menu-submenu {\n\t\tdisplay: none;\n\t}\n\n\t.menu-title-text {\n\t\tdisplay: none;\n\t}\n\n\t.menu-item:hover {\n\n\t\twidth: @sidebar-folded-width + @sidebar-width;\n\n\t\t.menu-title-text {\n\t\t\tdisplay: inline-block;\n\t\t}\n\n\t\t& > .menu-submenu {\n\t\t\tdisplay: block;\n\t\t\tfloat: right;\n\t\t\twidth: @sidebar-width;\n\t\t}\n\n\t}\n\n\t& > .menu-item:hover {\n\n\t\t.menu-title-text {\n\t\t\tposition: absolute;\n\t\t\tleft: @sidebar-folded-width + @base-padding;\n\t\t}\n\n\t}\n\n\t.menu-submenu .menu-item:hover {\n\t\twidth: @sidebar-width;\n\t}\n}","@import './demo/variables';\n@import './demo/menu';\n@import './demo/menu-folded';\n\n// Reset ========\n* {\n    box-sizing: border-box;\n    padding: 0px;\n    margin: 0px;\n}\n\nul,\nli {\n    list-style: none;\n}\n\n\n// Layout ========\nbody {\n    display: flex;\n    width: 100vw;\n    height: 100vh;\n}\n\n// 左侧导航菜单区 - 展开状态\n.sidebar {\n    position: relative;\n    width: @sidebar-width;\n    z-index: @base-zindex + 1;\n    overflow-x: visible;\n\n    .logo {\n        height: @header-height;\n        background-color: lighten(@menu-item-bg-color, 10%);\n        line-height: @header-height;\n        text-align: center;\n    }\n\n\n    .menu-root {\n        position: relative;\n        background: #354059;\n        width: 100%;\n        overflow-x: visible;\n    }\n\n\n    &-toggle-btn {\n        float: right;\n        display: flex;\n        width: @header-height;\n        height: @header-height;\n        margin-right: -@header-height;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        flex-wrap: wrap;\n        justify-content: space-between;\n        background: #fafafc;\n        line-height: @header-height;\n        text-align: center;\n        color: @menu-item-bg-color;\n        padding: (@header-height - @menu-icon-size) / 2;\n\n        .line {\n            position: relative;\n            height: 3px;\n            background-color: @menu-item-selected-color;\n            width: @menu-icon-size;\n        }\n\n        .line:after {\n            display: inline-block;\n            position: absolute;\n            content: ' ';\n            top: 0px;\n            right: 0px;\n            width: 12px;\n            height: 3px;\n            background-color:  #dfe1e7 ;\n        }\n    }\n\n}\n\n// 左侧导航菜单区 - 折叠状态\n.sidebar-folded {\n\n    width: @sidebar-folded-width;\n\n    .sidebar-toggle-btn {\n        .line:after {\n            background-color: @menu-item-selected-color;\n        }\n    }\n\n}\n\n// 主功能区域\n.main-container {\n    flex: 1;\n    z-index: @base-zindex;\n    background-color: #ededed;\n\n    .header {\n        width: 100%;\n        height: @header-height;\n        background-color: #ccc;\n    }\n    .main-content {\n        padding: @base-padding;\n    }\n\n}\n\n\n\n\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 6 */
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
/* 7 */
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

var	fixUrls = __webpack_require__(8);

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
/* 8 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=menu.js.map