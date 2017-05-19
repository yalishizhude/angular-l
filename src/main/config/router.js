'use strict';
/**
* 路由配置如下：
{
  id: 'mnIndex',  //路由id，"模块缩写 + 功能|页面名"
  url: '/main/index', //路由路径，"模块/页面"
  templateUrl: 'main/page/index.html',  //视图，模块/page或directive/页面;模板，"模块/view/template/模板.html"
  controller: 'hmIndexCtrl' //控制器，"模块缩写 + 页面名 + Ctrl.js"
}
*/
angular.module('main').constant('mnRouter', [{
  id: 'mainIndex',
  url: '/main/index',
  controller: 'mainIndexCtrl',
  templateUrl: 'main/page/index.html',
}, {
  id: 'mainDetail',
  url: '/main/detail',
  templateUrl: 'main/page/detail.html'
}, {
  id: 'mainLogin',
  url: '/main/login',
  template: '<main-login></main-login>'
}]);
