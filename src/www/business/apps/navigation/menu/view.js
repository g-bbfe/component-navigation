var $sidebar = document.getElementById('sidebar');
var $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
var $menuFolded = document.getElementById('menu-folded');
var $menuUnfold = document.getElementById('menu-unfold');

var events = require('events');
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
    nextclassNames = `${prevclassNames}${separator}${className}`;
  } else {
    // removeclassName
    nextclassNames = classNamesArr.reduce(function(accumulator, currValue) { return `${accumulator}${separator}` + (currValue === className ? '' : currValue) });
  }
  $el.setAttribute('class', nextclassNames);
}

function toggleShowHide($elFolded, $elUnfold) {
  var $elFoldedShow = $elFolded.style.display || 'block';
  var $elUnfoldShow = $elUnfold.style.display || 'block';
  $elFolded.style.display = $elFoldedShow == 'block' ? 'none':'block';
  $elUnfold.style.display = $elUnfoldShow == 'block' ? 'none':'block';
}

function renderMenuItem(node) {
  return  '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') +'">' +
            '<a class="menu-title" data-id="'+node.id+'" ' + (node.url?"href="+node.url+"":"")+'>'+ 
            ''+(node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +' '+
            '' + node.title + ''+
             '</a>' +
          '</li>';
}

function renderMenu(node, nodes) {
  return  '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') +' ' + (node.level > 1 ? 'menu-item-vertical' : '') + '">' +
            '<a data-id="'+node.id+'" ' + (node.url?"href="+node.url+"":"")+' class="menu-title menu-submenu-title ' + (node.level > 1 ? 'menu-title-vertical' : '') + '" >'+
              ''+ (node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +''+
              '' + node.title + ''+
              '' + (node.level > 1 ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right' )+'"></i>') + ''+
            '</a>'+
            '<ul class="menu-submenu ' + (node.isOpen ? 'menu-submenu-inline' : 'menu-submenu-hidden') + ' ' + (node.level > 1 ? 'menu-submenu-vertical' : '') + '">' +
            renderTwoWays(nodes, renderMenu, renderMenuItem) +
            '</ul>' +
          '</li>';
}

function renderMenuItemFold(node) {
  return  '<li  class="menu-item menu-item-l'+node.level+' ' + (node.isSelect ? 'menu-item-selected' : '') +'">' +
            '<a class="menu-title menu-title-no-children" data-id="'+node.id+'" ' + (node.url?"href="+node.url+"":"")+'>'+ 
            ''+(node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +' '+
            ''+(node.level!=1?'<span class="menu-title-text menu-title-l'+node.level+'">' + node.title + '</span>':'') +''+
            '</a>' +
          '</li>';
}

function renderMenuFold(node, nodes) {
  return  '<li  class="menu-item menu-item-l'+node.level+' ' + (node.isSelect ? 'menu-item-selected' : '') +'">' +
            '<a data-id="'+node.id+'" ' + (node.url?"href="+node.url+"":"")+' class="menu-title" >'+
              ''+ (node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +''+
              '<span class="menu-title-text menu-title-l'+node.level+'">' + node.title + '</span>'+
            '</a>'+
            '<ul class="menu-submenu menu-submenu-l'+ Number(node.level+1) +' menu-submenu-hidden menu-submenu-vertical">' +
            renderTwoWays(nodes, renderMenuFold, renderMenuItemFold) +
            '</ul>' +
          '</li>';
}

function renderTwoWays(nodes,renderMenuFun,renderItemFun) {
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

function ifInContainer(node, parentNodeName) {
  if (node.nodeName === parentNodeName) return true;
  if (node.parentNode.nodeName === parentNodeName) {
    return true;
  } else {
    return false;
  }
}

function bindEvents() {
  
  // 折叠的
  $menuFolded.addEventListener('click', function(e){
    e.preventDefault();
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var targetClass = target.getAttribute('class');
    // 判断是否匹配目标元素
    if (ifInContainer(target, 'A')) {
      var url = target.getAttribute("href") || target.parentNode.getAttribute("href");
      var id = target.getAttribute("data-id") || target.parentNode.getAttribute("data-id");
      if (url) {
        emitter.emit('viewEmitterToC', {type:'NODE_SELECT', id:id, url: url});
      }
    }
  });

  $menuFolded.addEventListener('mouseenter', function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var targetClass = target.getAttribute("class");
    
    if (targetClass.indexOf("menu-item") > -1) {
      target.className = '' + targetClass + ' menu-item-hover';

      var firstUl = target.getElementsByTagName('ul')[0];
      if (!firstUl)return;
      var firstUlClass = firstUl.getAttribute("class");
      
      firstUl.className = firstUlClass.replace('menu-submenu-hidden', '');
    }
  },true);

  $menuFolded.addEventListener('mouseleave', function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    
    var targetClass = target.getAttribute("class");
    
    if (targetClass.indexOf("menu-item") > -1) {
      target.className = targetClass.replace('menu-item-hover', '');

      var firstUl = target.getElementsByTagName('ul')[0];
      if (!firstUl)return;
      var firstUlClass = firstUl.getAttribute("class");
      
      firstUl.className =''+ firstUlClass+' menu-submenu-hidden';
    }
    
  },true);

  // 展开的菜单
  $menuUnfold.addEventListener('click', function(e){
    e.preventDefault();
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var menuTitleStr = 'menu-submenu-title';
    var secondTitleStr = 'menu-title-vertical';
    // 判断是否匹配目标元素
    if (ifInContainer(target, 'A')) {
      var url = target.getAttribute("href") || target.parentNode.getAttribute("href");
      var id = target.getAttribute("data-id") || target.parentNode.getAttribute("data-id");   
      var targetClass = target.getAttribute('class') + target.parentNode.getAttribute('class');
      if(targetClass.indexOf(secondTitleStr) > -1) return;
      // 有儿子的菜单，点击打开
      if(targetClass.indexOf(menuTitleStr) > -1 ){
        emitter.emit('viewEmitterToC', {type:'NODE_TOGGLE', id:id, url:url});
      // 叶子节点，点击选中
      }else{
        emitter.emit('viewEmitterToC', {type:'NODE_SELECT', id:id, url:url});
      }
    }
  });

  $menuUnfold.addEventListener('mouseenter', function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var secondItemStr = 'menu-item-vertical';
    var targetClass = target.getAttribute("class");

    if (targetClass.indexOf(secondItemStr) > -1) {

      if (targetClass.indexOf("selected") > -1) {
        target.className = '' + targetClass + ' menu-item-unfold-hover';
      }
    }
  },true);
  
  $menuUnfold.addEventListener('mouseleave', function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var secondItemStr = 'menu-item-vertical';
    var targetClass = target.getAttribute("class");

    if (targetClass.indexOf(secondItemStr) > -1) {
      if (targetClass.indexOf("selected") > -1) {
        target.className = targetClass.replace('menu-item-unfold-hover', '');
      }
    }
  },true);

  // toggle按钮
  $sidebarToggleBtn.onclick = function() {
    if ($sidebar) {
        toggleClass($sidebar, 'sidebar-folded');
        toggleShowHide($menuFolded, $menuUnfold);
    }
  };
}

function render(statusTree) {
  console.log('view里要render的状态树',statusTree);
  var tplFolded = renderTwoWays(statusTree.children, renderMenuFold, renderMenuItemFold);
  $menuFolded.innerHTML = tplFolded;

  var tplUnfold = renderTwoWays(statusTree.children, renderMenu, renderMenuItem);
  $menuUnfold.innerHTML = tplUnfold;
}

var menuView = {
  init: function() {
    bindEvents();
    // 触发sayHi事件
    emitter.on('viewEmitterFromC', function(data){
      render(data);
    });
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等
  }
};

export {
  menuView as View,
  emitter as Emitter
};
