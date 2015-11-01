angular.module('folioApp').controller('NavigationCtrl', ['$scope', function($scope){
  console.log("navgiation controller");
  $scope.isOpen = false;
  $scope.navConfig = {
    isOpen: false,
    count: 0,
    selectedDirection: 'left'
  };
}]);
