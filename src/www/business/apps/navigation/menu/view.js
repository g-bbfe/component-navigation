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
  })

  function renderMenuItem (node) {
    return  '<li class="bb-menu-item ' + (node.isSelect ? 'isSelect' : '') +'">' + 
              '<a href="' + node.url + '">' + node.title + '</a>' +
            '</li>';
  }

  function renderMenu (node, nodes) {
    return  '<li class="bb-menu-submenu">' +
              '<div class="bb-menu-submenu-title ' + (node.isOpen ? 'isOpen' : '' )+'"  data-index="'+node.url+'">'+
                ''+ (node.icon ? '<i class="'+node.icon+'"></i>' : '') +''+node.title+''+
              '</div>'+
              '<ul class="bb-menu ' + (node.isOpen ? 'isOpen' : '') + '">' +
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
    $("#menu").html(tpl);
  }

  function init() {
    // 1.获取状态树，按状态树渲染 render();
    // 2.交互时，调用VM方法更新状态树，update view
    // eg:mouseenter、click等

    $("#menu").on('click', '.bb-menu-submenu-title.isOpen', function() {
      var url = $(this).data('index');
      ViewModel.closeSubMenu(url);
    })

    $("#menu").on('click', '.bb-menu-submenu-title:not(.isOpen)', function() {
      var url = $(this).data('index');
      ViewModel.openSubMenu(url);
    })

    $("#menu").on('click', 'a', function(){
      event.preventDefault();
      var url = $(this).attr('href');
      ViewModel.selectMenuItem(url);
    })
    
  }
  init();
} ())