(function (angular) {
  angular.module('folioApp').service('FolioService', ['$q', '$timeout', '$http', 'store', function ($q, $timeout, $http, store) {
    // uniques
    var uniqueCategories = [];
    var uniqueTags = [];
    var uniqueYears = [];
    // selected
    var selectedCategories = [];
    var selectedTags = [];
    var selectedYears = [];

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
      this.selectedCategories = categories;
      store.set('categories', JSON.stringify({selectedCategories: this.selectedCategories}));
    }

    this.getSelectedCategories = function() {
      var arr = [];
      if (store.get('categories') !== null) {
        var cats = JSON.parse(store.get('categories'));
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

      return arr;
    }

    this.setSelectedTags = function(tags) {
      this.selectedTags = tags;
      store.set('tags', JSON.stringify({selectedTags: this.selectedTags}));
    }

    this.getSelectedTags = function() {
      var arr = [];
      if (store.get('tags') !== null) {
        var t = JSON.parse(store.get('tags'));
        var tags = t.selectedTags;
        if (tags.length > 0) {
          arr = tags;
        }
        else {
          arr = this.getUniqueTags();
        }
      }
      else {
        arr = this.getUniqueTags();
      }

      return arr;
    }

    this.setSelectedYears = function(years) {
      this.selectedYears = years;
      store.set('years', JSON.stringify({selectedYears: this.selectedYears}));
    }

    this.getSelectedYears = function() {
      var arr = [];
      if (store.get('years') !== null) {
        var y = JSON.parse(store.get('years'));
        var years = y.selectedYears;
        if (years.length > 0) {
          arr = years;
        }
        else {
          arr = this.getUniqueYears();
        }
      }
      else {
        arr = this.getUniqueYears();
      }

      return arr;
    }
 }]);
})(window.angular);
