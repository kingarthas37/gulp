'use strict';

var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var factor = require('factor-bundle');
var concat = require('gulp-concat');
var concatStream = require('concat-stream');
var file = require('gulp-file');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var sourcemaps = require('gulp-sourcemaps');
var async = require('async');
var clean = require('gulp-clean');


var config = require('../../package.json');
var onlyScripts = require('../util/script-filter');

var pageScripts = fs.readdirSync(path.join(config.path.jsDev,'pages')).filter(onlyScripts);
 


//dev task
gulp.task('browserify', function () {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: false,
        entries: [path.resolve(config.path.jsDev,'common/main.js')],
        debug: true
    });

    var w = watchify(b);

    pageScripts.forEach(function(page) {
        if(page !== 'main.js') {
            w.require(path.resolve(config.path.jsDev,'pages',page),{expose:page.replace(/\.js$/,'')});
        }
    });
    
    var bundle = function () {
        w.bundle()
            .pipe(source(config.name + '.bundle.js'))
            .pipe(gulp.dest(path.resolve(config.path.jsDist)));
        return w;
    };

    w.on('update', bundle);
    w.on('log', gutil.log);
    return bundle();
    
});



//prod task
gulp.task('browserify:dist', function () {
    
    var b = browserify({
        entries: [path.resolve(config.path.jsDev,'common/main.js'),path.resolve(config.path.jsDev,'pages/main.js')],
        debug: true
    });

    var bundle = function () {
        
        pageScripts.forEach(function(page) {
            if(page !== 'main.js') {
                b.require(path.resolve(config.path.jsDev,'pages/',page), {expose:page.replace(/\.js$/,'')});
            }
        });
        
        b.plugin('factor-bundle', {
            e:[path.resolve(config.path.jsDev,'common/main.js'),path.resolve(config.path.jsDev,'pages/main.js')],
            o:[write(config.name + '.common.js'), write(config.name + '.pages.js')]})
            .bundle()
            .pipe(write(config.name + '.external.js'));
        
        return b;
        
    };
    

    function write(filepath) {
        return concatStream(function (content) {

            async.series([
            
                function(cb) {
                    file(path.basename(filepath), content, {src: true})
                        .pipe(buffer())
                        .pipe(sourcemaps.init({loadMaps: true}))
                        .pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(path.resolve(config.path.jsMin)))
                        .on('end',function() {
                            cb();
                        })
                },
                
                function(cb) {
                    if(filepath === (config.name + '.external.js')) {
                        gulp.src([config.path.jsMin + config.name + '.common.js',config.path.jsMin + config.name + '.pages.js'])
                            .pipe(sourcemaps.init({loadMaps: true}))
                            .pipe(concat(config.name + '.main.js'))
                            .pipe(sourcemaps.write('.'))
                            .pipe(gulp.dest(config.path.jsMin))
                            .on('end',cb);
                    }
                },
                function(cb) {
                     gulp.src([
                         config.path.jsMin + config.name + '.common.+(js|js.map)',
                         config.path.jsMin + config.name + '.pages.+(js|js.map)'
                     ], {read: false}) .pipe(clean());
                }
                
            ],function(err) {
                console.info(err);
            });
            
        });
    }
    
    return bundle();

});