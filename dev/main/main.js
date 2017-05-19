/**
 * @ngdoc main
 * @name main
 * @description 该模块只是一个示例
 */

angular.module('main', ['core']).config(["$stateProvider", "mnRouter", function ($stateProvider, mnRouter) {
  // 配置路由
  angular.forEach(mnRouter, function (item) {
    $stateProvider.state(item.id, item);
  });
}])
/**
* 路由配置如下：
{
  id: 'mnIndex',  //路由id，"模块缩写 + 功能|页面名"
  url: '/main/index', //路由路径，"模块/页面"
  templateUrl: 'main/page/index.html',  //视图，模块/page或directive/页面;模板，"模块/view/template/模板.html"
  controller: 'hmIndexCtrl' //控制器，"模块缩写 + 页面名 + Ctrl.js"
}
*/

.constant('mnRouter', [{
  id: 'mainIndex',
  url: '/main/index',
  controller: 'mainIndexCtrl',
  templateUrl: 'main/page/index.html'
}, {
  id: 'mainDetail',
  url: '/main/detail',
  templateUrl: 'main/page/detail.html'
}, {
  id: 'mainLogin',
  url: '/main/login',
  template: '<main-login></main-login>'
}])
.directive('mainLogin', ["crLogin", "$state", function (crLogin, $state) {
  return {
    restrict: 'E',
    templateUrl: 'main/directive/login.html',
    link: function link(scope) {
      scope.login = function () {
        crLogin.set('isLogin', true);
        $state.go('mainIndex');
      };
    }
  };
}])
.controller('mainIndexCtrl', ["$scope", "$log", function ($scope, $log) {
  $scope.log = function () {
    return $log.info('mainIndexCtrl');
  };
}])
angular.module('main').run(['$templateCache', function($templateCache) {$templateCache.put('main/directive/login.html','<button ng-click="login()">login</button>');
$templateCache.put('main/page/detail.html','<h2 ui-sref="mainIndex">back</h2>');
$templateCache.put('main/page/index.html','<h1 class="main-index" ui-sref="mainDetail">This is the first page</h1>\r\n<div>\r\n  <h5>png sprite:</h5>\r\n  <i class="png-main-view-btn"></i>\r\n</div>\r\n<div>\r\n  <h5>svg sprite:(recommend write a directive for svg)</h5>\r\n  <svg class="svg-main-i" style="fill:red">\r\n    <use xlink:href="main/main.svg#i"></use>\r\n  </svg>\r\n</div>');}]);