
var gulp = require('gulp');
var config = require('../config').copycss;

gulp.task('copycss', function() {
  if(global.isDeployment) {
    return;
  }
  return gulp
    .src(config.srcPath)
    .pipe(gulp.dest(
      global.isDeployment ? config.distPath : config.buildPath
    ));
});
