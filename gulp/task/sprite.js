'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var xtend = require('xtend');
var newer = require('gulp-newer');
var path = require('path');
var merge = require('merge-stream');
var _ = require('underscore');

var config = require('../../package.json');
 

//images sprite dev
gulp.task('sprite', function () {
    
    //遍历config.sprites下的配置,对应的key为sprites下的目录名，比如common,page,也可进行对中sprite设置
    //参照：https://www.npmjs.com/package/gulp.spritesmith
    //value为设置sprite排列规则等
    _.each(config.sprites,function(params,name) {

        var options = {
            imgName: 'sprite-' + name + '.png',   //生成合并的common目录所有.png 为 sprite-common.png
            imgPath: '../images/sprite-' + name + '.png',  //写在dev/css/sprites/common.scss中的图片引用路径
            cssName: name + '.scss',  //生成/dev/css/sprites/common.scss 的sprite文件
            cssFormat: 'css'
        };

        //生成sprite找到 /dev/css/sprites/common/*.png
        var spriteData = gulp.src(path.join(config.path.spriteDev ,name ,'*.png'))
            //使用newer如果图片不是最新生成的则不用重新编译
            .pipe(newer(path.join(config.path.imageDist,options.imgName)))
            //extend sprite参数
            .pipe(spritesmith(xtend(params,options)));

        //将sprite-common.png 生成到/dist/images目录下
        var imgStream = spriteData.img
            .pipe(gulp.dest(config.path.imageDist));

        //编译sprites/common.scss，重写common.scss
        //注意：common.scss需要先手动生成
        var cssStream = spriteData.css
            .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));
        
        return merge(imgStream, cssStream);
        
    });
    
});



//image sprite prod ，同上，紧路径变化下
gulp.task('sprite:prod', function () {

    _.each(config.sprites,function(params,name) {

        var options = {
            imgName: 'sprite-' + name + '.png',
            imgPath: '../images/sprite-' + name + '.png',
            cssName: name + '.scss',
            cssFormat: 'css'
        };

        var spriteData = gulp.src(path.join(config.path.spriteDev ,name ,'*.png'))
            .pipe(newer(path.join(config.path.imageMin,options.imgName)))
            .pipe(spritesmith(xtend(params,options)));

        var imgStream = spriteData.img
            .pipe(gulp.dest(config.path.imageMin));  //生成到min目录下

        var cssStream = spriteData.css
            .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));

        return merge(imgStream, cssStream);

    });
});