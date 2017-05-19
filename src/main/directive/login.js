'use strict'
angular.module('main').directive('mainLogin', (crLogin, $state) => ({
  restrict: 'E',
  templateUrl: 'main/directive/login.html',
  link: (scope) => {
    scope.login = () => {
      crLogin.set('isLogin', true)
      $state.go('mainIndex')
    }
  }
}))