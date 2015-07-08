一个gulp综合实例
==================================

> 一个gulp前端基础项目的构建配置实例

## 依赖
- nodejs
- gulp

## 主要模块
- browserify
- sass

## 安装
Install Gulp Globally
```
  npm install -g gulp
```
Install npm packages
```
  npm install
```

## 运行
1. dev环境:包括browserify编译、sass编译、sprite图片合并等工作，并对css、js、images进行watch
```
  gulp
```
2. prod环境:用于生产环，境主要对js、css、image进行压缩、合并等工作  
增加参数--env为prod即可，如果不添加此参数，默认则为dev环境
```
  gulp --env prod
```
