'use strict'
let fs = require('fs')
let path = require('path')
let yargs = require('yargs').argv
let debug = require('debug')
let root = (yargs.d || yargs.dist) ? 'dist' : 'dev'
let timestamp = (new Date()).getTime();
let folders = (function () {
  let dir = path.join(__dirname, '..', 'src')
  return fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory())
}())

let libs = (function () {
  let dir = path.join(__dirname, '..', 'lib')
  return fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory())
}())
module.exports = {
  folders,
  libs,
  root,
  debug,
  yargs,
  timestamp
}