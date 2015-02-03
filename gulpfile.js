var gulp = require('gulp');
    concat = require('gulp-concat');
    nodemon = require('gulp-nodemon');
    jshint = require('gulp-jshint');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    browserSync = require('browser-sync');
    series = require('stream-series');
    inject = require("gulp-inject");
    karma = require('karma').server;

var paths = {
  scripts: ['client/**/*.js']
};

var miscCSS = gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/flag-icon-css/css/flag-icon.css',
    './client/styles.css'])
  .pipe(concat('bower.css'))
  .pipe(gulp.dest('./client/css'));

var appStream = gulp.src(paths.scripts)
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./client/js'));

// Concatenate vendor scripts 
var vendor = gulp.src([
    './bower_components/angular/angular.js',
    './bower_components/ngFx/dist/ngFx.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js'
    ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest('./client/js'));
 
gulp.task('scripts', function() {
  return gulp.src('./index.html')
    .pipe(inject(series(vendor, appStream, miscCSS)))
    .pipe(gulp.dest('./'));
});

var paths = {
  scripts: ['client/**/*.js']
};

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "http://localhost:3000"
  });
});

gulp.task('serve', function () {
  nodemon({ script: 'server.js', ignore: ['node_modules/**/*.js'] });
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/my.conf.js',
    singleRun: true
  }, function() { done();
  });
});

gulp.task('default', ['scripts', 'browser-sync', 'test'], function() {
  gulp.watch(paths.scripts, ['scripts', browserSync.reload]);
});