import menu from './view';
import menuData from './mock';
import 'static/styles/demo.less';

menu({container: "menu",
    data: menuData,
    url: '/ios/iphone/8'});