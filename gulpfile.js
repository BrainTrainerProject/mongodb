var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

gulp.task('build', ['copyConfig', 'lint'], function() {
  return gulp.src(['src/**/**.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'))
});

gulp.task('copyConfig', function() {
  return gulp.src(['src/**/**.json'])
    .pipe(gulp.dest('lib'))
});

gulp.task('lint', function() {
  return gulp.src(['gulpfile.babel.js','src/**/*.js',])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('test', ['build'], function() {
  return gulp.src('lib/test/**/*.js')
    .pipe(mocha())
});
