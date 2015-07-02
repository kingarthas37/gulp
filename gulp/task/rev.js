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
 


gulp.task('rev',['rev:image','clean'],function() {

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


gulp.task('rev:image',function() {

    if(!args.md5) {
        return;
    }

    var revAll = new RevAll();

     return gulp.src([config.path.imageDist + '**'])
        .pipe(revAll.revision())
        .pipe(gulp.dest(path.join(config.path.assetMin,'images')))
        .pipe(revAll.manifestFile())
        .pipe(gulp.dest(path.join(config.path.assetMin,'images')))
         .on('end',function() {

                 var manifest = require(path.resolve(path.join(config.path.assetMin,'images', 'rev-manifest.json')));

                 gulp.src(config.path.cssDist + 'gulp.pages.css')
                     .pipe(fingerprint(manifest,{
                         base:'../images/',
                         prefix: '../images/'
                     }))
                     .pipe(gulp.dest(config.path.assetMin + 'css1'));
             
             
         });

//    _.each(sprites,function(params,name) {
//
//        var options = {
//            imgName: 'sprite-' + name + '.png',
//            imgPath: '../images/sprite-' + name + '.png',
//            cssName: name + '.scss',
//            cssFormat: 'css'
//        };
//
//        var spriteData = gulp.src(path.join(config.path.spriteDev ,name ,'*.png'))
//            .pipe(newer(path.join(config.path.imageDist,options.imgName)))
//            .pipe(spritesmith(xtend(params,options)));
//
//        var imgStream = spriteData.img
//            .pipe(rev())
//            .pipe(gulp.dest(config.path.imageDist));
//
//        var cssStream = spriteData.css
//            .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));
//
//        return merge(imgStream, cssStream);
//
//    });
    
});