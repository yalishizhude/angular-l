'use strict'
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()
let fs = require('fs')
let path = require('path')

gulp.task('module', () => {
  function info(str) {
    process.stdout.write(str + '\n');
  }
  process.stdin.pause();
  info('请输入模块名：');
  let response = fs.readSync(process.stdin.fd, 1000, 0, "utf8");
  let name = response[0].trim();
  if (fs.existsSync(path.join(__dirname, '..', 'src', name))) {
    info(`模块${name}已经存在!`);
  } else {
    info('请输入模块id（前2~3位辅音字母缩写，如"home"为"hm",请勿与其他模块重复）：');
    response = fs.readSync(process.stdin.fd, 1000, 0, "utf8");
    let id = response[0].trim();
    process.stdin.pause();
    gulp.src(path.join('..', 'template/**/*'))
      .pipe($.replace('{[name]}', name))
      .pipe($.replace('{[id]}', id))
      .pipe(gulp.dest(path.join('..', 'src', name)));
    info(`模块${name}创建完成！\n请记得在src/public/script/config/module.js中配置模块文件哦~\n`);
  }
  return;
});