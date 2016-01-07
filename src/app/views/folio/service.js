(function (angular) {
  angular.module('folioApp').service('FolioService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
    var deferred = $q.defer();
    $http.get('common/data/folio.json')
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
