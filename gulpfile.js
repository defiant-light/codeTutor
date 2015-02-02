var gulp = require('gulp');
    concat = require('gulp-concat');
    nodemon = require('gulp-nodemon');
    jshint = require('gulp-jshint');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync');

var paths = {
  scripts: ['client/**/*.js']

};
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(concat('main.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "http://localhost:3000"
  });
});

gulp.task('serve', function () {
  nodemon({ script: 'server.js', ignore: ['node_modules/**/*.js'] });
});
  
gulp.task('default', ['scripts', 'browser-sync'], function() {
  gulp.watch(paths.scripts, ['scripts', browserSync.reload]);
});