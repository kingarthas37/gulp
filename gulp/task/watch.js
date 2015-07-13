'use strict';

var path = require('path');

var gulp = require('gulp');

var config = require('../../package.json');

// Watch监听，运行gulp后执行
gulp.task('watch', ['browserify'], function () {
    //监听所有images目录，执行task: image
    gulp.watch(config.path.imageDev + '**/*.+(jpg|jpeg|png|gif)',['image']);
    //监听*.scss目录，执行task: css
    gulp.watch(config.path.cssDev + '**/*.scss', ['css']);
    //监听所有sprite目录，执行task:sprite
    gulp.watch(config.path.spriteDev + '**/*.png' , ['sprite']);  
});