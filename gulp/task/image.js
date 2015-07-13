'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var newer = require('gulp-newer');

var config = require('../../package.json');


gulp.task('image', function () {
    return gulp.src(config.path.imageDev + '**/*.+(jpg|jpeg|png|gif)')
        .pipe(newer(config.path.imageDist))
        .pipe(gulp.dest(config.path.imageDist));
});


//image prod,增加imagemin图片压缩
gulp.task('image:prod', function () {
    return gulp.src(config.path.imageDev + '**/*.+(jpg|jpeg|png|gif)')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.path.imageMin));
});