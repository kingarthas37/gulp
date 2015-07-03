'use strict';

var path = require('path');

var gulp = require('gulp');
var RevAll = require('gulp-rev-all');



var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var _ = require('underscore');
var xtend = require('xtend');
var fs = require('fs');
var newer = require('gulp-newer');
var size = require('gulp-size');
var fingerprint = require('gulp-fingerprint');
var rimraf = require('gulp-rimraf');
var through = require('through2');
var merge = require('merge-stream');


var args = require('../util/arg-parse');
var config = require('../../package.json');

var sprites = config.sprites;
 


gulp.task('rev',['clean'],function() {

    if(!args.md5) {
        return;
    }

    var revAll = new RevAll();

    return gulp.src([path.join(config.path.imageDist,'**')])
        .pipe(revAll.revision())
        .pipe(gulp.dest(path.join(config.path.assetMin,'images')))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(path.join(config.path.assetMin,'images')))
        .on('end',function() {
            
            var manifest = require(path.resolve(path.join(config.path.assetMin,'images','rev-manifest.json')));

            gulp.src(path.join(config.path.cssDist,'**'))
                .pipe(fingerprint(manifest,{
                    base:'../images/',
                    prefix: '../images/'
                }))
                .pipe(gulp.dest(config.path.cssDist))
                .on('end',function() {
                    
                    gulp.src([config.path.cssDist + '**',config.path.jsDist + '**'])
                        .pipe(revAll.revision())
                        .pipe(gulp.dest(config.path.assetMin))
                        .pipe(revAll.manifestFile())
                        .pipe(gulp.dest(config.path.assetMin));
                    
                });
            
        });
    
});


 