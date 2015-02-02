var gulp = require('gulp');
    concat = require('gulp-concat');
    nodemon = require('gulp-nodemon');
    jshint = require('gulp-jshint');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync');
    series = require('stream-series');
    inject = require("gulp-inject");

var paths = {
  scripts: ['client/**/*.js']
};

var miscCSS = gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/flag-icon-css/css/flag-icon.css',
    './client/styles.css'])
  .pipe(concat('bower.css'))
  .pipe(gulp.dest('./build'));

// gulp.task('index', function () {
//   var target = gulp.src('./index.html');
//   // It's not necessary to read the files (will speed up things), we're only after their paths: 
//   var sources = gulp.src(['./build/**/*.js', './build/**/*.css'], {read: false});
 
//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./'));
// });
// concatenate and minify app sources
var appStream = gulp.src(paths.scripts)
  .pipe(concat('app.js'))
  // .pipe(rename({suffix: '.min'}))
  // .pipe(uglify())
  .pipe(gulp.dest('./build'));


// Concatenate vendor scripts 
var vendor = gulp.src([
    './bower_components/angular/angular.js',
    './bower_components/ngFx/dist/ngFx.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js'
    ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('./build'));
 
gulp.task('scripts', function() {
  return gulp.src('./index.html')
    .pipe(inject(series(vendor, appStream, miscCSS)))
    .pipe(gulp.dest('./'));
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