'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let path = require('path')
let merge = require('merge-stream')
let cfg = require('./config')
let style = require('./style')
require('./svgsprite.task')
require('./pngsprite.task')
gulp.task('style', () => {
  let tasks = cfg.folders.map((folder) => {
    let dest = path.join(__dirname, '..', cfg.root, folder)
    let src = [path.join(__dirname, '..', 'src', folder, '**', '*.{less,css}'), path.join(__dirname, '..', cfg.root, folder, '{png.css,svg.css}')]
    cfg.debug('style')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe(style(folder))
      .pipe(gulp.dest(dest))
      .pipe($.connect.reload())
  })
  return merge(tasks)
})