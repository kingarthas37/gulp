'use strict';

var path = require('path');

var gulp = require('gulp');
var RevAll = require('gulp-rev-all');
var fingerprint = require('gulp-fingerprint');
var async = require('async');

var args = require('../util/arg-parse');
var config = require('../../package.json');

var sprites = config.sprites;


gulp.task('rev',['sprite:prod','css:prod','browserify:prod','clean'],function() {
    
    if(!args.md5) {
        return;
    }

    async.series([
        function(cb) {            
            var revAll = new RevAll({
                fileNameManifest:'image-manifest.json'
            });
            gulp.src([path.join(config.path.imageMin,'**/*.+(jpg|jpeg|png|gif)'),'!' + path.join(config.path.imageMin,'sprites/**')])
                .pipe(revAll.revision())
                .pipe(gulp.dest(path.join(config.path.min,'images')))
                .pipe(revAll.manifestFile())
                .pipe(gulp.dest(path.join(config.path.min,'images')))
                .on('end',cb);
        },
        function(cb) {
            var manifest = require(path.resolve(path.join(config.path.min,'images','rev-manifest.json')));
            gulp.src(path.join(config.path.cssMin,'*.css'))
                .pipe(fingerprint(manifest,{
                    base:'../images/',
                    prefix: '../images/'
                }))
                .pipe(gulp.dest(config.path.cssMin))
                .on('end',cb);
        },
        function() {
            var revAll = new RevAll({ 
                dontRenameFile: ['images/'],
                fileNameManifest:'asset-manifest.json'
            });
            gulp.src([config.path.cssMin + '*.+(css|map)',config.path.jsMin + '*.+(js|map)'])
                .pipe(revAll.revision())
                .pipe(gulp.dest(config.path.min))
                .pipe(revAll.manifestFile())
                .pipe(gulp.dest(config.path.min));
        }
    ],
    function(err) {
        console.info(err);
    });
    
    return gulp;
    
});