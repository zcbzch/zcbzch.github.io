| 内容               | 作者   | 版本 | 状态 |
| ------------------ | ------ | ---- | ---- |
| 微应用独立部署文档 | 朱成海 | 1.0  | 完成 |



## 部署流程

1. git clone common web-app（CWA）并进入CWA
2. 定制 common web-app
   1. TMA（cnpm i -S [target micro-app]）
   2. 进入脚本所在目录（cd ./node_module/包名/bin）
   3. 执行脚本（build.sh）
3. cnpm i & cnpm run build
4. 压缩打包为*.tar.gz
5. 发送到FTP

```
1.目录创建
git clone ssh://git@git.mchz.com.cn:omc/web/common-web-app.git
cd 
cnpm i -S git+ssh://git@git.mchz.com.cn:omc/web/okp-micro-apps.git#feature/okp-auto-deploy
cd ./node_module/包名/bin
chmod u+x build.sh build.config
./build.sh
```



### build.config

```json
{
    name: 'okp-auto-deploy',
    camelCase: 'autoDeploy',
	proxyUrl: 'http://192.168.239.27:8887,
    publicPath: 'auto-deploy',
    redirect: 'auto-deploy'
}
```

### build.sh

```
#获取build.config.json文件中的数据
name=$(cat ./build.config | awk -F [:] '/name/{print$2}' | sed $'s/\'//g' | sed $'s/,//g')
camelCase=$(cat ./build.config | awk -F [:] '/camelCase/{print$2}' | sed $'s/\'//g' | sed $'s/,//g')
proxyUrl=
publicPath=
redirect=

#修改CWA中的配置
COMMON_PATH="../../.."
# 1.修改vue.config.js, router.js
sed -i "s|http://192.168.239.27|'${proxyUrl}'|" ${COMMON_PATH}/vue.config.js
sed -i "s|common_publicPath|'${publicPath}'|" ${COMMON_PATH}/vue.config.js ${COMMON_PATH}/src/router.js
sed -i "s|home|'${redirect}'|" ${COMMON_PATH}/src/router.js
# 2.修改public index.html
sed -i "s|common-web-app|'${name}'|" ${COMMON_PATH}/public/index.html
# 3.修改micro-apps.js: 添加模块 驼峰式
sed -i "/import VIEWS from/a\import "${camelCase}" from '"${name}"/src/index.js;'" "${COMMON_PATH}"/src/micro-apps.js // 这句有问题
sed -i "/VIEWS,/a\'${camelCase}'" ${COMMON_PATH}/src/micro-apps.js

# 完成后 cnpm i;npm run build;cp /.../ /.../;进行测试
cat ${COMMON_PATH}/package.json
```







## 计划

### 具体实现步骤



1.创建git仓库，存放公共运行环境

/* 提前完成

部署流程完善

部署实践操作（微应用手动），记录执行

执行记录整理为脚本逻辑

jenkins配置？

自动部署脚本实现

*/

2.公共环境的实现

3.测试安装模块并记录所需要自动执行的操作

4.整理记录形成脚本逻辑

5.根据脚本逻辑记录编写微应用的脚本

6.测试修改

7.部署流程走通（根据脚本逻辑手动走通）

8.部署流程逻辑

9.部署流程脚本实现

10.整合

11.测试



### 问题

style - iconfont更新





## 时间安排

**周一**

讨论完善计划方案（朱成海，陆家祺，胡锡杭）

公共环境实现

独立微应用文件修改逻辑





**周二**

部署脚本实现逻辑

微应用修改脚本实现

部署流程走通







## 微应用独立构建配置

### 公共部分

公共部分的内容直接集成至模版中

#### public

- icon
- html

#### 依赖

- @meichuang/ui
- @meichuang/api
- @meichuang/util

#### 其他依赖

- api.js
- vuex
- router（需要修改）
- components

#### App.vue

- 鉴权？

- 全局样式

  

### 私有部分

私有部分需要进行一定修改

#### micro-apps.js

- 导入模块

#### router

- redirect至对应模块
- base路由

#### vue.config.js

- 代理url
- publicPath



### 其它

#### nginx

微应用和独立部署应用使用不同环境需要添加配置





### 存在问题

#### 兼容性问题