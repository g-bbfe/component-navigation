import ViewModel from './view-model';
import { View, Emitter } from './view';
import { createStore } from 'redux';

function reducer(status, action) {
  switch (action.type) {
  case 'NODE_SELECT':
    return ViewModel.selectNode(action.key);
    // return 'select'+action.key;
  case 'NODE_TOGGLE':
    return ViewModel.toggleNode(action.key);
    // return 'toggle'+action.key;
  default:
    return initStatus;
  };
};

var store = createStore(reducer),
    initStatus;

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
    //V只需关心处理自己的render以及bindEvent
    initStatus = ViewModel.init({
      modelData:this.config.data,
      curKey:'key' //默认选中节点
    });

    // menuViewModel.selectMenuItem(this.config.url);

    // 订阅
    this.subscribe();
    this.viewOnchange();
    View.init(this.config);
    
  },
  subscribe: function() {
    
    // 可以手动订阅更新，将事件绑定到视图层。
    store.subscribe(function(){
      
      var newStatus = store.getState();
      View.render(newStatus);
      console.log('控制层里看到生成新的状态树storestate',store.getState());
    });
  },

  viewOnchange: function(params) {
    Emitter.on('change', function(data){
      console.log("监听到view的变化为", data)
      store.dispatch(data);
   })
  }


}

export default Menu;
