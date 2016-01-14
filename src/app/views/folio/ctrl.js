(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', '$timeout', '$q', 'FolioService', function($scope, $timeout, $q, FolioService){

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    function init() {
      $scope.categories = loadFolioItems();
    }

    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
          init();
        });

    /**
     * Search for categories.
     */
    function querySearch (query) {
      var results = query ? $scope.categories.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(category) {
        return (category.indexOf(lowercaseQuery) === 0)
      };

    }

    function loadFolioItems() {
      $scope.tags = FolioService.getUniqueTags().sort();
      $scope.years = FolioService.getUniqueYears().sort().reverse();

      $scope.readonly = false;
      $scope.selectedItem = null;
      $scope.searchText = null;
      $scope.querySearch = querySearch;
      $scope.selectedCategories = [];

      return FolioService.getUniqueCategories().sort().map(function (cat) {
        cat = cat.toLowerCase();
        return cat;
      });
      
    }

  }]);
})(window.angular);
