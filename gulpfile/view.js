'use strict'
const lazypipe = require('lazypipe')
const $ = require('gulp-load-plugins')()

module.exports = (moduleName) => lazypipe()
  .pipe($.plumber)
  .pipe($.angularTemplatecache, moduleName + '.html.js', {
    root: moduleName,
    module: moduleName
  })()