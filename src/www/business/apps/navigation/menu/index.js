import menu from './view';
import menuData from './mock';
import 'static/styles/demo.less';

let $sidebar = document.getElementById('sidebar');
let $sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
let $menu = document.getElementById('menu');

// 折叠态
$sidebar.className = 'sidebar sidebar-folded';
menu({container: "menu",
ifFold: true,
data: menuData,
url: '/ios/iphone/8'});

// 展开态
// $sidebar.className = 'sidebar';
// menu({container: "menu",
// ifFold: false,
// data: menuData,
// url: '/ios/iphone/8'});


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
        var ifFold = document.getElementById("sidebar-toggle-btn").className.indexOf("fold")>-1? true : false;
        
    }
}
