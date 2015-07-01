'use strict';

var gulp = require('gulp');

var config = require('../../package.json');

// Watch
gulp.task('watch', ['browserify'], function () {
    gulp.watch(config.path.imageDev + '**/*',['image']);
    gulp.watch(config.path.cssDev + '**/*.scss', ['css']);
    gulp.watch(config.path.spriteDev + '**/*.png' , ['sprite']);
});