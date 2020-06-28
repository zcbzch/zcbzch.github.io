webpack相关

webpack Loader

https://github.com/axuebin/articles/issues/38

loader十问

https://juejin.im/post/5bc1a73df265da0a8d36b74f#heading-0

工作流程

1. 参数解析
2. 找到入口文件
3. 调用 `Loader` 编译文件
4. 遍历 `AST`，收集依赖
5. 生成 `Chunk`
6. 输出文件



Loader



> Loader allow webpack to process other types of files and convert them into valid modules.
> 

### 配置和使用

`loader`定义在`module.rules`里，每一条 `rule` 会包含两个属性：`test` 和 `use`，比如 `{ test: /\.js$/, use: 'babel-loader' }` 意思就是：当 `webpack` 遇到扩展名为 `js` 的文件时，先用 `babel-loader` 处理一下，然后再打包它

> use ：string | array | object | function：
>
> - string : 只有一个 Loader 时，直接声明 Loader，比如 babel-loader。
> - array : 声明多个 Loader 时，使用数组形式声明，比如上文声明 .css 的 Loader。
> - object : 只有一个 Loader 时，需要有额外的配置项时。
> - function : use 也支持回调函数的形式。

**注意：** 当 `use` 是通过数组形式声明 `Loader` 时，`Loader` 的执行顺序是从右到左，从下到上。比如**暂且**认为下方声明是这样执行的：

```
use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'postcss-loader' },
]
postcss-loader -> css-loader -> style-loader
即 styleLoader(cssLoader(postcssLoader(content)))
```

### 类型

#### 同步loader



#### 异步loader



#### pitching loader

比如`a!b!c!module`, 正常调用顺序应该是c、b、a，但是真正调用顺序是
 a(pitch)、b(pitch)、c(pitch)、c、b、a， 如果其中任何一个pitching loader返回了值就相当于在它以及它右边的loader已经执行完毕。

比如如果b返回了字符串"result b", 接下来只有a会被系统执行，且a的loader收到的参数是`result b`。

也就是说`pitching loader`的初衷是为了提升效率，少执行几个loader。

>In the complex case, when multiple loaders are chained, only the last loader gets the resource file and only the first loader is expected to give back one or two values (JavaScript and SourceMap). Values that any other loader give back are passed to the previous loader



#### raw loader

我们在 `url-loader` 里和 `file-loader` 最后都见过这样一句代码：

```
export const raw = true;
```

默认情况下，`webpack` 会把文件进行 `UTF-8` 编码，然后传给 `Loader`。通过设置 `raw`，`Loader` 就可以接受到原始的 `Buffer` 数据



### 重要的API

#### this.callback()

在 `Loader` 中，通常使用 `return` 来返回一个字符串或者 `Buffer`。如果需要返回多个结果值时，就需要使用 `this.callback`，定义如下：

```
this.callback(
  // 无法转换时返回 Error，其余情况都返回 null
  err: Error | null,
  // 转换结果
  content: string | Buffer,
  // source map，方便调试用的
  sourceMap?: SourceMap,
  // 可以是任何东西。比如 ast
  meta?: any
);
```

一般来说如果调用该函数的话，应该手动 `return`，告诉 `webpack` 返回的结果在 `this.callback` 中，以避免含糊不清的结果：

```
module.exports = function(source) {
  this.callback(null, source, sourceMaps);
  return;
};
```

#### this.async()

异步，同上

#### this.cacheable()

缓存，减少loader计算

`webpack` 是默认可缓存的，可以执行 `this.cacheable(false)` 手动关闭缓存

#### this.resource

当前处理文件的完整请求路径，包括 `query`，比如 `/src/App.vue?type=templpate`。

#### this.resourcePath

当前处理文件的路径，不包括 `query`，比如 `/src/App.vue`。

#### this.resourceQuery

当前处理文件的 `query` 字符串，比如 `?type=template`

#### this.emitFile

让 `webpack` 在输出目录新建一个文件



### Loader工作流程

