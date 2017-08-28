import { menuViewModel } from './view-model';

function menuView(options) {
  var ViewModel;
  
  function renderMenuItem (node) {
    return  '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') +'">' +
              '<a class="menu-title" href="' + node.url + '">'+ 
              ''+(node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +' '+
              '' + node.title + ''+
               '</a>' +
            '</li>';
  }

  function renderMenu (node, nodes) {
    return  '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') +' ' + (node.level > 1 ? 'menu-item-vertical' : '') + '">' +
              '<a href="'+node.url+'" class="menu-title menu-submenu-title ' + (node.isOpen ? 'isOpen' : '' )+' ' + (node.level > 1 ? 'menu-title-vertical' : '') + '" >'+
                ''+ (node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +''+
                '' + node.title + ''+
                '' + (node.level > 1 ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right' )+'"></i>') + ''+
              '</a>'+
              '<ul class="menu-submenu ' + (node.isOpen ? 'menu-submenu-inline' : 'menu-submenu-hidden') + ' ' + (node.level > 1 ? 'menu-submenu-vertical' : '') + '">' +
                render(nodes, renderMenu, renderMenuItem) +
              '</ul>' +
            '</li>';
  }

  function renderMenuItemFold (node) {
    return  '<li  class="menu-item menu-item-l'+node.level+' ' + (node.isSelect ? 'menu-item-selected' : '') +'">' +
              '<a class="menu-title" href="' + node.url + '">'+ 
              ''+(node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +' '+
              '<span class="menu-title-text menu-title-l'+node.level+'">' + node.title + '</span>'+
              '</a>' +
            '</li>';
  }

  function renderMenuFold (node, nodes) {
    return  '<li  class="menu-item menu-item-l'+node.level+' ' + (node.isSelect ? 'menu-item-selected' : '') +' ' + (node.isOpen ? 'menu-item-active' : '') +' ">' +
              '<a href="'+node.url+'" class="menu-title" >'+
                ''+ (node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +''+
                '<span class="menu-title-text menu-title-l'+node.level+'">' + node.title + '</span>'+
              '</a>'+
              '<ul class="menu-submenu menu-submenu-l'+ Number(node.level+1) +' ' + (node.isOpen ? '' : 'menu-submenu-hidden') + ' menu-submenu-' + (node.level === 1 ? 'inline' : 'vertical') + '">' +
                render(nodes, renderMenuFold, renderMenuItemFold) +
              '</ul>' +
            '</li>';
  }

  function render (nodes,renderMenuFun,renderItemFun) {
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
    document.getElementById(options.container1).innerHTML = tpl1;

    var tpl2 = render(statusTree.children, renderMenu, renderMenuItem);
    document.getElementById(options.container2).innerHTML = tpl2;
  }

  function bindEvents() {

    // 折叠的
    document.getElementById(options.container1).addEventListener('click', function(e){
      e.preventDefault();
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var menuTitleStr = 'menu-submenu-title';
      var secondTitleStr = 'menu-title-vertical';
      var targetClass = target.getAttribute('class');
      // 判断是否匹配目标元素
      if (target.nodeName.toLocaleLowerCase() === 'a' ) {
        var url = target.getAttribute("href");
        ViewModel.selectMenuItem(url);
      }
    });

    document.getElementById(options.container1).addEventListener('mouseenter', function(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      
      var targetClass = target.getAttribute("class");

      if (targetClass.indexOf("menu-item") > -1) {
        target.className = '' + targetClass + ' menu-item-active';

        var firstUl = target.getElementsByTagName('ul')[0];
        if (!firstUl)return;
        var firstUlClass = firstUl.getAttribute("class");
        
        firstUl.className = firstUlClass.replace('menu-submenu-hidden', '');
      }
    },true);

    document.getElementById(options.container1).addEventListener('mouseleave', function(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      
      var targetClass = target.getAttribute("class");
     
      if (targetClass.indexOf("menu-item") > -1) {
        target.className = targetClass.replace('menu-item-active', '');

        var firstUl = target.getElementsByTagName('ul')[0];
        if (!firstUl)return;
        var firstUlClass = firstUl.getAttribute("class");
        
        firstUl.className =''+ firstUlClass+' menu-submenu-hidden';
      }
      
    },true);

    // 展开的菜单
    document.getElementById(options.container2).addEventListener('click', function(e){
      e.preventDefault();
      var event = e || window.event;
      var target = event.target || event.srcElement;
      var menuTitleStr = 'menu-submenu-title';
      var secondTitleStr = 'menu-title-vertical';
      var targetClass = target.getAttribute('class');
      // 判断是否匹配目标元素
      if (target.nodeName.toLocaleLowerCase() === 'a' ) {
        var url = target.getAttribute("href");

        if(targetClass.indexOf(secondTitleStr) > -1) return;
        // 有儿子的菜单，点击打开
        if(targetClass.indexOf(menuTitleStr) > -1 ){
          // 已经显示的儿子，点击隐藏
          if(targetClass.indexOf("isOpen") > -1) {
            ViewModel.closeSubMenu(url);
          // 隐藏的儿子，点击出现
          }else {
            ViewModel.openSubMenu(url);
          }
        // 叶子节点，点击选中
        }else{
          ViewModel.selectMenuItem(url);
        }
      }
    });

    document.getElementById(options.container2).addEventListener('mouseenter', function(e){
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
      
    },true);
    
    document.getElementById(options.container2).addEventListener('mouseleave', function(e){
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
    },true);
  }
  function init() {
   

    bindEvents();
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等
  }
  init();
}

export default menuView;
