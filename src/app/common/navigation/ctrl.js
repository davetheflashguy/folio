angular.module('folioApp').controller('NavigationCtrl', ['$scope', function($scope){
  this.isOpen = false;
  this.selectedMode = 'md-fling';
  this.selectedDirection = 'right';
}]);
