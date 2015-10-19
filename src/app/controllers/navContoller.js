angular.module('folioApp').controller('NavCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.init = function(){
    console.log("init");
  }

  $scope.navConfig = {
    isOpen: false,
    count: 0,
    selectedDirection: 'right'
  };
}]);
