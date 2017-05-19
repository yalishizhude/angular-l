'use strict';
/**
 * @ngdoc {[name]}
 * @name {[name]}
 * @description xxx
 */
angular.module('{[name]}', ['core']).config(($stateProvider, {[id]}Router) => {
  // 配置路由
  angular.forEach({[id]}Router, function(item) {
    $stateProvider.state(item.id, item);
  });
});
