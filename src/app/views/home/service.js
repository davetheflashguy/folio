(function (angular) {
  angular.module('folioApp').service('HomeService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
    var deferred = $q.defer();
    $http.get('common/data/home.json')
    .success(function(data) {
      deferred.resolve(data);
    })
    .error(function(data, status) {
      console.error('Data error', status, data);
    });

    this.getData = function() {
      return deferred.promise;
    }

 }]);
})(window.angular);
