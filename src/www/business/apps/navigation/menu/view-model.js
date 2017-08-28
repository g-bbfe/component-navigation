import { createStore } from 'redux';

var statusTree; //给一个初始值TODO
var store; //状态机TODO

// 树的层次遍历
function layerTraversal (tree, callback) {
    var queue = [];
    queue.push(tree);
    while (queue.length > 0) {
        var parent = queue.pop();
        if (Array.isArray(parent.children)) {
            parent.children.forEach(function (node) {
                queue.unshift(node);
                callback(node, parent);
            });
        }
    }
}

// 根据条件，遍历树，返回符合条件的最深的节点
function conditionalTraversal(tree, condition) {
    var node = null;
    var children = tree.children;

    if (condition(tree)) {
        while (Array.isArray(children)) {
            var nodes = children.filter(condition);
            if (nodes.length > 0) {
                node = nodes.pop();
                children = node.children;
            } else {
                break;
            }
        }
    }

    return node;
}

function menuViewModel(options) {
    options = options || {};

    if (!options.menuData) {
        console.log('缺少菜单数据！');
        return;
    }


    // 导航栏状态
    // var statusTree = {
    statusTree = {
        title: 'root',
        url: '/',
        isSelect: false,
        isOpen: true,
        level: 0,
        children: options.menuData,
        parent: null
    };

    initStatusTree();
    return statusTree;
    store = createStore(reducer);

    console.log('statusTree',statusTree)
    // 状态节点
    // var node = {
    //     title: '',
    //     url: '',
    //     isSelect: '',
    //     isOpen: '',
    //     children: [],
    //     parent: null
    // };

    // // 根据祖先的个数确定层级
    // function getNodeLevel(node) {
    //     var level = 0;
    //     while (node.parent) {
    //         level++;
    //         node = node.parent;
    //     }

    //     return level;
    // }

    // // 生成状态树
    // function initStatusTree() {
    //     // 必须保证父级元素已经遍历
    //     layerTraversal(statusTree, function (node, parent) {
    //         node.isOpen = false;
    //         node.isSelect = false;
    //         node.parent = parent;
    //         node.level = getNodeLevel(node);
    //     });
    // };

    // function searchNodeByUrl(url) {
    //     var urls = [];
    //     // 根据URL生成查找路径
    //     url.split('/').slice(1).reduce(function (string1, string2) {
    //         var url = string1 + '/' + string2;
    //         urls.push(url);
    //         return url;
    //     }, '');

    //     // 根节点默认'/'
    //     url = '/';

    //     return conditionalTraversal(statusTree, function (node) {
    //         if (node.url === url) {
    //             url = urls.shift();
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    // function selectNode(node) {
    //     node.isSelect = true;

    //     // 选择祖先节点
    //     while (node.parent) {
    //         // 选中当前节点的父节点
    //         var parent = node.parent;
    //         parent.isSelect = true;

    //         node = parent;
    //     }
    // }

    // // 从根节点开始，依次向下寻找被选中的节点，并将其改为未选中
    // function unselectNode(tree) {
    //     conditionalTraversal(tree, function (node) {
    //         if (node.isSelect === true) {
    //             node.isSelect = false;
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    // function openNode(url) {
    //     var node = searchNodeByUrl(url);
    //     if (node != null) {
    //         node.isOpen = true;
    //     }
    // }

    // function closeNode(url) {
    //     var node = searchNodeByUrl(url);
    //     if (node != null) {
    //         node.isOpen = false;
    //     }
    // }

    // function selectMenuItem(url) {
    //     var node = searchNodeByUrl(url);
    //     if (node) {
    //         unselectNode(statusTree);
    //         selectNode(node);
    //     }
    // }

    // (function init() {
    //     initStatusTree();
    //     store = createStore(reducer);
    // }())

    // return {
    //     selectMenuItem: selectMenuItem,
    //     openSubMenu: function (url) {
    //         openNode(url);
    //     },
    //     closeSubMenu: function (url) {
    //         closeNode(url);
    //     }
    // };
}

// menuViewModel.prototype = {
    // 根据祖先的个数确定层级
    function getNodeLevel(node) {
        var level = 0;
        while (node.parent) {
            level++;
            node = node.parent;
        }

        return level;
    }

    // 生成状态树
    function initStatusTree() {
        // 必须保证父级元素已经遍历
        layerTraversal(statusTree, function (node, parent) {
            node.isOpen = false;
            node.isSelect = false;
            node.parent = parent;
            node.level = getNodeLevel(node);
        });
    };

    function searchNodeByUrl(url) {
        var urls = [];
        // 根据URL生成查找路径
        url.split('/').slice(1).reduce(function (string1, string2) {
            var url = string1 + '/' + string2;
            urls.push(url);
            return url;
        }, '');

        // 根节点默认'/'
        url = '/';

        return conditionalTraversal(statusTree, function (node) {
            if (node.url === url) {
                url = urls.shift();
                return true;
            } else {
                return false;
            }
        });
    }

    function selectNode(node) {
        node.isSelect = true;

        // 选择祖先节点
        while (node.parent) {
            // 选中当前节点的父节点
            var parent = node.parent;
            parent.isSelect = true;

            node = parent;
        }
    }

    // 从根节点开始，依次向下寻找被选中的节点，并将其改为未选中
    function unselectNode(tree) {
        conditionalTraversal(tree, function (node) {
            if (node.isSelect === true) {
                node.isSelect = false;
                return true;
            } else {
                return false;
            }
        });
    }

    function openNode(url) {
        var node = searchNodeByUrl(url);
        if (node != null) {
            node.isOpen = true;
        }
    }

    function closeNode(url) {
        var node = searchNodeByUrl(url);
        if (node != null) {
            node.isOpen = false;
        }
    }

    function selectMenuItem(url) {
        var node = searchNodeByUrl(url);
        if (node) {
            unselectNode(statusTree);
            selectNode(node);
        }
    }

// }

// export default menuViewModel;




export {
    menuViewModel as ViewModel,
    store as Store
};
