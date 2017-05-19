'use strict'
let path = require('path')
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let runSequence = require('run-sequence')
let proxy = require('http-proxy-middleware')
let cfg = require('./config')
let open = require('open')
require('./noop.task')

gulp.task('serve', (cb) => {
  const b = cfg.yargs.b || cfg.yargs.build
  const w = cfg.yargs.w || cfg.yargs.watch
  let tasks = ['noop']
  if (b) tasks.unshift('build')
  if (w) tasks.push('watch')
  runSequence(tasks, 'serve:start', cb)
})

gulp.task('serve:start', (cb) => {
  const r = cfg.yargs.r || cfg.yargs.reload
  const port = cfg.yargs.p || cfg.yargs.port || '8080'
  const a = cfg.yargs.a || cfg.yargs.address
  const o = cfg.yargs.o || cfg.yargs.open
  let plugins = a ? [
    proxy(['!*/', '!**/*.css', '!**/*.png', '!**/*.jpg', '!**/*.gif', '!**/*.js', '!**/*.ico', '!**/*.html', '!**/*.swf', '!**/*.svg', '!**/*.woff', '!**/*.eot', '!**/*.ttf', '/**'], {
      target: a,
      changeOrigin: false
    })
  ]: []
  $.connect.server({
    root: [path.join(__dirname, '..', cfg.root)],
    livereload: Number.isInteger(r) ? {
      port: r
    } : r,
    port: port,
    middleware: () => plugins
  })
  if (o) open('http://localhost:' + port)
})