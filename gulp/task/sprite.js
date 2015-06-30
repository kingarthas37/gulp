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

var config = require('../../package.json');
var sprites = config.sprites;

var manifestPath = path.join(config.path.imageDist, 'image-manifest.json');


gulp.task('sprite', function () {
    
    _.each(sprites,function(type,name) {

        var options = {
            imgName: name + '.png',
            imgPath: '../images/sprites/' + name + '.png',
            cssName: name + '.scss',
            cssFormat: 'css',
            padding:5
        };
        
        var hashedSpriteName = '';
        var spriteName = options.imgName;
        var spriteDir = path.join(config.path.spriteDev ,name);   
        var spriteBaseDir = path.dirname(spriteDir);
        
        
//        if(fs.existsSync(manifestPath)) {
//            var manifest = require(path.resolve(manifestPath));
//            hashedSpriteName = manifest[spriteName];
//        }

        var spriteData = gulp.src(path.join(spriteDir,'*.png'))
            .pipe(newer(config.path.spriteDist))
            .pipe(spritesmith(options));
        
        
        spriteData.img
         //   .pipe(imagemin({
          //      progressive: true,
          //      use: [pngquant()]
          //  }))
          //  .pipe(rev())
            .pipe(gulp.dest(config.path.spriteDist))
           // .pipe(size())
           // .pipe(rev.manifest(manifestPath, {merge: true }))
           // .pipe(gulp.dest('.'))
            .on('end', function() {
                spriteData.css
                  //  .pipe(fingerprint(manifestPath))
                    .pipe(gulp.dest(path.join(config.path.cssDev, 'sprites')));
            });
    
    });
    
        /*
    _.each(config.sprites, function(sprite) {
        
        if(typeof sprite === 'string') {
            // Use icon folder name as sprite name
            var folderName = sprite.split(path.sep).pop();
            var spiteOptions = {
                spriteDir: sprite,
                imgName: folderName + '.png',
                cssName: folderName + '.scss',
                cssFormat: 'css'
            };
            generateSprite(spiteOptions);    
        } else if(typeof sprite === 'object') {
            var folderName = sprite.src.split(path.sep).pop();
            var spriteName = sprite.imgName ? sprite.imgName : folderName;
            var spiteOptions = xtend({
                spriteDir: sprite.src,
                imgName: spriteName + '.png',
                cssName: spriteName + '.scss',
                cssFormat: 'css'
            }, sprite);
            generateSprite(spiteOptions);                    
        }
    });
    */
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
    
    