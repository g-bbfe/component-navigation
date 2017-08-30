import { ViewModel, Store } from './view-model';
import { View, Emitter } from './view';

function subscribe() {
  
  // VM更新,通知view
  Store.subscribe(function(){  
    var newStatus = Store.getState(); // VM状态树变化，生成新状态
    Emitter.emit('viewEmitterFromC', newStatus); // 将新状态告诉View
    console.log('控制层里看到生成新的状态树Storestate',Store.getState());
  });

  // View上面传递过来的事件，我们把它dispatch给VM
  Emitter.on('viewEmitterToC', function(data){
    console.log("监听到view的变化为", data)
    Store.dispatch(data);
  });
}

// 构造一个Menu
function Menu(config) {
	this.config = config;
  this.init();
}

Menu.prototype = {
  
  init: function() {
    //在此controller内控制VM&View

    subscribe(); // 1.状态机管理，VM更新,会通知view & 视图上VIEW的动作变化，会通知VM

    View.init(); // 2.初始化VIEW，绑定事件,内部会监听controller派发出的事件

    ViewModel.init({
      modelData:this.config.data,
      url: this.config.url
    });
    // 3.初始化VM
    // (1)在VM内生成store
    // (2)VM接收controller传递过来的action，VM状态变化通知Controller
  }
}

export default Menu;
