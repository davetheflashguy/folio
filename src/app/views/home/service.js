(function (angular) {
  angular.module('folioApp').service('HomeService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
    var deferred = $q.defer();
    $http.get('common/data/home.json').then(function(response) {
      deferred.resolve(response.data);
    });

    this.getData = function() {
      return deferred.promise;
    }

 }]);
})(window.angular);
