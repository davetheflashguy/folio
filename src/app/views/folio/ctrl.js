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
          if (JSON.parse(store.get('categories'))) {
            var selectedCategories = JSON.parse(store.get('categories')).selectedCategories;
            FolioService.setSelectedCategories(selectedCategories);
            filterFolioItemsByCategory(selectedCategories);
          }
        });

    $scope.$watchCollection('selectedCategories', function(newValue, oldValue) {
      if(angular.equals(newValue, oldValue)){
          return;
      }
      else {
        if (newValue.length > 0) {
          FolioService.setSelectedCategories(newValue);
          filterFolioItemsByCategory(newValue);
        }
      }
    });

    $scope.$watchCollection('selectedTags', function(newValue, oldValue) {
      if(angular.equals(newValue, oldValue)){
          return;
      }
      else {
        if (newValue.length > 0) {
          FolioService.setSelectedTags(newValue);
        }
      }
    });

    $scope.$watchCollection('selectedYears', function(newValue, oldValue) {
      if(angular.equals(newValue, oldValue)){
          return;
      }
      else {
        if (newValue.length > 0) {
          FolioService.setSelectedYears(newValue);
        }
      }
    });

    $scope.openMenu = function($mdOpenMenu, $ev, $context) {
      if ($context == 'categories') {
        $scope.selectedCategories = FolioService.getSelectedCategories();
        $scope.filters = FolioService.getUniqueCategories();
      } else if ($context == 'tags') {
        $scope.selectedTags = FolioService.getSelectedTags();
        $scope.filters = FolioService.getUniqueTags();
      } else if ($context == 'years') {
        $scope.selectedYears = FolioService.getSelectedYears()
        $scope.filters = FolioService.getUniqueYears();
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

    function filterFolioItemsByCategory(arr) {
      var items = $scope.data.items;
      angular.forEach(items, function(item, index){
        var cat = item.category.toLowerCase();
        console.log('indexOf: ', cat, ' is: ', arr.indexOf(cat));
        if (arr.indexOf(cat) == -1){
          items[index]['removedByFilter'] = true;
        }
        else{
          items[index]['removedByFilter'] = false;
        }
      });
    }

  }]);
})(window.angular);
