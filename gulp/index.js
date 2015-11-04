'use strict';

var gulp = require('gulp');
var fs = require('fs');

var args = require('./util/arg-parse');

require('./task/browserify');
require('./task/clean');
require('./task/image');
require('./task/rev');
require('./task/scss');
require('./task/sprite');
require('./task/watch');

if(args.env === 'dev') {
    //dev task
    gulp.task('default', ['image','sprite','css-common','css','browserify','watch']);
} else if(args.env === 'prod') {
    //build task
    gulp.task('default', ['image:prod','sprite:prod','css-common:prod','css:prod','browserify:prod','rev']);
}