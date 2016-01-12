(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', '$timeout', '$q', 'FolioService', function($scope, $timeout, $q, FolioService){
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
    $scope.categories = [];
    $scope.selectedCategories = [];
    $scope.numberChips = [];
    $scope.numberChips2 = [];
    $scope.numberBuffer = '';

    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
          $scope.categories = FolioService.getUniqueCategories().sort();
          $scope.tags = FolioService.getUniqueTags().sort();
          $scope.years = FolioService.getUniqueYears().sort().reverse();
        });

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    function querySearch (query) {
      var results = query ? $scope.categories.filter(createFilterFor(query)) : [];
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(category) {
        console.log(category.indexOf(lowercaseQuery), ' . ');
        console.log(category);
        return category.indexOf(lowercaseQuery) === 0;
      };

    }

  }]);
})(window.angular);
