# CardDiary By Vue

## 简介

这是一个模仿卡片日记 UI，前端使用Vue，后端使用Koa搭建的一个 demo。

目前还不完整，主要是 tag 板块。

在一些转场动画上也还和卡片日记存在一定距离。

可供新人学习，或者对付一下课程的大作业。

## 运行

### 准备

安装 mongoDB 并在里面创建一个叫做 carddiary 的数据库。

### 服务器端

server 目录下是后端(服务器端)的代码。

进入到 server 子目录下之后，先安装依赖。

```
npm install
```

之后运行服务器:

```
npm run server
```

### 客户端

app 目录下是前端(客户端)的代码。

目前只支持 Android, iOS, Web 端使用。

> Web 端仅仅在 Chrome 83.0 和 Safari 13.1 上进行过测试，其他浏览器兼容性不能保证。

#### 在 Web 端使用

同样进入 app 文件夹之后，先安装依赖

```
npm install
```

在网页中预览 (默认打开 4000 端口) :

```
npm run server
```

或者，编译成 HTML、CSS、JS 再预览:

```
npm run build
```

这将会在 app/src-cordova/www 下输出编译好的代码。

进入运行 index.html 即可。

#### 在 mobile 设备上使用

上面介绍 `npm run build` 会生成编译好的文件，可以使用这个加上 Cordova 来做到跨平台的编译。

记得安装 Cordova:

```
npm i cordova -g
```

> 部分 andorid 和 iOS 的开发环境还需要自己配置，使用 `cordova requirements` 可以知道自己少哪些环境。

进入到 app/src-cordova 中，安装环境依赖:

```
npm install
```

##### 运行 Andorid

```
cordova run android
```

##### 运行 iOS

```
cordova run ios
```
