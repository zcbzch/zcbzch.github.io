## JS

### 深拷贝的实现

简易版

```javascript
JSON.parse(JSON.stringify())
```

#### 问题

> WARNING
>
> 1. 无法解决`循环引用`的问题，无限递归导致系统栈溢出
> 2. 无法拷贝`特殊的对象`，如RegExp，Date，Set，Map等
> 3. 无法拷贝`函数`，会抛弃构造函数，所有构造函数会指向Object

`JSON.stringify()`

只能序列化对象的可枚举自有属性

对象的`函数`和`undefine`会丢失

`NaN`，`Infinity `，`-Infinity`结果返回`null`

```
test = {
	name: 'a',
	func: function foo(){
		console.log('haha')
	},
	date: new Date(),
	reg: new RegExp(),
	a: undefined,
	b: NaN,
	c: Infinity
}
/* output
"{
    "name":"a",
    "date":"2020-04-20T03:21:10.167Z",
    "reg":{},
    "b":null,
    "c":null
}"
Date()对象变字符串
RegExp(), Error()对象变空
function和undefine会丢失
NaN, Infinity, -Infinity结果返回null
构造函数生成的对象会丢弃constructor
*/
```

https://www.jianshu.com/p/b084dfaad501

http://47.98.159.95/my_blog/js-api/005.html#_1-%E7%AE%80%E6%98%93%E7%89%88%E5%8F%8A%E9%97%AE%E9%A2%98

```
const deepClone = (target) => {

}
```



### call

```javascript
// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
      throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let result = context.fn(...args) 
  delete context.fn
  return result
}
```

### apply

```javascript
Function.prototype.myApply = function (context, [...args]) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let result = context.fn(...args)
  delete context.fn
  return result
}
```

### bind

```javascript
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  const _this = this
  return function Fn(...f_args) {
    let result = context.fn.myApply(context, [...args, ...f_args])
    delete context.fn
    return result
  }
}
```

### instanceof

```javascript
// 左边的隐士原型是否指向右边构造函数的原型对象
const myInstanceof = function (leftVal, rightVal) {
  let protoRight = rightVal.prototype;
  let protoLeft = leftVal.__proto__;
  function check(left, right) {
    if (!left) return false;
    if (left === right) return true;
    return check(left.__proto__, right)
  };
  return check(protoRight, protoLeft);
}
```

### Object.create

```javascript
// Object.create创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
const myObjectCreate = function (obj) {
  function Fn() {}
  Fn.prototype = obj
  return new Fn()
}
```



## Vue

### vue异步组件--路由懒加载

主要用于代码分割，分步加载

```
/**
 * 处理路由页面切换时，异步组件加载过渡的处理函数
 * @param  {Object} AsyncView 需要加载的组件，如 import('@/components/home/Home.vue')
 * @return {Object} 返回一个promise对象
 */
function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: AsyncView,
    // 异步组件加载时使用的组件
    loading: require('@/components/public/RouteLoading.vue').default,
    // 加载失败时使用的组件
    error: require('@/components/public/RouteError.vue').default,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 10000
  });
  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      return h(AsyncHandler, data, children);
    }
  });
}

```

