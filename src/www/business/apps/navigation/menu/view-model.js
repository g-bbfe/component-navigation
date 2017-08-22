// 树的层次遍历
function layerTraversal (tree, callback) {
    var queue = [];
    queue.push(tree);
    while (queue.length > 0) {
        parent = queue.pop();
        parent.forEach(function (node) {
            if (Array.isArray(node.children)) {
                queue.unshift(node.children);
            }
            callback(node, parent);
        });
    }
}

// 树的先序遍历
function postOrderTraversal (parent, callback) {
    var siblings = parent.children;
    if (Array.isArray(siblings)) {
        siblings.forEach(function (node) {
            if (Array.isArray(node.children)) {
                postOrderTraversal(node, callback);
            }
            callback(node, parent);
        });
    }
}

// 搜索节点
function searchNode (tree, callback) {
    var children = tree.children;
    var node = null;
    while (Array.isArray(children)) {
        var nodes = children.filter(callback);
        if (nodes.length > 0) {
            node = nodes.pop();
            children = node.children;
        } else {
            break;
        }
    }

    return node;
}

function menuViewModel (options) {
    options = options || {};

    if (!options.menuData) {
        console.log('缺少菜单数据！');
        return;
    }

    if (!options.currentUrl) {
        console.log('缺少当前URL！');
        return;
    }

    if (!options.render) {
        console.log('缺少渲染函数！');
        return;
    }

    var currentUrl = options.currentUrl;
    var render = options.render;

    // 导航栏状态
    var statusTree = {
        title: 'root',
        url: '/',
        isSelect: false,
        isOpen: false,
        children: options.menuData,
        parent: null
    };

    // 状态节点
    // var node = {
    //     title: '',
    //     url: '',
    //     isSelect: '',
    //     isOpen: '',
    //     children: [],
    //     parent: null
    // };

    // 生成状态树
    function initStatusTree() {
        postOrderTraversal(statusTree, function (node, parent) {
            node.isOpen = false;
            node.isSelect = false;
            node.parent = parent;
        });
    };

    // 查找符合当前路径的节点
    function searchNodeByUrl(url) {
        var urls = url.split('/');
        urls.shift();
        urls = urls.map(function (url) {
            return '/' + url;
        });

        url = urls.shift();

        return searchNode(statusTree, function (node) {
            if (node.url === url) {
                url = urls.shift();
                return true;
            } else {
                return false;
            }
        });
    }

    function selectNode(node) {
        var nodeStatus = true;
        node.isSelect = nodeStatus;

        // 更新祖先状态
        while (node.parent) {
            // 更新当前节点的父节点的状态
            var parent = node.parent;
            parent.isSelect = nodeStatus;

            node = parent;
        }
    }

    function unselectNode(tree) {
        var parent = tree;
        var children = parent.children;

        while (parent.isSelect && Array.isArray(children)) {
            parent.isSelect = false;

            children.some(function (node) {
                if (node.isSelect === true) {
                    parent = node;
                    return true;
                } else {
                    return false;
                }
            });

            children = parent.children;
        }
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

    function selectMenuItem (url) {
        var node = searchNodeByUrl(url);
        if (node) {
            unselectNode(statusTree);
            selectNode(node);
            render(statusTree);
        }
    }

    (function init () {
        initStatusTree();
        selectMenuItem(currentUrl);
    } ())

    return {
        selectMenuItem: selectMenuItem,
        openSubMenu: function (url) {
            openNode(url);
            render(statusTree);
        },
        closeSubMenu: function (url) {
            closeNode(url);
            render(statusTree);
        }
    };
}
