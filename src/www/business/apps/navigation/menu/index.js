import ViewModel from './view-model';
import { View, Emitter } from './view';
import { createStore } from 'redux';

function reducer(status, action) {
  switch (action.type) {
  case 'NODE_SELECT':
    return ViewModel.selectNode(action.key);
  case 'NODE_TOGGLE':
    return ViewModel.toggleNode(action.key);
  default:
    return initStatus;
  };
};

var store = createStore(reducer),
    initStatus;

function viewOnchange(params) {
  Emitter.on('change', function(data){
    console.log("监听到view的变化为", data)
    store.dispatch(data);
  })
}
function subscribe() {
  
  // 可以手动订阅更新，将事件绑定到视图层。
  store.subscribe(function(){
    
    var newStatus = store.getState();
    View.render(newStatus);
    console.log('控制层里看到生成新的状态树storestate',store.getState());
  });
}

function Menu(config) {
  console.log(this);
	this.config = config;
  this.init();
};

Menu.prototype = {
  
  init: function() {

    // VM 初始，
    //1.在VM内生成初始状态给状态机
    //2.状态机接收变化告知View渲染
    //在此controller内控制VM/M
    //VM只需关心接收action时，操作返回新的状态树
    //View只需关心处理自己的render以及bindEvent
    initStatus = ViewModel.init({
      modelData:this.config.data
    });

    if (this.config.url) {
      ViewModel.selectNode(this.config.url);
    }
    subscribe(); // 订阅store状态机
    
    viewOnchange(); // 监听View上动作
  
    View.init(this.config); //初始化VIEW，绑定事件
  }
  
}


let $sidebar = document.getElementById('sidebar');
let $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
let $menuFolded = document.getElementById('menu-folded');
let $menuUnfold = document.getElementById('menu-unfold');

const hasClass = function hasClass($el, className) {
    let classNamesArr = $el.className.split(' ');
    return classNamesArr.indexOf(className) > -1;
}

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

const toggleShowHide = function toggleShowHide($elFolded, $elUnfold) {
  $elFolded.style.display = $elFolded.style.display == 'block' ? 'none':'block';
  $elUnfold.style.display = $elUnfold.style.display == 'block' ? 'none':'block';
  
}
$sidebarToggleBtn.onclick = function() {
    if ($sidebar) {
        toggleClass($sidebar, 'sidebar-folded');
        toggleShowHide($menuFolded, $menuUnfold);
    }
}

export default Menu;
