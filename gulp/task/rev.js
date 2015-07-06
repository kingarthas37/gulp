'use strict';

var path = require('path');

var gulp = require('gulp');
var RevAll = require('gulp-rev-all');
var fingerprint = require('gulp-fingerprint');

var args = require('../util/arg-parse');
var config = require('../../package.json');

var sprites = config.sprites;
 


gulp.task('rev',['clean'],function() {

    if(!args.md5) {
        return;
    }

    var revImageAll = new RevAll();

    return gulp.src([path.join(config.path.imageDist,'**')])
        .pipe(revImageAll.revision())
        .pipe(gulp.dest(path.join(config.path.min,'images')))
        .pipe(revImageAll.manifestFile())
        .pipe(gulp.dest(path.join(config.path.min,'images')))
        .on('end',function() {
            
            var manifest = require(path.resolve(path.join(config.path.min,'images','rev-manifest.json')));

            gulp.src(path.join(config.path.cssDist,'**'))
                .pipe(fingerprint(manifest,{
                    base:'../images/',
                    prefix: '../images/'
                }))
                .pipe(gulp.dest(config.path.cssDist))
                .on('end',function() {
                    
                    var revAll = new RevAll({ dontRenameFile: ['images/'] });
                    
                    gulp.src([config.path.cssDist + '**',config.path.jsDist + '**'])
                        .pipe(revAll.revision())
                        .pipe(gulp.dest(config.path.min))
                        .pipe(revAll.manifestFile())
                        .pipe(gulp.dest(config.path.min));
                    
                });
            
        });
    
});


 