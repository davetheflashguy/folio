(function (angular) {
  angular.module('folioApp').controller('HomeCtrl', ['$scope', 'HomeService', function($scope, HomeService){
    var promise = HomeService.getData();
        promise.then(function(data) {
          $scope.data = data;
        });
  }]);
})(window.angular);
