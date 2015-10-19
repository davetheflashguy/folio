var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");

gulp.task('uglify', ['clean'], function() {
  return gulp.src(['src/app/*.js','src/app/**/*.js'])
          .pipe(concat('app.js'))
          .pipe(rename('app.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('build/public/'));
});

gulp.task('clean', function(){
  return gulp.src(['build/'], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('copy', ['clean'], function() {
  // index
  gulp.src('src/index.html')
  .pipe(gulp.dest('build/public/'));
  // partials
  gulp.src('src/app/partials/*.html')
  .pipe(gulp.dest('build/public/partials/'))
  // assets
  gulp.src('src/assets/**')
  .pipe(gulp.dest('build/public/assets/'))
  // libs
  gulp.src('src/lib/**')
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
