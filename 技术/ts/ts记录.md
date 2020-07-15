







#### cannot find module

~~缺少vue-loader~~

shims-vue.d.ts 未写入vue文件的声明 ×

shims-vue.d.ts 不能写import 



#### vue-router 的引用路径问题

虽然 webpack 内配置了 alias，但那仅仅只是 webpack 打包时用的，ts 并不认账，它有自己的配置文件，因此，我们需要再两个地方配置来解决此问题。首先需要配置 tsconfig.json 的 path 路径

```typescript
//  tsconfig.json
path: [
  "@/*": [
    "src/*"
  ],
  // ...
]

```

ts 对于 vue 文件的引用必须添加 .vue 后缀，因为编辑器的原因使得无法识别 .vue 后缀，因此所有的 vue 文件的引用都需要补上 `.vue` 后缀。





类型

值的类型化

- 类型注解 let a: string
- 类型推导 编译器自动推导类型
- 类型查询 let b: typeof a 

基本类型

number

boolean

string

null

undefine

symbol

void

never 代表不可能存在的类型，常常伴随着错误和异常出现

any 任意值





数组类型 T[]（元组，内部类型任意）

函数类型 （类型兼容，可选参数？）

枚举类型 enum T { ... }

复合类型 

​	交叉类型

​	联合类型

​	keyof 获取类型所有属性名

接口类型

​	属性	

​		可选属性

​		只读属性

​	用于

​		对象字面量

​		函数

​		类

​		索引

类类型

访问限制

- public
- private
- protected

成员

- 实例属性
- 静态属性
- 实例方法
- 静态方法
- 构造函数
- getter/setter

只读

抽象



泛型

- 泛型函数
- 泛型接口
- 泛型类

泛型约束

默认类型

泛型数组

​	只读数组



类型别名 type a = number

类型断言（类型转换）



命名空间 export才能在外部访问

空间拆分 同名之间不能互相访问

空间嵌套 层数不限，层层export

空间别名



声明

声明的本质是告知编译器一个标识符的**类型信息**

内部声明 源码中的声明

外部声明 第三方库

三斜指令引入.d.ts文件

https://github.com/joye61/typescript-tutorial



vue-class-component

坑

关于props attrs

没有组件引入也需要@Components否则出错，不会生成props，会生成attrs。



下一行可以跳过ts检测

// @ts-ignore：（解释）

