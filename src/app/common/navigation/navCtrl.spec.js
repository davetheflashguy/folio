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
      expect($scope.isOpen).toEqual(false);
    });

    it('the default selectedMode mode is md-fling', function() {
      expect($scope.selectedMode).toEqual('md-fling');
    });

    it('the default selectedDirection mode is left', function() {
      expect($scope.selectedDirection).toEqual('left');
    });

  });
});
