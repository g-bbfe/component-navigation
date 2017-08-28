import { ViewModel, Store } from './view-model';
import View from './view';
import { createStore } from 'redux';

var store,
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
    initStatus = ViewModel({
      menuData: this.config.data
    });
    store = createStore(reducer);
    // menuViewModel.selectMenuItem(this.config.url);
    // menuViewModel.init();

    
    this.subscribe();
    // View
    store.dispatch({ type: 'init', key: '/android/mi' });

  },
  subscribe: function() {
    
    // 可以手动订阅更新，将事件绑定到视图层。
    store.subscribe(function(){
      // View.render(statusTree);
      console.log('storestate',store.getState())
    });
  }


}


function reducer(status, action) {
  switch (action.type) {
  case 'NODE_SELECT':
    // return selecNode(action.key);
    return 'select'+action.key;
  case 'NODE_TOGGLE':
    // return toggleNode(action.key);
    return 'toggle'+action.key;
  default:
    return initStatus;
  };
};

//操作视图，将引发变化
// Store.dispatch({ type: 'NODE_SELECT', key: '/android/mi/hongmi' });

export default Menu;
