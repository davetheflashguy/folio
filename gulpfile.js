var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('uglify', ['clean'], function() {
  return gulp.src('src/app/**/*.js')
    .pipe(uglify('app.min.js', {outSourceMap: true}))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('build/public/'));
});

gulp.task('clean', function(){
  return gulp.src(['build/'], {read: false})
    .pipe(clean({force: true}))

  cb(err);
});

gulp.task('copy', ['clean'], function() {
  gulp.src('src/index.html')
  .pipe(gulp.dest('build/public/'));
  gulp.src('lib/**')
  .pipe(gulp.dest('build/public/lib/'))
  .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'build/public',
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['src/*html', 'src/**/*.js'], ['build']);
});

gulp.task('build', ['clean', 'copy', 'uglify']);

gulp.task('serve', ['connect', 'watch']);
