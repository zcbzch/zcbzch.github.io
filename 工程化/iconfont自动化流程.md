流程

1. 创建工作目录
2. cnpm i @osm/iconfont
3. 获取iconfont官方链接
4. 下载压缩包，解压，删包
5. 覆盖，删除不必要文件
6. cnpm version prepatch/patch
7. cnpm publish



```
mkdir auto_iconfont
cd auto_iconfont/
cnpm i @osm/lib-iconfont
cd ./node_modules/@osm/lib-iconfont/corecd 
curl https://www.iconfont.cn/api/project/download.zip?spm=a313x.7781069.1998910419.d7543c303&pid=1592976&ctoken=54sorJm6T8kY1xVtTAT2b6oN
--- {"code":500,"message":"LOGIN REQUIRED"}
```



```
sudo rm -f /mnt/c/Users/dell/Downloads/download*.zip
手动下载
sudo mkdir icon-test
cd icon-test
sudo cp /mnt/c/Users/dell/Downloads/download.zip ./
sudo git clone git@git.mchz.com.cn:omc/web/okp-micro-apps.git
cd okp-micro-apps
sudo git checkout @osm/lib-iconfont
sudo unzip ../download.zip -d ./
sudo rm -rf ./font_*/demo*
sudo cp -rf ./font_*/. ./core
sudo rm -rf ./core/font_*
sudo git commit -am "icon update"
sudo npm version patch -m "iconfont upgrade to %s"
cnpm publish
cd ../..
sudo rm -rf icon-test

1.sudo wget -O icon.zip https://www.iconfont.cn/api/project/download.zip?spm=a313x.7781069.1998910419.d7543c303&pid=1592976&ctoken=rCpt1gR_WWeIKP3UQ7hj9ImN

2.sudo git clone git@git.mchz.com.cn:omc/web/okp-micro-apps.git
```

