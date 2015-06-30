require('./gulp');



/*
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var minimist = require('minimist');



var PROD = 'prod';

//获取参数变量
var args = minimist(process.argv.slice(2), {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'dev'}
});





gulp.task('default',['css','images','watch']);


gulp.task('css', function () {
    
    gulp.src('./public/dev/css/main.scss')
        .pipe(gulpif(args.env === PROD,sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(args.env === PROD,minifyCss()))
        .pipe(concat('index.css'))
        .pipe(gulpif(args.env === PROD,rename({suffix:'.min'})))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulpif(args.env === PROD,sourcemaps.write()))
        .pipe(gulp.dest('./public/dist/css'));
    
});


gulp.task('images',function() {
    gulp.src('./public/dev/images/*')
        .pipe(gulpif(args.env === PROD,imagemin({
            progressive: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./public/dist/images'));
});



gulp.task('watch', function() {
    if(args.env === 'prod') {
        return;
    }
    gulp.watch('./public/dev/css/*.scss',['css']);
    gulp.watch('./public/dev/images/*.png',['images']);
});
    
    */