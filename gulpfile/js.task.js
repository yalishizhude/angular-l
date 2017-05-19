'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let path = require('path')
let merge = require('merge-stream')
let cfg = require('./config')
let script = require('./script')
let view = require('./view')
gulp.task('js', () => {
  let tasks = cfg.folders.map((folder) => {
    let dest = path.join(__dirname, '..', cfg.root, folder)
    let src = [path.join('!' + __dirname, '..', 'src','**', '*.spec.js'), 
      path.join(__dirname, '..', 'src', folder, '**', '*.{js,html}')]
    cfg.debug('js')('from %s to %s', src, dest)
    return gulp.src(src)
      .pipe($.plumber({
        errorHandler: $.notify.onError('Error: <%= error.message %>')
      }))
      .pipe($.if((file) => $.match(file, '*.js'), script(folder, cfg.timestamp), view(folder)))
      .pipe($.order([folder + '.js', folder + '.html.js']))
      .pipe($.concat(folder + '.js'))
      .pipe(gulp.dest(dest))
      .pipe($.connect.reload())
  })
  return merge(tasks)
})