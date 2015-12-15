(function (angular) {
  angular.module('folioApp').controller('NavigationCtrl', ['$scope', function($scope){
    $scope.selectedMode = 'md-fling';
    $scope.isOpen = true;
    $scope.selectedDirection = 'left';
  }])
})(window.angular);
