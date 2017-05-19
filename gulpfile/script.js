'use strict'
let $ = require('gulp-load-plugins')()
let lazypipe = require('lazypipe')
let cfg = require('./config')

module.exports = (moduleName, timestamp) => {
  let lp = lazypipe()
  .pipe($.eslint)
  .pipe($.eslint.format)
  .pipe($.eslint.failAfterError)
  .pipe($.babel, {
    presets: ['es2015']
  })
  .pipe($.replace, /TIMESTAMP/g, timestamp)
  .pipe($.replace,/;$/g, '')
  .pipe($.replace,/["|']{1}use strict["|']{1};/, '')
  .pipe($.replace,/angular\.module\(['|"]{1}.*?['|"]{1}\)/, '')
  .pipe($.replace,/(angular\.module\(.*\]\))/, '$1')
  .pipe($.replace, `angular.module('${moduleName}')`, '')
  .pipe($.trim)
  .pipe($.concat, moduleName + '.js')
  .pipe($.ngAnnotate)
  if(cfg.yargs.d) {
    lp = lazypipe()
    .pipe(lp)
    .pipe($.uglify)
  }
  return lp()
}
