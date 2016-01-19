(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', '$timeout', '$q', 'FolioService','store', function($scope, $timeout, $q, FolioService, store){

    var originatorEv;
    var context;
    $scope.readonly = false;
    $scope.querySearch = querySearch;

    $scope.selectedCategoryItem = null;
    $scope.selectedCategoryText = null;
    $scope.selectedCategories = [];

    $scope.selectedTagItem = null;
    $scope.selectedTagText = null;
    $scope.selectedTags = [];

    $scope.selectedYearItem = null;
    $scope.selectedYearText = null;
    $scope.selectedYears = [];

    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
        });

    $scope.openMenu = function($mdOpenMenu, $ev, $context) {
      if ($context == 'categories') {
        $scope.filters = loadFolioCategories();
        $scope.selectedCategories = $scope.filters;
      } else if ($context == 'tags') {
        $scope.filters = loadFolioTags();
        $scope.selectedTags = $scope.filters;
        store.set('tags', JSON.stringify({selectedTags: $scope.selectedTags}));
      } else if ($context == 'years') {
        $scope.filters = loadFolioYears();
        $scope.selectedYears = $scope.filters;
        store.set('years', JSON.stringify({selectedYears: $scope.selectedYears}));
      }
      originatorEv = $ev;
      $mdOpenMenu($ev);
    };

    function querySearch (_query) {
      var results = _query ? $scope.filters.filter(createFilterFor(_query)) : [];
      return results;
    }

    function createFilterFor(_query) {
      var lowercaseQuery = angular.lowercase(_query);

      return function filterFn(_phrase) {
        return (_phrase.indexOf(lowercaseQuery) === 0)
      };
    }

    function loadFolioCategories() {
      store.set('categories', JSON.stringify({selectedCategories: FolioService.getUniqueCategories().sort()}));
      return FolioService.getUniqueCategories().sort().map(function (cat) {
        cat = cat.toLowerCase();
        return cat;
      });
    }

    $scope.removeTagChip = function(_chip, _context) {
      //console.log('remove chip: ', _chip, , ' from: ', _context);
      if (_context == 'categories'){
        console.log($scope.selectedCategories);
        var index = $scope.selectedCategories.indexOf(_chip);
        $scope.selectedCategories.splice(index, 1);
        store.set('categories', JSON.stringify({selectedCategories: $scope.selectedCategories}));
        console.log($scope.selectedCategories);
      }

    }

    function loadFolioTags() {
      return FolioService.getUniqueTags().sort().map(function (tag) {
        tag = tag.toLowerCase();
        return tag;
      });
    }

    function loadFolioYears() {
      return FolioService.getUniqueYears().sort().reverse().map(function (year) {
        year = year.toLowerCase();
        return year;
      });
    }

  }]);
})(window.angular);
