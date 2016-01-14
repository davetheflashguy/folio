(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', '$timeout', '$q', 'FolioService', function($scope, $timeout, $q, FolioService){
    /*
    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
          $scope.categories = FolioService.getUniqueCategories().sort();
          $scope.tags = FolioService.getUniqueTags().sort();
          $scope.years = FolioService.getUniqueYears().sort().reverse();
          init();
        });

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    function querySearch (query) {
      console.log($scope.categories);
      var results = query ? $scope.categories.filter(createFilterFor(query)) : [];
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(category) {
        return (category._lowername.indexOf(lowercaseQuery) === 0);
      }

    }

    function init() {
      $scope.readonly = false;
      $scope.selectedItem = null;
      $scope.searchText = null;
      $scope.querySearch = querySearch;
      $scope.categories = getCategories();
      $scope.selectedCategories = [];
      $scope.numberChips = [];
      $scope.numberChips2 = [];
      $scope.numberBuffer = '';
    }

    function getCategories() {
      var cats = FolioService.getUniqueCategories().sort();
      return cats.map(function (cat) {
        cat._lowername = cat.toLowerCase();
        return cat;
      });
    }
    */

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    function init() {
      $scope.vegetables = loadVegetables();
    }

    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          $scope.selectedCategory = "";
          //$scope.vegetables = FolioService.getUniqueCategories().sort();
          $scope.tags = FolioService.getUniqueTags().sort();
          $scope.years = FolioService.getUniqueYears().sort().reverse();
          init();
        });

    /**
     * Search for vegetables.
     */
    function querySearch (query) {
      var results = query ? $scope.vegetables.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(vegetable) {
        return (vegetable.indexOf(lowercaseQuery) === 0)
      };

    }

    function loadVegetables() {
      var veggies = [
        {
          'name': 'Broccoli',
          'type': 'Brassica'
        },
        {
          'name': 'Cabbage',
          'type': 'Brassica'
        },
        {
          'name': 'Carrot',
          'type': 'Umbelliferous'
        },
        {
          'name': 'Lettuce',
          'type': 'Composite'
        },
        {
          'name': 'Spinach',
          'type': 'Goosefoot'
        }
      ];

      var cats = FolioService.getUniqueCategories().sort();
      $scope.readonly = false;
      $scope.selectedItem = null;
      $scope.searchText = null;
      $scope.querySearch = querySearch;
      $scope.selectedVegetables = [];
      $scope.numberChips = [];
      $scope.numberChips2 = [];
      $scope.numberBuffer = '';
      return cats.map(function (cat) {
        cat = cat.toLowerCase();
        return cat;
      });

    }

  }]);
})(window.angular);
