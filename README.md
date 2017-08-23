# component-navigation
一个导航菜单组件。
导航菜单的功能是将内容信息友好地展示给用户。

## 规则
1. 如果一个节点被选中，其父节点也被选中
2. 父节点打开，子节点全部可见，父节点关闭，子节点全部不可见
3. 导航栏组件不解析URL，解析URL的工作应该由路由控制模块来做
4. 只有叶子节点可以触发loaction的变化
5. 模型层的URL如果是"/a/b/c"，则对应每个节点的URL依次是"/a"，"/a/b"，"/a/b/c"

## 设计
将导航菜单栏抽象成一棵树，对应每个菜单项就是节点。
### 模型层
树

```javascript
[{
        title: "一级菜单1",
        icon: "a.png",
        url: "/a",
        children: [{
                title: "二级菜单1-1",
                url: "/a/a-1"
            },
            {
                title: "二级菜单1-2",
                url: "/a/a-2"
            }
        ]
    },
    {
        title: "一级菜单2",
        url: "/b",
    }
]
```
节点

```javascript
{
    title: "一级菜单1",
    icon: "a.png",
    url: "/a",
    children: []
}
```
### 视图模型层
状态树

```javascript
{
    title: 'root',
    url: '/',
    icon: '',
    isSelect: false,
    isOpen: false,
    children: [{
            title: 'menu1',
            url: '/menu1',
            icon: 'menu1',
            isSelect: false,
            isOpen: false,
            children: [],
            parent: {}
        },
        {
            title: 'menu2',
            url: '/menu2',
            icon: 'menu2',
            isSelect: false,
            isOpen: false,
            parent: {}
        }
    ],
    parent: {}
}
```

节点

```javascript
{
    title: '',
    url: '',
    icon: '',
    isSelect: false,
    isOpen: false,
    children: [],
    parent: {}
}
```

## 接口

| 接口名 | 参数 | 描述 |
|---|---|---|
| A1 | B1 | C1 |
| A2 | B2 | C2 |
| A3 | B3 | C3 |
