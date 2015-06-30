'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');

var args = require('../util/arg-parse');
var config = require('../../package.json');


// Clean css,js min files
gulp.task('clean', function () {

    if(!args.md5) {
        return;
    }
    
    return gulp.src([config.path.assetMin], {read: false}).pipe(clean());
    
});