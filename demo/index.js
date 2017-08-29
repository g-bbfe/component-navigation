import menu from '../src/www/business/apps/navigation/menu';
import menuData from './mock';
import 'static/styles/demo.less';

import DataSourceProxy from './services/proxy';


function getMenuData() {
    return DataSourceProxy.get('menu.json')
        .then(data => {
            return data.items || [];
        })
}

getMenuData()
    .then(data => {
        // 折叠态
        // $sidebar.className = 'sidebar sidebar-folded';
        new menu({
            // container: "menu-folded",
            data: data,
            url: '/ios/iphone/8'
        });

    })
    .catch(err => {
        console.error(err);
        window.alert(`发生异常: ${err.message}`);
    })


let $sidebar = document.getElementById('sidebar');
let $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
let $menu = document.getElementById('menu');


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

$sidebarToggleBtn.onclick = function() {
    if ($sidebar) {
        toggleClass($sidebar, 'sidebar-folded');
        var ifFold = document.getElementById("sidebar-toggle-btn").className.indexOf("fold") > -1 ? true : false;
        menu({
            container: "menu",
            ifFold: ifFold,
            data: menuData,
            url: '/ios/iphone/8'
        });
    }
}