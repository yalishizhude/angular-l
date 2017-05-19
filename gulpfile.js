'use strict';
let gulp = require('gulp')
let fs = require('fs')
let path = require('path')

let enableDebug = () => {
  let tasks = []
  fs.readdirSync(path.join('gulpfile')).filter((file) => {
    if(file.indexOf('task.js')>-1) {
      tasks.push(file.replace('.task.js', ''))
    }
  })
  process.env.DEBUG = tasks.join(' ');
  return tasks
}
//加载所有任务
let loadTask = () => {
  enableDebug().map((file) => require(path.join(__dirname, 'gulpfile', file + '.task')))
}
loadTask()

gulp.task('default', ['help'])