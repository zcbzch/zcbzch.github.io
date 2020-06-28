# Vue 记录

### MVVM 

```javascript
Object.defineProperty(obj, property, {
	value: ''
	configurable: true,
	writable: true,
	enumerable: true,
	// get,set设置时不能设置writable和value
	get() {}
	set(val) {}
})
```

https://juejin.im/post/5abdd6f6f265da23793c4458

https://juejin.im/post/5cd8a7c1f265da037a3d0992#heading-11

https://juejin.im/entry/5923973da22b9d005893805a

### $nextTick

https://juejin.im/post/5cd9854b5188252035420a13



1.当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

2.当你修改数组的长度时，例如：`vm.items.length = newLength`

对于第一种情况，可以使用：`Vue.set(example1.items, indexOfItem, newValue)`；而对于第二种情况，可以使用 `vm.items.splice(newLength)`

`arrayMethods` 首先继承了 `Array`，然后对数组中所有能改变数组自身的方法，如 `push、pop` 等这些方法进行重写。重写后的方法会先执行它们本身原有的逻辑，并对能增加数组长度的 3 个方法 `push、unshift、splice` 方法做了判断，获取到插入的值，然后把新添加的值变成一个响应式对象，并且再调用 `ob.dep.notify()` 手动触发依赖通知，这就很好地解释了之前的示例中调用 `vm.items.splice(newLength)` 方法可以检测到变化



### 双向绑定

Proxy 和 Object.defineProperty 的优劣

Object.defineProperty：

1. 无法监听数组变化（并不是无法实现，而是基于性能/体验考虑，放弃了实现，对于数组新增属性需要手动Observe。作者封装重写了Array上的七种方法（push, pop, shift, unshift, splice, sort, reverse）但是还是有不少坑）
2. 需要监听对象属性，有时候需要深度遍历才能监听

Proxy：

Proxy在ES2015规范中被正式发布,它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

1. 可以监听数组变化
2. 直接监听对象
3. 有多种拦截方法，返回新对象可操作，浏览器厂商会重点优化性能。。。

https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf#heading-15

https://mp.weixin.qq.com/s/O8iL4o8oPpqTm4URRveOIA



### Vue组件间通信

1. 父子Props通信
2. Event bus通信
3. Vuex全局状态管理

Event bus的介绍

https://juejin.im/post/5bb355dae51d450ea4020b42

Event bus的实现

https://juejin.im/post/5ac2fb886fb9a028b86e328c#heading-3



### diff算法

在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。（逐层比较）



#### 问答

> Q：Vue双向绑定的原理？数据劫持+发布订阅模式如何实现？
>
> 双向绑定通过数据劫持，发布订阅模式的方式实现；
>
> 首先将传入的data进行递归，给每一层的每个属性都设置一个监听器Observer，用来劫持数据，并用Object.defineProperty为每一个属性绑定get和set（Vue2.x）Vue3.x将使用Proxy代替（见双向绑定）
>
> 在get中添加订阅者，在set中通知订阅者。
>
> 订阅者Watcher可能会有多个，所以需要一个订阅器去收集，它可以在收到通知以后触发所有订阅者的方法
>
> 在模板编译的时候会扫描解析出订阅数据的节点，实例化订阅者，并添加到订阅器中，值发生改变时会调用set，set调用notify，notify会执行所有Watcher的更新方法
>
> Observer-Watcher-Compile



> Q：Vue中key的作用？
>
> key值在diff算法中会用到，它决定了节点是否要被增删。节点增删会重新触发完整的组件生命周期和过渡效果，所以key可以加速virtual dom渲染



> Q：Vue父子组件如何通信？同级组件如何通信？
>
> 通常情况下props / $emit，父组件绑定的数据子组件props接收，子组件通过$emit触发事件改变父组件的值
>
> ref绑定子组件，调用子组件的数据或方法
>
> 另一种常用的是provide / inject，子组件和孙组件都可以使用父组件的数据（非响应式）（一般开发插件/组件库使用）
>
> $attrs / $listener 父组件绑定的值，子组件未prop的属性，封装组件可用
>
> 还有Vuex，（多组件依赖同一状态；兄弟组件传值困难时）
>
> EventBus
>
> 特殊情况下可以使用$children / $parent，获取整个对象，官方不推荐



> vuex的组成？state，getters，action，mutation，module，分别讲一下各自的作用
>
> state：状态存储，只能由mutation提交更新
>
> getters：从state中派生的状态
>
> mutation：提交事件，通过调用type类型的事件执行回调方法，注意
>
> ​	1.需要遵循Vue响应规则，Vue.set添加对象新属性
>
> ​	2.必须同步--为了调试，回调函数中的状态改变无法追踪
>
> action：同样是事件，区别
>
> ​	1.提交的是mutation
>
> ​	2.可包含异步操作
>
> ​	3.参数不同，mutation(state, payload) action(context, payload) 
>
> ​		context: state, rootState, commit, dispatch(第三个参数可传配置对象，将root: true可提交根), getters, rootGetters
>
> module：代码分模块，通过命名空间区分模块，默认全局



> webpack的作用是什么？开发环境和测试环境之间的配置文件有什么区别
>
> 模块化打包工具。
>
> 开发环境：
>
> ​	1.开启本地服务，热更新
>
> ​	2.sourceMap映射用于调试
>
> ​	3.接口代理解决开发环境跨域
>
> 生产环境：
>
> ​	1.代码压缩丑化
>
> ​	2.去除无用代码
>
> 同样点：
>
> ​	1.入口
>
> ​	2.Loader编译
>
> ​	3.解析配置



