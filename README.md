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
- dev环境:包括browserify编译、sass编译、sprite图片合并等工作，并对css、js、images进行watch
```
  gulp
```

- prod环境:用于生产环境,主要对js、css、image进行压缩、合并等工作  
增加参数--env为prod即可，如果不添加此参数，默认则为dev环境
```
  gulp --env prod
```

- 增加md5：如有缓存需要需增加md5戳，增加参数--md5即可  
运行md5时，需要首先执行prod命令 gulp --env prod 来生成生产环境的代码，否则会报错无法生成md5  
md5只依赖于生产环境,dev环境无法执行
```
  gulp --env prod --md5
```
