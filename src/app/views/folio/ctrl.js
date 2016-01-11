(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', 'FolioService', function($scope, FolioService){
    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
        });

    $scope.getUniqueCategories = function(){
      return FolioService.getUniqueCategories().sort();
    }

    $scope.getUniqueTags = function(){
      return FolioService.getUniqueTags().sort();
    }

    $scope.getUniqueYears = function(){
      return FolioService.getUniqueYears().sort();
      return FolioService.getUniqueYears().sort().reverse();
    }

  }]);
})(window.angular);
