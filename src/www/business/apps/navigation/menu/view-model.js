// 状态树
var statusTree = {
    title: 'root',
    url: '/',
    isSelect: false,
    isOpen: true,
    level: 0,
    children: null,
    parent: null
}; //给一个初始值TODO



// 储存选择节点的状态
var selectStore = {
    oldNode: null,
    newNode: null,
    isEqual: function() {
        return (this.newNode === this.oldNode);
    }
    
};

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

//平铺
function mapStatusTree() {
    var statusTreeMap = []; //把状态树平铺
    layerTraversal(statusTree, function (node, parent) {
       statusTreeMap.push(node);
    });

    return statusTreeMap;
}

// 生成状态树
function initStatusTree() {
    var id = 1;
    // 必须保证父级元素已经遍历
    layerTraversal(statusTree, function (node, parent) {
        node.id = id++;
        node.isOpen = false;
        node.isSelect = false;
        node.parent = parent;
        node.level = getNodeLevel(node);
    });
};

// 根据祖先的个数确定层级
function getNodeLevel(node) {
    var level = 0;
    while (node.parent) {
        level++;
        node = node.parent;
    }

    return level;
}

// 通过传入ID查找节点
function searchNodeById(id) {
    var mapTree = mapStatusTree();
    var curNode;
    mapTree.some(function(element) {
        if (element.id == id) {
            // return false;
            curNode = element;
            return element;
            
        }
        console.log(element)
    });
    return curNode;
}

// 操作选择节点的属性
function selectNodeAttr(node, ifSelected) {
    node.isSelect = ifSelected;

    // 选择祖先节点
    while (node.parent) {
        // 选中当前节点的父节点
        var parent = node.parent;
        parent.isSelect = ifSelected;

        node = parent;
    }
}

// 选择节点
function selectNode(newPath) {
    var oldPath = selectStore.oldNode;
    if (oldPath) {
        var oldNode = searchNodeById(oldPath);
        // var oldNode = searchNodeByUrl(oldPath);
        selectNodeAttr(oldNode, false);
    }
    var newNode = searchNodeById(newPath);
    // var newNode = searchNodeByUrl(newPath);
    selectNodeAttr(newNode, true);
}

// 传入节点,toggle其展开（isOpen）属性
function toggleNode(url) {
    var node = searchNodeById(url);
    // var node = searchNodeByUrl(url);
    if (node != null) {
        node.isOpen = !node.isOpen;
    }
}

var ViewModel = {
    init: function(params) {
        statusTree.children = params.modelData;
        // params.curKey; TODO,默认选中一个节点
        initStatusTree();
        console.log('平铺的',mapStatusTree());
        console.log('查找的node',searchNodeById(2));
        
        return statusTree;
    },
    selectNode: function(url) {
        selectStore.newNode = url;
        if (selectStore.isEqual()) return;
        
        selectNode(url);
        selectStore.oldNode = url;
        console.log('VM中选中的路径',url);
        return statusTree;
    },
    toggleNode: function(url) {
        console.log('VM中需要toggle的路径',url);
        toggleNode(url);
        return statusTree;
    }
}
export default ViewModel;
