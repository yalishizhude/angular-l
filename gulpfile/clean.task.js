'use strict'
let gulp = require('gulp')
let path = require('path')
const rimraf = require('rimraf')

gulp.task('clean', ['clean:dev', 'clean:dist'])

gulp.task('clean:dev', (cb) => {
  return rimraf(path.join(__dirname, '..', 'dev'), cb)
});

gulp.task('clean:dist', (cb) => {
  return rimraf(path.join(__dirname, '..', 'dist'), cb)
})