(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', 'FolioService', function($scope, FolioService){

    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
          $scope.categories = FolioService.getUniqueCategories().sort();
          $scope.tags = FolioService.getUniqueTags().sort();
          $scope.years = FolioService.getUniqueYears().sort().reverse();
          console.log(FolioService.getUniqueCategories().sort());
        });

        var originatorEv;
        $scope.openMenu = function($mdOpenMenu, ev) {
          originatorEv = ev;
          $mdOpenMenu(ev);
        };

  }]);
})(window.angular);
