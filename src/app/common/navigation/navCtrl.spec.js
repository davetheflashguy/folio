describe('NavigationCtrl', function() {
  beforeEach(module('folioApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.options ', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('NavigationCtrl', { $scope: $scope });
    });

    it('the default state is closed', function() {
      expect($scope.options.isOpen).toEqual(false);
    });
  });
});
