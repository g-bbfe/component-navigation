import { createStore } from 'redux';

// 状态树
var statusTree = {
    title: 'root',
    url: '/',
    isSelect: false,
    isOpen: true,
    level: 0,
    children: null,
    parent: null
}; //给一个初始值

//把状态树平铺
var statusTreeMap = [];

// 储存选择节点的状态
var selectStore = {
    oldNode: null,
    newNode: null,
    isEqual: function() {
        return (this.newNode === this.oldNode);
    }   
};

// 生成store状态机
var Store = createStore(reducer);

function reducer(status, action) {
    switch (action.type) {
    case 'NODE_SELECT':
      return ViewModel.selectNode(action.id);
    case 'NODE_TOGGLE':
      return ViewModel.toggleNode(action.id);
    case 'INIT':
        return ViewModel.selectNode(action.url);
    default:
      return statusTree;
    }
}



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
        statusTreeMap.push(node);
    });
}

// 根据祖先的个数确定层级
function getNodeLevel(node) {
    var level = 0;
    while (node.parent) {
        level++;
        node = node.parent;
    }

    return level;
}

// 通过传入ID或url查找节点
function searchNodeByTwoWays(param) {
    var curNode;
    statusTreeMap.some(function(element) {
        if ((element.id == param) || (element.url == param)) {
            return curNode = element;
        }
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
function VMSelectNode(newPath) {
    var oldPath = selectStore.oldNode;
    if (oldPath) {
        var oldNode = searchNodeByTwoWays(oldPath);
        selectNodeAttr(oldNode, false);
    }
    var newNode = searchNodeByTwoWays(newPath);
    if (newNode) {
        selectNodeAttr(newNode, true);  
    }
}

// 传入节点,toggle其展开（isOpen）属性
function VMToggleNode(key) {
    var node = searchNodeByTwoWays(key);
    if (node != null) {
        node.isOpen = !node.isOpen;
    }
}

var ViewModel = {
    init: function(params) {
        var defaultUrl = params.url;
        statusTree.children = params.modelData;
        initStatusTree();
        console.log('平铺的',statusTreeMap);
        
        if (defaultUrl) {
            Store.dispatch({type: 'INIT', url: defaultUrl});
        } else {
            Store.dispatch({type: 'DEFAULT'})
        }
            
    },
    selectNode: function(key) {

        // 两次Key相同，直接返回状态树
        selectStore.newNode = key;
        if (selectStore.isEqual()) return statusTree;
        
        VMSelectNode(key);
        selectStore.oldNode = key;
        console.log('VM中选中的路径',key);
        return statusTree;
    },
    toggleNode: function(key) {
        console.log('VM中需要toggle的路径',key);
        VMToggleNode(key);
        return statusTree;
    }
}
export {ViewModel,Store};
