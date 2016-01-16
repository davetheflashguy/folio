(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', '$timeout', '$q', 'FolioService', function($scope, $timeout, $q, FolioService){

    var originatorEv;
    var context;
    $scope.readonly = false;
    $scope.querySearch = querySearch;

    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
        });

    $scope.openMenu = function($mdOpenMenu, $ev, $context) {
      if ($context == 'categories') {
        $scope.filters = loadFolioCategories();
      } else if ($context == 'tags') {
        $scope.filters = loadFolioTags();
      } else if ($context == 'years') {
        $scope.filters = loadFolioYears();
      }
      console.log($scope.filters, ' .. ');
      originatorEv = $ev;
      $mdOpenMenu($ev);
    };

    /**
     * Search for categories.
     */
    function querySearch (_query) {
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
      $scope.selectedCategoryItem = null;
      $scope.selectedCategoryText = null;
      $scope.selectedCategories = [];

      return FolioService.getUniqueCategories().sort().map(function (cat) {
        cat = cat.toLowerCase();
        return cat;
      });
    }

    function loadFolioTags() {
      $scope.selectedTagItem = null;
      $scope.selectedTagText = null;
      $scope.selectedTags = [];

      return FolioService.getUniqueTags().sort().map(function (tag) {
        tag = tag.toLowerCase();
        return tag;
      });
    }

    function loadFolioYears() {
      $scope.selectedYearItem = null;
      $scope.selectedYearText = null;
      $scope.selectedYears = [];

      return FolioService.getUniqueYears().sort().reverse().map(function (year) {
        year = year.toLowerCase();
        return year;
      });
    }

  }]);
})(window.angular);
