'use strict'
let gulp = require('gulp')
let path = require('path')
let $ = require('gulp-load-plugins')()
let merge = require('merge-stream')
let cfg = require('./config')
gulp.task('pngsprite', () => {
  let tasks = cfg.folders.map((folder) => {
    let src = path.join(__dirname, '..', 'src', folder, 'sprite', '**', '*.png')
    let dest = path.join(__dirname, '..', cfg.root, folder)
    cfg.debug('pngsprite')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe($.plumber())
      .pipe($.rename((path) => {
        path.basename = `${folder}-${path.basename}`
      }))
      .pipe($.spritesmith({
        imgName: `${folder}.png`,
        cssName: 'png.css',
        cssTemplate: path.join(__dirname, 'cssTemplate.hbs')
      }))
      .pipe(gulp.dest(dest))
      .pipe($.connect.reload())
  })
  return merge(tasks)
})
