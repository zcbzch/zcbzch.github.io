# 微应用发布CNPM包方案

## Git仓库

创建对应新分支，规则详见 [OSM项目统计](https://docs.qq.com/sheet/DSlRFWGRFcklqV2Va?tab=BB08J2&c=A1A0A0)

## CNPM

### Step.1: 确定发布包信息

> 修改 `package.json` , 修改内容主要包括: `name` , `version` , `dependencies`, `mian`
>
> `name`: 严格要求按规则填写
>
> `version`: 初始版本, 低于1.0.0 版本即可
>
> `main`: `src/index.js`
>
> `dependencies`: 目前先去除所有私有包的依赖
>
> 内容参考: [@osm/lib-components/package.json](http://git.mchz.com.cn/omc/web/okp-micro-apps/blob/@osm/lib-components/package.json)

### Step.2: 确定CNPM包发布内容

> 新建 `.npmignore` 文件, 该文件作用于npm包发布时过滤不需要的文件
>
> 内容参考[@osm/lib-components/.npmignore](http://git.mchz.com.cn/omc/web/okp-micro-apps/blob/@osm/lib-components/.npmignore)

```shell
# @osm/lib-compoents cnpm包发布内容结构, 供参考
├── README.md
├── node_modules
├── package.json
└── src
    ├── api
    ├── assets
    ├── components
    ├── index.js
    ├── models
    ├── routes
    ├── stores
    └── views
```

### Step.3 编写README

> 内容主要包括: 使用方式, 私有依赖 以及其他备注信息
>
> 内容参考: [@osm/lib-components/README.md](http://git.mchz.com.cn/omc/web/okp-micro-apps/blob/@osm/lib-components/README.md) / [@osm/lib-components CNPM平台介绍](http://192.168.238.242:7002/package/@osm/lib-components)

### Step.4 预发布包

> **注意: 以下所有操作前, 必须确保所有修改已经提交git记录**
>
> 借助 npm 命令来进行完成预发布包内容确认
>
>  `npm version [prepatch | preminor | premajor | prerelease]` 预发布版本
>
>  `npm pack` 打出本地包 , 安装到测试WA中进行内容确认
>
> `npm version [patch | minor | major]` 发布版本
>
> 
>
> **常用流程**:
>
> 1. 先通过 `npm version prepatch` 创建预发布号 (*prepatch, preminor, premajor 按自身需求使用*)
> 2. `npm pack`打出本地包
> 3. 在测试WA中手动写入依赖 `"@osm/xxxx": "file:../../.."` (相对路径, 绝对路径均可)
> 4. `npm i` 安装本地包, 项目引入包后启动项目确认内容无误
> 5. 如果内容有误, 修改内容后, 通过 `npm version release` 来提升预发布号, 并重复上步骤2
> 6. 确定内容无误后, 通过 `npm version patch` (与最初的 `prepatch` 对应) 发布版本

### Step.5 发布包到CNPM平台

```shell
> npm publish
```

### Step.6 打上版本标签

> 视具体版本和情况, 打上目标版本标签

```shell
> npm dist-tag add <pkg>@<version> <tag>

# 以@osm/lib-components为例, 为其0.5.3版本打上dev标签

> npm dist-tag add @osm/lib-components@0.5.3 dev
```

