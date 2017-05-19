'use strict';
/**
 * @ngdoc main
 * @name main
 * @description 该模块只是一个示例
 */
angular.module('main', ['core']).config(($stateProvider, mnRouter) => {
  // 配置路由
  angular.forEach(mnRouter, function(item) {
    $stateProvider.state(item.id, item);
  });
});
