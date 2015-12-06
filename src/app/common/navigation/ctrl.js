(function (angular) {
  angular.module('folioApp').controller('NavigationCtrl', ['$scope', function($scope){
    $scope.options = {
      isOpen : false,
      selectedMode : 'md-fling',
      selectedDirection : 'left'
    }
  }]);
})(window.angular);
