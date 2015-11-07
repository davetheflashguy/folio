var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

gulp.task('uglify', ['clean'], function() {
  return gulp.src(['src/app/**/*.js'])
          .pipe(concat('app.js'))
          .pipe(rename('app.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('build/public/'));
});

gulp.task('less', ['clean'],function () {
  return gulp.src('src/assets/less/*.less')
         .pipe(less().on('error', function(err){
           console.log(err)
         }))
         .pipe(cssmin().on('error', function(err){
           console.log(err)
         }))
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('build/public/assets/css/'));
});

gulp.task('clean', function(){
  return gulp.src(['build/'], {read: false})
    .pipe(clean({force: true}).on('error', function(err){
      console.log(err)
    }));
});

gulp.task('copy', ['clean'], function() {
  // index
  gulp.src('src/index.html')
  .pipe(gulp.dest('build/public/'));
  // assets
  gulp.src('src/assets/**')
  .pipe(gulp.dest('build/public/assets/'))
  // views
  gulp.src('src/app/views/**')
  .pipe(gulp.dest('build/public/views'))
  // common
  gulp.src('src/app/common/**')
  .pipe(gulp.dest('build/public/common'))
  // libs
  gulp.src('src/lib/**')
  .pipe(gulp.dest('build/public/lib/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'build/public',
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*'], ['build']);
});

gulp.task('reload', ['clean','copy', 'less', 'uglify'],function(){
  connect.reload();
});

gulp.task('build', ['copy', 'less', 'uglify', 'reload']);

gulp.task('serve', ['connect']);
