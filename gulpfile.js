var gulp = require('gulp');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var Server = require('karma').Server;
var gulpIgnore = require('gulp-ignore');
var changed = require('gulp-changed');

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: require('path').resolve('karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('uglify', ['clean'], function() {
  return gulp.src(['src/app/**/*.js','!src/app/**/*.spec.js'])
          .pipe(concat('app.js'))
          .pipe(rename('app.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('build/public/'));
});

gulp.task('less', ['clean'], function () {
  return gulp.src('src/assets/less/demo.less')
         .pipe(changed('build/public/assets/css/'))
         .pipe(less().on('error', function(err){
           console.log(err)
         }))
         .pipe(cssmin().on('error', function(err){
           console.log(err)
         }))
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('build/public/assets/css/'));
});

gulp.task('ngHtml2Js', ['clean'],function(){
  gulp.src("src/app/**/*.html")
    .pipe(changed('build/public/partials/'))
    .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe(ngHtml2Js({
        moduleName: "folioPartials",
        prefix: "/partials/"
    }))
    .pipe(concat("partials.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/public/partials/"));
});

gulp.task('clean', function(){
/*
  return gulp.src(['build/'], {read: false})
    .pipe(clean({force: true}).on('error', function(err){
      console.log(err)
    }));
*/
});

gulp.task('copy', ['clean'], function() {
  // index
  gulp.src('src/index.html')
  .pipe(changed('build/public/'))
  .pipe(gulp.dest('build/public/'));
  // assets
  gulp.src('src/assets/**')
  .pipe(changed('build/public/assets/'))
  .pipe(gulp.dest('build/public/assets/'))
  // common
  gulp.src(['src/app/common/**/*.html','src/app/common/**/*.json'])
  .pipe(changed('build/public/common/'))
  .pipe(gulp.dest('build/public/common/'))
  // libs
  gulp.src('src/lib/**')
  .pipe(changed('build/public/lib/'))
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

gulp.task('build', ['copy', 'less', 'ngHtml2Js', 'uglify', 'reload', 'test']);

gulp.task('serve', ['connect']);
