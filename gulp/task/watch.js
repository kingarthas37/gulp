'use strict';

var path = require('path');

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var args = require('../util/arg-parse');

var config = require('../../package.json');


// Watch监听，运行gulp后执行
//['css','browserify']需要依赖，否则会事先执行watch导致不断run css和sprite的task
gulp.task('watch', ['css','browserify'], function () { 
    
    if(args.sync) {
        browserSync.init([path.join(config.path.cssDist,'*.css'),path.join(config.path.jsDist,'*.js')],{
            proxy: args.sync !== true ? args.sync : '10.140.110.55:8000',
            open:true
        });
    }
    
    //监听所有images目录，执行task: image
    gulp.watch(config.path.imageDev + '**/*.+(jpg|jpeg|png|gif)',['image']);
    //监听*.scss目录，执行task: css
    gulp.watch(config.path.cssDev + '**/*.scss', ['css']);
    //监听所有sprite目录，执行task:sprite
    gulp.watch(config.path.spriteDev + '**/*.png' , ['sprite']);
    
});