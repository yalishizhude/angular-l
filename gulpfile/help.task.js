'use strict'
let gulp = require('gulp')
const FgBlack = "\x1b[30m"
const FgWhite = "\x1b[37m"
const BgBlack = "\x1b[40m"
const BgWhite = "\x1b[47m"
/* eslint-disable */
gulp.task('help', () => {
  console.log('-------------------------------------')
  console.log(BgWhite + FgBlack)
  console.log(`
  Usage: 
  gulp [tasks] [options]

  gulp clean      remove directory "dev" and "dist"
  gulp clean:dev  remove directory "dev"
  gulp clean:dist remove directory "dist"
  gulp html       compile "src/index.html"
  gulp help       get help
  gulp image      compress images like png,jpg...
  gulp js         combine template and script to one js file
  gulp lib        copy drectory "lib" to directory "dev" or "dist" 
  gulp module     create a new module by module template
  gulp pngsprite  generate png and css 
  gulp svgsprite  generate svg and css 
  gulp script     compile and concat js files
  gulp style      compile less files and concat them to one css file   
  gulp view       compile and concat html file to script
  gulp watch      watch direcotry "src" and excute relevant task.
  gulp serve      start a server to debug
                  options:
                  -a <host|ip> Back server address e.g: http://api.xxx.com:1234
                  -b           Execute task "build" before start server
                  -d           Production mode,set server root directory "dist", default "dev"
                  -o           Open web page when server started
                  -p <port>    Server port default: 8080
                  -r [port]    Enable livereload`)
  console.log(FgWhite+BgBlack)
  console.log('\n-------------------------------------')
})