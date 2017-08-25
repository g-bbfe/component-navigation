import Menu from '../menu';
import menuData from './mock';
import 'static/styles/demo.less';

let $sidebar = document.getElementById('sidebar');
let $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
let $menu = document.getElementById('menu');

// 折叠态
// $sidebar.className = 'sidebar sidebar-folded';
var mymenu = new Menu({
  container1: "menu1",
  container2: "menu2",
  data: menuData,
  url: '/ios/iphone/8'});

// 展开态
// $sidebar.className = 'sidebar';
// menu({container: "menu2",
// ifFold: false,
// data: menuData,
// url: '/ios/iphone/8'});
