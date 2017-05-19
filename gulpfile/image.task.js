'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let path = require('path')
let merge = require('merge-stream')
let cfg = require('./config')

gulp.task('image', (cb) => {
  let tasks = cfg.libs.map((folder) => {
    let src = path.join('..', 'src', folder, 'image', '**', '*')
    let dest = path.join('..', cfg.root, folder, 'image')
    cfg.debug('image')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe($.plumber())
      .pipe($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(dest))
      .pipe($.connect.reload())
  })
  return merge(tasks)
})