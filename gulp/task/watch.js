'use strict';

var gulp = require('gulp');

var config = require('../../package.json');

// Watch
gulp.task('watch', ['browserify'], function () {
    // Watch .scss files
    gulp.watch(config.path.cssDev + '**/*.scss', ['css']);
});