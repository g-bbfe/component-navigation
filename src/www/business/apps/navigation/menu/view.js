import menuViewModel from './view-model';

function menuView(menuData, currentUrl) {
  var ViewModel = menuViewModel({
      menuData: menuData,
      render: renderInit
  });

  ViewModel.selectMenuItem(currentUrl);

  function renderMenuItem (node) {
    return  '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') +'">' + 
              '<a class="menu-title" href="' + node.url + '">'+ 
              ''+(node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +' '+
              '' + node.title + ''+
               '</a>' +
            '</li>';
  }

  function renderMenu (node, nodes) {
    return  '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') +' ' + (node.parent.parent ? 'menu-item-vertical' : '') + '">' +
              '<a href="'+node.url+'" class="menu-title menu-submenu-title ' + (node.isOpen ? 'isOpen' : '' )+' ' + (node.parent.parent ? 'menu-title-vertical' : '') + '" >'+
                ''+ (node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +''+
                '' + node.title + ''+
                '' + (node.parent.parent ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right' )+'"></i>') + ''+
              '</a>'+
              '<ul class="menu-submenu ' + (node.isOpen ? 'menu-submenu-inline' : 'menu-submenu-hidden') + ' ' + (node.parent.parent ? 'menu-submenu-vertical' : '') + '">' +
                render(nodes) +
              '</ul>' +
            '</li>';
  }

  function render (nodes) {
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

    document.getElementById("menu").addEventListener('click', function(e){
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
        if(targetClass.indexOf(menuTitleStr) > -1){
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

    document.getElementById("menu").addEventListener('mouseenter', function(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      // console.log(target.getAttribute("class"));
      if (target.getAttribute("class").indexOf("menu-item-vertical") > -1) {
        
        var targetClass = target.getAttribute("class");

        if (targetClass.indexOf("selected") > -1) {
          target.className = '' + targetClass + ' isHover';
        }
      }
    },true);
    
    document.getElementById("menu").addEventListener('mouseleave', function(e){
      var event = e || window.event;
      var target = event.target || event.srcElement;
      // console.log(target.getAttribute("class"));
      if (target.getAttribute("class").indexOf("menu-item-vertical") > -1) {
        var targetClass = target.getAttribute("class");

        if (targetClass.indexOf("selected") > -1) {
          target.className = targetClass.replace('isHover', '');
        }
      }
    },true);
  }
  init();
}

export default menuView;
