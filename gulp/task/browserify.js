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
var concat = require('concat-stream');
var file = require('gulp-file');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var sourcemaps = require('gulp-sourcemaps');


var config = require('../../package.json');
var onlyScripts = require('../util/script-filter');

var pageScripts = fs.readdirSync(path.join(config.path.jsDev,'pages')).filter(onlyScripts);

var browserifyDevPath = './' + config.path.jsDev;
var browserifyDistPath = './' + config.path.jsDist;


//dev task
gulp.task('browserify', function () {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: false,
        entries: [browserifyDevPath + 'common/main.js'],
        debug: true
    });

    var w = watchify(b);

    pageScripts.forEach(function(page) {
        if(page !== 'main.js') {
            w.require(browserifyDevPath + 'pages/' + page, {expose:page.replace(/\.js$/,'')});
        }
    });
    
    var bundle = function () {
        w.bundle()
            .pipe(source(config.name + '.bundle.js'))
            .pipe(gulp.dest(browserifyDistPath));
        return w;
    };

    w.on('update', bundle);
    w.on('log', gutil.log);
    return bundle();
    
});



//prod task
gulp.task('browserify:dist', function () {
    
    var b = browserify({
        entries: [browserifyDevPath + 'common/main.js',browserifyDevPath + 'pages/main.js'],
        debug: true
    });

    var bundle = function () {
        
        pageScripts.forEach(function(page) {
            if(page !== 'main.js') {
                b.require(browserifyDevPath + 'pages/' + page, {expose:page.replace(/\.js$/,'')});
            }
        });
        
        b.plugin('factor-bundle', {
            e:[browserifyDevPath + 'common/main.js', browserifyDevPath + 'pages/main.js'],
            o:[write(browserifyDistPath + config.name + '.common.js'), write(browserifyDistPath + config.name + '.pages.js')]})
            .bundle()
            .pipe(write(config.name + '.external.js'));
        
        return b;
    };
    

    function write(filepath) {
        return concat(function (content) {
            return file(path.basename(filepath), content, {src: true})
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(browserifyDistPath))
        });
    }

    return bundle();

});