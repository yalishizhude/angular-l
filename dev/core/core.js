//模块按需加载

angular.module('core', ['ui.router', 'oc.lazyLoad']).config(["$ocLazyLoadProvider", "$stateProvider", "$urlRouterProvider", "$provide", "crModule", function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $provide, crModule) {
  $urlRouterProvider.deferIntercept();
  $ocLazyLoadProvider.config({
    modules: crModule
  });
  $provide.decorator('$state', ["$delegate", "$ocLazyLoad", "$log", "crModuleParse", "crLogin", "crDefaultPath", function ($delegate, $ocLazyLoad, $log, crModuleParse, crLogin, crDefaultPath) {
    var state = {};
    Object.assign(state, $delegate);
    $delegate.transitionTo = function (to) {
      var _arguments = arguments;

      var mod = to.self ? crModuleParse.getModuleNameByPath(to.self.url) : crModuleParse.getModuleNameById(to);
      $ocLazyLoad.load(mod).then(function () {
        if (!crLogin.get('isLogin') && to !== crDefaultPath.loginId) {
          state.go(crDefaultPath.loginId);
        } else {
          state.transitionTo.apply(null, _arguments);
        }
      }, function (e) {
        return $log.error(e);
      });
    };
    return $delegate;
  }]);
}]).run(["$rootScope", "$location", "$ocLazyLoad", "$state", "$urlRouter", "$log", "crModuleParse", "crDefaultPath", "crLogin", function ($rootScope, $location, $ocLazyLoad, $state, $urlRouter, $log, crModuleParse, crDefaultPath, crLogin) {
  var _loadModule = function loadModule() {
    var mod = crModuleParse.getModuleNameByPath($location.path() || crDefaultPath.indexPath);
    $ocLazyLoad.load(mod).then(function () {
      if (!crLogin.get('isLogin')) {
        $state.go(crDefaultPath.loginId);
      } else if ($location.path()) {
        $state.go(crDefaultPath.indexId);
      } else {
        $urlRouter.sync();
      }
    }, function (e) {
      return $log.error(e);
    });
    _loadModule = angular.noop;
  };
  $rootScope.$on('$locationChangeSuccess', function () {
    return _loadModule();
  });
  $urlRouter.listen();
}])
//模块所需文件

.constant('crModule', [{
  name: 'main',
  files: ['main/main.js', 'main/main.css']
}])
//默认跳转路径

.value('crDefaultPath', {
  loginId: 'mainLogin',
  indexId: 'mainIndex',
  indexPath: '/main/index'
})
//登录服务示例

.factory('crLogin', function () {
  var store = {
    isLogin: false
  };
  return {
    get: function get(key) {
      return store[key];
    },
    set: function set(key, value) {
      store[key] = value;
    }
  };
})
//根据id和路径解析模块名

.factory('crModuleParse', function () {
  var parser = {};
  parser.getModuleNameByPath = function (path) {
    return path.split('/')[1];
  };
  parser.getModuleNameById = function (state) {
    return state.replace(/(([a-z]*)[A-Z]{1})?.*/, '$2');
  };
  return parser;
})