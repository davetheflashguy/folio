(function (angular) {
  angular.module('folioApp').service('ResumeService', ['$q', '$timeout', '$http', 'store', function ($q, $timeout, $http, store) {
    var deferred = $q.defer();
    $http.get('common/data/resume.json')
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
