import ViewModel from './view-model';
import { View, Emitter } from './view';
import { createStore } from 'redux';

var store = createStore(reducer),
    initStatus;

// 储存选择节点的状态
var selectStore = {
  oldNode: null,
  newNode: null,
  isEqual: function() {
      return (this.newNode === this.oldNode);
  }   
};

function reducer(status, action) {
  switch (action.type) {
  case 'NODE_SELECT':
    // 可以加一个状态管理，防止多次render，这里的重复点击效果TODO
    // selectStore.newNode = action.key;
    // if (selectStore.isEqual()) return;
    // selectStore.oldNode = action.key;
    return ViewModel.selectNode(action.key);
  case 'NODE_TOGGLE':
    return ViewModel.toggleNode(action.key);
  default:
    return initStatus;
  };
};

function subscribe() {
  
  // 可以手动订阅更新，将事件绑定到视图层。
  store.subscribe(function(){
    
    var newStatus = store.getState();
    View.render(newStatus);
    console.log('控制层里看到生成新的状态树storestate',store.getState());
  });

  Emitter.on('change', function(data){
    console.log("监听到view的变化为", data)
    store.dispatch(data);
  })
}

// 构造一个Menu
function Menu(config) {
	this.config = config;
  this.init();
};

Menu.prototype = {
  
  init: function() {

    // VM 初始，
    //1.在VM内生成初始状态给状态机
    //2.状态机接收变化告知View渲染
    //在此controller内控制VM&View
    //VM只需关心接收action时，操作返回新的状态树
    //View只需关心处理自己的render以及bindEvent
    initStatus = ViewModel.init({
      modelData:this.config.data
    });

    if (this.config.url) {
      ViewModel.selectNode(this.config.url);
    }
    subscribe(); // 订阅store状态机，以及视图上VIEW的动作变化
  
    View.init(); //初始化VIEW，绑定事件
  }
  
}

export default Menu;
