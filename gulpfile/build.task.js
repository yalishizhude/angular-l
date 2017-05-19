'use strict'
let gulp = require('gulp')
require('./html.task')
require('./js.task')
require('./pngsprite.task')
require('./svgsprite.task')
require('./css.task')
require('./image.task')

gulp.task('build', ['html', 'js', 'pngsprite', 'svgsprite', 'css', 'image', 'lib'])