/*
 * https://code.angularjs.org/1.3.20/docs/guide/unit-testing
 */
'use strict';
describe('mainIndexCtrl', function () {
  beforeEach(module('main'));
  it('log', inject(function ($controller, $rootScope, $log) {
    spyOn($log, 'info');
    var scope = $rootScope.$new();
    $controller('mainIndexCtrl', {
      $scope: scope
    });
    scope.log()
    expect($log.go).toHaveBeenCalled();
  }));
});