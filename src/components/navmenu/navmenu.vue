<template>

  <div class="sidebar" :class="foldClass" id="sidebar">
    <a class="sidebar-toggle-btn" id="sidebar-toggle-btn" @click="toggleFold">
      <span class="lines"></span>
    </a>
    <aside class="aside">
        <div class="logo">LOGO</div>
        <nav class="menu-root">
            <ul class="menu-list" id="menu-folded" v-show="foldUl">
              <li v-for="(node,index) in statusTree" class="menu-item menu-item-l1" :key="node.id"
               :class="(node.isOpen?'menu-item-hover ':'') + (node.isSelected?'menu-item-selected':'')" 
               @mouseenter="setHover(node.id)"
               @mouseleave="setHover(node.id)" >
                <a class="menu-title" :index="'a'+index"
                    @click="node.children?'':selectNode(node.id)"
                    :class="node.children?'':'menu-title-no-children'" >
                  <i v-if="node.icon" class="menu-icon-title-alt fa" :class="node.icon"></i>
                  <span v-if="node.children" class="menu-title-text menu-title-l1">{{node.title}}</span>
                </a>
                <ul v-if="node.children" class="menu-submenu menu-submenu-l2 menu-submenu-vertical" :id="node.id" v-show="node.isOpen">
                  <li v-for="nodeSec in node.children" class="menu-item menu-item-l2" :key="nodeSec.id"
                  :class="(nodeSec.isSelected?'menu-item-selected ':'') + (nodeSec.isOpen?'menu-item-hover ':'')" 
                  @mouseenter="setHover(nodeSec.id)" 
                  @mouseleave="setHover(nodeSec.id)">
                    <a :data-id='nodeSec.id' class="menu-title"   
                        @click="nodeSec.children?'':selectNode(nodeSec.id)"
                        :class="nodeSec.children?'':'menu-title-no-children'"
                        :href="'/#'+nodeSec.url">
                      <span class="menu-title-text menu-title-l2">{{nodeSec.title}}</span>
                    </a>
                    <ul v-if="nodeSec.children" class="menu-submenu menu-submenu-l3 menu-submenu-vertical"  v-show="nodeSec.isOpen">
                      <li v-for="nodeThir in nodeSec.children" class="menu-item menu-item-l3" 
                          :key="nodeThir.id"
                          :class="nodeThir.isSelected?'menu-item-selected':''" >
                        <a :data-id='nodeThir.id' :href="'/#'+nodeThir.url" class="menu-title" @click="selectNode(nodeThir.id)" >
                          <span class="menu-title-text menu-title-l3">{{nodeThir.title}}</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="menu-list" id="menu-unfold" v-show="unfoldUl">
            </ul>
        </nav>
    </aside>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'navmenu',
    beforeCreate () {
      // console.log('执行beforecreate',this.menuData)
      
    },
    beforeMount (){
      console.log('执行beforemounted',this.menuData);
    },
    mounted () {

      console.log('执行mounted',this.menuData);
      
    },
    data () {
      console.log('执行data');
      
      var statusTree = {
        title: 'root',
        url: '/',
        isSelected: false,
        isOpen: true,
        level: 0,
        children: this.menuData,
        parent: null
      };
      var statusTreeMap = {};
      var id = 1;
      // 必须保证父级元素已经遍历
      var queue = [];
      queue.push(statusTree);
      while (queue.length > 0) {
          var parent = queue.pop();
          if (Array.isArray(parent.children)) {
              parent.children.forEach(function (node) {
                queue.unshift(node);
                node.id = id++;
                Vue.set(node,'isOpen', false);
                Vue.set(node,'isSelected', false);
                node.parent = parent;
                statusTreeMap[node.id] = node;
                // node.level = getNodeLevel(node);
              });
          }
      }
      console.log('menuuuuuuuuuu', this.menuData);
      return {
          items: this.menuData,
          fold: true,
          foldClass: 'sidebar-folded',
          foldUl: true,
          unfoldUl: false,
          id1:false,
          lastNodeId: '',
          statusTree : statusTree.children,

          statusTreeMap: statusTreeMap
      } 
    },
    props:['menuData'],
    methods:{
        foldHover (index) {
          console.log(index);
          // this.handleItems = null;
          console.log(this.handleItems);
          this.index = !this.index;
          this.test = !this.test;
        },
        toggleFold () {
          this.fold = !this.fold;
          this.foldClass = this.fold ? 'sidebar-folded' : '';
          this.foldUl = this.unfoldUl;
          this.unfoldUl = !this.unfoldUl;
        },
        setHover: function(id) {
          // this.statusTree[7].isOpen = true;
          // this.$set(this.statusTree,7, this.statusTree[7]);

          var node = this.searchNode(id);//
          if (node != null) {
              node.isOpen = !node.isOpen;
          }
        },
        selectNode: function (id) {
          var curNode = this.searchNode(id);
          var lastNode = this.searchNode(this.lastNodeId);
          if(lastNode) this.setNodeAttr(lastNode, 'isSelected', false);
          this.setNodeAttr(curNode, 'isSelected', true);
          this.lastNodeId = id;
          this.$emit('select_NODE',{url:curNode.url});
        },
        setNodeAttr: function (node, attr, val) {
          node[attr] = val;

          // 选择祖先节点
          while (node.parent) {
              // 选中当前节点的父节点
              var parent = node.parent;
              parent[attr] = val;

              node = parent;
          }
        },
        searchNode: function (id) {
          return this.statusTreeMap[id];
        }
       
    },
    watch: {
      // 如果 statusTree 发生改变，这个函数就会运行
      statusTree: {
        handler:function () {
          console.log('watch里面', this.statusTree);
          return this.statusTree
        },
        deep:true
      }
    },
    computed: {
      handleItems: {
        get: function () {
          console.log(this.statusTree);
          return this.statusTree.children;
        },

        set: function (params) {
          this.statusTree.children[0].isOpen = true;
          console.log(params)
        }
        
        
      }

      

    }
}
</script>

