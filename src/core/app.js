'use strict'
//模块按需加载
angular.module('core', ['ui.router', 'oc.lazyLoad'])
.config(($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $provide, crModule) => {
  $urlRouterProvider.deferIntercept()
  $ocLazyLoadProvider.config({
    modules: crModule
  })
  $provide.decorator('$state', ($delegate, $ocLazyLoad, $log, crModuleParse, crLogin, crDefaultPath) => {
    let state = {}
    Object.assign(state, $delegate)
    $delegate.transitionTo = function (to) {
      let mod = to.self ? crModuleParse.getModuleNameByPath(to.self.url) : crModuleParse.getModuleNameById(to)
      $ocLazyLoad.load(mod).then(() => {
        if(!crLogin.get('isLogin') && to!==crDefaultPath.loginId) {
          state.go(crDefaultPath.loginId)
        } else {
          state.transitionTo.apply(null, arguments) 
        }
      }, (e) => $log.error(e))
    }
    return $delegate
  })
}).run(($rootScope, $location, $ocLazyLoad, $state, $urlRouter, $log, crModuleParse, crDefaultPath, crLogin) => {
  let loadModule = () => {
    let mod = crModuleParse.getModuleNameByPath($location.path() || crDefaultPath.indexPath)
    $ocLazyLoad.load(mod).then(() => {
      if(!crLogin.get('isLogin')) {
        $state.go(crDefaultPath.loginId)
      } else if($location.path()) {
        $state.go(crDefaultPath.indexId)
      } else {
        $urlRouter.sync() 
      }
    }, (e) => $log.error(e))
    loadModule = angular.noop
  }
  $rootScope.$on('$locationChangeSuccess', () => loadModule());
  $urlRouter.listen()
})