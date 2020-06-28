vue组件通信

- props / $emit
- $children / $parent
- provide / inject
- ref
- eventBus
- vuex
- localStorage / sessionStorage
- $attrs / $listeners



父子

#### props / $emit

略



#### $children / $parent

注意：官方不推荐使用，只用于应急

可以取得整个组件对象

$children得到数组，底层子组件取得空数组。

$parent得到对象，根组件取得undefine





#### provide / inject

这里不论子组件嵌套有多深, 只要调用了`inject` 那么就可以注入`provide`中的数据

**provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的**



#### ref / refs

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据



#### eventBus

事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件

eventBus也有不方便之处, 当项目较大,就容易造成难以维护的灾难



#### Vuex

略，见详细文档



#### sessionStorage / localStorage

略



