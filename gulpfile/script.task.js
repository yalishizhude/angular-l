'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let path = require('path')
let merge = require('merge-stream')
let cfg = require('./config')
let script = require('./script')
require('./noop.task')
gulp.task('script', () => {
  let tasks = cfg.folders.map((folder) => {
    let dest = path.join(__dirname, '..', cfg.root, folder)
    let src = [path.join(__dirname, '..', 'src', folder, '**', '*.js'),
      path.join('!', __dirname, '..', 'src', folder, '**', '*.spec.js')]
    cfg.debug('script')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe($.plumber())
      .pipe(script(folder, cfg.timestamp))
      .pipe(gulp.dest(dest))
  })
  return merge(tasks)
})