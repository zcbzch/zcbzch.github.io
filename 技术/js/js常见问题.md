js常见问题

#### 原型和原型链的理解？

https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg

答：原型是指为其它对象提供共享属性的`对象`，在创建对象时每个对象都有一个隐式引用`__proto__`指向它的原型或者null；原型本身也是一个对象，所以可以有自己的原型，这也可以构成原型链，顶端是Object。

在访问对象的属性会沿着原型链向上查找，原型链可以实现继承

> 如果让原型对象指向另一个类型的实例…..有趣的事情便发生了.
>
> 即: constructor1.prototype = instance2
>
> 鉴于上述游戏规则生效,如果试图引用constructor1构造的实例instance1的某个属性p1:
>
> 1).首先会在instance1内部属性中找一遍;
>
> 2).接着会在instance1.__proto__(constructor1.prototype)中找一遍,而constructor1.prototype 实际上是instance2, 也就是说在instance2中寻找该属性p1;
>
> 3).如果instance2中还是没有,此时程序不会灰心,它会继续在instance2.__proto__(constructor2.prototype)中寻找…直至Object的原型对象

原型继承通过constructor构造函数，通过new实例化继承constructor的prototype对象（new本身的操作 1.创建对象 2.链接到原型 3.绑定上下文 4.返回判断）

也可以使用Object.setPrototypeOf显示继承（MDN不推荐，影响性能）

ES6提供了class的风格，原理是一样的。

构造函数的继承现在可以使用class和extends去完成，原理上分两步

1.编写新的构造器，通过call给他们相同的上下文，合并他们的属性初始化，超类优先

2.设置子类的原型为超类原型

（本身也是一个对象，描述两个对象之间的关系，JS Prototype 原型的结构，本质上是一个隐式的单向链表，每一个节点存储了指向了下一个节点的引用，区别只是在于叫法和隐式引用。另外原型链只用到了addFirst(原型继承)操作）



#### 执行上下文 / 作用域链 / 闭包的理解

https://github.com/mqyqingfeng/Blog/issues/4

https://github.com/mqyqingfeng/Blog/issues/6

https://zhuanlan.zhihu.com/p/56490498

**执行上下文**：当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

执行上下文包括三个属性

- 变量对象（Variable Object）
- 作用域链
- this

> ```
> var scope = "global scope";
> function checkscope(){
>     var scope = "local scope";
>     function f(){
>         return scope;
>     }
>     return f();
> }
> checkscope();
> /*
> ECStack.push(<checkscope> functionContext);
> ECStack.push(<f> functionContext);
> ECStack.pop();
> ECStack.pop(); 
> */
> 
> var scope = "global scope";
> function checkscope(){
>     var scope = "local scope";
>     function f(){
>         return scope;
>     }
>     return f;
> }
> checkscope()();
> /*
> ECStack.push(<checkscope> functionContext);
> ECStack.pop();
> ECStack.push(<f> functionContext);
> ECStack.pop(); 
> */
> ```

**作用域链**：多个执行上下文的变量对象构成的链表就叫做作用域链

**闭包**：定义在A方法内部的方法，可以访问定义在这个A方法内部的变量。

定义在A方法外的方法，无法访问这个A方法外部的变量。

能不能访问关键看在哪里定义，而不是在哪里调用，调用方法的时候，会跳转到定义方法时候的环境里，而不是调用方法的那一行代码所在的环境