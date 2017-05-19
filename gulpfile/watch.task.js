'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let path = require('path')
let runSequence = require('run-sequence')
let cfg = require('./config')
require('./noop.task')

gulp.task('watch', () => {
  $.watch([path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'lib')], (event) => {
    let inPath = event.path.replace(path.join(__dirname, '..'), '').replace('src', '').split(path.sep)
    let mod = inPath[2]
    let asset = inPath[3]
    let extname = inPath[inPath.length - 1].split('.').pop()
    let tasks = ['noop'];
    cfg.folders = [mod]
    cfg.libs = [asset]
    if ('lib' === mod) {
      tasks.push('lib')
    } else if ('index.html' === mod && 'html' === extname) {
      tasks.push('html')
    } else if ('js' === extname || 'html' === extname) {
      tasks.push('js')
    } else if ('svg' === extname) {
      tasks.push('svgsprite', 'style')
    } else if ('png' === extname && 'sprite' === asset) {
      tasks.push('pngsprite', 'style')
    } else if ('less' === extname) {
      tasks.push('style')
    } else if ('image' === asset) {
      tasks.push('image')
    }
    runSequence(tasks) 
  })
})