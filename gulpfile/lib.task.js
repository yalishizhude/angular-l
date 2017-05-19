'use strict'
let gulp = require('gulp')
let path = require('path')
let merge = require('merge-stream')
let cfg = require('./config')

gulp.task('lib', () => {
  let tasks = cfg.libs.map((folder) => {
    let src = path.join(__dirname, '..', 'lib', folder, '**', '*')
    let dest = path.join(__dirname, '..', cfg.root, 'lib', folder)
    cfg.debug('lib')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe(gulp.dest(dest))
  })
  return merge(tasks)
})
