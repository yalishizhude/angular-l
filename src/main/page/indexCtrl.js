'use strict'
angular.module('main').controller('mainIndexCtrl', ($scope, $log) => {
  $scope.log = () => $log.info('mainIndexCtrl')
})