一个gulp综合实例
==================================

> 一个基于gulp搭建的前端基础配置实例，基于browserify

## 最近更新
- 2016.1.20增加支持es6模块 (babelify)

## 依赖
- [nodejs](https://nodejs.org/)
- [gulp](https://www.npmjs.com/package/gulp)

## 主要模块
- [browserify](https://www.npmjs.com/package/browserify)
- [babelify](https://www.npmjs.com/package/babelify)
- [sass](https://www.npmjs.com/package/gulp-sass)
- [smithsprite](https://www.npmjs.com/package/gulp.spritesmith)

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

- 执行gulp --sync [domain] 可启用browser-sync调试功能，[domain]为本地开发环境Url，只适用于dev环境
```
  gulp --sync dev.localhost.com
```

## 运行过程
* 所有前端资源文件均在public目录下
* gulp目录为gulp开发代码，一般不需改动代码，直接配置package.json即可
* package.json管理所有资源配置文件，如下：
* dependencies:nodejs模块依赖
* browser:browserify模块指定路径，前端模块使用，详情参考browserify文档
* browserify-shim:把非commonjs的模块转换成commonjs模块
* css-common:指定common.css的引用，按array依次调用，最后合并成external.css
* sprites:结合[smithsprite](https://www.npmjs.com/package/gulp.spritesmith)的图片合并参数，如common就生成common合并的sprite-common.png sprite图片，page则生成sprite-page.png
* path: 用于gulp配置中的路径引用
* public目录结构：
- /css /js /swf /fonts 为框架、库文件，如jquery,bootstarp等
- /dev 开发环境目录，所有开发文件，如sass，browserify都存放在此
- /dist 执行gulp编译后的dev目标目录，生成未压缩合并的css,js,images文件
- /min 执行gulp --env prod后打包生成到prod目录，生成压缩合并后的css,js,images文件
- 执行gulp --env prod --md5后生成md5戳随后也打包到/min目录下，同时生成/min/rev-mainifest.json, /images/rev-manifest.json文件供调用使用
