webpack

vue-cli相关

vue inspect > output.js 将webpack配置输出到当前路径下

打包加速

需要webpack4



https://zhuanlan.zhihu.com/p/42465502

```bash
SpeedMeasurePlugin 查看各个阶段构建耗时 
```



打包环节

打包就是从入口文件开始将所有的依赖模块打包到一个文件中的过程，当然，在打包过程中涉及各种编译、优化过程

开始打包，获取所有依赖模块 - 搜索时间优化

loader解析所有依赖（js单线程）- 解析时间优化

所有依赖模块打包到一个文件 - 压缩时间优化（解析AST树）

二次打包



优化项

#### 多进程多实例构建，资源并行解析

多进程构建的方案比较知名的有以下三个：

- thread-loader (webpack4 官方推荐)
- parallel-webpack
- HappyPack



使用thread-loader  44s  --- > 13s



#### 多进程多实例并行压缩

并行压缩主流有以下三种方案

- 使用 parallel-uglify-plugin 插件

- uglifyjs-webpack-plugin 开启 parallel 参数

- terser-webpack-plugin 开启 parallel 参数 （推荐使用这个，支持 ES6 语法压缩）

  

*webpack4 默认内置使用terser-webpack-plugin 插件压缩优化js代码*

测试发现使用后时间加长



合理利用缓存

加速二次打包（初次打包会增加消耗）

- cache-loader
- HardSourceWebpackPlugin