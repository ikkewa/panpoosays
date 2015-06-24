
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var texturepacker = require('spritesmith-texturepacker');

var config = require('../config').spritesheet;

gulp.task('spritesheet', function () {
  return gulp
    .src(config.srcPath)
    .pipe(spritesmith({
        imgName: config.imageName,
        cssName: config.mapName,
        algorithm: config.algorithm,
        cssTemplate: texturepacker
    }))
    .pipe(gulp.dest(
      global.isDeployment ? config.distPath : config.buildPath
    ));
});
