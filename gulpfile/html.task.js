'use strict'
let debug = require('debug')('html')
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let path = require('path')
let cfg = require('./config')

gulp.task('html', () => {
  let src = path.join(__dirname, '..', 'src', 'index.html')
  let dest = path.join(__dirname, '..', cfg.root)
  cfg.debug('html')('from %s to %s', src, dest)
  return gulp.src(src)
    .pipe($.plumber())
    //优化首页加载速度
    .pipe($.useref())
    .pipe(gulp.dest(dest))
    .pipe($.connect.reload())
})