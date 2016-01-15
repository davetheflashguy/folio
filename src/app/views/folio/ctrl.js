(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', '$timeout', '$q', 'FolioService', function($scope, $timeout, $q, FolioService){

    var originatorEv;
    var context;

    $scope.openMenu = function($mdOpenMenu, $ev, $context) {
      if ($context == 'categories') {
        context = $scope.categories;
      }
      console.log(context, ' .. ');
      originatorEv = $ev;
      $mdOpenMenu($ev);
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
    function querySearch (_query, _context) {
      var results = _query ? context.filter(createFilterFor(_query)) : [];
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

    function loadFolioItems() {
      $scope.tags = FolioService.getUniqueTags().sort();
      $scope.years = FolioService.getUniqueYears().sort().reverse();

      $scope.readonly = false;
      $scope.selectedItem = null;
      $scope.searchText = null;
      $scope.querySearch = querySearch;
      $scope.selectedCategories = [];

      console.log(context, ' ? ');
      //if (context == 'categories') { // todo: rework this, its a mess
        return FolioService.getUniqueCategories().sort().map(function (cat) {
          cat = cat.toLowerCase();
          return cat;
        });
      //}

    }

  }]);
})(window.angular);
