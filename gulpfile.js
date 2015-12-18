const gulp = require('gulp');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const ngHtml2Js = require("gulp-ng-html2js");
const minifyHtml = require("gulp-minify-html");
const Server = require('karma').Server;
const gulpIgnore = require('gulp-ignore');
const changed = require('gulp-changed');
const argv = require('yargs').argv;

const src = './src/';
const dest = './build/public/';

gulp.task('test', function (done) {
  new Server({
    configFile: require('path').resolve('karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('uglify', ['clean'], function() {
  return gulp.src([src + '/app/**/*.js','!src/app/**/*.spec.js'])
          .pipe(concat('app.js'))
          .pipe(rename('app.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest(dest));
});

gulp.task('less', ['clean'], function () {
  return gulp.src(src + '/assets/less/demo.less')
         .pipe(changed(dest + '/assets/css/'))
         .pipe(less().on('error', function(err){
           console.log(err)
         }))
         .pipe(cssmin().on('error', function(err){
           console.log(err)
         }))
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest(dest + '/assets/css/'));
});

gulp.task('ngHtml2Js', ['clean'],function(){
  gulp.src("src/app/**/*.html")
    .pipe(changed(dest + '/partials/'))
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
  gulp.src(src+'index.html')
  .pipe(changed('dest'))
  .pipe(gulp.dest(dest));
  // assets
  gulp.src(src + '/assets/**')
  .pipe(changed(dest + '/assets/'))
  .pipe(gulp.dest(dest + '/assets/'))
  // common
  gulp.src([src + '/app/common/**/*.html',src + '/app/common/**/*.json'])
  .pipe(changed(dest + '/common/'))
  .pipe(gulp.dest(dest + '/common/'))
  // libs
  gulp.src(src + '/lib/**')
  .pipe(changed(dest + '/lib/'))
  .pipe(gulp.dest(dest + '/lib/'));
});

gulp.task('connect', function() {
  connect.server({
    root: dest,
    port: Number(process.env.PORT || 8080),
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch([src + '/**/*.js',src + '/**/*.html',src + '/**/*.less'], ['build']);
});

gulp.task('reload', ['clean','copy', 'less', 'uglify'],function(){
  connect.reload();
});

gulp.task("heroku:production", function(){
    console.log('hello'); // the task does not need to do anything.
});

gulp.task('build', ['copy',
                    'less',
                    'ngHtml2Js',
                    'uglify',
                    'reload'
                   ]);

gulp.task('serve', ['connect']);
