
var gulp = require('gulp');

var gulp = require('gulp');
var cache = require('gulp-cache');
var size = require('gulp-size');
var imagemin = require('gulp-imagemin');

var config = require('../config').images;

/**
 * Copy the client images to the dist folder
 * Run image optimization on the copied images.
 */
gulp.task('images', function() {
  return gulp
    .src(config.srcPath)
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(
      gulp.isDeployment ? config.distPath : config.buildPath
    ));
});
