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

// 搜索节点，从根节点按层次向下搜索
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

    function searchNodeByUrl(url) {
        var urls = [];
        // 根据URL生成查找路径
        url.split('/').slice(1).reduce(function (string1, string2) {
            var url = string1 + '/' + string2;
            urls.push(url);
            return url;
        }, '');

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
        node.isSelect = true;

        // 更新祖先状态
        while (node.parent) {
            // 更新当前节点的父节点的状态
            var parent = node.parent;
            parent.isSelect = true;

            node = parent;
        }
        console.log(statusTree);
    }

    function unselectNode(tree) {
        var parent = tree;
        var children = parent.children;

        while (parent.isSelect) {
            parent.isSelect = false;

            if (Array.isArray(children)) {
                children.some(function (node) {
                    if (node.isSelect === true) {
                        parent = node;
                        return true;
                    } else {
                        return false;
                    }
                });
            }

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

export default menuViewModel;