<style>
  .menu-root a {
  display: inline-block;
  text-decoration: none;
  }
  .menu-root a,
  .menu-root a:link,
  .menu-root a:visited,
  .menu-root a:hover,
  .menu-root a:active {
    color: rgba(255, 255, 255, 0.6);
  }
  .menu-root .menu-item {
    transition: all 0.3s ease-in-out;
    position: relative;
  }
  .menu-root .menu-item:not(.menu-item-selected) > .menu-title:hover {
    color: rgba(255, 255, 255, 0.8);
    background-color: #1c212d;
    box-shadow: inset 0px 1px 0px 0px #2b3447;
  }
  .menu-root .menu-title {
    transition: all 0.3s ease-in-out;
    width: 100%;
    display: block;
    height: 50px;
    line-height: 50px;
    padding-left: 25px;
    padding-right: 20px;
    overflow: hidden;
    cursor: pointer;
  }
  .menu-root .menu-item-selected > .menu-title {
    color: rgba(255, 255, 255, 0.8);
    background-color: #1c212d;
    box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;
  }
  .menu-root .menu-item-selected.menu-item-unfold-hover > .menu-title {
    box-shadow: none;
  }
  .menu-root .menu-item-selected .menu-icon-title-alt,
  .menu-root .menu-item-selected .menu-icon-angle {
    color: rgba(255, 255, 255, 0.6);
  }
  .menu-root .menu-submenu {
    position: relative;
  }
  .menu-root .menu-submenu-hidden {
    display: none;
  }
  .menu-root .menu-submenu .menu-item {
    background-color: #262c3c;
  }
  .menu-root .menu-submenu .menu-item:not(.menu-item-selected) > .menu-title:hover {
    box-shadow: inset 1px 0px 0px 0px #262c3c;
  }
  .menu-root .menu-submenu .menu-title {
    padding-left: 65px;
  }
  .menu-root .menu-submenu-inline > .menu-item:before {
    position: absolute;
    display: block;
    content: ' ';
    left: 51px;
    top: 50%;
    margin-top: -2px;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: white;
  }
  .menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical {
    position: absolute;
    top: 0px;
    left: 200px;
    background-color: #262c3c;
    display: block;
    z-index: 2;
  }
  .menu-root .menu-submenu .menu-item:hover .menu-submenu-vertical .menu-item {
    box-shadow: inset 1px 0px 0px 0px #2b3447;
  }
  .menu-root .menu-submenu-vertical {
    width: 150px;
    overflow: visible;
    display: none;
  }
  .menu-root .menu-submenu-vertical .menu-item {
    background-color: rgba(38, 44, 60, 0.98);
  }
  .menu-root .menu-submenu-vertical .menu-title {
    padding-left: 36px;
    text-align: left;
    font-size: 12px;
  }
  .menu-root [class|=menu-icon] {
    width: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.4);
  }
  .menu-root .menu-icon-title-alt {
    margin-right: 10px;
  }
  .menu-root .menu-icon-angle {
    float: right;
    line-height: 50px;
  }
  .sidebar-folded .menu-root .menu-submenu {
    display: none;
  }
  .sidebar-folded .menu-root .menu-submenu > .menu-item:not(.menu-item-selected) > .menu-title:hover {
    box-shadow: inset 0px 1px 0px 0px #2b3447;
  }
  .sidebar-folded .menu-root .menu-submenu-vertical .menu-item {
    box-shadow: inset 1px 0px 0px 0px #3a435b;
  }
  .sidebar-folded .menu-root .menu-item {
    transition: all 0.3s ease-in-out;
  }
  .sidebar-folded .menu-root .menu-item.menu-item-l1 {
    width: 65px;
  }
  .sidebar-folded .menu-root .menu-item .menu-submenu-vertical {
    width: 150px;
  }
  .sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l1 {
    width: 150px;
    display: none;
  }
  .sidebar-folded .menu-root .menu-item .menu-title-text.menu-title-l2 {
    margin-left: 10px;
  }
  .sidebar-folded .menu-root .menu-item.menu-item-hover:not(.menu-item-selected) > .menu-title:hover {
    box-shadow: inset 0px 1px 0px 0px #2b3447;
  }
  .sidebar-folded .menu-root .menu-item.menu-item-hover.menu-item-selected > .menu-title-no-children {
    box-shadow: inset 3px 0px 0px 0px #709d63, inset 0px 1px 0px 0px #2b3447;
  }
  .sidebar-folded .menu-root .menu-item.menu-item-hover > .menu-title {
    color: rgba(255, 255, 255, 0.8);
    background-color: #1c212d;
    box-shadow: inset 0px 1px 0px 0px #2b3447;
  }
  .sidebar-folded .menu-root .menu-item.menu-item-hover .menu-title-l1 {
    padding-left: 15px;
    display: inline-block;
    width: 150px;
    position: absolute;
    left: 65px;
    top: 0;
    background-color: #1c212d;
  }
  .sidebar-folded .menu-root .menu-item .menu-title-text {
    display: inline-block;
  }
  .sidebar-folded .menu-root .menu-item .menu-submenu-l2 > .menu-item:before {
    position: absolute;
    display: block;
    content: ' ';
    left: 31px;
    top: 50%;
    margin-top: -2px;
    width: 4px;
    height: 4px;
    border-radius: 2px;
    background-color: white;
  }
  .sidebar-folded .menu-root .menu-item .menu-submenu {
    transition: all 0.3s ease-in-out;
    display: block;
    position: absolute;
  }
  .sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-hidden {
    display: none;
  }
  .sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l2 {
    left: 65px;
  }
  .sidebar-folded .menu-root .menu-item .menu-submenu.menu-submenu-l3 {
    top: 0;
    left: 150px;
  }
  * {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
  }
  ul,
  li {
    list-style: none;
  }
  body {
    display: flex;
    width: 100vw;
    height: 100vh;
  }
  .sidebar {
    position: relative;
    width: 200px;
    z-index: 1;
    overflow-x: visible;
    transition: all 0.3s ease-in-out;
  }
  .sidebar .logo {
    height: 65px;
    background-color: #3e4b67;
    line-height: 65px;
    text-align: center;
  }
  .sidebar .menu-root {
    position: relative;
    background: #354059;
    width: 100%;
    overflow-x: visible;
  }
  .sidebar-toggle-btn {
    float: right;
    display: flex;
    width: 65px;
    height: 65px;
    margin-right: -65px;
    justify-content: center;
    align-items: center;
    background: #fafafc;
    line-height: 65px;
    color: #2b3447;
    cursor: pointer;
  }
  .sidebar-toggle-btn .lines {
    transition: all 0.3s ease-in-out;
    position: relative;
    height: 13px;
    width: 16px;
    background: repeating-linear-gradient(to bottom, #709d63 0px, #709d63 2px, transparent 2px, transparent 5px);
  }
  .sidebar-toggle-btn .lines:before {
    display: inline-block;
    position: absolute;
    content: ' ';
    top: 0px;
    right: 0px;
    width: 12px;
    height: 13px;
    background-color: #dfe1e7 ;
    background: repeating-linear-gradient(to bottom, #dfe1e7 0px, #dfe1e7 2px, transparent 2px, transparent 5px);
  }
  .sidebar-folded {
    width: 65px;
  }
  .sidebar-folded .sidebar-toggle-btn .lines:before {
    width: 0px;
  }
  .main-container {
    flex: 1;
    z-index: 0;
    background-color: #ededed;
  }
  .main-container .header {
    width: 100%;
    height: 65px;
    background-color: #ccc;
  }
  .main-container .main-content {
    padding: 15px;
  }
</style>
