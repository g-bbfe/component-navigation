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

var defaultId,
    curUrl;

//把状态树平铺
var statusTreeMap = {};

// 储存选择节点的状态
var selectStore = {
    lastNode: null,
    isEqual: function(curNode) {
        return (curNode == this.lastNode);
    }   
};

// 生成store状态机
var Store = createStore(reducer);

function reducer(status, action) {
    switch (action.type) {
    case 'NODE_SELECT':
      return VMHandler.selectNode(action.id);
    case 'NODE_TOGGLE':
      return VMHandler.toggleNode(action.id);
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
        if (node.url == curUrl) {
            defaultId = node.id;
        }
        statusTreeMap[node.id] = node;
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
function searchNode(id) {
    return statusTreeMap[id];
}

// 操作选择节点的属性
function setNodeAttr(node, attr, boolean) {
    node[attr] = boolean;

    // 选择祖先节点
    while (node.parent) {
        // 选中当前节点的父节点
        var parent = node.parent;
        parent[attr] = boolean;

        node = parent;
    }
}

// 选择节点
function VMSelectNode(newPath) {
    var lastPath = selectStore.lastNode;
    if (lastPath) {
        var lastNode = searchNode(lastPath); //current/last
        setNodeAttr(lastNode, 'isSelected',false);
    }
    var newNode = searchNode(newPath);
    if (newNode) {
        setNodeAttr(newNode, 'isSelected', true);  
    }
}

// 传入节点,toggle其展开（isOpen）属性
function VMToggleNode(key) {
    var node = searchNode(key);//
    if (node != null) {
        node.isOpen = !node.isOpen;
    }
}

// 主要处理，select & toggle
var VMHandler = {
    selectNode: function(key) {

        // 两次Key相同，直接返回状态树
        
        if (selectStore.isEqual(key)) return statusTree;
        
        VMSelectNode(key);
        selectStore.lastNode = key;
        console.log('VM中选中的路径',key);
        return statusTree;
    },
    toggleNode: function(key) {
        console.log('VM中需要toggle的路径',key);
        VMToggleNode(key);
        return statusTree;
    }
}

// 对外暴露的方法，外部只能执行初始方法
var ViewModel = {
    init: function(params) {
        curUrl = params.url;
        statusTree.children = params.modelData;
        initStatusTree();
        console.log('平铺的',statusTreeMap);
        
        if (curUrl) {
            Store.dispatch({type: 'NODE_SELECT', id: defaultId}); 
        } else {
            Store.dispatch({type: 'DEFAULT'});
        }
            
    }
}
export {ViewModel,Store};
