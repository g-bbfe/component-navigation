// 树的先序遍历
function postOrderTraversal(parent, callback) {
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

    if (!options.render) {
        console.log('缺少渲染函数！');
        return;
    }

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
            render(statusTree);
        }
    }

    (function init() {
        initStatusTree();
    }())

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

// export default menuViewModel;
