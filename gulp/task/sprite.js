'use strict';

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var xtend = require('xtend');
var newer = require('gulp-newer');
var path = require('path');
var merge = require('merge-stream');
var _ = require('underscore');

var config = require('../../package.json');
var sprites = config.sprites;

gulp.task('sprite', function () {
    
    _.each(sprites,function(params,name) {

        var options = {
            imgName: 'sprite-' + name + '.png',
            imgPath: '../images/sprite-' + name + '.png',
            cssName: name + '.scss',
            cssFormat: 'css'
        };

        var spriteData = gulp.src(path.join(config.path.spriteDev ,name ,'*.png'))
            .pipe(newer(path.join(config.path.imageDist,options.imgName)))
            .pipe(spritesmith(xtend(params,options)));

        var imgStream = spriteData.img
            .pipe(gulp.dest(config.path.imageDist));

        var cssStream = spriteData.css
            .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));
        
        return merge(imgStream, cssStream);
        
    });
    
});




gulp.task('sprite:prod', function () {

    _.each(sprites,function(params,name) {

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
            .pipe(gulp.dest(config.path.imageMin));

        var cssStream = spriteData.css
            .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));

        return merge(imgStream, cssStream);

    });
});