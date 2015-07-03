'use strict';

var path = require('path');

var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var rename = require('gulp-rename');
var minimist = require('minimist');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

var config = require('../../package.json');

// css common
gulp.task('css-common',function() {
    return gulp.src(config['css-common'])
        .pipe(sourcemaps.init())
        .pipe(concat(config.name + '.external.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.path.cssDist));
});


// css common dist
gulp.task('css-common:dist',function() {
    return gulp.src(config['css-common'])
        .pipe(sourcemaps.init())
        .pipe(concat(config.name + '.external.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(gulp.dest(config.path.cssDist));
});

// css pages
gulp.task('css',['css-common'], function () {
    return gulp.src(path.join(config.path.cssDev,'main.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename(config.name + '.pages.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.path.cssDist));
});

// css pages dist
gulp.task('css:dist', ['css-common:dist'], function () {
    return gulp.src(path.join(config.path.cssDev,'main.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename(config.name + '.pages.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(gulp.dest(config.path.cssDist)) 
});