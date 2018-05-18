var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var paths = {pages: ['src/*.html']};
var server = require('gulp-webserver');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('copy-html', function() {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

gulp.task('build', ['copy-html'], function() {
  return browserify({
           basedir: 'src',
           debug: true,
           entries: ['app.ts'],
           cache: {},
           packageCache: {}
         })
      .plugin(tsify)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'))
});

gulp.task('server', ['build'], function() {
  browserSync({server: {baseDir: 'dist'}})
});