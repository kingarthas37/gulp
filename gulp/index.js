'use strict';

var gulp = require('gulp');
var fs = require('fs');

var onlyScripts = require('./util/script-filter');
var args = require('./util/arg-parse');

var tasks = fs.readdirSync('gulp/task').filter(onlyScripts);


tasks.forEach(function(task) {
    require('./task/' + task);
});


if(args.env === 'dev') {
    //dev task
    //gulp.task('default', ['sprite','css','browserify','watch']);
    gulp.task('default', ['css-common','css','image','sprite','browserify','watch']);
} else if(args.env === 'prod') {
    //build task
   // gulp.task('default', ['clean','sprite','css:dist','browserify:dist']);
    gulp.task('default', ['css-common:dist','css:dist','browserify:dist','rev']);
}