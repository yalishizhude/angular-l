'use strict'
let gulp = require('gulp')
let path = require('path')
let merge = require('merge-stream')
let cfg = require('./config')
let view = require('./view')
gulp.task('view', () => {
  let tasks = cfg.folders.map((folder) => {
    let dest = path.join(__dirname, '..', cfg.root, folder)
    let src = path.join(__dirname, '..', 'src', folder, '**', '*.html')
    cfg.debug('view')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe(view(folder))
      .pipe(gulp.dest(dest))
  })
  return merge(tasks)
})