> webpack的devtool有那些选项，分别有什么作用？
>
> 开发环境eval-source-map
>
> 生产环境source-map
>
> 以上未vue默认，推荐cheap-module-*
>
> cheap模式没有列信息，生产环境打包构建会加快



> devServer的实现原理？
>
> 用express开启一个服务，设置两个出口
>
> contentBase静态资源和publicPath webpack出口
>
> 热更新通过websocket实现双向通讯



> event lop（browser）



> reqeustAnimationFrame
>
> 保证动画流畅，能把每一帧的DOM操作收集，在一次重绘或重排中完成
>
> 定时器过度频繁刷新（低于一帧16.7s）导致丢帧而卡顿
>
> 使用类似setTimeout，但不需要时间间隔



> promise.all
>
> 传三个Promise.resolve(value)数组，会返回value数组
>
> 若其中含有一个reject，则Promise.all终止并返回reject数组至catch
>
> ps promise链式调用
>
> function A , B , C: return new Promise
>
> A().then(() => return B()).then(() => return C()).catch()
>
> 出错？终止。如何保证执行到最后？每个then后面加catch



> Flex自适应
>
> flex-direction: row;
>
> 定宽超出滚动条：父：flex；overflow:auto；子：flex-shrink:0；
>
> 超出自适应：父：flex-inline；子：flex-shrink:0；
>
> flex-direction:column;
>
> 纵向
>
> ```
> // 利用writing-mode才能撑开容器宽度
> .container {
>   display: inline-flex;
>   writing-mode: vertical-lr;
>   flex-wrap: wrap;
>   align-content: flex-start;
>   height: 250px;
>   background: blue;
> }
> .photo {
>   writing-mode: horizontal-tb;
>   width: 150px;
>   height: 100px;
>   background: red;
>   margin: 2px;
> }
> ```



> 事件模型三个阶段？执行顺序？
>
> 捕获阶段：先document-->target，遇到捕获事件直接执行
>
> 目标阶段：target节点无论捕获还是冒泡，先注册的先执行
>
> 冒泡阶段：target-->document执行冒泡
>
> ps
>
> 捕获：事件第三个参数设为true(default:false)
>
> 阻止冒泡：
>
> e.stopPropagation();
>
> e.preventDefault()阻止事件默认行为，会发生冒泡
>
> return false;()阻止以上两个（jq），特殊情况下不能终止，尽量避免（js）
>
> e.target==current.target



> 浏览器缓存机制
>
> 见浏览器缓存



> 工程化相关



> es6
>
> 块级作用域 let const
>
> 解构赋值 ...
>
> 模板字符串
>
> 箭头函数 this指向
>
> for of 数组 只遍历可枚举属性
>
> class
>
> WeakMap key弱引用，可回收防止内存泄漏（数组会一直引用键值）



> 导航守卫流程
>
> 导航被触发。
>
> 在失活的组件里调用离开守卫`beforeRouteLeave(to,from,next)`。
>
> 调用全局的`beforeEach( (to,from,next) =>{} )`守卫。
>
> 在重用的组件里调用 `beforeRouteUpdate(to,from,next)` 守卫。
>
> 在路由配置里调用`beforeEnter(to,from,next)`路由独享的守卫。
>
> 解析异步路由组件。
>
> 在被激活的组件里调用`beforeRouteEnter(to,from,next)`。
>
> 在所有组件内守卫和异步路由组件被解析之后调用全局的`beforeResolve( (to,from,next) =>{} )`解析守卫。
>
> 导航被确认。
>
> 调用全局的`afterEach( (to,from) =>{} )`钩子。
>
> 触发 DOM 更新。
>
> 用创建好的实例调用beforeRouteEnter守卫中传给 next 的回调函数
>
> ps: 导航守卫必须调用next
>
> ​	next(): 进入下一个路由
>
> ​	next(false): 中断导航
>
> ​	next('/'),next({ path:'/' }): 跳转到其它路由，当前导航中断，进行新的导航



> 如果vue-router使用history模式，部署时要注意什么
>
> 要注意404的问题，因为在history模式下，只是动态的通过js操作window.history来改变浏览器地址栏里的路径，并没有发起http请求，当直接在浏览器里输入这个地址的时候，就一定要对服务器发起http请求，但是这个目标在服务器上又不存在，所以会返回404。
>
> 所以要在Ngnix中将所有请求都转发到index.html上就可以了
>
> ```
> location / {
>     try_files  $uri $uri/ @router index index.html;
> }
> location @router {
>     rewrite ^.*$ /index.html last;
> }
> ```



> vue生命周期
>
> 首先创建Vue实例，进行初始化 _init
>
> initLifeCycle
>
> initEvent
>
> initRender 渲染
>
> hook:beforeCreate
>
> initInjection
>
> initState props/methods/data/watch/computed
>
> initProvide
>
> hook:create 因此数据的操作最早放在create里
>
> ----- init 完成
>
> ----- $mount
>
> has el options? el指的是挂载的元素，且不能挂载在html，body
>
> has render? 所有组件渲染都需要render方法，如果对象没有定义render方法，需要 在线编译 转化成render方法
>
> ----- mountComponent
>
> hook:beforeMount
>
> 渲染VNode ----- _render
>
> VNode patch到真实DOM ----- _update
>
> 实例化Watcher，初始化会执行回调；vm实例监测数据变化执行回调
>
> hook:mounted
>
> 未完

