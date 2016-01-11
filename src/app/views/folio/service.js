(function (angular) {
  angular.module('folioApp').service('FolioService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
    var uniqueCategories = [];
    var uniqueTags = [];
    var uniqueYears = [];
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

    this.getUniqueCategories = function(){
      return uniqueCategories;
    }

    this.getUniqueTags = function(){
      return uniqueTags;
    }

    this.getUniqueYears = function(){
      return uniqueYears;
    }

 }]);
})(window.angular);
