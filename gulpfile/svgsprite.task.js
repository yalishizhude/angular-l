'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let path = require('path')
let merge = require('merge-stream')
let cfg = require('./config')
gulp.task('svgsprite', () => {
  let tasks = cfg.folders.map((folder) => {
    let src = path.join(__dirname, '..', 'src', folder, 'sprite', '**', '*.svg')
    let dest = path.join(__dirname, '..', cfg.root, folder)
    cfg.debug('svg')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe($.plumber())
      .pipe($.svgSprite({
        mode: {
          symbol: {
            prefix: `.svg-${folder}-`,
            dimensions: '%s',
            sprite: `../${folder}.svg`,
            symbol: true,
            render: {
              css: {
                dest: '../svg.css'
              }
            }
          }
        }
      }))
      .pipe(gulp.dest(dest))
      .pipe($.connect.reload())
  })
  return merge(tasks)
})