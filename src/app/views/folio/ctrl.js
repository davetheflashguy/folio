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
          $scope.filteredItems = $scope.data;
          if (JSON.parse(store.get('categories'))) {
            var selectedCategories = JSON.parse(store.get('categories')).selectedCategories;
            FolioService.setSelectedCategories(selectedCategories);
            //filterFolioItemsByCategory(selectedCategories);
          }
          if (JSON.parse(store.get('tags'))) {
            var selectedTags = JSON.parse(store.get('tags')).selectedTags;
            FolioService.setSelectedTags(selectedTags);
            //filterFolioItemsByTag(selectedTags);
          }
          filterFolioItemsByTag();

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
          filterFolioItemsByTag(newValue);
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
      $scope.filteredItems = [];
      angular.forEach(items, function(item, index){
        var cat = item.category.toLowerCase();
        if (arr.indexOf(cat) !== -1){
          $scope.filteredItems.push(items[index]);
        }
      });
    }

    function filterFolioItemsByTag(arr) {
      var items = $scope.data.items;
      $scope.filteredItems = [];
      angular.forEach(items, function(item, index){
        var tags = item.tags;
        console.log('tags: ', tags.length);

        angular.forEach(tags, function(item, index){
          var tag = item.toLowerCase();
          console.log('check for tag: ', tag);
          if (arr.indexOf(tag) !== -1){
            $scope.filteredItems.push(items[index]);
            console.log("Add to array")
          }
        });

      });
    }

    function filterFolioItemsByTag() {
      var selectedCategories = JSON.parse(store.get('categories')).selectedCategories;
      FolioService.setSelectedCategories(selectedCategories);

      var selectedTags = JSON.parse(store.get('tags')).selectedTags;
      FolioService.setSelectedTags(selectedTags);

      var selectedYears = JSON.parse(store.get('years')).selectedYears;

      var items = $scope.data.items;
      $scope.filteredItems = [];

      console.log('selectedCategories: ', selectedCategories);

      angular.forEach(items, function(item, index){
        var cat = item.category.toLowerCase();
        if (selectedCategories.indexOf(cat) !== -1){
          $scope.filteredItems.push(items[index]);
          console.log(cat, ' was found in ', selectedCategories);
        }
        /*
        var tags = item.tags;
        console.log('tags: ', tags.length);

        angular.forEach(tags, function(item, index){
          var tag = item.toLowerCase();
          console.log('check for tag: ', tag, ' in ', selectedTags);

          if (selectedTags.indexOf(tag) !== -1){
            $scope.filteredItems.push(items[index]);
            console.log("Add to array")
          }
        });
        */
      });

    }

  }]);
})(window.angular);
