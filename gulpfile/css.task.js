'use strict'
let gulp = require('gulp')
let runSequence = require('run-sequence')
require('./svgsprite.task')
require('./pngsprite.task')
require('./style')
gulp.task('css', (cb) => {
  runSequence(['pngsprite', 'svgsprite'], 'style', cb)
})