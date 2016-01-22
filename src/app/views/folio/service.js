(function (angular) {
  angular.module('folioApp').service('FolioService', ['$q', '$timeout', '$http', 'store', function ($q, $timeout, $http, store) {
    // uniques
    var uniqueCategories = [];
    var uniqueTags = [];
    var uniqueYears = [];
    // selected
    var selectedCategories = [];

    this.getData = function() {
      var deferred = $q.defer();
      $http.get('common/data/folio.json')
      .success(function(data) {
        deferred.resolve(data);
        angular.forEach(data.items, function(item) {
          // categories
          if (uniqueCategories.indexOf(item.category) == -1) {
            uniqueCategories.push(item.category);
          }

          // tags
          for (var i = 0; i < item.tags.length; i++) {
            if (uniqueTags.indexOf(item.tags[i]) == -1) {
              uniqueTags.push(item.tags[i]);
            }
          }

          // dates
          var startDate, endDate;
          startDate = moment(item.startDate * 1000);
          if (item.endDate !== null) {
            endDate = moment(item.endDate * 1000);
          }
          else {
            endDate = moment();
            if (uniqueYears.indexOf(moment(endDate).format("YYYY")) == -1) {
              uniqueYears.push(moment(endDate).format("YYYY"));
            }
          }

          var delta = moment(endDate).format("YYYY") - moment(startDate).format("YYYY");
          // is there more then 1 year difference?
          if (delta > 0) {
            var counter = 0;
            do {
              var today = moment();
              var followingYear = moment(startDate).add(counter, 'year');
              var year = moment(followingYear).format("YYYY");
              if (uniqueYears.indexOf(year) == -1) {
                uniqueYears.push(year);
              }
              counter ++;
            }
            while (counter < delta);
          }
          else {
            if (uniqueYears.indexOf(moment(endDate).format("YYYY")) == -1) {
              uniqueYears.push(moment(endDate).format("YYYY"));
            }
          }

        });
      })
      .error(function(data, status) {
        console.error('Data error', status, data);
      });

      return deferred.promise;
    };


    //== Unique Filter Getters
    this.getUniqueCategories = function(){
      return uniqueCategories.sort().map(function (cat) {
        cat = cat.toLowerCase();
        return cat;
      });
    }

    this.getUniqueTags = function(){
      return uniqueTags.sort().map(function (tag) {
        tag = tag.toLowerCase();
        return tag;
      });
    }

    this.getUniqueYears = function(){
      return uniqueYears.sort().reverse().map(function (year) {
        year = year.toLowerCase();
        return year;
      });
    }

    //== Selected Filter Setters / Getters
    this.setSelectedCategories = function(categories) {
      console.log('setSelectedCategories: ', categories);
      this.selectedCategories = categories;
      store.set('categories', JSON.stringify({selectedCategories: this.selectedCategories}));
      //console.log('setSelectedCategories: ', categories);
    }

    this.getSelectedCategories = function() {
      var arr = [];
      var cats = JSON.parse(store.get('categories'));
      if (store.get('categories') !== null) {
        var categories = cats.selectedCategories;
        if (categories.length > 0) {
          arr = categories;
        }
        else {
          arr = this.getUniqueCategories();
        }
      }
      else {
        arr = this.getUniqueCategories();
      }

      console.log('this.getUniqueCategories: ', arr);
      return arr;
    }
 }]);
})(window.angular);
