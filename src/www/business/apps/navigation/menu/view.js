(function viewInit(){
  var ViewModel;
  $.getJSON("./mock.js",function(data){
    console.log(data);
    var navData = {
      menuData: data,
      currentUrl: '/a/a-1/a-1-1',
      render: renderInit
    };
    ViewModel = menuViewModel(navData);
    ViewModel.selectMenuItem('/a/a-1/a-1-1');
  })

  function renderMenuItem (node) {
    return  '<li class="menu-item ' + (node.isSelect ? 'menu-item-selected' : '') +'">' + 
              '<a class="menu-title" href="' + node.url + '">'+ (node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +' ' + node.title + '</a>' +
            '</li>';
  }

  function renderMenu (node, nodes) {
    return  '<li class="menu-item ' + (node.isSelect && !node.isOpen ? 'menu-item-selected' : '') +' ' + (node.parent.parent ? 'menu-item-vertical' : '') + '">' +
              '<div class="menu-title menu-submenu-title ' + (node.isOpen ? 'isOpen' : '' )+' ' + (node.parent.parent ? 'menu-title-vertical' : '') + '"  data-index="'+node.url+'">'+
                ''+ (node.icon ? '<i class="menu-icon-title-alt fa '+node.icon+'"></i>' : '') +''+
                ''+node.title+''+
                '' + (node.parent.parent ? '' : '<i class="menu-icon-angle fa fa-angle-' + (node.isOpen ? 'down' : 'right' )+'"></i>') + ''+
              '</div>'+
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
      if (target.nodeName.toLocaleLowerCase() === 'a') {
        var url = target.getAttribute("href");
        ViewModel.selectMenuItem(url);
      } else if(targetClass.indexOf(menuTitleStr) > -1){
        if(targetClass.indexOf("isOpen") > -1) {
          var url = target.getAttribute("data-index");
          ViewModel.closeSubMenu(url);
        }else {
          var url = target.getAttribute("data-index");
          ViewModel.openSubMenu(url);
        }
      }
    })
    
  }
  init();
} ())