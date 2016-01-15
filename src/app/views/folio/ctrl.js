(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', '$timeout', '$q', 'FolioService', function($scope, $timeout, $q, FolioService){

    var originatorEv;
    var context;

    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
        });

    $scope.openMenu = function($mdOpenMenu, $ev, $context) {
      if ($context == 'categories') {
        $scope.filters = loadFolioCategories();
      }
      console.log($scope.filters, ' .. ');
      originatorEv = $ev;
      $mdOpenMenu($ev);
    };

    /**
     * Search for categories.
     */
    function querySearch (_query, _context) {
      var results = _query ? $scope.filters.filter(createFilterFor(_query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(_query) {
      var lowercaseQuery = angular.lowercase(_query);
      
      return function filterFn(_phrase) {
        return (_phrase.indexOf(lowercaseQuery) === 0)
      };
    }

    function loadFolioCategories() {
      //$scope.tags = FolioService.getUniqueTags().sort();
      //$scope.years = FolioService.getUniqueYears().sort().reverse();

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
