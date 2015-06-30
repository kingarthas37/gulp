'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var path = require('path');

var config = require('../../package.json');


gulp.task('image', function () {
    return gulp.src(config.path.imageDev + '**/*')
        .pipe(gulp.dest(config.path.imageDist));
});


gulp.task('image:dist', function () {
    return gulp.src(config.path.imageDev + '**/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.path.imageDist));
});