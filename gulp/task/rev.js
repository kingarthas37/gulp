'use strict';

var path = require('path');

var gulp = require('gulp');
var RevAll = require('gulp-rev-all');

var args = require('../util/arg-parse');
var config = require('../../package.json');

gulp.task('rev',['clean'],function() {

    if(!args.md5) {
        return;
    }

    var revAll = new RevAll();
    
    return gulp.src([config.path.cssDist + '**',config.path.jsDist + '**'])
        .pipe(revAll.revision())
        .pipe(gulp.dest(path.join(config.path.assetMin)))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(path.join(config.path.dist)));
    
});