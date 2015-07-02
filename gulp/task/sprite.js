'use strict';

var gulp = require('gulp');
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
var path = require('path');
var fingerprint = require('gulp-fingerprint');
var rimraf = require('gulp-rimraf');
var through = require('through2');
var merge = require('merge-stream');

var config = require('../../package.json');
var sprites = config.sprites;

var manifestPath = path.join(config.path.imageDist, 'image-manifest.json');


gulp.task('sprite', function () {
    
    _.each(sprites,function(params,name) {

        var options = {
            imgName: 'sprite-' + name + '.png',
            imgPath: '../images/sprite-' + name + '.png',
            cssName: name + '.scss',
            cssFormat: 'css'
        };

        var spriteData = gulp.src(path.join(config.path.spriteDev ,name ,'*.png'))
            .pipe(newer(path.join(config.path.imageDist,options.imgName)))
            .pipe(spritesmith(xtend(params,options)));

        var imgStream = spriteData.img
            .pipe(gulp.dest(config.path.imageDist));

        var cssStream = spriteData.css
            .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));
        
        return merge(imgStream, cssStream);
        
    });
    
});




gulp.task('sprite:dist', function () {

    _.each(sprites,function(params,name) {

        var options = {
            imgName: 'sprite-' + name + '.png',
            imgPath: '../images/sprite-' + name + '.png',
            cssName: name + '.scss',
            cssFormat: 'css'
        };

        var spriteData = gulp.src(path.join(config.path.spriteDev ,name ,'*.png'))
            .pipe(newer(path.join(config.path.imageDist,options.imgName)))
            .pipe(spritesmith(xtend(params,options)));

        var imgStream = spriteData.img
            .pipe(gulp.dest(config.path.imageDist));

        var cssStream = spriteData.css
            .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));

        return merge(imgStream, cssStream);

    });
});



function generateSprite(options) {
    var hashedSpriteName = '';
    var spriteName = options.imgName;
    var spriteDir = options.spriteDir;  // Icon's containing folder. i.e /foo/bar/icon
    var spriteBaseDir = path.dirname(spriteDir); // The parent directory of icon's containing folder. For the case of /foo/bar/icon, it will return /foo/bar   
    
    // Check manifest file to get sprite name of hashed version
    if(fs.existsSync(manifestPath)) {
        var manifest = require(path.resolve(manifestPath));
        hashedSpriteName = manifest[spriteName];
    }

    var spriteData = gulp.src(path.join(spriteDir, '*.png'))
        .pipe(gulpif(hashedSpriteName != '', newer(path.join(spriteBaseDir, hashedSpriteName))))
        .pipe(spritesmith(options));

    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        .pipe(removeOldSprite(hashedSpriteName))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(rev())
        .pipe(gulp.dest(spriteBaseDir))   // Save sprite to the same directory of icon's containing folder
        .pipe(size())
        .pipe(rev.manifest(manifestPath, { merge: true }))
        .pipe(gulp.dest('.'))
        .on('end', function() {
            // Pipe CSS stream through CSS optimizer and onto disk. Fingerprint is depending on manifest of images.
            spriteData.css
                .pipe(fingerprint(manifestPath))
                .pipe(gulp.dest(config.spriteCssPath));
        });
}

function removeOldSprite(spriteName) {
    return through.obj(function(file, enc, cb) {
        var oldSprite = path.join(config.imagePath, spriteName);
        // Remove old sprite if a new sprite is generated
        if(spriteName && file.contents && fs.existsSync(oldSprite)) {
            fs.unlinkSync(oldSprite);
        }
        this.push(file);
        cb();
    });    
}
    
    