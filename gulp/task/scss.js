'use strict';

var path = require('path');

var gulp = require('gulp');
var sass = require('gulp-sass');
var size = require('gulp-size');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

var config = require('../../package.json');

//css-common ,生成 name.external.css，增加sourcemaps
gulp.task('css-common',function() {
    return gulp.src(config['css-common'])
        .pipe(sourcemaps.init())
        .pipe(concat(config.name + '.external.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.path.cssDist));
});


//css-common prod，生成 name.external.css，并增加sourcemaps和minifycss的压缩
gulp.task('css-common:prod',function() {
    return gulp.src(config['css-common'])
        .pipe(sourcemaps.init())
        .pipe(concat(config.name + '.external.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(gulp.dest(config.path.cssMin));
});


//页面级的css: name.pages.css,执行前先执行task 'css-common',入口为public/dev/css/main.sass
//所有页面级的css管理都有main.scss控制
//增加autoprefixer功能
gulp.task('css',['sprite'], function () {
    return gulp.src(path.join(config.path.cssDev,'main.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename(config.name + '.pages.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.path.cssDist));
});


//页面级css的prod，原理同上，只增加了css压缩
gulp.task('css:prod',['css-common:prod'], function () {
      return gulp.src(path.join(config.path.cssDev,'main.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename(config.name + '.pages.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(size())
        .pipe(gulp.dest(config.path.cssMin));
});