'use strict'
const $ = require('gulp-load-plugins')()
let lazypipe = require('lazypipe')
let cfg = require('./config')

module.exports = (moduleName) => {
  let lp = lazypipe()
  .pipe($.plumber)
  .pipe($.less)
  .pipe($.autoprefixer, {
    browsers: ['last 1 version', '> 5%', 'not ie < 8'],
    cascade: false
  })
  .pipe($.concat, moduleName + '.css')
  if(cfg.yargs.d) {
    lp = lazypipe()
    .pipe(lp)
    .pipe($.minifyCss)
  }
  return lp()
}